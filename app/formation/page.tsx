import type { Metadata } from "next"; import { PolePage } from "@/components/services/pole-page"; import { getPole } from "@/data/site"; import { createMetadata } from "@/lib/metadata";
export const metadata: Metadata = createMetadata("Se développer et se former", "Des formations pratiques pour développer les compétences des entrepreneurs et des équipes.", "/formation");
export default function Page(){ return <PolePage pole={getPole("formation")} />; }
