export interface Translations {
    [key: string]: {
        // UI elements
        BLOG_GENERATOR: string;
        GENERATE_BLOG: string;
        GENERATE_BLOG_ARTICLE: string;
        PLEASE_OPEN_NOTE: string;
        GENERATING_BLOG: string;
        BLOG_GENERATION_SUCCESS: string;
        BLOG_GENERATION_ERROR: string;
        CHECK_CONSOLE: string;
        
        // Settings
        API_BASE_URL: string;
        API_BASE_URL_DESC: string;
        API_KEY: string;
        API_KEY_DESC: string;
        MODEL: string;
        MODEL_DESC: string;
        LANGUAGE: string;
        LANGUAGE_DESC: string;
        CUSTOM_PROMPT: string;
        CUSTOM_PROMPT_DESC: string;
        USE_CUSTOM_PROMPT: string;
        USE_CUSTOM_PROMPT_DESC: string;
        UI_LANGUAGE: string;
        UI_LANGUAGE_DESC: string;
        
        // Prompts
        DEFAULT_PROMPT: string;
        SYSTEM_PROMPT: string;
        
        // Error messages
        API_KEY_REQUIRED: string;
        IMAGE_NOT_FOUND: string;
        IMAGE_PROCESSING_ERROR: string;
        
        // Console messages
        FOUND_IMAGES: string;
        CALLING_API: string;
        API_CALL_SUCCESS: string;
        SAVING_FILE: string;
        BLOG_GENERATION_COMPLETE: string;
    };
}

export const translations: Translations = {
    en: {
        // UI elements
        BLOG_GENERATOR: "Blog generator",
        GENERATE_BLOG: "Generate blog",
        GENERATE_BLOG_ARTICLE: "Generate blog article",
        PLEASE_OPEN_NOTE: "Please open a note first",
        GENERATING_BLOG: "Generating blog...",
        BLOG_GENERATION_SUCCESS: "Blog generated successfully!",
        BLOG_GENERATION_ERROR: "Error generating blog",
        CHECK_CONSOLE: "Please check console for details",
        
        // Settings
        API_BASE_URL: "API base URL",
        API_BASE_URL_DESC: "Enter your API base URL (default is https://api.openai.com/v1)",
        API_KEY: "OpenAI API key",
        API_KEY_DESC: "Enter your OpenAI API key",
        MODEL: "OpenAI model",
        MODEL_DESC: "Choose the OpenAI model to use",
        LANGUAGE: "Language",
        LANGUAGE_DESC: "Choose the language for generated blog",
        CUSTOM_PROMPT: "Custom prompt",
        CUSTOM_PROMPT_DESC: "Enter your custom prompt for blog generation. Use {content} for note content and {images} for image descriptions",
        USE_CUSTOM_PROMPT: "Use custom prompt",
        USE_CUSTOM_PROMPT_DESC: "Enable to use custom prompt instead of default prompt",
        UI_LANGUAGE: "UI language",
        UI_LANGUAGE_DESC: "Choose the language for user interface",
        
        // Prompts
        DEFAULT_PROMPT: "Please generate a well-structured blog post based on the following note content. Maintain the main points of the original text but make it more suitable for a blog format. The output should be in English and use markdown format, excluding images and other content. Only include the blog content itself.",
        SYSTEM_PROMPT: "You are a professional blog writer. Write in English.",
        
        // Error messages
        API_KEY_REQUIRED: "Please configure OpenAI API key in settings first",
        IMAGE_NOT_FOUND: "Image not found",
        IMAGE_PROCESSING_ERROR: "Error processing image",
        
        // Console messages
        FOUND_IMAGES: "Found image references:",
        CALLING_API: "Starting OpenAI API call...",
        API_CALL_SUCCESS: "API call successful, saving file...",
        SAVING_FILE: "Saving to file:",
        BLOG_GENERATION_COMPLETE: "Blog generation complete"
    },
    zh: {
        // UI elements
        BLOG_GENERATOR: "博客生成器",
        GENERATE_BLOG: "生成博客",
        GENERATE_BLOG_ARTICLE: "生成博客文章",
        PLEASE_OPEN_NOTE: "请先打开一个笔记",
        GENERATING_BLOG: "正在生成博客...",
        BLOG_GENERATION_SUCCESS: "博客生成成功！",
        BLOG_GENERATION_ERROR: "生成博客时出错",
        CHECK_CONSOLE: "请检查控制台获取详细信息",
        
        // Settings
        API_BASE_URL: "API 接口地址",
        API_BASE_URL_DESC: "输入你的 API 接口地址（默认为 https://api.openai.com/v1）",
        API_KEY: "OpenAI API 密钥",
        API_KEY_DESC: "输入你的 OpenAI API 密钥",
        MODEL: "OpenAI 模型",
        MODEL_DESC: "选择要使用的 OpenAI 模型",
        LANGUAGE: "语言",
        LANGUAGE_DESC: "选择生成博客的语言",
        CUSTOM_PROMPT: "自定义提示词",
        CUSTOM_PROMPT_DESC: "输入自定义的博客生成提示词。使用 {content} 表示笔记内容，{images} 表示图片描述",
        USE_CUSTOM_PROMPT: "使用自定义提示词",
        USE_CUSTOM_PROMPT_DESC: "启用后将使用自定义提示词替代默认提示词",
        UI_LANGUAGE: "界面语言",
        UI_LANGUAGE_DESC: "选择用户界面的显示语言",
        
        // Prompts
        DEFAULT_PROMPT: "请基于以下笔记内容生成一篇结构完整、逻辑清晰的博客文章。注意保持原文的主要观点，但使其更适合博客形式。输出的博客使用markdown格式，不包含图片和其他内容，只包含博客内容本身。",
        SYSTEM_PROMPT: "你是一位专业的博客写手。用中文写作。",
        
        // Error messages
        API_KEY_REQUIRED: "请先在设置中配置 OpenAI API 密钥",
        IMAGE_NOT_FOUND: "找不到图片文件",
        IMAGE_PROCESSING_ERROR: "处理图片时出错",
        
        // Console messages
        FOUND_IMAGES: "找到图片引用：",
        CALLING_API: "开始调用 OpenAI API...",
        API_CALL_SUCCESS: "API 调用成功，开始保存文件...",
        SAVING_FILE: "保存到文件：",
        BLOG_GENERATION_COMPLETE: "博客生成完成"
    },
    ja: {
        // UI elements
        BLOG_GENERATOR: "ブログジェネレーター",
        GENERATE_BLOG: "ブログを生成",
        GENERATE_BLOG_ARTICLE: "ブログ記事を生成",
        PLEASE_OPEN_NOTE: "最初にノートを開いてください",
        GENERATING_BLOG: "ブログを生成中...",
        BLOG_GENERATION_SUCCESS: "ブログの生成が完了しました！",
        BLOG_GENERATION_ERROR: "ブログの生成中にエラーが発生しました",
        CHECK_CONSOLE: "詳細はコンソールを確認してください",
        
        // Settings
        API_BASE_URL: "API エンドポイント",
        API_BASE_URL_DESC: "API エンドポイントを入力してください（デフォルトは https://api.openai.com/v1）",
        API_KEY: "OpenAI API キー",
        API_KEY_DESC: "OpenAI API キーを入力してください",
        MODEL: "OpenAI モデル",
        MODEL_DESC: "使用する OpenAI モデルを選択してください",
        LANGUAGE: "言語",
        LANGUAGE_DESC: "生成するブログの言語を選択してください",
        CUSTOM_PROMPT: "カスタムプロンプト",
        CUSTOM_PROMPT_DESC: "ブログ生成用のカスタムプロンプトを入力してください。{content}でノート内容、{images}で画像説明を表します",
        USE_CUSTOM_PROMPT: "カスタムプロンプトを使用",
        USE_CUSTOM_PROMPT_DESC: "有効にするとデフォルトプロンプトの代わりにカスタムプロンプトを使用します",
        UI_LANGUAGE: "インターフェース言語",
        UI_LANGUAGE_DESC: "ユーザーインターフェースの言語を選択してください",
        
        // Prompts
        DEFAULT_PROMPT: "以下のノート内容に基づいて、構造的で明確なブログ記事を生成してください。元のテキストの主要なポイントを維持しながら、ブログ形式により適した形に調整してください。出力は日本語でmarkdown形式とし、画像やその他のコンテンツは含めず、ブログ本文のみとしてください。",
        SYSTEM_PROMPT: "あなたはプロのブログライターです。日本語で書いてください。",
        
        // Error messages
        API_KEY_REQUIRED: "最初に設定で OpenAI API キーを設定してください",
        IMAGE_NOT_FOUND: "画像が見つかりません",
        IMAGE_PROCESSING_ERROR: "画像の処理中にエラーが発生しました",
        
        // Console messages
        FOUND_IMAGES: "画像の参照を見つけました：",
        CALLING_API: "OpenAI API を呼び出し中...",
        API_CALL_SUCCESS: "API 呼び出しが成功しました。ファイルを保存中...",
        SAVING_FILE: "ファイルに保存中：",
        BLOG_GENERATION_COMPLETE: "ブログの生成が完了しました"
    },
    ko: {
        // UI elements
        BLOG_GENERATOR: "블로그 생성기",
        GENERATE_BLOG: "블로그 생성",
        GENERATE_BLOG_ARTICLE: "블로그 글 생성",
        PLEASE_OPEN_NOTE: "먼저 노트를 열어주세요",
        GENERATING_BLOG: "블로그 생성 중...",
        BLOG_GENERATION_SUCCESS: "블로그가 성공적으로 생성되었습니다!",
        BLOG_GENERATION_ERROR: "블로그 생성 중 오류 발생",
        CHECK_CONSOLE: "자세한 내용은 콘솔을 확인해주세요",
        
        // Settings
        API_BASE_URL: "API 엔드포인트",
        API_BASE_URL_DESC: "API 엔드포인트를 입력하세요 (기본값은 https://api.openai.com/v1)",
        API_KEY: "OpenAI API 키",
        API_KEY_DESC: "OpenAI API 키를 입력하세요",
        MODEL: "OpenAI 모델",
        MODEL_DESC: "사용할 OpenAI 모델을 선택하세요",
        LANGUAGE: "언어",
        LANGUAGE_DESC: "생성할 블로그의 언어를 선택하세요",
        CUSTOM_PROMPT: "사용자 정의 프롬프트",
        CUSTOM_PROMPT_DESC: "블로그 생성을 위한 사용자 정의 프롬프트를 입력하세요. {content}는 노트 내용, {images}는 이미지 설명을 나타냅니다",
        USE_CUSTOM_PROMPT: "사용자 정의 프롬프트 사용",
        USE_CUSTOM_PROMPT_DESC: "활성화하면 기본 프롬프트 대신 사용자 정의 프롬프트를 사용합니다",
        UI_LANGUAGE: "인터페이스 언어",
        UI_LANGUAGE_DESC: "사용자 인터페이스 언어를 선택하세요",
        
        // Prompts
        DEFAULT_PROMPT: "다음 노트 내용을 바탕으로 구조적이고 명확한 블로그 포스트를 생성해주세요. 원문의 주요 포인트를 유지하면서 블로그 형식에 더 적합하게 만들어주세요. 출력은 한국어로 markdown 형식을 사용하며, 이미지와 기타 콘텐츠를 제외한 블로그 내용만 포함해주세요.",
        SYSTEM_PROMPT: "당신은 전문 블로그 작성자입니다. 한국어로 작성해주세요.",
        
        // Error messages
        API_KEY_REQUIRED: "먼저 설정에서 OpenAI API 키를 구성해주세요",
        IMAGE_NOT_FOUND: "이미지를 찾을 수 없습니다",
        IMAGE_PROCESSING_ERROR: "이미지 처리 중 오류 발생",
        
        // Console messages
        FOUND_IMAGES: "이미지 참조를 찾았습니다：",
        CALLING_API: "OpenAI API 호출 중...",
        API_CALL_SUCCESS: "API 호출 성공, 파일 저장 중...",
        SAVING_FILE: "파일 저장 중：",
        BLOG_GENERATION_COMPLETE: "블로그 생성 완료"
    }
}; 