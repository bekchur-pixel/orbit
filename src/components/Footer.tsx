"use client";

import VisitorCounter from "./VisitorCounter";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="w-full border-t border-white/10 py-8 text-center text-sm text-white/50">
      <p>
        © {new Date().getFullYear()} Orbit Goal. {t("footerRights")}
      </p>
      <p className="mt-1 text-xs text-white/30">{t("footerBuilt")}</p>
      <VisitorCounter />
    </footer>
  );
}
