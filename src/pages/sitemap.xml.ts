import type { CollectionEntry } from "astro:content";
import type { APIContext } from "astro";
import type { AuthorKey } from "@data/authors";
import type { CategoryKey, Locale } from "@data/categories";
import type { LanguageLinks } from "@utils/languageLinks";
import { authors } from "@data/authors";
import { categories } from "@data/categories";
import { getCollection } from "astro:content";
import {
    getAvailablePostLanguageLinks,
    getLocalizedAuthorLinks,
    getLocalizedCategoryLinks,
    getLocalizedHomeLinks,
    getPostHref,
} from "@utils/languageLinks";

type SitemapEntry = {
    path: string;
    lastmod: string;
    changefreq: "daily" | "weekly" | "monthly";
    priority: string;
    alternates: Partial<LanguageLinks>;
};

const locales = ["uz", "en", "ru"] as const satisfies readonly Locale[];
const today = "2026-07-03";

function escapeXml(value: string): string {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");
}

function absoluteUrl(path: string, site: URL): string {
    return new URL(path, site).href;
}

function getPostLastmod(post: CollectionEntry<"blog">): string {
    return (post.data.updated ?? post.data.date).toISOString().slice(0, 10);
}

function renderUrl(entry: SitemapEntry, site: URL): string {
    const loc = absoluteUrl(entry.path, site);
    const alternateLinks = locales
        .filter((locale) => entry.alternates[locale])
        .map((locale) => {
            const href = absoluteUrl(entry.alternates[locale]!, site);
            return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(href)}" />`;
        });
    const xDefault = entry.alternates.uz ?? entry.alternates.en ?? entry.alternates.ru;

    if (xDefault) {
        alternateLinks.push(
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(
                absoluteUrl(xDefault, site),
            )}" />`,
        );
    }

    return [
        "  <url>",
        `    <loc>${escapeXml(loc)}</loc>`,
        `    <lastmod>${entry.lastmod}</lastmod>`,
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority}</priority>`,
        ...alternateLinks,
        "  </url>",
    ].join("\n");
}

export async function GET(context: APIContext) {
    const site = context.site ?? new URL("https://blog.ecofin.uz");
    const posts = await getCollection("blog");
    const entries: SitemapEntry[] = [];

    for (const locale of locales) {
        entries.push({
            path: getLocalizedHomeLinks()[locale],
            lastmod: today,
            changefreq: "daily",
            priority: "1.0",
            alternates: getLocalizedHomeLinks(),
        });
    }

    for (const authorKey of Object.keys(authors) as AuthorKey[]) {
        const alternates = getLocalizedAuthorLinks(authorKey);

        for (const locale of locales) {
            entries.push({
                path: alternates[locale],
                lastmod: today,
                changefreq: "weekly",
                priority: "0.4",
                alternates,
            });
        }
    }

    for (const categoryKey of Object.keys(categories) as CategoryKey[]) {
        const alternates = getLocalizedCategoryLinks(categoryKey);

        for (const locale of locales) {
            entries.push({
                path: alternates[locale],
                lastmod: today,
                changefreq: "daily",
                priority: "0.6",
                alternates,
            });
        }
    }

    for (const post of posts) {
        const locale = post.id.split("/")[0] as Locale;
        const alternates = getAvailablePostLanguageLinks(post, posts);

        entries.push({
            path: getPostHref(post),
            lastmod: getPostLastmod(post),
            changefreq: "weekly",
            priority: "0.8",
            alternates: {
                [locale]: getPostHref(post),
                ...alternates,
            },
        });
    }

    const body = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        ...entries
            .sort((a, b) => a.path.localeCompare(b.path, "en", { numeric: true }))
            .map((entry) => renderUrl(entry, site)),
        "</urlset>",
    ].join("\n");

    return new Response(body, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
        },
    });
}
