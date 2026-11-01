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
- `socials`: sosyal medya linkleri
- `instagramPosts`: Instagram gönderi linkleri + görseller (duvar için)
- `featuredYouTubeVideoId`: öne çıkan YouTube video id'si
- `beholdFeedId` veya `NEXT_PUBLIC_BEHOLD_FEED_ID`: gerçek Instagram akışı (https://behold.so)

## Instagram Akışı

Gerçek bir Instagram duvarı için [Behold.so](https://behold.so) kullanabilirsiniz (ücretsiz plan mevcut):

1. Behold'da bir feed oluşturun ve Instagram hesabınızı bağlayın.
2. Feed id'sini `.env.local` dosyasına `NEXT_PUBLIC_BEHOLD_FEED_ID=...` olarak ekleyin.
3. Alternatif olarak `src/lib/data.ts` içindeki `instagramPosts` dizisine gönderi linklerini ve görsel URL'lerini ekleyin.

## Dağıtım (Vercel)

1. Bu repoyu GitHub'a push edin.
2. Vercel'de "New Project" → repoyu seçin.
3. Environment Variables bölümüne `NEXT_PUBLIC_BEHOLD_FEED_ID` ve `NEXT_PUBLIC_SITE_URL` ekleyin.
4. Deploy.

## Logo

Logo `public/orbit-logo.png` konumundadır. Değiştirmek için aynı adla yeni dosya koyun.
