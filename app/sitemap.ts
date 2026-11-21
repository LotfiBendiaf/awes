import type { MetadataRoute } from "next"; import { siteConfig } from "@/config/site"; import { navigation } from "@/data/site";
export default function sitemap(): MetadataRoute.Sitemap { return navigation.map(({ href }, index) => ({ url: `${siteConfig.url}${href}`, changeFrequency: "monthly", priority: index === 0 ? 1 : 0.8 })); }
