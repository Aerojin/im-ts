import zh from "./zh";
import ru from "./ru";
import en from "./ru";

const cache: any = { locale: "" };
const KEY = "__deltrix__locale__";
const getI18nText = (key: string): string => {
  const value = getLocale();

  if (value === "cn") {
    return zh[key] || "";
  }

  if (value === "en") {
    return en[key] || "";
  }

  if (value === "ru") {
    return ru[key] || "";
  }

  return zh[key] || "";
};

const setLocale = (locale: string = "cn") => {
  localStorage.setItem(KEY, locale || "cn");
  cache.locale = undefined;
};

const getLocale = (): string => {
  if (!cache.locale) {
    cache.locale = localStorage.getItem(KEY) || "cn";
  }
  return cache.locale;
};

export { setLocale, getLocale, getI18nText };
