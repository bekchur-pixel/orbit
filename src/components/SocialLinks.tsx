import { socials } from "@/lib/data";
import { InstagramIcon, YouTubeIcon, TikTokIcon, ExternalLinkIcon } from "./Icons";

const iconMap = {
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
  tiktok: TikTokIcon,
};

export default function SocialLinks() {
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      {socials.map((s) => {
        const Icon = iconMap[s.icon];
        return (
          <a
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
          >
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-lg`}
            >
              <Icon className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-white/60">{s.label}</p>
              <p className="truncate text-base font-semibold text-white">{s.handle}</p>
            </div>
            <ExternalLinkIcon className="h-5 w-5 text-white/40 transition-colors group-hover:text-white" />
            <span
              className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10 bg-gradient-to-br ${s.color}`}
            />
          </a>
        );
      })}
    </div>
  );
}
