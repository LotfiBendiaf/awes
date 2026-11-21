import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "AWES — Accompagnement et conseil", template: "%s | AWES" },
  description: siteConfig.description,
  applicationName: "AWES",
  icons: { icon: "/AWES_Icon.svg", shortcut: "/AWES_Icon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const structuredData = { "@context": "https://schema.org", "@type": "Organization", name: "AWES", url: siteConfig.url, description: siteConfig.description };
  return <html lang="fr" className={`${inter.variable} ${playfair.variable}`}><body><a className="skip-link" href="#main-content">Aller au contenu</a><SiteHeader /><div id="main-content">{children}</div><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /></body></html>;
}
