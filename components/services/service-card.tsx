import { ButtonLink } from "@/components/ui/button-link";
import type { Service } from "@/types/site";

export function ServiceCard({ service }: { service: Service }) {
  const contactHref = `/contact?service=${encodeURIComponent(service.id)}`;
  return <article className="service-card" id={service.id}><h3>{service.number}. {service.title}</h3><p>{service.summary}</p><ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul><ButtonLink href={contactHref}>Demander ce service</ButtonLink></article>;
}
