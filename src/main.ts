import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, WorkspaceLeaf, TFile, TFolder, moment } from 'obsidian';
import OpenAI from 'openai';
import { translations, Translations } from './i18n';

declare const NODE_ENV: string

interface BlogGeneratorSettings {
    apiKey: string;
    model: string;
    apiBaseUrl: string;
    language: string;
    useCustomPrompt: boolean;
    customPrompt: string;
}

const DEFAULT_SETTINGS: BlogGeneratorSettings = {
    apiKey: '',
    model: 'gpt-4-turbo-preview',
    apiBaseUrl: 'https://api.openai.com/v1',
    language: getCurrentLanguage(),
    useCustomPrompt: false,
    customPrompt: ''
}

function getCurrentLanguage() {
    var currentLocale = moment.locale().toLowerCase();
    var currentLanguage = "en"
    if (currentLocale === 'zh-cn') {
        currentLanguage = "zh"
    } else if (currentLocale.startsWith('ja')) {
        currentLanguage = "ja"
    } else if (currentLocale.startsWith('ko')) {
        currentLanguage = "ko"
    }
    return currentLanguage;
}

// View type constant
const VIEW_TYPE_BLOG_GENERATOR = "blog-generator-view";

// Sidebar view class
class BlogGeneratorView extends MarkdownView {
    private plugin: BlogGeneratorPlugin;

    constructor(leaf: WorkspaceLeaf, plugin: BlogGeneratorPlugin) {
        super(leaf);
        this.plugin = plugin;
    }

    getViewType() {
        return VIEW_TYPE_BLOG_GENERATOR;
    }

    getDisplayText() {
        return this.plugin.t('BLOG_GENERATOR');
    }

    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();
        container.createEl("h4", { text: this.plugin.t('BLOG_GENERATOR') });
        
        const buttonContainer = container.createEl("div", { cls: "blog-generator-buttons" });
        
        const generateButton = buttonContainer.createEl("button", {
            text: this.plugin.t('GENERATE_BLOG'),
            cls: "mod-cta"
        });
        
        generateButton.addEventListener("click", async () => {
            const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (!activeView) {
                new Notice(this.plugin.t('PLEASE_OPEN_NOTE'));
                return;
            }
            await this.plugin.generateBlog(activeView.editor, activeView);
        });
    }
}

export default class BlogGeneratorPlugin extends Plugin {
    settings: BlogGeneratorSettings;
    apiBaseUrl: string;
    private DEBUG = NODE_ENV !== 'production';

    private debug(...args: any[]) {
        if (this.DEBUG) {
            console.log('[Blog Generator]', ...args);
        }
    }

    t(key: keyof Translations['en']): string {
        const currentLanguage = getCurrentLanguage();
        return translations[currentLanguage][key];
    }

    async onload() {
        await this.loadSettings();

        // Register view type
        this.registerView(
            VIEW_TYPE_BLOG_GENERATOR,
            (leaf) => new BlogGeneratorView(leaf, this)
        );

        // Add ribbon icon
        this.addRibbonIcon('pencil', this.t('GENERATE_BLOG'), async () => {
            const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (!activeView) {
                new Notice(this.t('PLEASE_OPEN_NOTE'));
                return;
            }
            await this.generateBlog(activeView.editor, activeView);
        });

        // Add settings tab
        this.addSettingTab(new BlogGeneratorSettingTab(this.app, this));

        // Add blog generation command
        this.addCommand({
            id: 'generate-blog',
            name: this.t('GENERATE_BLOG_ARTICLE'),
            editorCallback: async (editor: Editor, view: MarkdownView) => {
                await this.generateBlog(editor, view);
            }
        });
    }

    async activateView() {
        const { workspace } = this.app;
        
        let leaf: WorkspaceLeaf | null = null;
        const leaves = workspace.getLeavesOfType(VIEW_TYPE_BLOG_GENERATOR);

        if (leaves.length > 0) {
            // View already exists, activate it
            leaf = leaves[0];
        } else {
            // Create new view
            leaf = workspace.getRightLeaf(false);
            if (leaf) {
                await leaf.setViewState({
                    type: VIEW_TYPE_BLOG_GENERATOR,
                    active: true,
                });
            }
        }

        // Ensure view is visible
        if (leaf) {
            workspace.revealLeaf(leaf);
        }
    }

    async onunload() {
        // Clean up code if needed
    }

    // Blog generation logic
    async generateBlog(editor: Editor, view: MarkdownView) {
        const noteContent = editor.getValue();
        
        try {
            if (!view.file || !(view.file instanceof TFile)) {
                new Notice(this.t('PLEASE_OPEN_NOTE'));
                return;
            }

            // Check if API key is set
            if (!this.settings.apiKey) {
                new Notice(this.t('API_KEY_REQUIRED'));
                return;
            }

            const openai = new OpenAI({
                apiKey: this.settings.apiKey,
                baseURL: this.settings.apiBaseUrl,
                dangerouslyAllowBrowser: true
            });

            new Notice(this.t('GENERATING_BLOG'));

            // Get image embeds from metadata cache
            const fileCache = this.app.metadataCache.getFileCache(view.file);
            const embeds = fileCache?.embeds || [];
            const imageBase64Map = new Map<string, string>();

            // Process image embeds
            for (const embed of embeds) {
                const ext = embed.link.split('.').pop()?.toLowerCase();
                if (ext && ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp', 'tiff'].includes(ext)) {
                    const imageFile = this.app.vault.getAbstractFileByPath(embed.link);
                    if (imageFile instanceof TFile) {
                        const base64 = await this.processImage(imageFile);
                        if (base64) {
                            imageBase64Map.set(embed.link, base64);
                        }
                    }
                }
            }

            const images = Array.from(imageBase64Map.keys());
            this.debug(this.t('FOUND_IMAGES'), images.length);

            // Build description with base64 images
            const imageDescriptions = images.map(img => {
                const base64 = imageBase64Map.get(img);
                // Only include a short preview of base64 data to avoid token limit
                return base64 
                    ? `Image: ${img}\nFormat: ${base64.split(';')[0]}`
                    : `Image: ${img} (unreadable)`;
            }).join('\n\n');

            let prompt = '';
            let systemPrompt = '';
            if (this.settings.useCustomPrompt && this.settings.customPrompt) {
                // Use custom prompt
                prompt = this.settings.customPrompt
                    .replace('{content}', noteContent)
                    .replace('{images}', imageDescriptions);
                systemPrompt = this.t('SYSTEM_PROMPT');
            } else {
                // Use default prompt based on selected language
                const langPrompts = translations[this.settings.language] || translations['en'];
                prompt = `${langPrompts.DEFAULT_PROMPT}
                
                Original note content:
                ${noteContent}
                
                Images in note:
                ${images.map(img => `Image: ${img}`).join('\n')}`;

                // Use system prompt based on selected language
                systemPrompt = langPrompts.SYSTEM_PROMPT;
            }

            this.debug('Starting API call...');
            
            const completion = await openai.chat.completions.create({
                model: this.settings.model,
                messages: [
                    {
                        role: "system",
                        content: systemPrompt
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
            });

            this.debug('API call completed');

            let generatedBlog = completion.choices[0].message.content || '';

            // Replace image references in generated content with actual base64 images
            images.forEach(img => {
                const base64 = imageBase64Map.get(img);
                if (base64) {
                    // Escape special characters in the image path for regex
                    const escapedImg = img.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    // Match both ![[image]] and ![description](image) formats
                    const wikiRegex = new RegExp(`!\\[\\[${escapedImg}\\]\\]`, 'g');
                    const markdownRegex = new RegExp(`!\\[([^\\]]*)\\]\\(${escapedImg}\\)`, 'g');
                    
                    // Only add base64 data if it's a complete data URL
                    const imgTag = base64.startsWith('data:') 
                        ? `<img src="${base64}" alt="${img}" />`
                        : `![${img}](${img})`;  // Keep original markdown format if image was too large
                    
                    generatedBlog = generatedBlog
                        .replace(wikiRegex, imgTag)
                        .replace(markdownRegex, (_, alt) => `<img src="${base64}" alt="${alt || img}" />`);
                }
            });

            // Create new file to save generated blog
            let fileName = 'generated-blog';
            if (view.file?.basename) {
                fileName = `${view.file.basename}-blog`;
            } else {
                fileName = `generated-blog-${Date.now()}`;
            }
            
            this.debug(this.t('SAVING_FILE'), fileName);
            
            await this.app.vault.create(`${fileName}.md`, generatedBlog);
            
            new Notice(this.t('BLOG_GENERATION_SUCCESS'));
            this.debug(this.t('BLOG_GENERATION_COMPLETE'));
        } catch (error) {
            this.debug(this.t('BLOG_GENERATION_ERROR'), error);
            this.debug('Error details:', {
                message: error.message,
                status: error.status,
                response: error.response
            });
            new Notice(`${this.t('BLOG_GENERATION_ERROR')}, ${this.t('CHECK_CONSOLE')}`);
        }
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    async processImage(imageFile: TFile): Promise<string> {
        try {
            // Read the image file
            const imageBuffer = await this.app.vault.readBinary(imageFile);
            
            // Convert to base64
            const base64Image = Buffer.from(imageBuffer).toString('base64');
            const mimeType = this.getMimeType(imageFile.extension);
            
            // Check if image size is too large (over 50KB)
            if (base64Image.length > 50 * 1024) {
                this.debug(`Image ${imageFile.path} is too large (${Math.round(base64Image.length / 1024)}KB), skipping base64 data in prompt`);
                return `${mimeType}`;
            }
            
            return `data:${mimeType};base64,${base64Image}`;
        } catch (error) {
            this.debug('Error processing image:', error);
            new Notice(this.t('IMAGE_PROCESSING_ERROR'));
            return '';
        }
    }

    private getMimeType(extension: string): string {
        const mimeTypes: { [key: string]: string } = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'gif': 'image/gif',
            'webp': 'image/webp',
            'svg': 'image/svg+xml',
            'bmp': 'image/bmp',
            'tiff': 'image/tiff',
            'ico': 'image/x-icon'
        };
        return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
    }
}

class BlogGeneratorSettingTab extends PluginSettingTab {
    plugin: BlogGeneratorPlugin;

    constructor(app: App, plugin: BlogGeneratorPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const {containerEl} = this;
        containerEl.empty();

        new Setting(containerEl)
            .setName(this.plugin.t('API_BASE_URL'))
            .setDesc(this.plugin.t('API_BASE_URL_DESC'))
            .addText(text => text
                .setPlaceholder('https://api.openai.com/v1')
                .setValue(this.plugin.settings.apiBaseUrl)
                .onChange(async (value) => {
                    try {
                        new URL(value); // Validate URL format
                        this.plugin.settings.apiBaseUrl = value;
                        await this.plugin.saveSettings();
                    } catch (e) {
                        new Notice(this.plugin.t('URL_INVALID'));
                    }
                }));

        new Setting(containerEl)
            .setName(this.plugin.t('API_KEY'))
            .setDesc(this.plugin.t('API_KEY_DESC'))
            .addText(text => text
                .setPlaceholder('sk-...')
                .setValue(this.plugin.settings.apiKey)
                .onChange(async (value) => {
                    this.plugin.settings.apiKey = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName(this.plugin.t('MODEL'))
            .setDesc(this.plugin.t('MODEL_DESC'))
            .addText(text => text
                .setPlaceholder('gpt-4-turbo-preview')
                .setValue(this.plugin.settings.model)
                .onChange(async (value) => {
                    this.plugin.settings.model = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName(this.plugin.t('LANGUAGE'))
            .setDesc(this.plugin.t('LANGUAGE_DESC'))
            .addDropdown(dropdown => dropdown
                .addOption('en', 'English')
                .addOption('zh', '中文')
                .addOption('ja', '日本語')
                .addOption('ko', '한국어')
                .setValue(this.plugin.settings.language)
                .onChange(async (value) => {
                    this.plugin.settings.language = value;
                    await this.plugin.saveSettings();
                }));

        const useCustomPromptSetting = new Setting(containerEl)
            .setName(this.plugin.t('USE_CUSTOM_PROMPT'))
            .setDesc(this.plugin.t('USE_CUSTOM_PROMPT_DESC'))
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.useCustomPrompt)
                .onChange(async (value) => {
                    this.plugin.settings.useCustomPrompt = value;
                    await this.plugin.saveSettings();
                    // Refresh the settings tab to show/hide custom prompt setting
                    this.display();
                }));

        // Only show custom prompt setting if useCustomPrompt is enabled
        if (this.plugin.settings.useCustomPrompt) {
            new Setting(containerEl)
                .setName(this.plugin.t('CUSTOM_PROMPT'))
                .setDesc(this.plugin.t('CUSTOM_PROMPT_DESC'))
                .addTextArea(text => {
                    text.inputEl.rows = 6;
                    text.inputEl.cols = 50;
                    text.setValue(this.plugin.settings.customPrompt)
                    text.onChange(async (value) => {
                        this.plugin.settings.customPrompt = value;
                        await this.plugin.saveSettings();
                    });
                });
        }
    }
} 