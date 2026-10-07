import type { Metadata } from "next";
import "./globals.css";
import "./responsive.css";
import "./image-loading.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sabeera.vercel.app"),
  title: {
    default: "Sabeera Azmat | Junior SEO Specialist in Islamabad",
    template: "%s | Sabeera Azmat",
  },
  description:
    "Portfolio of Sabeera Azmat, a junior SEO specialist in Islamabad specializing in technical SEO, keyword research, content optimization, and visual design.",
  keywords: [
    "Sabeera Azmat",
    "Junior SEO Specialist",
    "SEO Specialist Islamabad",
    "Technical SEO",
    "Keyword Research",
    "Content Optimization",
    "On-Page SEO",
    "SEO Portfolio Pakistan",
  ],
  authors: [{ name: "Sabeera Azmat", url: "https://sabeera.vercel.app" }],
  creator: "Sabeera Azmat",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "/",
    siteName: "Sabeera Azmat Portfolio",
    title: "Sabeera Azmat | Junior SEO Specialist",
    description:
      "SEO strategy, technical optimization, content, and selected visual design work by Sabeera Azmat.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Sabeera Azmat - Junior SEO Specialist" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabeera Azmat | Junior SEO Specialist",
    description: "SEO strategy, technical optimization, content, and selected visual design work.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "portfolio",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-PK"><body>{children}</body></html>;
}
