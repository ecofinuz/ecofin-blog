// @ts-check
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
    trailingSlash: "always",
    site: "https://blog.ecofin.uz",
    outDir: "./public_build",
    i18n: {
        defaultLocale: "uz",
        locales: ["uz", "en", "ru"],
        routing: {
            prefixDefaultLocale: false,
        },
    },

    vite: {
        resolve: {
            alias: {
                "@data": "/src/data",
                "@components": "/src/components",
                "@utils": "/src/utils",
                "@layouts": "/src/layouts",
            },
        },
        server: {
            watch: {
                ignored: ["**/.venv/**", "**/node_modules/**", "**/dist/**"],
            },
        },
    },

    integrations: [
        sitemap({
            serialize(item) {
                // Boost individual post pages (3 segments: /uz/kredit/slug/)
                const url = new URL(item.url);
                const segments = url.pathname.split("/").filter(Boolean);

                if (segments.length === 3) {
                    item.changefreq = ChangeFreqEnum.WEEKLY;
                    item.priority = 0.8;
                }

                // Category and index pages
                if (segments.length === 2) {
                    item.changefreq = ChangeFreqEnum.DAILY;
                    item.priority = 0.6;
                }

                // Home pages (/uz/, /en/, /ru/)
                if (segments.length === 1) {
                    item.changefreq = ChangeFreqEnum.DAILY;
                    item.priority = 1.0;
                }

                item.lastmod = new Date().toISOString();
                return item;
            },
        }),
        mdx(),
    ],
});
