import assert from "node:assert";
import { test } from "node:test";
import { validateBarberConfig, THEMES } from "./barberSchema.js";

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
