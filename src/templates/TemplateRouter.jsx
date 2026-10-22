import { useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getAllBarbers, getBarberBySlug } from "../data/barbers/index.js";
import { normalizeTheme } from "../schemas/barberSchema.js";
import NoirTheme from "../themes/noir/NoirTheme.jsx";
import ModernTheme from "../themes/modern/ModernTheme.jsx";
import ClassicTheme from "../themes/classic/ClassicTheme.jsx";
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
    if (forcedTheme) return normalizeTheme(forcedTheme);
    if (themeName) return normalizeTheme(themeName);
    const qTheme = searchParams.get("theme");
    if (qTheme) return normalizeTheme(qTheme);
    return normalizeTheme(baseBarber.theme);
  }, [forcedTheme, themeName, searchParams, baseBarber]);

  const [activeTheme, setActiveTheme] = useState(initialTheme);
  const [selectedSlug, setSelectedSlug] = useState(activeSlug);

  // Synchronize when route changes
  const activeBarber = useMemo(() => {
    const found = getBarberBySlug(selectedSlug);
    return {
      ...found,
      theme: activeTheme,
    };
  }, [selectedSlug, activeTheme]);

  const handleThemeChange = (newTheme) => {
    const normalized = normalizeTheme(newTheme);
    setActiveTheme(normalized);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("theme", normalized);
      return next;
    });
  };

  const handleBarberChange = (newSlug) => {
    setSelectedSlug(newSlug);
    const newBarber = getBarberBySlug(newSlug);
    if (newBarber?.theme) {
      const norm = normalizeTheme(newBarber.theme);
      setActiveTheme(norm);
    }
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("barber", newSlug);
      if (newBarber?.theme) {
        next.set("theme", normalizeTheme(newBarber.theme));
      }
      return next;
    });
  };

  const renderTheme = () => {
    if (activeTheme === "modern") {
      return <ModernTheme barber={activeBarber} />;
    }
    if (activeTheme === "classic") {
      return <ClassicTheme barber={activeBarber} />;
    }
    return <NoirTheme barber={activeBarber} />;
  };

  return (
    <>
      {renderTheme()}

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
