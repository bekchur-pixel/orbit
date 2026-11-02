"use client";

import { featuredYouTubeVideoId } from "@/lib/data";
import { YouTubeIcon, ExternalLinkIcon } from "./Icons";
import { useLanguage } from "./LanguageProvider";

export default function YouTubeSection() {
  const { t } = useLanguage();
  return (
    <section className="w-full max-w-3xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">YouTube</h2>
        <a
          href="https://www.youtube.com/@orbitgoall?sub_confirmation=1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-1.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
        >
          <YouTubeIcon className="h-4 w-4" />
          {t("subscribe")}
        </a>
      </div>

      {featuredYouTubeVideoId ? (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
          <div className="relative aspect-video w-full">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${featuredYouTubeVideoId}`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : (
        <a
          href="https://www.youtube.com/@orbitgoall/videos"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/20 bg-white/5 p-10 text-center transition-colors hover:bg-white/10"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20 text-red-500">
            <YouTubeIcon className="h-8 w-8" />
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-400 group-hover:text-red-300">
            {t("watchVideos")} <ExternalLinkIcon className="h-4 w-4" />
          </span>
        </a>
      )}
    </section>
  );
}
