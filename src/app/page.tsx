import Hero from "@/components/Hero";
import SocialLinks from "@/components/SocialLinks";
import YouTubeSection from "@/components/YouTubeSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0f] text-white">
      {/* Background grid */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1a1033_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(255,255,255,0.04)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(255,255,255,0.04)_1px,_transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <Hero />

      <section id="channels" className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-6 pb-12">
        <h2 className="text-2xl font-bold text-white">Kanallarım</h2>
        <SocialLinks />
      </section>

      <section className="mx-auto w-full max-w-3xl px-6 pb-20">
        <YouTubeSection />
      </section>

      <Footer />
    </main>
  );
}
