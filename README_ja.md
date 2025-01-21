# Obsidian ブログジェネレーター

[English](README.md) | [简体中文](README_zh-CN.md) | [한국어](README_ko.md)

## 概要

Obsidian ブログジェネレーターは、Obsidianのノートを構造化されたブログ記事に簡単に変換できる強力なプラグインです。OpenAIの言語モデルを使用してコンテンツを最適化し、複数言語での出力をサポートし、ノート内の画像も処理できます。

## 特徴

- 🤖 OpenAI APIを使用したスマートなブログ生成
- 🌍 多言語サポート（中国語、英語、日本語、韓国語）
- 🖼️ 画像の自動処理と変換
- 🎨 カスタマイズ可能なプロンプト
- 🔧 柔軟なAPI設定
- 💻 ユーザーフレンドリーなインターフェース

## インストール

1. Obsidianで設定を開く
2. 「サードパーティプラグイン」に移動
3. 「セーフモード」を無効にする
4. 「閲覧」をクリックし、"Blog Generator"を検索
5. インストールをクリック

## 設定

1. インストール後、プラグイン設定に移動
2. OpenAI APIキーを設定
3. （オプション）カスタムAPIエンドポイントを設定
4. ブログ生成の言語を選択
5. （オプション）プロンプトをカスタマイズ

## 使用方法

1. 変換したいノートを開く
2. 左サイドバーの鉛筆アイコンをクリック、またはコマンドパレットで「ブログを生成」と入力
3. 生成が完了するまで待機
4. 生成されたブログ記事は新しいMarkdownファイルとして保存されます

## 開発ガイド

### 必要条件

- Node.js（v16以上）
- npm または yarn
- Git

### ビルド手順

1. リポジトリをクローン：
```bash
git clone https://github.com/yourusername/obsidian-blog-generator.git
cd obsidian-blog-generator
```

2. 依存関係のインストール：
```bash
npm install
# または
yarn install
```

3. プラグインのビルド：
```bash
npm run build
# または
yarn build
```

4. 開発モード（ホットリロード対応）：
```bash
npm run dev
# または
yarn dev
```

### Obsidianでのテスト

1. Obsidianでテストボルトを作成
2. `.obsidian/plugins/obsidian-blog-generator/` ディレクトリを作成
3. ビルドしたファイル（main.js、manifest.json、styles.css）をこのディレクトリにコピー
4. Obsidianの設定でプラグインを有効化

### Obsidian プラグインストアへの公開

1. `manifest.json` のプラグイン情報を更新
2. GitHubで新しいリリースを作成：
   - タグバージョンは `manifest.json` のバージョンと一致させる
   - リリース名をバージョン番号にする
   - リリースノートを生成
3. Obsidian プラグインストアに提出：
   - [Obsidian プラグインストア提出](https://github.com/obsidianmd/obsidian-releases) にアクセス
   - リポジトリをフォーク
   - `community-plugins.json` にプラグイン情報を追加
   - プルリクエストを作成
4. Obsidian チームのレビューと承認を待つ

#### プラグインストア提出の要件

- 明確なドキュメントを含む README
- ソースコードが公開されていること
- Obsidian のガイドラインとベストプラクティスに従うこと
- Manifest に必要なフィールドをすべて含めること：
  ```json
  {
    "id": "obsidian-blog-generator",
    "name": "Blog Generator",
    "version": "1.0.0",
    "minAppVersion": "0.15.0",
    "description": "Generate blog posts from your notes using OpenAI",
    "author": "あなたの名前",
    "authorUrl": "https://github.com/yourusername",
    "isDesktopOnly": false
  }
  ```

## 注意事項

- 使用前に有効なOpenAI APIキーが設定されていることを確認してください
- 画像の処理には、サイズと数量に応じて時間がかかる場合があります
- 生成前にノートの内容を確認し、フォーマットが正しいことを確認してください 