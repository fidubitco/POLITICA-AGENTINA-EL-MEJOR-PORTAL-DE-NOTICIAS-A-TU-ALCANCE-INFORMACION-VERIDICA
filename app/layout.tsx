import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OrganizationLD, WebSiteLD } from "@/components/seo/json-ld";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://politica-argentina.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "POLÍTICA ARGENTINA - Noticias en tiempo real", template: "%s | POLÍTICA ARGENTINA" },
  description: "El portal de noticias más completo de Argentina. Información verificada y actualizada las 24 horas del día.",
  keywords: ["argentina", "política", "noticias", "economía", "sociedad", "actualidad"],
  authors: [{ name: "POLÍTICA ARGENTINA" }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "POLÍTICA ARGENTINA",
    title: "POLÍTICA ARGENTINA - Noticias en tiempo real",
    description: "El portal de noticias más completo de Argentina",
    images: [`${siteUrl}/logo.svg`],
  },
  twitter: {
    card: "summary_large_image",
    site: "@politica_arg",
    creator: "@politica_arg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <OrganizationLD
          name="POLÍTICA ARGENTINA"
          url={siteUrl}
          logo={`${siteUrl}/logo.svg`}
          social={[
            "https://facebook.com/politica-argentina",
            "https://twitter.com/politica_arg",
            "https://instagram.com/politica_arg",
          ]}
        />
        <WebSiteLD
          name="POLÍTICA ARGENTINA"
          url={siteUrl}
          description="El portal de noticias más completo de Argentina"
        />
      </body>
    </html>
  );
}
