export type AuthorKey = "hojiakbar" | "samandar";

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
            uz: "Ecofin asoschisi. Westminster Universitetida moliya yo'nalishida o'qigan. Shaxsiy moliya, kredit, bank ishi, iqtisod va moliyaviy vositalar haqida sodda tilda yozadi.",
            en: "Ecofin founder with a finance background from Westminster University. Writes about personal finance, credit, banking, economics, and financial tools in simple language.",
            ru: "Основатель Ecofin с финансовым образованием Вестминстерского университета. Пишет простым языком о личных финансах, кредитах, банках, экономике и финансовых инструментах.",
        },
        articleBio: {
            uz: "Ecofin muallifi. Shaxsiy moliya, kredit, bank ishi va iqtisod haqida sodda tilda yozadi.",
            en: "Ecofin author writing about personal finance, credit, banking, and economics in simple language.",
            ru: "Автор Ecofin. Пишет простым языком о личных финансах, кредитах, банках и экономике.",
        },
        avatar: "/authors/hojiakbar.webp",
        links: {
            telegram: "https://t.me/hmbarotov",
            medium: "https://medium.com/@hmbarotov",
            linkedin: "https://linkedin.com/in/hojiakbar-barotov",
        },
    },
    samandar: {
        name: "Samandar Shoquchqorov",
        bio: {
            uz: "Ecofin muallifi. Westminster Universitetining iqtisod yo'nalishini qizil diplomga tamomlagan. Hozirda Infinbank komplayns bo'limida ishlaydi.",
            en: "Ecofin author with an honours diploma of economics from Westminster University. Currently working at the Compliance department in Infinbank.",
            ru: "Автор Ecofin, обладатель диплома с отличием по экономике Вестминстерского университета. В настоящее время работает в отделе комплаенс банка «Инфинбанк».",
        },
        articleBio: {
            uz: "Ecofin muallifi. Shaxsiy moliya, kredit, bank ishi va iqtisod haqida sodda tilda yozadi.",
            en: "Ecofin author writing about personal finance, credit, banking, and economics in simple language.",
            ru: "Автор Ecofin. Пишет простым языком о личных финансах, кредитах, банках и экономике.",
        },
        avatar: "/authors/samandar.JPG",
        links: {
            telegram: "https://t.me/shokuchkorov",
            instagram: "https://www.instagram.com/samandarshokuchkorov",
            linkedin: "https://uz.linkedin.com/in/shoquchqorov",
        },
    },
};

export function getAuthor(key: AuthorKey) {
    return authors[key];
}
