/**
 * Schema and validation system for the Barber Website System.
 * Ensures data integrity, provides safe defaults, and prevents runtime crashes
 * or empty placeholder rendering when optional data is absent.
 */

export const THEMES = {
  NOIR_LUXURY: "noir-luxury",
  MODERN_STUDIO: "modern-studio",
  HERITAGE_CLASSIC: "heritage-classic",
};

export const VALID_THEMES = Object.values(THEMES);

/**
 * Validates and normalizes raw barber configuration data.
 * @param {Object} raw - Raw barber data from JSON or API
 * @returns {Object} Validated and safe barber configuration object
 */
export function validateBarberConfig(raw) {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid barber configuration: expected an object");
  }

  // Required fields
  const businessName = (raw.businessName || "").trim();
  if (!businessName) {
    throw new Error("Invalid barber configuration: businessName is required");
  }

  const slug = (raw.slug || businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-")).trim();

  // Validate theme with fallback
  let theme = raw.theme;
  if (!VALID_THEMES.includes(theme)) {
    theme = THEMES.NOIR_LUXURY;
  }

  // Sanitize text fields
  const tagline = typeof raw.tagline === "string" ? raw.tagline.trim() : "";
  const businessDescription = typeof raw.businessDescription === "string" ? raw.businessDescription.trim() : "";
  const location = typeof raw.location === "string" ? raw.location.trim() : "";
  const city = typeof raw.city === "string" ? raw.city.trim() : "Perth, WA";
  const addressLine = typeof raw.addressLine === "string" ? raw.addressLine.trim() : location;
  const mapUrl = typeof raw.mapUrl === "string" ? raw.mapUrl.trim() : "";
  const phone = typeof raw.phone === "string" ? raw.phone.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const bookingUrl = typeof raw.bookingUrl === "string" ? raw.bookingUrl.trim() : "";

  // Normalize hours
  const hours = Array.isArray(raw.hours)
    ? raw.hours.filter((h) => h && h.days && h.time)
    : raw.hours && typeof raw.hours === "object"
    ? Object.entries(raw.hours).map(([days, time]) => ({ days, time }))
    : [];

  // Normalize services
  const services = Array.isArray(raw.services)
    ? raw.services
        .filter((s) => s && (s.name || s.label))
        .map((s, index) => ({
          id: s.id || `srv-${index + 1}`,
          number: s.number || String(index + 1).padStart(2, "0"),
          name: s.name || s.label,
          category: s.category || "General",
          description: s.description || "",
          price: s.price ? (String(s.price).startsWith("$") ? s.price : `$${s.price}`) : "",
          duration: s.duration || "",
          popular: Boolean(s.popular),
          icon: s.icon || null,
        }))
    : [];

  // Normalize packages
  const packages = Array.isArray(raw.packages)
    ? raw.packages
        .filter((p) => p && p.name)
        .map((p, index) => ({
          id: p.id || `pkg-${index + 1}`,
          number: p.number || String(index + 1).padStart(2, "0"),
          name: p.name,
          price: p.price ? (String(p.price).startsWith("$") ? p.price : `$${p.price}`) : "",
          description: p.description || "",
          services: Array.isArray(p.services) ? p.services : [],
          image: p.image || null,
          accent: p.accent || null,
          badge: p.badge || null,
        }))
    : [];

  // Normalize team
  const team = Array.isArray(raw.team)
    ? raw.team
        .filter((t) => t && t.name)
        .map((t, index) => ({
          id: t.id || `team-${index + 1}`,
          name: t.name,
          role: t.role || "Barber",
          experience: t.experience || "",
          bio: t.bio || "",
          image: t.image || null,
        }))
    : [];

  // Normalize reviews
  const reviews = Array.isArray(raw.reviews)
    ? raw.reviews
        .filter((r) => r && (r.review || r.text) && (r.name || r.author))
        .map((r, index) => ({
          id: r.id || `rev-${index + 1}`,
          name: r.name || r.author,
          review: r.review || r.text,
          date: r.date || "",
          rating: Number(r.rating) || 5,
          source: r.source || "Google Review",
        }))
    : [];

  // Rating summary
  const ratingSummary = raw.ratingSummary && typeof raw.ratingSummary === "object"
    ? {
        score: Number(raw.ratingSummary.score) || 4.9,
        totalReviews: raw.ratingSummary.totalReviews || `${reviews.length}+ reviews`,
        platform: raw.ratingSummary.platform || "Google Verified",
      }
    : reviews.length > 0
    ? {
        score: 4.8,
        totalReviews: `${reviews.length}+ reviews`,
        platform: "Verified Reviews",
      }
    : null;

  // Normalize gallery
  const gallery = Array.isArray(raw.gallery)
    ? raw.gallery
        .filter((g) => g && (g.image || g.src))
        .map((g, index) => ({
          id: g.id || `gal-${index + 1}`,
          title: g.title || `Craft Moment ${index + 1}`,
          image: g.image || g.src,
          alt: g.alt || `${businessName} photography`,
        }))
    : [];

  // Social links
  const socialLinks = Array.isArray(raw.socialLinks)
    ? raw.socialLinks.filter((s) => s && s.url && (s.platform || s.label))
    : [];

  // Section visibility flags with sensible defaults
  const sections = {
    hero: raw.sections?.hero !== false,
    marquee: raw.sections?.marquee !== false,
    story: raw.sections?.story !== false && Boolean(businessDescription),
    services: raw.sections?.services !== false && services.length > 0,
    packages: raw.sections?.packages !== false && packages.length > 0,
    gallery: raw.sections?.gallery !== false && gallery.length > 0,
    team: raw.sections?.team !== false && team.length > 0,
    reviews: raw.sections?.reviews !== false && reviews.length > 0,
    hours: raw.sections?.hours !== false && hours.length > 0,
    contact: raw.sections?.contact !== false,
    footer: raw.sections?.footer !== false,
  };

  // SEO details
  const seo = {
    title: raw.seo?.title || `${businessName} | Master Barber & Grooming | Perth`,
    description:
      raw.seo?.description ||
      businessDescription ||
      `Experience premier grooming, precision fades, and bespoke barbering at ${businessName} in Perth, Western Australia.`,
    keywords: raw.seo?.keywords || [
      "Perth barber",
      "barbershop Perth",
      "mens haircut Perth",
      "skin fade Perth",
      "hot towel shave",
    ],
  };

  // Branding / images
  const branding = {
    logo: raw.branding?.logo || raw.logo || null,
    heroImage: raw.branding?.heroImage || raw.heroImage || null,
    ambientVideo: raw.branding?.ambientVideo || null,
    accentColor: raw.branding?.accentColor || null,
    tag: raw.branding?.tag || "EST. PERTH",
  };

  return {
    businessName,
    slug,
    theme,
    tagline,
    businessDescription,
    location,
    city,
    addressLine,
    mapUrl,
    phone,
    email,
    bookingUrl,
    hours,
    services,
    packages,
    team,
    reviews,
    ratingSummary,
    gallery,
    socialLinks,
    sections,
    seo,
    branding,
  };
}
