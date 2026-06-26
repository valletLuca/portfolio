"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "fr" | "en";

/** Toute chaîne de contenu existe en français et en anglais. */
export type Localized = {
  fr: string;
  en: string;
};

type LangContextValue = {
  lang: Lang;
  toggle: () => void;
};

const STORAGE_KEY = "luca-exe-lang";

const LangContext = createContext<LangContextValue>({
  lang: "fr",
  toggle: () => undefined,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = useCallback(() => {
    setLang((current) => {
      const next: Lang = current === "fr" ? "en" : "fr";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}

/** Sélectionne la bonne variante d'une chaîne localisée. */
export function pick(text: Localized, lang: Lang): string {
  return text[lang];
}
