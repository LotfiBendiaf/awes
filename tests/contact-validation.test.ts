import test from "node:test";
import assert from "node:assert/strict";
import { normalizeContactInput, validateContactInput } from "../lib/contact-validation.ts";

test("accepts and normalizes a complete contact request", () => {
  const input = normalizeContactInput({ fullName: "  Amel   Benali ", email: "AMEL@example.com", phone: "+213 555 123 456", profile: "porteur", service: "diagnostic-orientation", projectStatus: "idee", message: "Je souhaite discuter de mon projet prochainement.", contactMethod: "email", consent: true, website: "" });
  assert.equal(input.fullName, "Amel Benali");
  assert.equal(input.email, "amel@example.com");
  assert.deepEqual(validateContactInput(input), {});
});

test("rejects incomplete and invalid requests", () => {
  const input = normalizeContactInput({ fullName: "A", email: "invalid", profile: "unknown", service: "", projectStatus: "", message: "court", contactMethod: "", consent: false });
  const errors = validateContactInput(input);
  assert.ok(errors.fullName && errors.email && errors.profile && errors.message && errors.consent);
});

test("strips angle brackets and caps input lengths", () => {
  const input = normalizeContactInput({ fullName: "<b>Amel</b>", message: "x".repeat(2500) });
  assert.equal(input.fullName, "bAmel/b");
  assert.equal(input.message.length, 2000);
});
