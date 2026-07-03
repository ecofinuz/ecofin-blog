import type { CollectionEntry } from "astro:content";
import type { CategoryKey, Locale } from "@data/categories";
import { categories, getCategoryDetailsFromSlug } from "@data/categories";

export type LanguageLinks = Record<Locale, string>;

const locales = ["uz", "en", "ru"] as const satisfies readonly Locale[];

type BlogPost = CollectionEntry<"blog">;

function getLocalePrefix(locale: Locale): string {
    return locale === "uz" ? "" : `/${locale}`;
}

function getLocalizedPath(locale: Locale, segments: string[] = []): string {
    const prefix = getLocalePrefix(locale);

    if (segments.length === 0) {
        return `${prefix}/`;
    }

    return `${prefix}/${segments.join("/")}/`;
}

function isLocale(value: string): value is Locale {
    return (locales as readonly string[]).includes(value);
}

function getPostLocale(post: BlogPost): Locale {
    const [locale] = post.id.split("/");

    return isLocale(locale) ? locale : "uz";
}

export function getPostHref(post: BlogPost): string {
    const locale = getPostLocale(post);
    const [, categorySlug, postSlug] = post.id.split("/");
    const category = getCategoryDetailsFromSlug(categorySlug, locale);

    return getLocalizedPath(locale, [category.slug, postSlug]);
}

export function getLocalizedHomeLinks(): LanguageLinks {
    return {
        uz: "/",
        en: "/en/",
        ru: "/ru/",
    };
}

export function getLocalizedAuthorLinks(author: string): LanguageLinks {
    return {
        uz: getLocalizedPath("uz", ["author", author]),
        en: getLocalizedPath("en", ["author", author]),
        ru: getLocalizedPath("ru", ["author", author]),
    };
}

export function getLocalizedCategoryLinks(categoryKey: CategoryKey): LanguageLinks {
    return {
        uz: getLocalizedPath("uz", [categories[categoryKey].uz.slug]),
        en: getLocalizedPath("en", [categories[categoryKey].en.slug]),
        ru: getLocalizedPath("ru", [categories[categoryKey].ru.slug]),
    };
}

export function getLocalizedPostLinks(
    post: BlogPost,
    allPosts: BlogPost[],
): LanguageLinks {
    const locale = getPostLocale(post);
    const [, categorySlug] = post.id.split("/");
    const category = getCategoryDetailsFromSlug(categorySlug, locale);
    const fallbackLinks = category.key
        ? getLocalizedCategoryLinks(category.key)
        : getLocalizedHomeLinks();

    return locales.reduce((links, targetLocale) => {
        const translatedPost = allPosts.find(
            (candidate) =>
                candidate.data.translationKey === post.data.translationKey &&
                candidate.id.startsWith(`${targetLocale}/`),
        );

        links[targetLocale] = translatedPost
            ? getPostHref(translatedPost)
            : fallbackLinks[targetLocale];

        return links;
    }, {} as LanguageLinks);
}

export function getAvailablePostLanguageLinks(
    post: BlogPost,
    allPosts: BlogPost[],
): Partial<LanguageLinks> {
    return locales.reduce((links, targetLocale) => {
        const translatedPost = allPosts.find(
            (candidate) =>
                candidate.data.translationKey === post.data.translationKey &&
                candidate.id.startsWith(`${targetLocale}/`),
        );

        if (translatedPost) {
            links[targetLocale] = getPostHref(translatedPost);
        }

        return links;
    }, {} as Partial<LanguageLinks>);
}
