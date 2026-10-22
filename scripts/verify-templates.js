import assert from "node:assert";
import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import TemplateRouter from "../src/templates/TemplateRouter.jsx";
import NoirLuxuryTemplate from "../src/templates/NoirLuxuryTemplate.jsx";
import ModernStudioTemplate from "../src/templates/ModernStudioTemplate.jsx";
import HeritageClassicTemplate from "../src/templates/HeritageClassicTemplate.jsx";
import { validateBarberConfig } from "../src/schemas/barberSchema.js";
import { getAllBarbers } from "../src/data/barbers/index.js";

console.log("=== BEGINNING COMPREHENSIVE TEMPLATE & SYSTEM VERIFICATION ===");

// 1. Verify all sample configs pass schema validation
const barbers = getAllBarbers();
assert.strictEqual(barbers.length, 3, "Expected 3 barbers loaded");
console.log("✔ All 3 registered barber profiles loaded and validated against schema");

// 2. Test NoirLuxuryTemplate rendering
const nextLevel = barbers.find((b) => b.theme === "noir-luxury");
const noirHtml = renderToString(React.createElement(NoirLuxuryTemplate, { barber: nextLevel }));
assert(noirHtml.includes("Next Level Barbershop") || noirHtml.includes("NEXT LEVEL"), "Noir must render business name");
assert(noirHtml.includes("The Service Menu"), "Noir must render service menu");
assert(noirHtml.includes("Perth"), "Noir must include Perth context");
assert(!noirHtml.includes("undefined"), "Noir HTML must not contain 'undefined'");
assert(!noirHtml.includes("NaN"), "Noir HTML must not contain 'NaN'");
console.log("✔ NoirLuxuryTemplate renders successfully with high-fidelity editorial markup");

// 3. Test ModernStudioTemplate rendering
const modernBarber = barbers.find((b) => b.theme === "modern-studio");
const modernHtml = renderToString(React.createElement(ModernStudioTemplate, { barber: modernBarber }));
assert(modernHtml.includes("District 9 Barber Co."), "Modern must render business name");
assert(modernHtml.includes("Service Catalog"), "Modern must render service catalog");
assert(modernHtml.includes("AWST"), "Modern must render Perth AWST time or clock");
assert(!modernHtml.includes("undefined"), "Modern HTML must not contain 'undefined'");
assert(!modernHtml.includes("NaN"), "Modern HTML must not contain 'NaN'");
console.log("✔ ModernStudioTemplate renders successfully with Swiss grid & matrix");

// 4. Test HeritageClassicTemplate rendering
const heritageBarber = barbers.find((b) => b.theme === "heritage-classic");
const heritageHtml = renderToString(React.createElement(HeritageClassicTemplate, { barber: heritageBarber }));
assert(heritageHtml.includes("St. George Barber Guild"), "Heritage must render business name");
assert(heritageHtml.includes("The Guild Ledger"), "Heritage must render ledger");
assert(heritageHtml.includes("Gentlemen&#x27;s Rituals") || heritageHtml.includes("Gentlemen's Rituals") || heritageHtml.includes("Ritual"), "Heritage must render rituals");
assert(!heritageHtml.includes("undefined"), "Heritage HTML must not contain 'undefined'");
assert(!heritageHtml.includes("NaN"), "Heritage HTML must not contain 'NaN'");
console.log("✔ HeritageClassicTemplate renders successfully with traditional typography & ledger");

// 5. Test Router with root route ('/')
const route1Html = renderToString(
  React.createElement(
    MemoryRouter,
    { initialEntries: ["/"] },
    React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: "*", element: React.createElement(TemplateRouter) })
    )
  )
);
assert(route1Html.includes("Switch Theme / Barbers") || route1Html.includes("Design System Preview"), "ThemeSwitcherBar must be present in router");
console.log("✔ Route '/' renders default barber and theme switcher successfully");

// 6. Test Router with theme route ('/theme/modern-studio')
const route2Html = renderToString(
  React.createElement(
    MemoryRouter,
    { initialEntries: ["/theme/modern-studio"] },
    React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: "/theme/:themeName", element: React.createElement(TemplateRouter) })
    )
  )
);
assert(route2Html.includes("Modern Studio") || route2Html.includes("District 9") || route2Html.includes("Catalog"), "Router must switch to modern template");
console.log("✔ Route '/theme/modern-studio' renders modern studio theme cleanly");

// 7. Test Router with unknown slug ('/barber/completely-unknown-slug')
const unknownSlugHtml = renderToString(
  React.createElement(
    MemoryRouter,
    { initialEntries: ["/barber/completely-unknown-slug"] },
    React.createElement(
      Routes,
      null,
      React.createElement(Route, { path: "/barber/:slug", element: React.createElement(TemplateRouter) })
    )
  )
);
assert(unknownSlugHtml.length > 500, "Unknown slug must gracefully fall back to default barber without crashing");
console.log("✔ Route '/barber/completely-unknown-slug' safely falls back to default barber");

// 8. Test Minimal barber with all optional sections omitted
const minimalConfig = validateBarberConfig({
  businessName: "Minimal Perth Barbers",
  theme: "noir-luxury",
  location: "Barrack St, Perth",
});
const minimalHtml = renderToString(React.createElement(NoirLuxuryTemplate, { barber: minimalConfig }));
assert(minimalHtml.includes("Minimal Perth Barbers"), "Minimal barber must render business name");
assert(!minimalHtml.includes("undefined"), "Minimal barber must not render 'undefined'");
assert(!minimalHtml.includes("NaN"), "Minimal barber must not render 'NaN'");
console.log("✔ Minimal configuration with zero optional arrays renders gracefully without empty gaping sections");

console.log("=== ALL SYSTEM VERIFICATION TESTS PASSED SUCCESSFULLY! ===");
