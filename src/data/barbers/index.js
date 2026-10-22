import { getAllClients, getClientBySlug, getDefaultDevClient } from "../clients/index.js";
import { THEMES } from "../../schemas/barberSchema.js";

export function getAllBarbers() {
  return getAllClients();
}

export function getBarberBySlug(slug) {
  const found = getClientBySlug(slug);
  return found || getDefaultDevClient();
}

export function getBarberByTheme(theme) {
  const all = getAllClients();
  const match = all.find((b) => b.theme === theme);
  return match || getDefaultDevClient();
}

export function getDefaultBarber() {
  return getDefaultDevClient();
}

export { THEMES };
