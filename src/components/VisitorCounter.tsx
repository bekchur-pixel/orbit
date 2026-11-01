"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
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

  return (
    <p className="mt-2 text-xs text-white/40">
      Bu sayfa {count.toLocaleString("tr-TR")} kez ziyaret edilmiştir.
    </p>
  );
}
