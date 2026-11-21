import type { Metadata } from "next"; import { PolePage } from "@/components/services/pole-page"; import { getPole } from "@/data/site"; import { createMetadata } from "@/lib/metadata";
export const metadata: Metadata = createMetadata("Commerce extérieur", "Import, export, sourcing et développement commercial à l’international avec AWES.", "/commerce-exterieur");
export default function Page(){ return <PolePage pole={getPole("commerce")} />; }
