// @ts-check
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

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
        sitemap({
            serialize(item) {
                const url = new URL(item.url);
                const segments = url.pathname.split("/").filter(Boolean);
                const isPrefixedLocale = ["en", "ru"].includes(segments[0]);
                const contentSegments = isPrefixedLocale
                    ? segments.slice(1)
                    : segments;
                const contentDepth = isPrefixedLocale
                    ? segments.length - 1
                    : segments.length;
                const isHomePage =
                    segments.length === 0 ||
                    (isPrefixedLocale && contentDepth === 0);
                const isAuthorPage = contentSegments[0] === "author";

                if (isHomePage) {
                    item.changefreq = ChangeFreqEnum.DAILY;
                    item.priority = 1.0;
                } else if (isAuthorPage) {
                    item.changefreq = ChangeFreqEnum.WEEKLY;
                    item.priority = 0.4;
                } else if (contentDepth === 2) {
                    item.changefreq = ChangeFreqEnum.WEEKLY;
                    item.priority = 0.8;
                } else if (contentDepth === 1) {
                    item.changefreq = ChangeFreqEnum.DAILY;
                    item.priority = 0.6;
                }

                item.lastmod = new Date().toISOString();
                return item;
            },
        }),
        mdx(),
    ],
});
