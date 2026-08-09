export const supportedLocales = ["en", "fr", "zh"] as const;

export type Locale = (typeof supportedLocales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  zh: "中文",
};

export const localeCodes: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  zh: "中文",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return supportedLocales.includes(value as Locale);
}
