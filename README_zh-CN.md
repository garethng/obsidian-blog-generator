# Obsidian 博客生成器

[English](README.md) | [日本語](README_ja.md) | [한국어](README_ko.md)

## 简介

Obsidian 博客生成器是一个强大的插件，可以将你的 Obsidian 笔记轻松转换为结构化的博客文章。它使用 OpenAI 的语言模型来优化内容，支持多语言输出，并且可以处理笔记中的图片。

## 特性

- 🤖 使用 OpenAI API 智能生成博客内容
- 🌍 支持多语言生成（中文、英文、日语、韩语）
- 🖼️ 自动处理和转换笔记中的图片
- 🎨 可自定义提示词
- 🔧 灵活的 API 设置
- 💻 友好的用户界面

## 安装

1. 在 Obsidian 中打开设置
2. 进入"第三方插件"
3. 关闭"安全模式"
4. 点击"浏览"并搜索"Blog Generator"
5. 点击安装

## 配置

1. 安装后，进入插件设置
2. 配置 OpenAI API 密钥
3. （可选）设置自定义 API 地址
4. 选择生成博客的语言
5. （可选）自定义提示词

## 使用方法

1. 打开要转换的笔记
2. 点击左侧边栏的铅笔图标，或使用命令面板输入"生成博客"
3. 等待生成完成
4. 生成的博客文章将保存为新的 Markdown 文件

## 开发指南

### 环境要求

- Node.js（v16 或更高版本）
- npm 或 yarn
- Git

### 构建步骤

1. 克隆仓库：
```bash
git clone https://github.com/yourusername/obsidian-blog-generator.git
cd obsidian-blog-generator
```

2. 安装依赖：
```bash
npm install
# 或
yarn install
```

3. 构建插件：
```bash
npm run build
# 或
yarn build
```

4. 开发模式（支持热重载）：
```bash
npm run dev
# 或
yarn dev
```

### 在 Obsidian 中测试

1. 在 Obsidian 中创建测试库
2. 创建 `.obsidian/plugins/obsidian-blog-generator/` 目录
3. 将构建的文件（main.js、manifest.json、styles.css）复制到该目录
4. 在 Obsidian 设置中启用插件

### 发布到 Obsidian 插件商城

1. 更新 `manifest.json` 文件中的插件信息
2. 在 GitHub 上创建新的发布版本：
   - 标签版本需要与 `manifest.json` 中的版本号匹配
   - 使用版本号命名发布
   - 生成发布说明
3. 提交插件到 Obsidian 插件商城：
   - 访问 [Obsidian 插件商城提交](https://github.com/obsidianmd/obsidian-releases)
   - Fork 该仓库
   - 在 `community-plugins.json` 中添加你的插件信息
   - 创建拉取请求
4. 等待 Obsidian 团队审核和批准

#### 插件商城提交要求

- 清晰的 README 文档
- 源代码必须公开可用
- 插件必须遵循 Obsidian 的指南和最佳实践
- Manifest 文件必须包含所有必需字段：
  ```json
  {
    "id": "obsidian-blog-generator",
    "name": "Blog Generator",
    "version": "1.0.1",
    "minAppVersion": "0.15.0",
    "description": "Generate blog posts from your notes using OpenAI",
    "author": "你的名字",
    "authorUrl": "https://github.com/yourusername",
    "isDesktopOnly": false
  }
  ```

## 注意事项

- 使用前请确保已配置有效的 OpenAI API 密钥
- 图片处理可能需要一定时间，取决于图片大小和数量
- 建议在生成前检查笔记内容，确保格式正确 

## 许可证

本项目采用 MIT 许可证。详情请参阅 [LICENSE](LICENSE) 文件。 