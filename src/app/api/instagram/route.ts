import { NextResponse } from "next/server";

export const revalidate = 3600; // cache for 1 hour

const USERNAME = "orbitgoall";
const MAX_POSTS = 12;

type IgPost = { url: string; image: string; caption: string };

// Strategy 1: Official Instagram Graph API (reliable, requires access token)
async function fetchFromGraphAPI(token: string): Promise<IgPost[]> {
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&limit=${MAX_POSTS}&access_token=${encodeURIComponent(token)}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`graph_api ${res.status}`);
  const json = await res.json();
  const data = Array.isArray(json?.data) ? json.data : [];
  return data.slice(0, MAX_POSTS).map((m: any) => ({
    url: m.permalink,
    image: m.media_type === "VIDEO" ? m.thumbnail_url || m.media_url : m.media_url,
    caption: m.caption ?? "",
  }));
}

// Strategy 2: Best-effort scrape of public profile (may be blocked by IG)
async function fetchFromWebProfile(): Promise<IgPost[]> {
  const url = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${USERNAME}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "X-IG-App-ID": "936619743392459",
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      Referer: `https://www.instagram.com/${USERNAME}/`,
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`web_profile_info ${res.status}`);
  const json = await res.json();
  const edges = json?.data?.user?.edge_owner_to_timeline_media?.edges ?? [];
  return edges.slice(0, MAX_POSTS).map((e: any) => {
    const node = e.node;
    const caption =
      node?.edge_media_to_caption?.edges?.[0]?.node?.text ?? "";
    return {
      url: `https://www.instagram.com/p/${node.shortcode}/`,
      image: node.display_url || node.thumbnail_src,
      caption,
    };
  });
}

export async function GET() {
  // 1) Official Graph API if token provided
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (token) {
    try {
      const posts = await fetchFromGraphAPI(token);
      if (posts.length > 0) {
        return NextResponse.json({ posts, source: "graph_api" });
      }
    } catch (err) {
      // fall through to scrape
    }
  }

  // 2) Best-effort scrape
  try {
    const posts = await fetchFromWebProfile();
    if (posts.length > 0) {
      return NextResponse.json({ posts, source: "instagram" });
    }
    return NextResponse.json({ posts: [], source: "empty" });
  } catch (err) {
    return NextResponse.json(
      { posts: [], source: "error", error: String(err) },
      { status: 200 }
    );
  }
}
