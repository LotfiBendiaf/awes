"use client";

import Link from "next/link";
import { useState } from "react";
import { getRecommendation, type SimulatorAnswers } from "@/lib/simulator";

const questions = [
  { key: "profile", legend: "Quel est votre profil ?", options: [["porteur", "Porteur de projet"], ["entreprise", "Entreprise / TPE / PME"], ["startup", "Startup"], ["investisseur", "Investisseur"]] },
  { key: "progress", legend: "Où en êtes-vous aujourd’hui ?", options: [["idee", "J’ai une idée"], ["preparation", "Je prépare mon projet"], ["encours", "Mon projet est en cours"], ["lancee", "Mon activité est lancée"]] },
  { key: "need", legend: "Quel est votre besoin principal ?", options: [["valider", "Valider mon idée"], ["etude", "Réaliser une étude"], ["business-plan", "Créer un business plan"], ["realiser", "Réaliser mon projet"], ["gerer", "Gérer mon activité"], ["investir", "Investir"], ["expert", "Besoin d’un expert"], ["former", "Me former"], ["international", "Importer ou exporter"]] },
] as const;

export function Simulator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<SimulatorAnswers>>({});
  const complete = step === questions.length;
  const progress = complete ? 100 : Math.round((step / questions.length) * 100);
  const result = complete ? getRecommendation(answers as SimulatorAnswers) : null;
  const question = questions[step];

  function choose(value: string) {
    if (!question) return;
    setAnswers((current) => ({ ...current, [question.key]: value }));
    setStep((current) => current + 1);
  }
  function restart() { setAnswers({}); setStep(0); }

  return <div className="simulator-card">
    <div className="progress-label"><span>{complete ? "Résultat" : `Étape ${step + 1} sur ${questions.length}`}</span><span>{progress}%</span></div>
    <div className="progress-track" role="progressbar" aria-label="Progression du simulateur" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div>
    {!complete && question && <fieldset className="question"><legend>{question.legend}</legend>{question.options.map(([value, label]) => <button type="button" key={value} className={answers[question.key] === value ? "choice selected" : "choice"} onClick={() => choose(value)}>{label}<span aria-hidden="true">→</span></button>)}</fieldset>}
    {result && <div className="result" aria-live="polite"><span className="result-badge">Résultat AWES</span><p className="result-pole">{result.primary.pole}</p><h3>{result.primary.service}</h3><p>{result.primary.explanation}</p>{result.secondary && <div className="secondary-result"><strong>À considérer également : {result.secondary.service}</strong><p>{result.secondary.explanation}</p></div>}<div className="actions result-actions"><Link className="button button-gold" href={result.primary.href}>Voir le service recommandé</Link><Link className="button button-dark" href={`/contact?service=${result.primary.serviceId}`}>Prendre rendez-vous</Link></div></div>}
    <div className="sim-controls">{step > 0 && !complete && <button type="button" onClick={() => setStep((value) => value - 1)}>← Question précédente</button>}{complete && <button type="button" onClick={restart}>↻ Recommencer</button>}</div>
  </div>;
}
