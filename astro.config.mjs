// @ts-check
import sitemap from "@astrojs/sitemap";
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
                if (/posts/.test(item.url)) {
                    /** @type {any} */ (item).changefreq = "weekly";
                    item.priority = 0.8;
                }
                // Ensure lastmod is included if available
                item.lastmod = new Date().toISOString();
                return item;
            },
        }),
        mdx(),
    ],
});
