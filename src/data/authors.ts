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
            uz: "Ekofin asoschisi. Westminster Universiteti Moliya bakalavriati. Moliya, iqtisod, va texnologiyalar haqida interaktiv tarzda yozaman. ",
            en: "Founder of Ecofin. Bachelor of Finance at Westminster University. I write interactively on finance, economics, and technology.",
            ru: "Основатель Ecofin. Имею степень бакалавра в области финансов Вестминстерского университета. Я веду интерактивные публикации на темы финансов, экономики и технологий.",
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
