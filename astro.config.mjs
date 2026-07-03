// @ts-check
import { unified } from "@astrojs/markdown-remark";
import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./remark-reading-time.mjs";

import mdx from "@astrojs/mdx";
import icon from "astro-icon";

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
    ],
});
