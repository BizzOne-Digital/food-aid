import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import { Toaster } from "sonner";
import { getSettings } from "@/lib/content";
import { resolveImageUrl } from "@/lib/image";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-caveat", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: s.seoTitle, template: `%s | ${s.businessName}` },
    description: s.seoDescription,
    applicationName: s.businessName,
    alternates: { canonical: "/" },
    robots: { index: true, follow: true },
    ...(s.faviconUrl ? { icons: { icon: resolveImageUrl(s.faviconUrl) } } : {}),
    openGraph: {
      type: "website",
      locale: "en_CA",
      siteName: s.businessName,
      title: s.seoTitle,
      description: s.seoDescription,
      url: "/",
      images: s.seoImage ? [{ url: resolveImageUrl(s.seoImage), width: 1200, height: 630, alt: s.businessName }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: s.seoTitle,
      description: s.seoDescription,
      images: s.seoImage ? [resolveImageUrl(s.seoImage)] : undefined,
    },
  };
}

export const viewport: Viewport = { themeColor: "#e50914", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${jakarta.variable} ${caveat.variable}`}>
      <body>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
