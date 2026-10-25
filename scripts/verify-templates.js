import assert from "node:assert";
import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App.jsx";
import NoirTheme from "../src/themes/noir/NoirTheme.jsx";
import ModernTheme from "../src/themes/modern/ModernTheme.jsx";
import ClassicTheme from "../src/themes/classic/ClassicTheme.jsx";
import JulesTheme from "../src/themes/jules/JulesTheme.jsx";
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

// 5. Test Jules Theme with Hammoudi Original client
const hammoudiOriginal = getClientBySlug("hammoudi-original");
assert(hammoudiOriginal, "Hammoudi Original client must exist");
assert.strictEqual(hammoudiOriginal.theme, "jules");
assert.strictEqual(hammoudiOriginal.businessName, "Hammoudi Barber Shop");
assert.strictEqual(hammoudiOriginal.phone, "04 1691 7772");

const julesHtml = renderToString(React.createElement(JulesTheme, { barber: hammoudiOriginal }));
assert(julesHtml.includes("Hammoudi Barber Shop") || julesHtml.includes("HAMMOUDI"), "Must render business name");
assert(julesHtml.includes("188 Adelaide Terrace"), "Must render authentic Adelaide Terrace location");
assert(julesHtml.includes("Our Services"), "Must render services section");
assert(julesHtml.includes("Packages"), "Must render packages section");
assert(!julesHtml.includes("undefined"), "Must not contain 'undefined'");
assert(!julesHtml.includes("NaN"), "Must not contain 'NaN'");
console.log("✔ JulesTheme renders successfully for Hammoudi Barber Shop");

// 6. Test Theme Dispatcher
assert.strictEqual(getThemeComponent("noir"), NoirTheme);
assert.strictEqual(getThemeComponent("modern"), ModernTheme);
assert.strictEqual(getThemeComponent("classic"), ClassicTheme);
assert.strictEqual(getThemeComponent("jules"), JulesTheme);
assert.strictEqual(getThemeComponent("hammoudi-original"), JulesTheme);
console.log("✔ Theme dispatcher maps theme names correctly to separated theme modules");

// 7. Test App component with MemoryRouter
const appHtml = renderToString(
  React.createElement(
    MemoryRouter,
    { initialEntries: ["/"] },
    React.createElement(App)
  )
);
assert(appHtml.includes("Next Level") || appHtml.includes("NEXT LEVEL"), "App must render default client");
console.log("✔ App renders default client successfully on root route");

// 8. Test DeploymentErrorScreen for missing or invalid slugs
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

// 9. Test client isolation: Minimal client with no reviews or packages
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

// 10. Test section-level color overrides across themes
const colorCustomizedNoir = validateBarberConfig({
  businessName: "Custom Color Barber",
  slug: "custom-color-barber",
  theme: "noir",
  sections: {
    hero: {
      enabled: true,
      style: {
        backgroundColor: "#050505",
        accentColor: "#e6c656",
        headingColor: "#ffffff",
      },
    },
    services: {
      enabled: true,
      style: {
        backgroundColor: "#16161a",
        priceColor: "#00e5ff",
      },
    },
  },
  services: [{ name: "Bespoke Cut", price: "75" }],
});

const customNoirHtml = renderToString(React.createElement(NoirTheme, { barber: colorCustomizedNoir }));
assert(customNoirHtml.includes("#050505") || customNoirHtml.includes("--section-bg: #050505"), "Custom background color must be applied");
assert(customNoirHtml.includes("#e6c656") || customNoirHtml.includes("--section-accent: #e6c656"), "Custom accent color must be applied");
assert(customNoirHtml.includes("#00e5ff") || customNoirHtml.includes("--section-price: #00e5ff"), "Custom price color must be applied");
console.log("✔ Section-level color overrides render correctly into CSS custom properties and styles");

// 11. Test custom content overrides (headings, badges, buttons)
const contentCustomizedModern = validateBarberConfig({
  businessName: "Bespoke Modern Studio",
  slug: "bespoke-modern",
  theme: "modern",
  bookingUrl: "https://booking.example.com",
  sections: {
    hero: {
      content: {
        badge: "Architectural Hair Studio 2026",
        titleLine1: "Sculpted Lines.",
        titleLine2: "Future Geometry.",
        primaryCtaText: "Secure The Chair",
      },
    },
  },
});

const customModernHtml = renderToString(React.createElement(ModernTheme, { barber: contentCustomizedModern }));
assert(customModernHtml.includes("Architectural Hair Studio 2026"), "Custom badge must render");
assert(customModernHtml.includes("Sculpted Lines."), "Custom title line 1 must render");
assert(customModernHtml.includes("Future Geometry."), "Custom title line 2 must render");
assert(customModernHtml.includes("Secure The Chair"), "Custom CTA text must render");
console.log("✔ Section-level content overrides render correctly");

// 12. Test custom section ordering and cleanly disabled sections
const reorderedClassic = validateBarberConfig({
  businessName: "Reordered Guild",
  slug: "reordered-guild",
  theme: "classic",
  sectionOrder: ["services", "hero", "footer"],
  sections: {
    hero: true,
    services: true,
    packages: false,
    team: false,
    reviews: false,
  },
  services: [{ name: "Guild Shave", price: "60" }],
});

const reorderedClassicHtml = renderToString(React.createElement(ClassicTheme, { barber: reorderedClassic }));
const srvPos = reorderedClassicHtml.indexOf('id="heritage-services"');
const heroPos = reorderedClassicHtml.indexOf('id="heritage-hero"');
assert(srvPos !== -1 && heroPos !== -1, "Both sections must be present");
assert(srvPos < heroPos, "Services section must render before hero section per custom order");
assert(!reorderedClassicHtml.includes("heritage-packages"), "Disabled packages section must be cleanly omitted");
assert(!reorderedClassicHtml.includes("heritage-team"), "Disabled team section must be cleanly omitted");
console.log("✔ Custom section ordering and disabled section filtering function properly");

// 13. Test dynamic typography font variable cascade
const fontConfiguredNoir = validateBarberConfig({
  businessName: "Font Test Noir",
  slug: "font-test-noir",
  theme: "noir",
  branding: {
    headingFont: "Cinzel, serif",
    bodyFont: "Inter, sans-serif",
  },
});
const fontHtml = renderToString(React.createElement(NoirTheme, { barber: fontConfiguredNoir }));
assert(fontHtml.includes("--font-heading:Cinzel, serif") || fontHtml.includes("--font-heading: Cinzel, serif"), "Must output --font-heading CSS property");
assert(fontHtml.includes("--font-body:Inter, sans-serif") || fontHtml.includes("--font-body: Inter, sans-serif"), "Must output --font-body CSS property");
console.log("✔ Dynamic typography font variables cascade correctly into rendered HTML");

// 14. Test section-level hover tokens & configurable spacing
const hoverSpacingJules = validateBarberConfig({
  businessName: "Hover Spacing Jules",
  slug: "hover-spacing-jules",
  theme: "jules",
  sections: {
    services: {
      style: {
        buttonHoverBackgroundColor: "#ff4400",
        buttonHoverTextColor: "#ffffff",
        paddingTop: "90px",
        paddingBottom: "110px",
      },
    },
  },
  services: [{ name: "Artisan Cut", price: "60" }],
});
const hoverSpacingHtml = renderToString(React.createElement(JulesTheme, { barber: hoverSpacingJules }));
assert(hoverSpacingHtml.includes("--section-btn-hover-bg:#ff4400") || hoverSpacingHtml.includes("--section-btn-hover-bg: #ff4400"), "Must output --section-btn-hover-bg");
assert(hoverSpacingHtml.includes("--section-pt:90px") || hoverSpacingHtml.includes("--section-pt: 90px") || hoverSpacingHtml.includes("padding-top:90px"), "Must output spacing controls");
console.log("✔ Section hover tokens and spacing controls render correctly into theme HTML");

// 15. Test ResponsiveImage integration with distinct mobile/desktop sources
const responsiveClient = validateBarberConfig({
  businessName: "Responsive Image Barber",
  slug: "responsive-image-barber",
  theme: "noir",
  packages: [
    {
      name: "VIP Cut",
      price: "90",
      image: {
        desktop: "https://example.com/vip-desktop.jpg",
        mobile: "https://example.com/vip-mobile.jpg",
        alt: "VIP Cut in high resolution",
      },
    },
  ],
});
const responsiveHtml = renderToString(React.createElement(NoirTheme, { barber: responsiveClient }));
assert(responsiveHtml.includes("<picture"), "Must render <picture> element for responsive images");
assert(responsiveHtml.includes('media="(max-width: 767px)"'), "Must include mobile media query source");
assert(responsiveHtml.includes("https://example.com/vip-mobile.jpg"), "Must include mobile image URL");
assert(responsiveHtml.includes("https://example.com/vip-desktop.jpg"), "Must include desktop image URL");
console.log("✔ ResponsiveImage renders accessible <picture> with responsive breakpoints across themes");

console.log("=== ALL MULTI-CLIENT MASTER TEMPLATE VERIFICATIONS PASSED! ===");
