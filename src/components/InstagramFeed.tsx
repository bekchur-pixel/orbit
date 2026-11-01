"use client";

import { useEffect } from "react";
import { beholdFeedId, instagramPosts } from "@/lib/data";
import { InstagramIcon } from "./Icons";

export default function InstagramFeed() {
  // Behold.so real feed
  if (beholdFeedId) {
    return (
      <div className="w-full">
        <div className="behold-widget" data-behold-id={beholdFeedId} />
        <ScriptLoader src="https://w.behold.so/widget.js" />
      </div>
    );
  }

  // Manual posts
  if (instagramPosts.length > 0) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {instagramPosts.map((p, i) => (
          <a
            key={i}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/5"
          >
            {p.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.image}
                alt={p.caption ?? "Instagram post"}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-yellow-500/20">
                <InstagramIcon className="h-8 w-8 text-white/40" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        ))}
      </div>
    );
  }

  // Placeholder wall
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/5"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-yellow-500/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <InstagramIcon className="h-7 w-7 text-white/20" />
          </div>
        </div>
      ))}
      <div className="col-span-2 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/20 bg-white/5 p-6 text-center sm:col-span-3">
        <InstagramIcon className="h-8 w-8 text-pink-400" />
        <p className="text-sm text-white/70">
          Instagram gönderilerin burada görünmesi için{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">src/lib/data.ts</code>{" "}
          dosyasına gönderi linklerini ekleyin veya Behold.so feed id tanımlayın.
        </p>
        <a
          href="https://www.instagram.com/orbitgoall/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
        >
          Instagram&apos;da Takip Et
        </a>
      </div>
    </div>
  );
}

function ScriptLoader({ src }: { src: string }) {
  useEffect(() => {
    if (document.querySelector(`script[src="${src}"]`)) return;
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    document.body.appendChild(s);
  }, [src]);
  return null;
}
