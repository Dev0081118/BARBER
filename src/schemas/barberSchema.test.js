import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import {
  validateBarberConfig,
  THEMES,
  isValidCssColor,
  sanitizeColor,
  sanitizeUrl,
  formatWhatsAppUrl,
  isValidFontFamily,
  sanitizeFontFamily,
  isValidFontUrl,
  isValidCssSpacing,
  isValidCssMaxWidth,
  normalizeResponsiveImage,
  getSectionConfig,
  getSectionStyleProperties,
} from "./barberSchema.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test("validates complete barber configuration", () => {
  const input = {
    businessName: "Test Barber",
    slug: "test-barber",
    theme: "noir-luxury",
    services: [{ name: "Fade", price: "40" }],
  };
  const result = validateBarberConfig(input);
  assert.strictEqual(result.businessName, "Test Barber");
  assert.strictEqual(result.slug, "test-barber");
  assert.strictEqual(result.theme, THEMES.NOIR_LUXURY);
  assert.strictEqual(result.services.length, 1);
  assert.strictEqual(result.services[0].price, "$40");
});

test("safely handles missing optional fields without crashing or producing undefined placeholders", () => {
  const minimal = {
    businessName: "Minimal Perth Barber",
  };
  const result = validateBarberConfig(minimal);
  assert.strictEqual(result.businessName, "Minimal Perth Barber");
  assert.strictEqual(result.slug, "minimal-perth-barber");
  assert.strictEqual(result.theme, THEMES.NOIR_LUXURY);
  assert.deepStrictEqual(result.services, []);
  assert.deepStrictEqual(result.team, []);
  assert.deepStrictEqual(result.reviews, []);
  assert.deepStrictEqual(result.gallery, []);
  assert.strictEqual(result.sections.services, false);
  assert.strictEqual(result.sections.team, false);
  assert.strictEqual(result.sections.reviews, false);
  assert.strictEqual(result.sections.gallery, false);
});

test("throws error when businessName is missing", () => {
  assert.throws(() => {
    validateBarberConfig({});
  }, /businessName is required/);
});

test("falls back to default theme when invalid theme is supplied", () => {
  const result = validateBarberConfig({
    businessName: "Fallback Barber",
    theme: "neon-cyberpunk-unknown",
  });
  assert.strictEqual(result.theme, THEMES.NOIR_LUXURY);
});

test("validates jules theme and aliases", () => {
  const julesResult = validateBarberConfig({
    businessName: "Jules Barber",
    theme: "jules",
  });
  assert.strictEqual(julesResult.theme, "jules");

  const aliasResult = validateBarberConfig({
    businessName: "Jules Alias Barber",
    theme: "hammoudi-original",
  });
  assert.strictEqual(aliasResult.theme, "jules");

  const originalResult = validateBarberConfig({
    businessName: "Original Barber",
    theme: "original",
  });
  assert.strictEqual(originalResult.theme, "jules");
});

test("verifies existing client configs retain their original theme mappings", () => {
  const clientsDir = path.resolve(__dirname, "../data/clients");

  const readClient = (name) => {
    const raw = JSON.parse(fs.readFileSync(path.join(clientsDir, `${name}.json`), "utf-8"));
    return validateBarberConfig(raw);
  };

  const hammoudi = readClient("hammoudi");
  assert.strictEqual(hammoudi.theme, "noir");
  assert.strictEqual(hammoudi.businessName, "Next Level Barbershop");

  const districtNine = readClient("district-nine");
  assert.strictEqual(districtNine.theme, "modern");
  assert.strictEqual(districtNine.businessName, "District 9 Barber Co.");

  const stGeorge = readClient("st-george-guild");
  assert.strictEqual(stGeorge.theme, "classic");
  assert.strictEqual(stGeorge.businessName, "St. George Barber Guild");

  const hammoudiOriginal = readClient("hammoudi-original");
  assert.strictEqual(hammoudiOriginal.theme, "jules");
  assert.strictEqual(hammoudiOriginal.businessName, "Hammoudi Barber Shop");
});

test("validates and sanitizes CSS colors safely", () => {
  assert.strictEqual(isValidCssColor("#d4af37"), true);
  assert.strictEqual(isValidCssColor("#fff"), true);
  assert.strictEqual(isValidCssColor("rgb(255, 0, 0)"), true);
  assert.strictEqual(isValidCssColor("rgba(0, 0, 0, 0.5)"), true);
  assert.strictEqual(isValidCssColor("black"), true);
  assert.strictEqual(isValidCssColor("transparent"), true);

  // Unsafe / invalid inputs
  assert.strictEqual(isValidCssColor("javascript:alert(1)"), false);
  assert.strictEqual(isValidCssColor("red; background: url('evil.jpg')"), false);
  assert.strictEqual(isValidCssColor("<script>"), false);
  assert.strictEqual(isValidCssColor(""), false);
  assert.strictEqual(isValidCssColor(null), false);

  assert.strictEqual(sanitizeColor("#d4af37"), "#d4af37");
  assert.strictEqual(sanitizeColor("invalid-color-injection;", "#000000"), "#000000");
});

test("validates and sanitizes URLs safely", () => {
  assert.strictEqual(sanitizeUrl("https://example.com"), "https://example.com");
  assert.strictEqual(sanitizeUrl("http://example.com"), "http://example.com");
  assert.strictEqual(sanitizeUrl("/assets/logo.png"), "/assets/logo.png");
  assert.strictEqual(sanitizeUrl("#packages"), "#packages");
  assert.strictEqual(sanitizeUrl("tel:+61415300889"), "tel:+61415300889");
  assert.strictEqual(sanitizeUrl("mailto:test@barber.com"), "mailto:test@barber.com");

  // Rejects unsafe schemes
  assert.strictEqual(sanitizeUrl("javascript:alert(1)"), "");
  assert.strictEqual(sanitizeUrl("data:text/html;base64,PHNjcmlwdD4="), "");
  assert.strictEqual(sanitizeUrl(null, "fallback"), "fallback");
});

test("formats WhatsApp URLs safely", () => {
  assert.strictEqual(formatWhatsAppUrl("+61 415 300 889"), "https://wa.me/61415300889");
  assert.strictEqual(formatWhatsAppUrl("0415300889", "Hi"), "https://wa.me/0415300889?text=Hi");
  assert.strictEqual(formatWhatsAppUrl("https://wa.me/61415300889"), "https://wa.me/61415300889");
  assert.strictEqual(formatWhatsAppUrl(""), "");
});

test("supports structured business model with backward compatibility", () => {
  const structured = {
    business: {
      name: "Structured Barber Studio",
      legalName: "Structured Studio Pty Ltd",
      tagline: "Precision & Elegance",
      description: "A bespoke grooming sanctuary.",
      phone: "+61 8 9000 1111",
      email: "hello@structuredbarber.com",
      address: {
        street: "100 St Georges Terrace",
        city: "Perth",
        state: "WA",
        postcode: "6000",
        country: "Australia",
      },
      bookingUrl: "https://booking.example.com",
    },
    theme: "modern",
  };

  const validated = validateBarberConfig(structured);
  assert.strictEqual(validated.businessName, "Structured Barber Studio");
  assert.strictEqual(validated.legalName, "Structured Studio Pty Ltd");
  assert.strictEqual(validated.tagline, "Precision & Elegance");
  assert.strictEqual(validated.businessDescription, "A bespoke grooming sanctuary.");
  assert.strictEqual(validated.phone, "+61 8 9000 1111");
  assert.strictEqual(validated.email, "hello@structuredbarber.com");
  assert.strictEqual(validated.address.street, "100 St Georges Terrace");
  assert.strictEqual(validated.bookingUrl, "https://booking.example.com");
});

test("accepts valid section-level color and style overrides", () => {
  const clientWithStyles = {
    businessName: "Styled Barber",
    sections: {
      hero: {
        enabled: true,
        style: {
          backgroundColor: "#112233",
          textColor: "#ffffff",
          headingColor: "#ffd700",
          accentColor: "#ff4500",
          overlayOpacity: 0.85,
        },
      },
      services: {
        enabled: true,
        style: {
          backgroundColor: "#223344",
          priceColor: "#00ffcc",
        },
      },
    },
    services: [{ name: "Cut", price: "50" }],
  };

  const validated = validateBarberConfig(clientWithStyles);
  const heroConfig = getSectionConfig(validated, "hero");
  assert.strictEqual(heroConfig.enabled, true);
  assert.strictEqual(heroConfig.style.backgroundColor, "#112233");
  assert.strictEqual(heroConfig.style.headingColor, "#ffd700");
  assert.strictEqual(heroConfig.style.accentColor, "#ff4500");
  assert.strictEqual(heroConfig.style.overlayOpacity, 0.85);

  const heroStyleProps = getSectionStyleProperties(heroConfig.style);
  assert.strictEqual(heroStyleProps["--section-bg"], "#112233");
  assert.strictEqual(heroStyleProps["--section-heading"], "#ffd700");
  assert.strictEqual(heroStyleProps["--section-accent"], "#ff4500");

  const servicesConfig = getSectionConfig(validated, "services");
  assert.strictEqual(servicesConfig.style.priceColor, "#00ffcc");
  const srvStyleProps = getSectionStyleProperties(servicesConfig.style);
  assert.strictEqual(srvStyleProps["--section-price"], "#00ffcc");
});

test("supports custom section ordering and cleanly handles disabled sections", () => {
  const clientWithOrder = {
    businessName: "Ordered Barber",
    sectionOrder: ["services", "hero", "footer"],
    sections: {
      services: true,
      hero: false,
    },
    services: [{ name: "Trim", price: "25" }],
  };

  const validated = validateBarberConfig(clientWithOrder);
  assert.deepStrictEqual(validated.sectionOrder, ["services", "hero", "footer"]);
  assert.strictEqual(validated.sections.services, true);
  assert.strictEqual(validated.sections.hero, false);

  const heroConfig = getSectionConfig(validated, "hero");
  assert.strictEqual(heroConfig.enabled, false);
});

test("supports varying service and package item counts without layout failure", () => {
  // 12 services
  const twelveServices = Array.from({ length: 12 }, (_, i) => ({
    name: `Service ${i + 1}`,
    price: 30 + i * 5,
    category: i % 2 === 0 ? "Hair" : "Beard",
  }));

  const clientManyServices = validateBarberConfig({
    businessName: "Twelve Services Barber",
    services: twelveServices,
  });

  assert.strictEqual(clientManyServices.services.length, 12);
  assert.strictEqual(clientManyServices.services[0].price, "$30");
  assert.strictEqual(clientManyServices.services[11].price, "$85");

  // 0 packages
  const clientZeroPackages = validateBarberConfig({
    businessName: "Zero Package Barber",
    packages: [],
  });
  assert.strictEqual(clientZeroPackages.packages.length, 0);
  assert.strictEqual(clientZeroPackages.sections.packages, false);
});

test("handles team members with zero, one, or multiple entries safely", () => {
  const zeroTeam = validateBarberConfig({ businessName: "Solo Barber", team: [] });
  assert.strictEqual(zeroTeam.team.length, 0);
  assert.strictEqual(zeroTeam.sections.team, false);

  const oneTeam = validateBarberConfig({
    businessName: "One Man Barber",
    team: [{ name: "Sole Barber", role: "Owner" }],
  });
  assert.strictEqual(oneTeam.team.length, 1);
  assert.strictEqual(oneTeam.team[0].name, "Sole Barber");
  assert.strictEqual(oneTeam.sections.team, true);
});

test("validates and sanitizes font family strings and remote font sources safely", () => {
  // Valid font families
  assert.strictEqual(isValidFontFamily("Cinzel, serif"), true);
  assert.strictEqual(isValidFontFamily("'Playfair Display', Georgia, serif"), true);
  assert.strictEqual(isValidFontFamily("Helvetica Neue, sans-serif"), true);
  assert.strictEqual(isValidFontFamily("monospace"), true);

  // Unsafe / injection font family attempts
  assert.strictEqual(isValidFontFamily("serif; background: red;"), false);
  assert.strictEqual(isValidFontFamily("font} body { color: red; }"), false);
  assert.strictEqual(isValidFontFamily("<script>alert(1)</script>"), false);
  assert.strictEqual(isValidFontFamily("expression(alert(1))"), false);

  // Sanitize font family
  assert.strictEqual(sanitizeFontFamily("Cinzel, serif"), "Cinzel, serif");
  assert.strictEqual(sanitizeFontFamily("bad; font", "fallback-font"), "fallback-font");

  // Remote font URLs
  assert.strictEqual(isValidFontUrl("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap"), true);
  assert.strictEqual(isValidFontUrl("https://use.typekit.net/abc1234.css"), true);
  assert.strictEqual(isValidFontUrl("/assets/fonts/custom-font.woff2"), true);
  assert.strictEqual(isValidFontUrl("http://insecure-cdn.com/font.css"), false);
  assert.strictEqual(isValidFontUrl("javascript:alert(1)"), false);
  assert.strictEqual(isValidFontUrl("https://malicious-site.com/exploit.css"), false);

  // Branding schema normalization
  const clientWithFonts = validateBarberConfig({
    businessName: "Typo Barber",
    branding: {
      headingFont: "Cinzel, serif",
      bodyFont: "sans-serif",
      fontSources: [
        "https://fonts.googleapis.com/css2?family=Cinzel&display=swap",
        "javascript:evil()",
      ],
    },
  });

  assert.strictEqual(clientWithFonts.branding.headingFont, "Cinzel, serif");
  assert.strictEqual(clientWithFonts.branding.bodyFont, "sans-serif");
  assert.deepStrictEqual(clientWithFonts.branding.fontSources, [
    "https://fonts.googleapis.com/css2?family=Cinzel&display=swap",
  ]);
});

test("accepts section-level hover tokens and converts them to CSS custom properties", () => {
  const sectionStyle = {
    backgroundColor: "#111111",
    buttonBackground: "#d4af37",
    buttonTextColor: "#000000",
    buttonHoverBackgroundColor: "#ffffff",
    buttonHoverTextColor: "#111111",
    cardHoverBackgroundColor: "#222222",
    accentHoverColor: "#ffaa00",
    linkHoverColor: "#00eeff",
  };

  const props = getSectionStyleProperties(sectionStyle);
  assert.strictEqual(props["--section-btn-bg"], "#d4af37");
  assert.strictEqual(props["--section-btn-text"], "#000000");
  assert.strictEqual(props["--section-btn-hover-bg"], "#ffffff");
  assert.strictEqual(props["--section-btn-hover-text"], "#111111");
  assert.strictEqual(props["--section-card-hover-bg"], "#222222");
  assert.strictEqual(props["--section-accent-hover"], "#ffaa00");
  assert.strictEqual(props["--section-link-hover"], "#00eeff");
});

test("validates and applies section spacing and container width controls", () => {
  assert.strictEqual(isValidCssSpacing("80px"), true);
  assert.strictEqual(isValidCssSpacing("5rem"), true);
  assert.strictEqual(isValidCssSpacing("10%"), true);
  assert.strictEqual(isValidCssSpacing("0"), true);
  assert.strictEqual(isValidCssSpacing("80px; color: red"), false);
  assert.strictEqual(isValidCssSpacing("calc(100vh - 20px)"), false);

  assert.strictEqual(isValidCssMaxWidth("1400px"), true);
  assert.strictEqual(isValidCssMaxWidth("none"), true);
  assert.strictEqual(isValidCssMaxWidth("full"), true);
  assert.strictEqual(isValidCssMaxWidth("1200px; display: none"), false);

  const styleWithSpacing = {
    paddingTop: "96px",
    paddingBottom: "80px",
    maxWidth: "1400px",
  };

  const props = getSectionStyleProperties(styleWithSpacing);
  assert.strictEqual(props["--section-pt"], "96px");
  assert.strictEqual(props.paddingTop, "96px");
  assert.strictEqual(props["--section-pb"], "80px");
  assert.strictEqual(props.paddingBottom, "80px");
  assert.strictEqual(props["--section-max-w"], "1400px");
  assert.strictEqual(props.maxWidth, "1400px");
});

test("normalizes responsive images with desktop/mobile variants and alt text", () => {
  // String input
  const fromString = normalizeResponsiveImage("https://example.com/photo.jpg", "Barber cutting hair");
  assert.deepStrictEqual(fromString, {
    desktop: "https://example.com/photo.jpg",
    mobile: "https://example.com/photo.jpg",
    url: "https://example.com/photo.jpg",
    alt: "Barber cutting hair",
  });

  // Object input with separate mobile/desktop sources
  const fromObject = normalizeResponsiveImage({
    desktop: "https://example.com/desktop.jpg",
    mobile: "https://example.com/mobile.jpg",
    alt: "Craft haircut in studio",
  });
  assert.deepStrictEqual(fromObject, {
    desktop: "https://example.com/desktop.jpg",
    mobile: "https://example.com/mobile.jpg",
    url: "https://example.com/desktop.jpg",
    alt: "Craft haircut in studio",
  });

  // Invalid / unsafe image input
  assert.strictEqual(normalizeResponsiveImage("javascript:alert(1)"), null);
  assert.strictEqual(normalizeResponsiveImage(null), null);
});
