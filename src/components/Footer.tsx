export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 py-8 text-center text-sm text-white/50">
      <p>
        © {new Date().getFullYear()} Orbit Goal. Tüm hakları saklıdır.
      </p>
      <p className="mt-1 text-xs text-white/30">
        Next.js ile oluşturuldu • Vercel üzerinde barındırılıyor
      </p>
    </footer>
  );
}
