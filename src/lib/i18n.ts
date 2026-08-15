export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale { return locales.includes(value as Locale); }
export const internalLocale = (locale: Locale) => locale === "pt" ? "pt-BR" : "en";
export const siteUrl = () => process.env.SITE_URL || "http://localhost:3000";
export const localPath = (locale: Locale, path = "") => `/${locale}${path}`;
