import type { Pole, RoutePath } from "@/types/site";

export const navigation: readonly { label: string; href: RoutePath }[] = [
  { label: "Accueil", href: "/" },
  { label: "Accompagner le projet", href: "/accompagner-projet" },
  { label: "Gérer & financer", href: "/gerer-financer" },
  { label: "Se former", href: "/formation" },
  { label: "Commerce extérieur", href: "/commerce-exterieur" },
  { label: "Simulateur", href: "/simulateur" },
  { label: "Contact", href: "/contact" },
];

export const poles: readonly Pole[] = [
  {
    id: "projet", number: 1, name: "Accompagner le projet", shortName: "Projet", href: "/accompagner-projet",
    description: "De l’idée à la réalisation : diagnostic, études, stratégie et accompagnement.",
    hero: "De l’idée à la réalisation : comprendre, valider, structurer et concrétiser votre projet avec une méthode claire.",
    sectionTitle: "Des solutions concrètes pour avancer.",
    services: [
      { id: "diagnostic-orientation", number: 1, title: "Diagnostic & Orientation", summary: "Comprendre votre situation et définir la bonne direction.", items: ["Diagnostic global de projet", "Analyse du besoin", "Étude d’opportunité", "Analyse de l’idée", "Identification des risques et opportunités", "Orientation stratégique", "Plan d’action prioritaire"] },
      { id: "etudes-validation", number: 2, title: "Études & Validation", summary: "Vérifier la viabilité avant d’engager votre budget.", items: ["Étude de marché", "Analyse de la demande", "Étude de faisabilité", "Analyse concurrentielle", "Étude socio-économique", "Étude de rentabilité", "Analyse des risques"] },
      { id: "strategie-business-plan", number: 3, title: "Stratégie & Business Plan", summary: "Structurer le projet et préparer son financement.", items: ["Business plan", "Modèle économique", "Stratégie commerciale", "Prévisionnel financier", "Plan de trésorerie", "Dossier investisseur", "Dossier bancaire"] },
      { id: "accompagnement-realisation", number: 4, title: "Accompagnement & Réalisation", summary: "Transformer le projet en actions concrètes.", items: ["Accompagnement à la création", "Pilotage de la réalisation", "Coordination des intervenants", "Suivi du planning et du budget", "Suivi qualité", "Projet clé en main"] },
    ],
  },
  {
    id: "gestion", number: 2, name: "Gérer et financer l’activité", shortName: "Gestion & financement", href: "/gerer-financer",
    description: "Pilotage, exploitation, investissement et accès aux experts.",
    hero: "Pour les projets déjà lancés, les entreprises existantes et les investisseurs.",
    sectionTitle: "Piloter, financer et développer votre activité.",
    services: [
      { id: "pilotage-exploitation", number: 5, title: "Pilotage & Exploitation", summary: "Assurer le fonctionnement et la performance de l’activité.", items: ["Gestion opérationnelle", "Suivi de l’activité", "Pilotage des équipes", "Suivi des fournisseurs", "Reporting et performances", "Gestion administrative", "Gestion déléguée"] },
      { id: "projets-investisseurs", number: 6, title: "Projets pour investisseurs", summary: "Accéder à des opportunités d’investissement sélectionnées.", items: ["Identification d’opportunités", "Sélection des projets", "Analyse préliminaire", "Préparation des dossiers", "Présentation aux investisseurs", "Mise en relation investisseur-porteur", "Suivi des projets financés"] },
      { id: "consultants-experts", number: 7, title: "Consultants & Experts", summary: "Mobiliser les compétences adaptées à votre besoin.", items: ["Stratégie", "Gestion et organisation", "Finance", "Marketing et communication", "Ressources humaines", "Juridique, fiscalité et comptabilité", "Digital", "Expertise sectorielle"] },
    ],
  },
  {
    id: "formation", number: 3, name: "Se développer et se former", shortName: "Formation", href: "/formation",
    description: "Renforcer les compétences des porteurs de projets et des équipes.",
    hero: "Renforcer les compétences des porteurs de projets, entrepreneurs et équipes d’entreprises.",
    sectionTitle: "Formation & Développement des compétences",
    services: [
      { id: "formation-competences", number: 8, title: "Formation & Développement des compétences", summary: "Des formations pratiques pour créer, gérer, vendre, digitaliser et développer une activité.", items: ["Entrepreneuriat", "Création d’entreprise", "Gestion et management", "Finance et comptabilité", "Marketing et vente", "Communication digitale", "Ressources humaines", "Import-export", "Formation sur mesure"] },
    ],
  },
  {
    id: "commerce", number: 4, name: "Commerce extérieur", shortName: "Commerce extérieur", href: "/commerce-exterieur",
    description: "Importer, exporter, sourcer et développer votre activité à l’international.",
    hero: "Un espace dédié à l’import, l’export, la recherche de fournisseurs et le développement commercial à l’international.",
    sectionTitle: "Des solutions pour réussir à l’international.",
    services: [
      { id: "import-sourcing", number: 9, title: "Import & Sourcing", summary: "Trouver, évaluer et importer les bons produits et équipements.", items: ["Import de produits et équipements", "Recherche de fournisseurs", "Sourcing de produits", "Négociation fournisseurs", "Analyse réglementaire et douanière", "Logistique internationale"] },
      { id: "export-developpement", number: 10, title: "Export & Développement international", summary: "Développer votre activité sur de nouveaux marchés.", items: ["Export de produits et services", "Recherche de marchés étrangers", "Recherche de clients", "Mise en relation commerciale", "Accompagnement import-export", "Partenariats commerciaux"] },
    ],
  },
];

export const allServices = poles.flatMap((pole) => pole.services.map((service) => ({ ...service, pole })));

export const processSteps = [
  { title: "Comprendre", text: "Nous écoutons votre besoin, votre projet et votre objectif." },
  { title: "Qualifier", text: "Le simulateur et un échange avec un conseiller identifient le bon accompagnement." },
  { title: "Construire", text: "Nous définissons les études, la stratégie et les actions nécessaires." },
  { title: "Réaliser", text: "AWES accompagne la mise en œuvre jusqu’au résultat." },
] as const;

export function getPole(id: Pole["id"]) {
  const pole = poles.find((item) => item.id === id);
  if (!pole) throw new Error(`Pôle introuvable: ${id}`);
  return pole;
}
