import nextLevelRaw from "./nextLevel.json";
import districtNineRaw from "./districtNine.json";
import stGeorgeGuildRaw from "./stGeorgeGuild.json";
import { validateBarberConfig, THEMES } from "../../schemas/barberSchema.js";

const rawBarbers = [nextLevelRaw, districtNineRaw, stGeorgeGuildRaw];

// Validate all configs on load so any schema issue fails fast
const validatedBarbers = rawBarbers.map((b) => validateBarberConfig(b));

const barberMap = new Map(validatedBarbers.map((b) => [b.slug, b]));

export function getAllBarbers() {
  return [...validatedBarbers];
}

export function getBarberBySlug(slug) {
  if (!slug) return validatedBarbers[0];
  return barberMap.get(slug) || validatedBarbers[0];
}

export function getBarberByTheme(theme) {
  const match = validatedBarbers.find((b) => b.theme === theme);
  return match || validatedBarbers[0];
}

export function getDefaultBarber() {
  return validatedBarbers[0];
}

export { THEMES };
