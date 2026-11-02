# Orbit Goal — Profil Sayfası

Next.js (App Router) ile oluşturulmuş profil tanıtma sayfası. Instagram ve YouTube kanallarını tek bir yerde sunar.

## Geliştirme

```bash
npm install
npm run dev
```

Aç: http://localhost:3000

## Özelleştirme

Tüm içerik `src/lib/data.ts` dosyasından düzenlenir:

- `site`: isim, handle, tagline, bio
- `socials`: sosyal medya linkleri (Instagram, YouTube)
- `featuredYouTubeVideoId`: öne çıkan YouTube video id'si

## Dağıtım (Vercel)

1. Bu repoyu GitHub'a push edin.
2. Vercel'de "New Project" → repoyu seçin.
3. Environment Variables bölümüne `NEXT_PUBLIC_BEHOLD_FEED_ID` ve `NEXT_PUBLIC_SITE_URL` ekleyin.
4. Deploy.

## Logo

Logo `public/orbit-logo.png` konumundadır. Değiştirmek için aynı adla yeni dosya koyun.
