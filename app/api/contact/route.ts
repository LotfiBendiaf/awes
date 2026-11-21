import { deliverContact } from "@/lib/contact-provider";
import { normalizeContactInput, validateContactInput } from "@/lib/contact-validation";

const attempts = new Map<string, { count: number; resetAt: number }>();
export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const current = attempts.get(ip);
  if (current && current.resetAt > now && current.count >= 5) return Response.json({ message: "Trop de tentatives. Réessayez dans quelques minutes." }, { status: 429 });
  attempts.set(ip, !current || current.resetAt <= now ? { count: 1, resetAt: now + 10 * 60_000 } : { ...current, count: current.count + 1 });
  let raw: unknown;
  try { raw = await request.json(); } catch { return Response.json({ message: "Requête invalide." }, { status: 400 }); }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return Response.json({ message: "Requête invalide." }, { status: 400 });
  const input = normalizeContactInput(raw as Record<string, unknown>);
  if (input.website) return Response.json({ message: "Demande reçue." });
  const errors = validateContactInput(input);
  if (Object.keys(errors).length) return Response.json({ message: "Veuillez corriger les champs indiqués.", errors }, { status: 422 });
  try {
    const delivery = await deliverContact(input);
    if (!delivery.delivered) return Response.json({ message: "Formulaire validé, mais l’envoi n’est pas configuré dans cet environnement. Aucune demande n’a été transmise.", delivered: false }, { status: 202 });
    return Response.json({ message: "Votre demande a bien été transmise.", delivered: true });
  } catch { return Response.json({ message: "La demande n’a pas pu être transmise. Veuillez réessayer plus tard." }, { status: 502 }); }
}
