export const profileOptions = ["porteur", "entreprise", "startup", "investisseur"] as const;
export const progressOptions = ["idee", "preparation", "encours", "lancee"] as const;
export const needOptions = ["valider", "etude", "business-plan", "realiser", "gerer", "investir", "expert", "former", "international"] as const;
export type Profile = typeof profileOptions[number];
export type Progress = typeof progressOptions[number];
export type Need = typeof needOptions[number];
export type SimulatorAnswers = { profile: Profile; progress: Progress; need: Need };
type RecommendationItem = { serviceId: string; pole: string; service: string; href: string; explanation: string };
export type Recommendation = { primary: RecommendationItem; secondary?: RecommendationItem };

const recommendations: Record<Need, RecommendationItem> = {
  valider: { serviceId: "diagnostic-orientation", pole: "Accompagner le projet", service: "Diagnostic & Orientation", href: "/accompagner-projet#diagnostic-orientation", explanation: "AWES analyse votre idée, identifie les risques et définit les prochaines étapes." },
  etude: { serviceId: "etudes-validation", pole: "Accompagner le projet", service: "Études & Validation", href: "/accompagner-projet#etudes-validation", explanation: "AWES structure les études utiles pour éclairer la viabilité de votre projet, sans garantir leur résultat." },
  "business-plan": { serviceId: "strategie-business-plan", pole: "Accompagner le projet", service: "Stratégie & Business Plan", href: "/accompagner-projet#strategie-business-plan", explanation: "AWES structure votre projet, votre stratégie et vos dossiers, sans garantir un financement." },
  realiser: { serviceId: "accompagnement-realisation", pole: "Accompagner le projet", service: "Accompagnement & Réalisation", href: "/accompagner-projet#accompagnement-realisation", explanation: "AWES vous aide à transformer votre projet en plan d’action et à piloter sa mise en œuvre." },
  gerer: { serviceId: "pilotage-exploitation", pole: "Gérer et financer l’activité", service: "Pilotage & Exploitation", href: "/gerer-financer#pilotage-exploitation", explanation: "AWES accompagne le suivi, l’organisation et le pilotage de votre activité." },
  investir: { serviceId: "projets-investisseurs", pole: "Gérer et financer l’activité", service: "Projets pour investisseurs", href: "/gerer-financer#projets-investisseurs", explanation: "AWES aide à analyser et préparer des opportunités, sans garantir leur performance ni leur financement." },
  expert: { serviceId: "consultants-experts", pole: "Gérer et financer l’activité", service: "Consultants & Experts", href: "/gerer-financer#consultants-experts", explanation: "AWES identifie les compétences adaptées au contexte et au secteur de votre besoin." },
  former: { serviceId: "formation-competences", pole: "Se développer et se former", service: "Formation & Développement des compétences", href: "/formation#formation-competences", explanation: "AWES vous oriente vers un parcours pratique adapté à vos objectifs et à votre profil." },
  international: { serviceId: "import-sourcing", pole: "Commerce extérieur", service: "Import & Sourcing", href: "/commerce-exterieur#import-sourcing", explanation: "AWES accompagne la préparation de vos opérations internationales, sans garantir une autorisation ou un résultat commercial." },
};

export function getRecommendation(answers: SimulatorAnswers): Recommendation {
  let primary = recommendations[answers.need];
  let secondary: RecommendationItem | undefined;

  if (answers.need === "international" && (answers.profile === "entreprise" || answers.progress === "lancee")) {
    primary = { ...recommendations.international, serviceId: "export-developpement", service: "Export & Développement international", href: "/commerce-exterieur#export-developpement", explanation: "Votre activité semble prête à explorer de nouveaux marchés. AWES aide à préparer cette démarche sans garantir de débouchés commerciaux." };
  }
  if (["idee", "preparation"].includes(answers.progress) && !["valider", "etude", "business-plan"].includes(answers.need)) secondary = recommendations.valider;
  if (answers.profile === "investisseur" && answers.need !== "investir") secondary = recommendations.investir;
  if (answers.profile === "startup" && answers.progress === "idee" && answers.need === "business-plan") secondary = recommendations.etude;
  if (secondary?.serviceId === primary.serviceId) secondary = undefined;
  return { primary, secondary };
}
