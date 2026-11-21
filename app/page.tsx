import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { Hero } from "@/components/sections/hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { Cta } from "@/components/sections/cta";
import { PoleCard } from "@/components/services/pole-card";
import { poles, processSteps } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata("AWES - Accompagnement et conseil pour vos projets", "AWES accompagne les porteurs de projets, entreprises, startups et investisseurs avec des solutions concrètes.", "/");
export default function Home() {
  return <main><Hero kicker="Accompagnement · Conseil · Commerce extérieur" title={<>Un partenaire d’exception pour <em>donner vie</em> à vos projets.</>} description="AWES accompagne les porteurs de projets, entreprises, startups et investisseurs avec une approche rigoureuse, humaine et orientée vers des résultats concrets." actions={<><ButtonLink href="/simulateur">Faire le test</ButtonLink><ButtonLink href="#poles" variant="outline">Découvrir nos pôles</ButtonLink><ButtonLink href="/contact" variant="light">Prendre rendez-vous</ButtonLink></>} metrics={[{ value: "04", label: "Pôles d’expertise" }, { value: "10", label: "Axes d’accompagnement" }, { value: "01", label: "Interlocuteur dédié" }, { value: "100%", label: "Approche personnalisée" }]} />
    <section className="cream" id="poles"><div className="container"><SectionHeading eyebrow="Nos pôles d’expertise" title="Un accompagnement complet, à chaque étape de votre projet." lead="AWES réunit quatre pôles d’expertise pour comprendre, valider, réaliser, gérer, financer, former et développer vos projets." /><div className="pole-grid">{poles.map((pole) => <PoleCard pole={pole} key={pole.id} />)}</div></div></section>
    <section><div className="container"><SectionHeading eyebrow="Notre méthode" title="Une approche claire, humaine et orientée résultats." /><div className="process-grid">{processSteps.map((step, index) => <article className="process-step" key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section><Cta /></main>;
}
