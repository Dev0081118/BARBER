import NoirTheme from "./noir/NoirTheme.jsx";
import ModernTheme from "./modern/ModernTheme.jsx";
import ClassicTheme from "./classic/ClassicTheme.jsx";
import JulesTheme from "./jules/JulesTheme.jsx";

export const THEMES = {
  NOIR: "noir",
  MODERN: "modern",
  CLASSIC: "classic",
  JULES: "jules",
};

export const THEME_COMPONENTS = {
  noir: NoirTheme,
  "noir-luxury": NoirTheme,
  modern: ModernTheme,
  "modern-studio": ModernTheme,
  classic: ClassicTheme,
  "heritage-classic": ClassicTheme,
  jules: JulesTheme,
  "hammoudi-original": JulesTheme,
  original: JulesTheme,
};

/**
 * Returns the theme component matching the theme name, falling back to NoirTheme.
 * @param {string} themeName
 * @returns {React.ComponentType}
 */
export function getThemeComponent(themeName) {
  if (!themeName) return NoirTheme;
  const normalized = String(themeName).toLowerCase().trim();
  return THEME_COMPONENTS[normalized] || NoirTheme;
}

export { NoirTheme, ModernTheme, ClassicTheme, JulesTheme };
