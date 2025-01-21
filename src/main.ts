import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, WorkspaceLeaf, TFile } from 'obsidian';
import OpenAI from 'openai';
import { translations, Translations } from './i18n';

interface BlogGeneratorSettings {
    apiKey: string;
    model: string;
    apiBaseUrl: string;
    language: string;
    uiLanguage: string; // UI language setting
    useCustomPrompt: boolean;
    customPrompt: string;
}

const DEFAULT_SETTINGS: BlogGeneratorSettings = {
    apiKey: '',
    model: 'gpt-4-turbo-preview',
    apiBaseUrl: 'https://api.openai.com/v1',
    language: 'en',
    uiLanguage: 'en',
    useCustomPrompt: false,
    customPrompt: ''
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

    t(key: keyof Translations['en']): string {
        return translations[this.settings.uiLanguage][key];
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
        // Clean up views
        this.app.workspace.getLeavesOfType(VIEW_TYPE_BLOG_GENERATOR).forEach(leaf => leaf.detach());
    }

    // Blog generation logic
    async generateBlog(editor: Editor, view: MarkdownView) {
        const noteContent = editor.getValue();
        
        try {
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

            // Extract image references
            const imageRegex = /!\[\[(.*?)\]\]/g;
            const imageMatches = noteContent.matchAll(imageRegex);
            const images = [];
            const imageBase64Map = new Map<string, string>();

            // Process all images
            for (const match of imageMatches) {
                const imagePath = match[1].split('|')[0].trim(); // Handle possible aliases
                images.push(imagePath);
                
                // Get base64 encoding of the image
                const base64 = await this.processImage(imagePath);
                if (base64) {
                    imageBase64Map.set(imagePath, base64);
                }
            }

            console.log(this.t('FOUND_IMAGES'), images.length);

            // Build description with base64 images
            const imageDescriptions = images.map(img => {
                const base64 = imageBase64Map.get(img);
                return base64 
                    ? `Image: ${img}\nData: ${base64}`
                    : `Image: ${img} (unreadable)`;
            }).join('\n\n');

            let prompt = '';
            if (this.settings.useCustomPrompt && this.settings.customPrompt) {
                // Use custom prompt
                prompt = this.settings.customPrompt
                    .replace('{content}', noteContent)
                    .replace('{images}', imageDescriptions);
            } else {
                // Use default prompt
                prompt = `${this.t('DEFAULT_PROMPT')}
                
                Original note content:
                ${noteContent}
                
                Images in note:
                ${imageDescriptions}`;
            }

            console.log(this.t('CALLING_API'));
            
            const completion = await openai.chat.completions.create({
                model: this.settings.model,
                messages: [
                    {
                        role: "system",
                        content: this.t('SYSTEM_PROMPT')
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
            });

            console.log(this.t('API_CALL_SUCCESS'));

            let generatedBlog = completion.choices[0].message.content || '';

            // Replace image references in generated content with actual base64 images
            images.forEach(img => {
                const base64 = imageBase64Map.get(img);
                if (base64) {
                    const imgRegex = new RegExp(`!\\[\\[${img.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]\\]`, 'g');
                    generatedBlog = generatedBlog.replace(imgRegex, `<img src="${base64}" alt="${img}" />`);
                }
            });

            // Create new file to save generated blog
            let fileName = 'generated-blog';
            if (view.file?.basename) {
                fileName = `${view.file.basename}-blog`;
            } else {
                fileName = `generated-blog-${Date.now()}`;
            }
            
            console.log(this.t('SAVING_FILE'), fileName);
            
            await this.app.vault.create(`${fileName}.md`, generatedBlog);
            
            new Notice(this.t('BLOG_GENERATION_SUCCESS'));
            console.log(this.t('BLOG_GENERATION_COMPLETE'));
        } catch (error) {
            console.error(this.t('BLOG_GENERATION_ERROR'), error);
            console.error('Error details:', {
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

    async processImage(imagePath: string): Promise<string> {
        try {
            // Get image file
            const file = this.app.vault.getAbstractFileByPath(imagePath);
            if (!(file instanceof TFile)) {
                console.warn(this.t('IMAGE_NOT_FOUND'), imagePath);
                return '';
            }

            // Read image file
            const arrayBuffer = await this.app.vault.readBinary(file);
            const blob = new Blob([arrayBuffer]);
            
            // Convert to base64
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result as string;
                    resolve(base64data);
                };
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error(`${this.t('IMAGE_PROCESSING_ERROR')}: ${imagePath}`, error);
            return '';
        }
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
                    this.plugin.settings.apiBaseUrl = value;
                    await this.plugin.saveSettings();
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

        new Setting(containerEl)
            .setName(this.plugin.t('UI_LANGUAGE'))
            .setDesc(this.plugin.t('UI_LANGUAGE_DESC'))
            .addDropdown(dropdown => dropdown
                .addOption('en', 'English')
                .addOption('zh', '中文')
                .addOption('ja', '日本語')
                .addOption('ko', '한국어')
                .setValue(this.plugin.settings.uiLanguage)
                .onChange(async (value) => {
                    this.plugin.settings.uiLanguage = value;
                    await this.plugin.saveSettings();
                    // Refresh the settings tab to show new language
                    this.display();
                }));

        new Setting(containerEl)
            .setName(this.plugin.t('USE_CUSTOM_PROMPT'))
            .setDesc(this.plugin.t('USE_CUSTOM_PROMPT_DESC'))
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.useCustomPrompt)
                .onChange(async (value) => {
                    this.plugin.settings.useCustomPrompt = value;
                    await this.plugin.saveSettings();
                }));

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