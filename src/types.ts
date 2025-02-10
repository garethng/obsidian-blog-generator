export interface BlogGeneratorSettings {
    apiKey: string;
    model: string;
    apiBaseUrl: string;
    language: string;
    uiLanguage: string;
    useCustomPrompt: boolean;
    customPrompt: string;
}

export const DEFAULT_SETTINGS: BlogGeneratorSettings = {
    apiKey: '',
    model: 'gpt-4-turbo-preview',
    apiBaseUrl: 'https://api.openai.com/v1',
    language: 'en',
    uiLanguage: 'en',
    useCustomPrompt: false,
    customPrompt: ''
}; 