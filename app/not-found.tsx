import { ButtonLink } from "@/components/ui/button-link";
export default function NotFound(){ return <main className="not-found"><div className="container"><span className="eyebrow">Erreur 404</span><h1>Cette page n’existe pas.</h1><p>Le lien est peut-être ancien ou l’adresse a été saisie incorrectement.</p><ButtonLink href="/">Revenir à l’accueil</ButtonLink></div></main>; }
