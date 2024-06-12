import { type Pathnames } from "next-intl/navigation";

export const defaultLocale = "es";
export const locales = ["en", "es"] as const;

export const pathnames = {
  "/": "/",
  "/pathnames": {
    en: "/pathnames",
    es: "/rutas",
  },
} satisfies Pathnames<typeof locales>;

export const localePrefix = undefined;
