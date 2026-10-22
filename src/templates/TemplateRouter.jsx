import { useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getAllBarbers, getBarberBySlug, THEMES } from "../data/barbers/index.js";
import NoirLuxuryTemplate from "./NoirLuxuryTemplate.jsx";
import ModernStudioTemplate from "./ModernStudioTemplate.jsx";
import HeritageClassicTemplate from "./HeritageClassicTemplate.jsx";
import ThemeSwitcherBar from "../components/shared/ThemeSwitcherBar.jsx";

export default function TemplateRouter({ defaultSlug = "next-level-barbershop", forcedTheme = null }) {
  const { slug, themeName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // All registered barbers
  const barbers = useMemo(() => getAllBarbers(), []);

  // Determine active barber slug
  const activeSlug = slug || searchParams.get("barber") || defaultSlug;

  // Find barber data (safe fallback to first barber if not found)
  const baseBarber = useMemo(() => getBarberBySlug(activeSlug), [activeSlug]);

  // Determine active theme (from forced prop, URL param, query param, or barber config)
  const initialTheme = useMemo(() => {
    if (forcedTheme) return forcedTheme;
    if (themeName && Object.values(THEMES).includes(themeName)) return themeName;
    const qTheme = searchParams.get("theme");
    if (qTheme && Object.values(THEMES).includes(qTheme)) return qTheme;
    return baseBarber.theme || THEMES.NOIR_LUXURY;
  }, [forcedTheme, themeName, searchParams, baseBarber]);

  const [activeTheme, setActiveTheme] = useState(initialTheme);
  const [selectedSlug, setSelectedSlug] = useState(activeSlug);

  // Synchronize when route changes
  const activeBarber = useMemo(() => {
    const found = getBarberBySlug(selectedSlug);
    // Return a cloned barber with current activeTheme if user explicitly switched themes
    return {
      ...found,
      theme: activeTheme,
    };
  }, [selectedSlug, activeTheme]);

  const handleThemeChange = (newTheme) => {
    setActiveTheme(newTheme);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("theme", newTheme);
      return next;
    });
  };

  const handleBarberChange = (newSlug) => {
    setSelectedSlug(newSlug);
    const newBarber = getBarberBySlug(newSlug);
    if (newBarber?.theme) {
      setActiveTheme(newBarber.theme);
    }
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("barber", newSlug);
      if (newBarber?.theme) {
        next.set("theme", newBarber.theme);
      }
      return next;
    });
  };

  return (
    <>
      {activeTheme === THEMES.MODERN_STUDIO && (
        <ModernStudioTemplate barber={activeBarber} />
      )}
      {activeTheme === THEMES.HERITAGE_CLASSIC && (
        <HeritageClassicTemplate barber={activeBarber} />
      )}
      {activeTheme === THEMES.NOIR_LUXURY && (
        <NoirLuxuryTemplate barber={activeBarber} />
      )}

      {/* Floating Theme & Barber Switcher */}
      <ThemeSwitcherBar
        currentTheme={activeTheme}
        onThemeChange={handleThemeChange}
        barbers={barbers}
        selectedBarberSlug={selectedSlug}
        onBarberChange={handleBarberChange}
      />
    </>
  );
}
