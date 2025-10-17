import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OrganizationLD, WebSiteLD } from "@/components/seo/json-ld";
import { Toaster } from "@/components/ui/toaster";

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
    <html lang="es" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="theme-color" content="#dc2626" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/service-worker.js')
                    .then(reg => console.log('SW registered:', reg))
                    .catch(err => console.log('SW registration failed:', err));
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
