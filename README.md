# Blog Generator for Obsidian

[简体中文](README_zh-CN.md) | [日本語](README_ja.md) | [한국어](README_ko.md)

## Introduction

Blog Generator for Obsidian is a powerful plugin that transforms your Obsidian notes into well-structured blog posts. It leverages OpenAI's language models to optimize content, supports multiple languages, and handles images within your notes.

## Features

- 🤖 Smart blog generation using OpenAI API
- 🌍 Multi-language support (Chinese, English, Japanese, Korean)
- 🖼️ Automatic image processing and conversion
- 🎨 Customizable prompts
- 🔧 Flexible API settings
- 💻 User-friendly interface

## Installation

1. Open Settings in Obsidian
2. Go to "Third-party plugins"
3. Disable "Safe mode"
4. Click "Browse" and search for "Blog Generator"
5. Click Install

## Configuration

1. After installation, go to plugin settings
2. Configure your OpenAI API key
3. (Optional) Set custom API endpoint
4. Choose the language for blog generation
5. (Optional) Customize prompts

## Usage

1. Open the note you want to convert
2. Click the pencil icon in the left sidebar or use the command palette and type "Generate Blog"
3. Wait for the generation to complete
4. The generated blog post will be saved as a new Markdown file

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Build Steps

1. Clone the repository:
```bash
git clone https://github.com/yourusername/obsidian-blog-generator.git
cd obsidian-blog-generator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Build the plugin:
```bash
npm run build
# or
yarn build
```

4. For development with hot-reload:
```bash
npm run dev
# or
yarn dev
```

### Testing in Obsidian

1. Create a test vault in Obsidian
2. Create `.obsidian/plugins/obsidian-blog-generator/` directory
3. Copy the built files (main.js, manifest.json, styles.css) to this directory
4. Enable the plugin in Obsidian settings

### Publishing to Obsidian Plugin Store

1. Update `manifest.json` with your plugin information
2. Create a new release on GitHub:
   - Tag version should match the version in `manifest.json`
   - Name the release with the version number
   - Generate release notes
3. Submit your plugin to the Obsidian Plugin Store:
   - Go to [Obsidian Plugin Store Submission](https://github.com/obsidianmd/obsidian-releases)
   - Fork the repository
   - Add your plugin information to `community-plugins.json`
   - Create a pull request
4. Wait for review and approval from the Obsidian team

#### Requirements for Plugin Store Submission

- A clear README with documentation
- Source code must be publicly available
- Plugin must follow Obsidian's guidelines and best practices
- Manifest must include all required fields:
  ```json
  {
    "id": "obsidian-blog-generator",
    "name": "Blog Generator",
    "version": "1.0.0",
    "minAppVersion": "0.15.0",
    "description": "Generate blog posts from your notes using OpenAI",
    "author": "Your Name",
    "authorUrl": "https://github.com/yourusername",
    "isDesktopOnly": false
  }
  ```

## Notes

- Ensure you have configured a valid OpenAI API key before use
- Image processing may take some time depending on size and quantity
- Review your note content before generation to ensure proper formatting 