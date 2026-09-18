import type { Metadata } from "next";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "The Nine-Colored Deer — A Promise in the Desert",
  description:
    "An interactive retelling inspired by the Nine-Colored Deer murals of Dunhuang, pairing ancient mineral-pigment imagery with modern editorial web design.",
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  openGraph: {
    type: "website",
    title: "The Nine-Colored Deer",
    description: "A Promise in the Desert — an interactive Dunhuang-inspired tale.",
    images: [
      {
        url: "/assets/nine-colored-deer/desert-2048.webp",
        width: 2048,
        height: 768,
        alt: "A mineral-pigment desert landscape inspired by Dunhuang murals",
      },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
