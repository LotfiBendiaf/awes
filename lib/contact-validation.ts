export const profiles = ["porteur", "entreprise", "startup", "investisseur", "autre"] as const;
export const projectStatuses = ["idee", "preparation", "encours", "lancee"] as const;
export const contactMethods = ["email", "telephone", "whatsapp"] as const;

export type ContactInput = { fullName: string; email: string; phone: string; profile: string; service: string; projectStatus: string; message: string; contactMethod: string; consent: boolean; website: string };
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const clean = (value: unknown, max: number) => typeof value === "string" ? value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, max) : "";
export function normalizeContactInput(input: Record<string, unknown>): ContactInput {
  return { fullName: clean(input.fullName, 100), email: clean(input.email, 160).toLowerCase(), phone: clean(input.phone, 30), profile: clean(input.profile, 30), service: clean(input.service, 80), projectStatus: clean(input.projectStatus, 30), message: clean(input.message, 2000), contactMethod: clean(input.contactMethod, 20), consent: input.consent === true || input.consent === "true" || input.consent === "on", website: clean(input.website, 200) };
}

export function validateContactInput(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  if (input.fullName.length < 2) errors.fullName = "Veuillez indiquer votre nom complet.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) errors.email = "Veuillez saisir une adresse e-mail valide.";
  if (input.phone && !/^[+\d][\d\s().-]{5,29}$/.test(input.phone)) errors.phone = "Veuillez saisir un numéro de téléphone valide.";
  if (!profiles.includes(input.profile as typeof profiles[number])) errors.profile = "Veuillez sélectionner votre profil.";
  if (!input.service) errors.service = "Veuillez sélectionner un service.";
  if (!projectStatuses.includes(input.projectStatus as typeof projectStatuses[number])) errors.projectStatus = "Veuillez préciser l’état du projet.";
  if (input.message.length < 20) errors.message = "Votre message doit contenir au moins 20 caractères.";
  if (!contactMethods.includes(input.contactMethod as typeof contactMethods[number])) errors.contactMethod = "Veuillez choisir un moyen de contact.";
  if (!input.consent) errors.consent = "Votre consentement est nécessaire pour traiter la demande.";
  return errors;
}
