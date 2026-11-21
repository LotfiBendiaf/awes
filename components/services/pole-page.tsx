import { Hero } from "@/components/sections/hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard } from "./service-card";
import { ButtonLink } from "@/components/ui/button-link";
import type { Pole } from "@/types/site";

export function PolePage({ pole }: { pole: Pole }) {
  return <main><Hero kicker={`Pôle ${String(pole.number).padStart(2, "0")}`} title={`${pole.name}.`} description={pole.hero} actions={<><ButtonLink href="/simulateur">Faire le test</ButtonLink><ButtonLink href={`/contact?pole=${pole.id}`} variant="outline">Prendre rendez-vous</ButtonLink></>} /><section className="cream"><div className="container"><SectionHeading eyebrow={pole.services.length === 1 ? "Axe d’accompagnement" : "Axes d’accompagnement"} title={pole.sectionTitle} /><div className={`service-grid ${pole.services.length === 1 ? "single" : ""}`}>{pole.services.map((service) => <ServiceCard key={service.id} service={service} />)}</div></div></section></main>;
}
