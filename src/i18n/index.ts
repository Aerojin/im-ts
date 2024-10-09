import zh from "./zh";
import ru from "./ru";

let locale: string;
const getI18nText = (key: string): string => {
  const value = getLocale();

  if (value === "zh") {
    return zh[key] || "";
  }

  if(value === 'ru') {
    return ru[key] || "";
  }

  return zh[key] || "";
};

const setLocale = (locale: string = "zh") => {
  localStorage.setItem("__deltrix__locale__", locale || "zh");
};

const getLocale = (): string => {
  if (!locale) {
    locale = localStorage.getItem("__deltrix__locale__") || "zh";
  }

  return locale;
};

export { setLocale, getLocale, getI18nText };
