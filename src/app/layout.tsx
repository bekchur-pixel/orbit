import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://orbitgoall.vercel.app"),
  title: "Orbit Goal — Resmi Profil",
  description:
    "Orbit Goal resmi profil sayfası. Instagram ve YouTube kanallarına buradan ulaşın.",
  icons: {
    icon: "/orbit-logo.png",
    apple: "/orbit-logo.png",
  },
  openGraph: {
    title: "Orbit Goal",
    description: "Instagram ve YouTube kanallarımı takip et.",
    images: ["/orbit-logo.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbit Goal",
    description: "Instagram ve YouTube kanallarımı takip et.",
    images: ["/orbit-logo.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
