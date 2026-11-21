import type { Metadata } from "next"; import { PolePage } from "@/components/services/pole-page"; import { getPole } from "@/data/site"; import { createMetadata } from "@/lib/metadata";
export const metadata: Metadata = createMetadata("Accompagner le projet", "Diagnostic, études, stratégie et accompagnement pour concrétiser votre projet.", "/accompagner-projet");
export default function Page(){ return <PolePage pole={getPole("projet")} />; }
