export type AuthorKey = "hojiakbar";

export type Locale = "uz" | "en" | "ru";

export interface Author {
    name: string;
    bio: Record<Locale, string>;
    articleBio: Record<Locale, string>;
    avatar: string;
    links: {
        telegram?: string;
        medium?: string;
        linkedin?: string;
        instagram?: string;
        x?: string;
        twitter?: string;
        bluesky?: string;
        mastodon?: string;
    };
}

export const authors: Record<AuthorKey, Author> = {
    hojiakbar: {
        name: "Hojiakbar Barotov",
        bio: {
            uz: "Ekofin asoschisi. Westminster Universiteti Moliya bakalavriati. Moliya, iqtisod, va texnologiyalar haqida interaktiv tarzda yozaman. ",
            en: "Founder of Ecofin. Bachelor of Finance at Westminster University. I write interactively on finance, economics, and technology.",
            ru: "Основатель Ecofin. Имею степень бакалавра в области финансов Вестминстерского университета. Я веду интерактивные публикации на темы финансов, экономики и технологий.",
        },
        articleBio: {
            uz: "Ecofin asoschisi va muallifi. Shaxsiy moliya, kredit, bank ishi va iqtisod haqida sodda tilda yozadi.",
            en: "Founder and author of Ecofin. Writing about personal finance, credit, banking, and economics in simple language.",
            ru: "Основатель и автор Ecofin. Пишет простым языком о личных финансах, кредитах, банках и экономике.",
        },
        avatar: "/authors/hojiakbar.webp",
        links: {
            telegram: "https://t.me/hmbarotov",
            medium: "https://medium.com/@hmbarotov",
            linkedin: "https://linkedin.com/in/hojiakbar-barotov",
        },
    },
};

export function getAuthor(key: AuthorKey) {
    return authors[key];
}
