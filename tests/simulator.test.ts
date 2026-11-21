import test from "node:test";
import assert from "node:assert/strict";
import { getRecommendation } from "../lib/simulator.ts";

test("uses the stated need for the primary recommendation", () => {
  const result = getRecommendation({ profile: "porteur", progress: "preparation", need: "business-plan" });
  assert.equal(result.primary.serviceId, "strategie-business-plan");
});

test("uses progress to add a diagnostic secondary recommendation", () => {
  const result = getRecommendation({ profile: "entreprise", progress: "idee", need: "gerer" });
  assert.equal(result.secondary?.serviceId, "diagnostic-orientation");
});

test("uses profile and progress to specialize international recommendations", () => {
  const established = getRecommendation({ profile: "entreprise", progress: "lancee", need: "international" });
  const early = getRecommendation({ profile: "porteur", progress: "idee", need: "international" });
  assert.equal(established.primary.serviceId, "export-developpement");
  assert.equal(early.primary.serviceId, "import-sourcing");
});

test("investor profile adds the investor axis when relevant", () => {
  const result = getRecommendation({ profile: "investisseur", progress: "encours", need: "expert" });
  assert.equal(result.secondary?.serviceId, "projets-investisseurs");
});
