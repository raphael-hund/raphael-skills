import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin", "latin-ext"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin", "latin-ext"] });

const siteUrl = process.env.SITE_URL;
if (!siteUrl) throw new Error("SITE_URL fehlt (.env.local); Canonicals, Sitemap und robots brauchen die echte Domain.");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Ersetzen: Marke", template: "%s | Ersetzen: Marke" },
  description: "Ersetzen: Beschreibung aus PRODUCT.md",
  openGraph: { type: "website", locale: "de_CH", siteName: "Ersetzen: Marke" },
  other: { "theme-color": "#ffffff" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
