// Editable site content. Update these values to personalize the page.
export const site = {
  name: "Orbit Goal",
  handle: "@orbitgoall",
  tagline: "İçerik, güncellemeler ve daha fazlası için takipte kal.",
  bio: "Resmi profil sayfası. Tüm sosyal medya kanallarımıza buradan ulaşabilirsin.",
  logo: "/orbit-logo.png",
};

export const socials = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@orbitgoall",
    href: "https://www.instagram.com/orbitgoall/",
    color: "from-pink-500 via-red-500 to-yellow-500",
    icon: "instagram" as const,
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "@orbitgoall",
    href: "https://www.youtube.com/@orbitgoall",
    color: "from-red-600 to-red-500",
    icon: "youtube" as const,
  },
];

// Optional: paste Instagram post permalinks + image URLs here to build the feed wall.
// Leave empty to show the placeholder grid with a "follow" CTA.
export type IgPost = { url: string; image?: string; caption?: string };
export const instagramPosts: IgPost[] = [];

// Optional: set a featured YouTube video id (the part after v=) to embed it.
export const featuredYouTubeVideoId = "";

// Optional Behold.so feed id (https://behold.so) for a real Instagram wall.
// Set via env NEXT_PUBLIC_BEHOLD_FEED_ID instead, or here.
export const beholdFeedId = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID ?? "";
