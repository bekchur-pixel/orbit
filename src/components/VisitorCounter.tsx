"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function VisitorCounter() {
  const { t, lang } = useLanguage();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/visits")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && typeof d?.count === "number") setCount(d.count);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  const text = t("visitorCount").replace(
    "{n}",
    count.toLocaleString(lang === "tr" ? "tr-TR" : "en-US")
  );

  return <p className="mt-2 text-xs text-white/40">{text}</p>;
}
