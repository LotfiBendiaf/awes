import type { ContactInput } from "./contact-validation";

export type DeliveryResult = { delivered: boolean; mode: "webhook" | "development" };
export async function deliverContact(input: ContactInput): Promise<DeliveryResult> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return { delivered: false, mode: "development" };
  const response = await fetch(webhook, { method: "POST", headers: { "content-type": "application/json", ...(process.env.CONTACT_WEBHOOK_TOKEN ? { authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` } : {}) }, body: JSON.stringify({ ...input, website: undefined }), signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error("Contact provider rejected request");
  return { delivered: true, mode: "webhook" };
}
