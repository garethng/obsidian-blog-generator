import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const banner =
`/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`;

const prod = process.argv[2] === "production";
const buildDir = ".build";

// Get target directory from .env file, fallback to buildDir if not set
const targetDir = process.env.OBSIDIAN_PLUGINS_DIR || path.join(buildDir);

// Ensure build directory exists
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
}

// Copy necessary files to build directory
fs.copyFileSync("manifest.json", path.join(buildDir, "manifest.json"));
fs.copyFileSync("styles.css", path.join(buildDir, "styles.css"));

// Function to copy files to target directory after build
const copyToDist = () => {
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.copyFileSync(path.join(buildDir, "main.js"), path.join(targetDir, "main.js"));
    fs.copyFileSync(path.join(buildDir, "manifest.json"), path.join(targetDir, "manifest.json"));
    fs.copyFileSync(path.join(buildDir, "styles.css"), path.join(targetDir, "styles.css"));
    console.log("Files copied to Obsidian plugins directory");
};

const buildOptions = {
    define: {
        'NODE_ENV': JSON.stringify(process.argv[2])
    },
    banner: {
        js: banner,
    },
    entryPoints: ["src/main.ts"],
    bundle: true,
    external: [
        "obsidian",
        "electron",
        "@codemirror/autocomplete",
        "@codemirror/collab",
        "@codemirror/commands",
        "@codemirror/language",
        "@codemirror/lint",
        "@codemirror/search",
        "@codemirror/state",
        "@codemirror/view",
        "@lezer/common",
        "@lezer/highlight",
        "@lezer/lr",
        ...builtins
    ],
    format: "cjs",
    target: "es2018",
    logLevel: "info",
    sourcemap: prod ? false : "inline",
    treeShaking: true,
    outfile: path.join(buildDir, "main.js"),
    watch: !prod && {
        onRebuild(error) {
            if (error) {
                console.error('Build failed:', error);
            } else {
                console.log('Build succeeded');
                copyToDist();
            }
        },
    },
};

try {
    await esbuild.build(buildOptions);
    if (prod) {
        copyToDist();
        process.exit(0);
    }
} catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
} 