![Obsidian Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=%23483699&label=downloads&query=%24%5B%22ai-blog-generator%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json)
[![GitHub Release](https://img.shields.io/github/v/release/garethng/obsidian-blog-generator)](https://github.com/garethng/obsidian-blog-generator/releases)

# Blog Generator

[简体中文](README_zh-CN.md) | [日本語](README_ja.md) | [한국어](README_ko.md)

## Introduction

Blog Generator is a powerful plugin that transforms your Obsidian notes into well-structured blog posts. It leverages OpenAI's language models to optimize content, supports multiple languages, and handles images within your notes.

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
git clone https://github.com/garethng/obsidian-blog-generator.git
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

## Notes

- Ensure you have configured a valid OpenAI API key before use
- Image processing may take some time depending on size and quantity
- Review your note content before generation to ensure proper formatting 

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. 