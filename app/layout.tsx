import type { Metadata } from "next";
import { headers } from "next/headers";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", baseUrl).toString();

  return {
    metadataBase: baseUrl,
    title: {
      default: "GlobalBrief AI — Communication Planning Portfolio Project",
      template: "%s | GlobalBrief AI",
    },
    description:
      "An independent portfolio project for evidence-based public information planning, stakeholder engagement, accessible communication and responsible AI-supported drafting.",
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
    },
    openGraph: {
      type: "website",
      title: "GlobalBrief AI — Communication Planning Portfolio Project",
      description: "Evidence-based public information planning, stakeholder engagement and responsible AI-supported drafting.",
      images: [{ url: socialImage, width: 1731, height: 909, alt: "GlobalBrief AI social preview" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "GlobalBrief AI — Communication Planning Portfolio Project",
      description: "Evidence-based public information planning, stakeholder engagement and responsible AI-supported drafting.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}
