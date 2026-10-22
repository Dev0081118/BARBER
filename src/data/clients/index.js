import hammoudiRaw from "./hammoudi.json";
import districtNineRaw from "./district-nine.json";
import stGeorgeGuildRaw from "./st-george-guild.json";
import exampleClientRaw from "./example-client.json";
import hammoudiOriginalRaw from "./hammoudi-original.json";
import { validateBarberConfig } from "../../schemas/barberSchema.js";

// Client registry map with primary slug & aliases
const clientRegistry = new Map();

const rawClients = [
  hammoudiRaw,
  districtNineRaw,
  stGeorgeGuildRaw,
  exampleClientRaw,
  hammoudiOriginalRaw,
];

// Validate and register all client configurations
for (const raw of rawClients) {
  try {
    const validated = validateBarberConfig(raw);
    clientRegistry.set(validated.slug, validated);

    // Register common aliases for backward compatibility
    if (validated.slug === "hammoudi") {
      clientRegistry.set("next-level", validated);
      clientRegistry.set("next-level-barbershop", validated);
    }
    if (validated.slug === "hammoudi-original") {
      clientRegistry.set("jules", validated);
      clientRegistry.set("original", validated);
    }
  } catch (err) {
    console.error(`[ClientRegistry] Failed to validate client config for ${raw?.slug || "unknown"}:`, err);
  }
}

/**
 * Returns list of unique validated clients (excluding aliases).
 */
export function getAllClients() {
  const seen = new Set();
  const list = [];
  for (const client of clientRegistry.values()) {
    if (!seen.has(client.slug)) {
      seen.add(client.slug);
      list.push(client);
    }
  }
  return list;
}

/**
 * Resolves a client by slug or alias.
 * @param {string} slug
 * @returns {Object|null}
 */
export function getClientBySlug(slug) {
  if (!slug) return null;
  const key = String(slug).toLowerCase().trim();
  return clientRegistry.get(key) || null;
}

/**
 * Default fallback client for local development mode.
 */
export const DEFAULT_DEV_CLIENT_SLUG = "hammoudi";

export function getDefaultDevClient() {
  return getClientBySlug(DEFAULT_DEV_CLIENT_SLUG);
}
