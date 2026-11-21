const defaultSiteUrl = "http://localhost:3000";

export const siteConfig = {
  name: "AWES",
  description: "Centre d’accompagnement, de conseil et de développement de projets pour les porteurs de projets, entreprises, startups et investisseurs.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl).replace(/\/$/, ""),
  contact: {
    phone: process.env.NEXT_PUBLIC_AWES_PHONE || null,
    whatsapp: process.env.NEXT_PUBLIC_AWES_WHATSAPP || null,
    email: process.env.NEXT_PUBLIC_AWES_EMAIL || null,
    address: process.env.NEXT_PUBLIC_AWES_ADDRESS || null,
    hours: process.env.NEXT_PUBLIC_AWES_HOURS || null,
  },
} as const;
