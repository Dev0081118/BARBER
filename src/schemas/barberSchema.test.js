import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { validateBarberConfig, THEMES } from "./barberSchema.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test("validates complete barber configuration", () => {
  const input = {
    businessName: "Test Barber",
    slug: "test-barber",
    theme: "noir-luxury",
    services: [{ name: "Fade", price: "40" }],
  };
  const result = validateBarberConfig(input);
  assert.strictEqual(result.businessName, "Test Barber");
  assert.strictEqual(result.slug, "test-barber");
  assert.strictEqual(result.theme, THEMES.NOIR_LUXURY);
  assert.strictEqual(result.services.length, 1);
  assert.strictEqual(result.services[0].price, "$40");
});

test("safely handles missing optional fields without crashing or producing undefined placeholders", () => {
  const minimal = {
    businessName: "Minimal Perth Barber",
  };
  const result = validateBarberConfig(minimal);
  assert.strictEqual(result.businessName, "Minimal Perth Barber");
  assert.strictEqual(result.slug, "minimal-perth-barber");
  assert.strictEqual(result.theme, THEMES.NOIR_LUXURY);
  assert.deepStrictEqual(result.services, []);
  assert.deepStrictEqual(result.team, []);
  assert.deepStrictEqual(result.reviews, []);
  assert.deepStrictEqual(result.gallery, []);
  assert.strictEqual(result.sections.services, false);
  assert.strictEqual(result.sections.team, false);
  assert.strictEqual(result.sections.reviews, false);
  assert.strictEqual(result.sections.gallery, false);
});

test("throws error when businessName is missing", () => {
  assert.throws(() => {
    validateBarberConfig({});
  }, /businessName is required/);
});

test("falls back to default theme when invalid theme is supplied", () => {
  const result = validateBarberConfig({
    businessName: "Fallback Barber",
    theme: "neon-cyberpunk-unknown",
  });
  assert.strictEqual(result.theme, THEMES.NOIR_LUXURY);
});

test("validates jules theme and aliases", () => {
  const julesResult = validateBarberConfig({
    businessName: "Jules Barber",
    theme: "jules",
  });
  assert.strictEqual(julesResult.theme, "jules");

  const aliasResult = validateBarberConfig({
    businessName: "Jules Alias Barber",
    theme: "hammoudi-original",
  });
  assert.strictEqual(aliasResult.theme, "jules");

  const originalResult = validateBarberConfig({
    businessName: "Original Barber",
    theme: "original",
  });
  assert.strictEqual(originalResult.theme, "jules");
});

test("verifies existing client configs retain their original theme mappings", () => {
  const clientsDir = path.resolve(__dirname, "../data/clients");

  const readClient = (name) => {
    const raw = JSON.parse(fs.readFileSync(path.join(clientsDir, `${name}.json`), "utf-8"));
    return validateBarberConfig(raw);
  };

  const hammoudi = readClient("hammoudi");
  assert.strictEqual(hammoudi.theme, "noir");
  assert.strictEqual(hammoudi.businessName, "Next Level Barbershop");

  const districtNine = readClient("district-nine");
  assert.strictEqual(districtNine.theme, "modern");
  assert.strictEqual(districtNine.businessName, "District 9 Barber Co.");

  const stGeorge = readClient("st-george-guild");
  assert.strictEqual(stGeorge.theme, "classic");
  assert.strictEqual(stGeorge.businessName, "St. George Barber Guild");

  const hammoudiOriginal = readClient("hammoudi-original");
  assert.strictEqual(hammoudiOriginal.theme, "jules");
  assert.strictEqual(hammoudiOriginal.businessName, "Hammoudi Barber Shop");
});
