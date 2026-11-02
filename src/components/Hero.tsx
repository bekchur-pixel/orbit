import Image from "next/image";
import { site } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center px-6 py-12 text-center">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-pink-500/30 via-purple-500/20 to-blue-500/30 blur-3xl" />
      </div>

      <div className="relative">
        <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border-4 border-white/20 shadow-2xl ring-4 ring-pink-500/20 sm:h-44 sm:w-44">
          <Image
            src={site.logo}
            alt={site.name}
            fill
            priority
            sizes="176px"
            className="object-cover"
          />
        </div>
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
          Official
        </span>
      </div>

      <h1 className="mt-8 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
        {site.name}
      </h1>
      <p className="mt-2 text-lg font-medium text-pink-300 sm:text-xl">{site.handle}</p>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
        {site.tagline}
      </p>
      <p className="mt-2 max-w-xl text-sm text-white/50">{site.bio}</p>

    </section>
  );
}
