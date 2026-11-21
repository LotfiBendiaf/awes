import type { Metadata } from "next"; import { PolePage } from "@/components/services/pole-page"; import { getPole } from "@/data/site"; import { createMetadata } from "@/lib/metadata";
export const metadata: Metadata = createMetadata("Gérer et financer l’activité", "Pilotage, exploitation, investissement et expertise pour les activités existantes.", "/gerer-financer");
export default function Page(){ return <PolePage pole={getPole("gestion")} />; }
