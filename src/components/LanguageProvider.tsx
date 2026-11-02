"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "tr" | "en";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export const translations: Record<Lang, Record<string, string>> = {
  tr: {
    tagline: "İçerik, güncellemeler ve daha fazlası için takipte kal.",
    bio: "Resmi profil sayfası. Tüm sosyal medya kanallarımıza buradan ulaşabilirsin.",
    channels: "Kanallarım",
    subscribe: "Abone Ol",
    watchVideos: "Videoları İzle",
    footerRights: "Tüm hakları saklıdır.",
    footerBuilt: "Next.js ile oluşturuldu • Vercel üzerinde barındırılıyor",
    visitorCount: "Bu sayfa {n} kez ziyaret edilmiştir.",
    langLabel: "EN",
  },
  en: {
    tagline: "Stay tuned for content, updates and more.",
    bio: "Official profile page. Reach all my social media channels here.",
    channels: "My Channels",
    subscribe: "Subscribe",
    watchVideos: "Watch Videos",
    footerRights: "All rights reserved.",
    footerBuilt: "Built with Next.js • Hosted on Vercel",
    visitorCount: "This page has been visited {n} times.",
    langLabel: "TR",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");

  useEffect(() => {
    const stored = window.localStorage.getItem("lang");
    if (stored === "tr" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("lang", l);
  };

  const t = (key: string) => translations[lang][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
