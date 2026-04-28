export type AuthorKey = "hojiakbar";

export type Locale = "uz" | "en" | "ru";

export const authors: Record<
    AuthorKey,
    {
        name: string;
        bio: Record<Locale, string>;
        avatar: string;
        links: {
            telegram?: string;
            medium?: string;
            linkedin?: string;
            twitter?: string;
        };
    }
> = {
    hojiakbar: {
        name: "Hojiakbar Barotov",
        bio: {
            uz: "Moliyaviy savodxonlik haqida yozaman.",
            en: "I write about financial literacy.",
            ru: "Пишу о финансовой грамотности.",
        },
        avatar: "/authors/hojiakbar.jpg",
        links: {
            telegram: "https://t.me/hmbarotov",
            medium: "https://medium.com/@hmbarotov",
            linkedin: "https://linkedin.com/hojiakbar-barotov",
        },
    },
};

export function getAuthor(key: AuthorKey) {
    return authors[key];
}
