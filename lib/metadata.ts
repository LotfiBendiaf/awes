import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function createMetadata(title: string, description: string, path: string): Metadata {
  const canonical = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: siteConfig.name, locale: "fr_DZ", type: "website" },
    twitter: { card: "summary", title, description },
  };
}
