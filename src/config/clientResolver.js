import { getClientBySlug, getDefaultDevClient, DEFAULT_DEV_CLIENT_SLUG, getAllClients } from "../data/clients/index.js";

/**
 * Resolves the active client configuration based on build/runtime environment variables.
 * Enforces strict client isolation in production.
 */
export function resolveActiveClient(overrideSlug = null) {
  const isProd = import.meta.env.PROD;
  const envSlug = (import.meta.env.VITE_BARBER_SLUG || "").trim();

  // In production: strictly respect VITE_BARBER_SLUG (no URL tampering allowed)
  if (isProd) {
    if (!envSlug) {
      return {
        status: "error",
        code: "MISSING_SLUG",
        message: "Production build deployed without VITE_BARBER_SLUG. Build or deployment configuration is invalid.",
      };
    }

    const client = getClientBySlug(envSlug);
    if (!client) {
      return {
        status: "error",
        code: "UNKNOWN_SLUG",
        requestedSlug: envSlug,
        message: `Client slug "${envSlug}" does not exist in src/data/clients/. Build aborted to prevent deploying incorrect data.`,
      };
    }

    return {
      status: "success",
      client,
    };
  }

  // In development: allow local override, URL query param, or fallback to default
  const devSlug = overrideSlug || envSlug || DEFAULT_DEV_CLIENT_SLUG;
  const client = getClientBySlug(devSlug) || getDefaultDevClient();

  return {
    status: "success",
    client,
    isDev: true,
  };
}

export { getAllClients };
