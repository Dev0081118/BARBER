import { useState, useMemo } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";
import { resolveActiveClient, getAllClients } from "./config/clientResolver.js";
import NoirTheme from "./themes/noir/NoirTheme.jsx";
import ModernTheme from "./themes/modern/ModernTheme.jsx";
import ClassicTheme from "./themes/classic/ClassicTheme.jsx";
import JulesTheme from "./themes/jules/JulesTheme.jsx";
import DeploymentErrorScreen from "./components/shared/DeploymentErrorScreen.jsx";
import ThemeSwitcherBar from "./components/shared/ThemeSwitcherBar.jsx";
import Privacy from "./pages/privacy.jsx";

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isDev = import.meta.env.DEV;

  // In development, allow switching client via query param or switcher
  const devSlugOverride = isDev ? searchParams.get("client") || searchParams.get("barber") : null;
  const resolution = useMemo(() => resolveActiveClient(devSlugOverride), [devSlugOverride]);

  const [devThemeOverride, setDevThemeOverride] = useState(null);

  const baseClient = resolution.status === "success" ? resolution.client : null;

  // In development only, allow theme preview override
  const activeClient = useMemo(() => {
    if (!baseClient) return null;
    if (isDev && devThemeOverride) {
      return { ...baseClient, theme: devThemeOverride };
    }
    return baseClient;
  }, [baseClient, devThemeOverride, isDev]);

  const allClients = useMemo(() => (isDev ? getAllClients() : []), [isDev]);

  // If configuration error in production, halt safely
  if (resolution.status === "error" || !activeClient) {
    return (
      <DeploymentErrorScreen
        code={resolution.code}
        requestedSlug={resolution.requestedSlug}
        message={resolution.message}
      />
    );
  }

  const handleDevThemeChange = (newTheme) => {
    setDevThemeOverride(newTheme);
  };

  const handleDevClientChange = (newSlug) => {
    setDevThemeOverride(null);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("client", newSlug);
      return next;
    });
  };

  const renderActiveTheme = () => {
    if (activeClient.theme === "modern") {
      return <ModernTheme barber={activeClient} />;
    }
    if (activeClient.theme === "classic") {
      return <ClassicTheme barber={activeClient} />;
    }
    if (activeClient.theme === "jules") {
      return <JulesTheme barber={activeClient} />;
    }
    return <NoirTheme barber={activeClient} />;
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Routes>
        <Route path="/" element={renderActiveTheme()} />
        <Route path="/privacy" element={<Privacy clientName={activeClient.businessName} />} />
        <Route path="*" element={renderActiveTheme()} />
      </Routes>

      {/* Development-Only Switcher for testing all 80 potential clients and 3 themes */}
      {isDev && (
        <ThemeSwitcherBar
          currentTheme={activeClient.theme}
          onThemeChange={handleDevThemeChange}
          barbers={allClients}
          selectedBarberSlug={activeClient.slug}
          onBarberChange={handleDevClientChange}
        />
      )}
    </div>
  );
}
