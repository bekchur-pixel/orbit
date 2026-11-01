import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const res = await fetch(
      "https://abacus.jasoncameron.dev/hit/orbitgoall/profile",
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error(`abacus ${res.status}`);
    const json = await res.json();
    const count = typeof json?.value === "number" ? json.value : 0;
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: null });
  }
}
