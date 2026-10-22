import assert from "node:assert";
import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App.jsx";
import NoirTheme from "../src/themes/noir/NoirTheme.jsx";
import ModernTheme from "../src/themes/modern/ModernTheme.jsx";
import ClassicTheme from "../src/themes/classic/ClassicTheme.jsx";
import { getThemeComponent } from "../src/themes/index.js";
import { getAllClients, getClientBySlug } from "../src/data/clients/index.js";
import DeploymentErrorScreen from "../src/components/shared/DeploymentErrorScreen.jsx";
import { validateBarberConfig } from "../src/schemas/barberSchema.js";

console.log("=== BEGINNING MULTI-CLIENT MASTER TEMPLATE VERIFICATION ===");

// 1. Verify all registered client configurations
const clients = getAllClients();
assert(clients.length >= 3, `Expected at least 3 clients, found ${clients.length}`);
console.log(`✔ Loaded and validated ${clients.length} client configurations from src/data/clients/`);

// 2. Test Noir Theme with Hammoudi / Next Level client
const hammoudi = getClientBySlug("hammoudi");
assert(hammoudi, "Hammoudi client must exist");
assert.strictEqual(hammoudi.theme, "noir");
assert.strictEqual(hammoudi.businessName, "Next Level Barbershop");
assert.strictEqual(hammoudi.phone, "+61 415 300 889");
assert(hammoudi.bookingUrl.includes("fresha.com"), "Must contain verified Fresha booking URL");

const noirHtml = renderToString(React.createElement(NoirTheme, { barber: hammoudi }));
assert(noirHtml.includes("Next Level Barbershop") || noirHtml.includes("NEXT LEVEL"), "Must render business name");
assert(noirHtml.includes("56 William St"), "Must render verified location");
assert(noirHtml.includes("The Service Menu"), "Must render service menu");
assert(!noirHtml.includes("undefined"), "Must not contain 'undefined'");
assert(!noirHtml.includes("NaN"), "Must not contain 'NaN'");
console.log("✔ NoirTheme renders successfully for Hammoudi / Next Level Barbershop");

// 3. Test Modern Theme with District 9 client
const districtNine = getClientBySlug("district-nine");
assert(districtNine, "District 9 client must exist");
assert.strictEqual(districtNine.theme, "modern");
assert.strictEqual(districtNine.businessName, "District 9 Barber Co.");

const modernHtml = renderToString(React.createElement(ModernTheme, { barber: districtNine }));
assert(modernHtml.includes("District 9 Barber Co."), "Must render business name");
assert(modernHtml.includes("Northbridge"), "Must render Northbridge location");
assert(modernHtml.includes("Service Catalog"), "Must render service catalog");
assert(!modernHtml.includes("undefined"), "Must not contain 'undefined'");
assert(!modernHtml.includes("NaN"), "Must not contain 'NaN'");
console.log("✔ ModernTheme renders successfully for District 9 Barber Co.");

// 4. Test Classic Theme with St. George Guild client
const stGeorge = getClientBySlug("st-george-guild");
assert(stGeorge, "St. George client must exist");
assert.strictEqual(stGeorge.theme, "classic");
assert.strictEqual(stGeorge.businessName, "St. George Barber Guild");

const classicHtml = renderToString(React.createElement(ClassicTheme, { barber: stGeorge }));
assert(classicHtml.includes("St. George Barber Guild"), "Must render business name");
assert(classicHtml.includes("The Guild Ledger"), "Must render ledger");
assert(classicHtml.includes("182 St Georges Terrace"), "Must render Terrace location");
assert(!classicHtml.includes("undefined"), "Must not contain 'undefined'");
assert(!classicHtml.includes("NaN"), "Must not contain 'NaN'");
console.log("✔ ClassicTheme renders successfully for St. George Barber Guild");

// 5. Test Theme Dispatcher
assert.strictEqual(getThemeComponent("noir"), NoirTheme);
assert.strictEqual(getThemeComponent("modern"), ModernTheme);
assert.strictEqual(getThemeComponent("classic"), ClassicTheme);
console.log("✔ Theme dispatcher maps theme names correctly to separated theme modules");

// 6. Test App component with MemoryRouter
const appHtml = renderToString(
  React.createElement(
    MemoryRouter,
    { initialEntries: ["/"] },
    React.createElement(App)
  )
);
assert(appHtml.includes("Next Level") || appHtml.includes("NEXT LEVEL"), "App must render default client");
console.log("✔ App renders default client successfully on root route");

// 7. Test DeploymentErrorScreen for missing or invalid slugs
const errorHtml = renderToString(
  React.createElement(DeploymentErrorScreen, {
    code: "UNKNOWN_SLUG",
    requestedSlug: "invalid-barber",
    message: "Client slug 'invalid-barber' does not exist in src/data/clients/.",
  })
);
assert(errorHtml.includes("Deployment Configuration Required"), "Must render error title");
assert(errorHtml.includes("invalid-barber"), "Must display requested slug");
console.log("✔ DeploymentErrorScreen renders safe halt message for unknown slugs");

// 8. Test client isolation: Minimal client with no reviews or packages
const minimalClient = validateBarberConfig({
  businessName: "Isolated Perth Client",
  slug: "isolated-client",
  theme: "modern",
  location: "Perth, WA",
});
const minimalHtml = renderToString(React.createElement(ModernTheme, { barber: minimalClient }));
assert(minimalHtml.includes("Isolated Perth Client"));
assert(!minimalHtml.includes("undefined"));
assert(!minimalHtml.includes("NaN"));
console.log("✔ Isolated minimal client renders cleanly without data leakage or empty blocks");

console.log("=== ALL MULTI-CLIENT MASTER TEMPLATE VERIFICATIONS PASSED! ===");
