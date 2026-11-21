"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { allServices } from "@/data/site";
import { normalizeContactInput, validateContactInput, type ContactErrors } from "@/lib/contact-validation";

type Status = { kind: "idle" | "loading" | "success" | "warning" | "error"; message?: string };
export function ContactForm() {
  const params = useSearchParams();
  const requested = params.get("service") || "";
  const initialService = useMemo(() => allServices.some(({ id }) => id === requested) ? requested : "", [requested]);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form));
    const input = normalizeContactInput(raw);
    const validation = validateContactInput(input);
    setErrors(validation);
    if (Object.keys(validation).length) { setStatus({ kind: "error", message: "Veuillez corriger les champs indiqués." }); return; }
    setStatus({ kind: "loading" });
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(input) });
      const result = await response.json() as { message?: string; delivered?: boolean; errors?: ContactErrors };
      if (!response.ok) { setErrors(result.errors || {}); setStatus({ kind: "error", message: result.message || "Une erreur est survenue." }); return; }
      setStatus({ kind: result.delivered ? "success" : "warning", message: result.message });
      if (result.delivered) form.reset();
    } catch { setStatus({ kind: "error", message: "Connexion impossible. Vérifiez votre accès internet et réessayez." }); }
  }

  const error = (name: keyof ContactErrors) => errors[name] ? <span className="field-error" id={`${name}-error`}>{errors[name]}</span> : null;
  return <form className="contact-form" onSubmit={submit} noValidate>
    <div className="form-grid">
      <label>Nom complet<input name="fullName" autoComplete="name" required aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? "fullName-error" : undefined} />{error("fullName")}</label>
      <label>E-mail<input name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />{error("email")}</label>
      <label>Téléphone <span className="optional">(facultatif)</span><input name="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />{error("phone")}</label>
      <label>Votre profil<select name="profile" defaultValue="" required aria-invalid={!!errors.profile}><option value="" disabled>Sélectionner</option><option value="porteur">Porteur de projet</option><option value="entreprise">Entreprise / TPE / PME</option><option value="startup">Startup</option><option value="investisseur">Investisseur</option><option value="autre">Autre</option></select>{error("profile")}</label>
      <label>Service souhaité<select name="service" defaultValue={initialService} required aria-invalid={!!errors.service}><option value="" disabled>Sélectionner</option>{allServices.map(({ id, title, pole }) => <option value={id} key={id}>{pole.shortName} — {title}</option>)}</select>{error("service")}</label>
      <label>État du projet<select name="projectStatus" defaultValue="" required aria-invalid={!!errors.projectStatus}><option value="" disabled>Sélectionner</option><option value="idee">J’ai une idée</option><option value="preparation">Je prépare mon projet</option><option value="encours">Mon projet est en cours</option><option value="lancee">Mon activité est lancée</option></select>{error("projectStatus")}</label>
    </div>
    <label>Votre message<textarea name="message" rows={6} minLength={20} maxLength={2000} required aria-invalid={!!errors.message} />{error("message")}</label>
    <fieldset className="contact-method"><legend>Moyen de contact préféré</legend><label><input type="radio" name="contactMethod" value="email" defaultChecked /> E-mail</label><label><input type="radio" name="contactMethod" value="telephone" /> Téléphone</label><label><input type="radio" name="contactMethod" value="whatsapp" /> WhatsApp</label>{error("contactMethod")}</fieldset>
    <label className="consent"><input type="checkbox" name="consent" required /> <span>J’accepte que mes informations soient utilisées uniquement pour répondre à ma demande. Elles ne sont pas stockées par ce site au-delà de leur transmission.</span></label>{error("consent")}
    <label className="honeypot" aria-hidden="true">Site web<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <button className="button button-gold submit-button" type="submit" disabled={status.kind === "loading"}>{status.kind === "loading" ? "Envoi en cours…" : "Envoyer ma demande"}</button>
    {status.message && <p className={`form-status ${status.kind}`} role="status">{status.message}</p>}
  </form>;
}
