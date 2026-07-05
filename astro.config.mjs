// @ts-check
import { unified } from "@astrojs/markdown-remark";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./remark-reading-time.mjs";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

const blogContentDir = fileURLToPath(new URL("./src/content/blog", import.meta.url));

function listMdxFiles(dir) {
    if (!existsSync(dir)) {
        return [];
    }

    return readdirSync(dir).flatMap((entry) => {
        const entryPath = path.join(dir, entry);
        if (statSync(entryPath).isDirectory()) {
            return listMdxFiles(entryPath);
        }

        return /\.mdx?$/.test(entryPath) ? [entryPath] : [];
    });
}

function getFrontmatterValue(source, key) {
    const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source)?.[1];
    if (!frontmatter) {
        return undefined;
    }

    const match = new RegExp(`^${key}:\\s*(.+)$`, "m").exec(frontmatter);
    return match?.[1]?.trim().replace(/^["']|["']$/g, "");
}

function getArticlePath(filePath) {
    const relativePath = path
        .relative(blogContentDir, filePath)
        .split(path.sep)
        .join("/")
        .replace(/\.mdx?$/, "");
    const segments = relativePath.split("/");

    if (segments[0] === "uz") {
        return `/${segments.slice(1).join("/")}/`;
    }

    return `/${segments.join("/")}/`;
}

function getPostLastmodByPath() {
    const entries = new Map();

    for (const filePath of listMdxFiles(blogContentDir)) {
        const source = readFileSync(filePath, "utf8");
        const lastmodValue = getFrontmatterValue(source, "updated") ??
            getFrontmatterValue(source, "date");

        if (lastmodValue) {
            entries.set(getArticlePath(filePath), new Date(lastmodValue));
        }
    }

    return entries;
}

const postLastmodByPath = getPostLastmodByPath();

// https://astro.build/config
export default defineConfig({
    trailingSlash: "always",
    site: "https://blog.ecofin.uz",
    i18n: {
        defaultLocale: "uz",
        locales: ["uz", "en", "ru"],
        routing: {
            prefixDefaultLocale: false,
        },
    },
    markdown: {
        processor: unified({
            remarkPlugins: [remarkReadingTime],
        }),
    },

    vite: {
        resolve: {
            alias: {
                "@data": "/src/data",
                "@components": "/src/components",
                "@utils": "/src/utils",
                "@layouts": "/src/layouts",
                "@styles": "/src/styles",
            },
        },
        server: {
            watch: {
                ignored: ["**/.venv/**", "**/node_modules/**", "**/dist/**"],
            },
        },
    },

    integrations: [
        icon(),
        mdx(),
        sitemap({
            filter: (page) => !page.endsWith("/rss.xml"),
            serialize: (item) => {
                const pathname = new URL(item.url).pathname;
                const lastmod = postLastmodByPath.get(pathname);

                if (!lastmod) {
                    return item;
                }

                return {
                    ...item,
                    lastmod,
                };
            },
            namespaces: {
                news: false,
                xhtml: false,
                image: false,
                video: false,
            },
        }),
    ],
});
