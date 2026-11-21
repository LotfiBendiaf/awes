import { ButtonLink } from "@/components/ui/button-link";
import type { Pole } from "@/types/site";

export function PoleCard({ pole }: { pole: Pole }) {
  return <article className="pole-card"><span className="card-number" aria-hidden="true">{String(pole.number).padStart(2, "0")}</span><div className="gold-line" /><h3>{pole.name}</h3><p>{pole.description}</p><ButtonLink href={pole.href}>Découvrir le pôle</ButtonLink></article>;
}
