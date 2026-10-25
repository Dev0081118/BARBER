/**
 * Schema and validation system for the Barber Website System.
 * Ensures data integrity, provides safe defaults, and prevents runtime crashes
 * or empty placeholder rendering when optional data is absent.
 */

export const THEMES = {
  NOIR: "noir",
  MODERN: "modern",
  CLASSIC: "classic",
  JULES: "jules",
  // Backward compatibility aliases
  NOIR_LUXURY: "noir",
  MODERN_STUDIO: "modern",
  HERITAGE_CLASSIC: "classic",
  HAMMOUDI_ORIGINAL: "jules",
  ORIGINAL: "jules",
};

const THEME_ALIASES = {
  noir: "noir",
  "noir-luxury": "noir",
  modern: "modern",
  "modern-studio": "modern",
  classic: "classic",
  "heritage-classic": "classic",
  jules: "jules",
  "hammoudi-original": "jules",
  original: "jules",
};

export const VALID_THEMES = ["noir", "modern", "classic", "jules"];

/**
 * Normalizes a theme name.
 */
export function normalizeTheme(theme) {
  if (!theme) return "noir";
  const key = String(theme).toLowerCase().trim();
  return THEME_ALIASES[key] || "noir";
}

/**
 * Validates CSS color values to prevent CSS/JS injection attacks.
 */
export function isValidCssColor(color) {
  if (!color || typeof color !== "string") return false;
  const c = color.trim().toLowerCase();
  if (!c) return false;

  // Disallow injection characters or unsafe CSS/JS expressions
  if (/[;<>{}\\\n\r]/.test(c) || c.includes("javascript:") || c.includes("expression") || c.includes("url(")) {
    return false;
  }

  // Hex color (#rgb, #rgba, #rrggbb, #rrggbbaa)
  if (/^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(c)) return true;

  // rgb / rgba format
  if (/^rgba?\(\s*[\d.]+%?\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?\s*(?:,\s*[\d.]+%?\s*)?\)$/i.test(c)) return true;
  if (/^rgba?\(\s*[\d.]+%?\s+[\d.]+%?\s+[\d.]+%?(?:\s*\/\s*[\d.]+%?)?\s*\)$/i.test(c)) return true;

  // hsl / hsla format
  if (/^hsla?\(\s*[\d.]+(?:deg|rad|turn)?\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?\s*(?:,\s*[\d.]+%?\s*)?\)$/i.test(c)) return true;

  // Standard CSS named colors & CSS keywords
  const namedColors = new Set([
    "transparent", "currentcolor", "inherit", "initial", "unset",
    "black", "white", "gray", "grey", "silver", "maroon", "red", "purple",
    "fuchsia", "green", "lime", "olive", "yellow", "navy", "blue", "teal", "aqua",
    "orange", "aliceblue", "antiquewhite", "aquamarine", "azure", "beige", "bisque",
    "blanchedalmond", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse",
    "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue",
    "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki",
    "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon",
    "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise",
    "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue",
    "firebrick", "floralwhite", "forestgreen", "gainsboro", "ghostwhite", "gold",
    "goldenrod", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory",
    "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue",
    "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen",
    "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue",
    "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "limegreen",
    "linen", "magenta", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple",
    "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise",
    "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin",
    "navajowhite", "oldlace", "olivedrab", "orangered", "orchid", "palegoldenrod",
    "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru",
    "pink", "plum", "powderblue", "rosybrown", "royalblue", "saddlebrown", "salmon",
    "sandybrown", "seagreen", "seashell", "sienna", "skyblue", "slateblue", "slategray",
    "slategrey", "snow", "springgreen", "steelblue", "tan", "thistle", "tomato",
    "turquoise", "violet", "wheat", "whitesmoke", "yellowgreen"
  ]);

  return namedColors.has(c);
}

/**
 * Validates font family strings to prevent CSS injection.
 */
export function isValidFontFamily(font) {
  if (!font || typeof font !== "string") return false;
  const f = font.trim();
  if (!f || f.length > 100) return false;
  if (/[;<>{}\\\n\r]/.test(f)) return false;
  if (/javascript:|expression|url\(|<script/i.test(f)) return false;
  return /^[a-zA-Z0-9\s,\-_"']+$/.test(f);
}

/**
 * Sanitizes a font family string.
 */
export function sanitizeFontFamily(font, fallback = null) {
  if (isValidFontFamily(font)) return font.trim();
  return fallback;
}

/**
 * Validates remote font URLs (e.g. Google Fonts, Adobe Typekit, Bunny Fonts, local assets).
 */
export function isValidFontUrl(url) {
  if (!url || typeof url !== "string") return false;
  const u = url.trim();
  if (!u || u.length > 500) return false;
  if (/[<>{}"'\\\n\r]/.test(u) || /javascript:|data:|<script/i.test(u)) return false;

  if (u.startsWith("/") && !u.startsWith("//")) {
    return true;
  }

  try {
    const parsed = new URL(u);
    if (parsed.protocol !== "https:") return false;
    const allowedHosts = [
      "fonts.googleapis.com",
      "fonts.gstatic.com",
      "use.typekit.net",
      "fonts.bunny.net",
      "cdn.jsdelivr.net",
    ];
    return allowedHosts.some((host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`));
  } catch {
    return false;
  }
}

/**
 * Validates CSS spacing values (px, rem, em, %, vh, vw).
 */
export function isValidCssSpacing(val) {
  if (!val || typeof val !== "string") return false;
  const v = val.trim().toLowerCase();
  if (!v || v.length > 30) return false;
  if (/[;<>{}\\\n\r]/.test(v) || /javascript:|expression|url\(/i.test(v)) return false;
  return /^(0|0px|0rem|0em|\d+(\.\d+)?(px|rem|em|%|vh|vw|ch))$/i.test(v);
}

/**
 * Validates CSS max-width / container-width values.
 */
export function isValidCssMaxWidth(val) {
  if (!val || typeof val !== "string") return false;
  const v = val.trim().toLowerCase();
  if (!v || v.length > 30) return false;
  if (/[;<>{}\\\n\r]/.test(v) || /javascript:|expression|url\(/i.test(v)) return false;
  const standard = new Set(["none", "full", "min-content", "max-content", "fit-content"]);
  if (standard.has(v)) return true;
  return /^(0|\d+(\.\d+)?(px|rem|em|%|ch|vw|vh))$/i.test(v);
}

/**
 * Sanitizes a CSS color value, returning fallback if invalid.
 */
export function sanitizeColor(color, fallback = null) {
  if (isValidCssColor(color)) return color.trim();
  return fallback;
}

/**
 * Sanitizes a URL, rejecting javascript: and data: schemes.
 */
export function sanitizeUrl(url, fallback = "") {
  if (!url || typeof url !== "string") return fallback;
  const trimmed = url.trim();
  if (/^(https?:\/\/|\/|#|mailto:|tel:)/i.test(trimmed)) {
    if (/^(javascript|data):/i.test(trimmed)) return fallback;
    return trimmed;
  }
  return fallback;
}

/**
 * Generates a safe WhatsApp URL from a phone number or WhatsApp URL.
 */
export function formatWhatsAppUrl(numberOrUrl, defaultMessage = "") {
  if (!numberOrUrl || typeof numberOrUrl !== "string") return "";
  const trimmed = numberOrUrl.trim();
  if (trimmed.startsWith("https://wa.me/") || trimmed.startsWith("https://api.whatsapp.com/")) {
    return sanitizeUrl(trimmed);
  }
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return "";
  const base = `https://wa.me/${digits}`;
  return defaultMessage ? `${base}?text=${encodeURIComponent(defaultMessage)}` : base;
}

/**
 * Sanitizes and normalizes an image URL or relative asset path.
 */
export function sanitizeImageUrl(src, fallback = null) {
  if (!src || typeof src !== "string") return fallback;
  const trimmed = src.trim();
  if (!trimmed) return fallback;
  if (/^(javascript|data):/i.test(trimmed)) return fallback;
  return trimmed;
}

/**
 * Normalizes section styling parameters safely.
 */
export function normalizeSectionStyle(style = {}) {
  if (!style || typeof style !== "object") return {};
  const normalized = {};

  const colorFields = [
    "backgroundColor",
    "textColor",
    "headingColor",
    "accentColor",
    "borderColor",
    "cardBackground",
    "priceColor",
    "overlayColor",
    "buttonBackground",
    "buttonTextColor",
    "buttonBorderColor",
    "buttonHoverBackgroundColor",
    "buttonHoverTextColor",
    "btnHoverBg",
    "btnHoverText",
    "cardHoverBackgroundColor",
    "cardHoverBg",
    "accentHoverColor",
    "accentHover",
    "linkHoverColor",
    "linkHover",
  ];

  for (const field of colorFields) {
    if (style[field]) {
      const sanitized = sanitizeColor(style[field]);
      if (sanitized) normalized[field] = sanitized;
    }
  }

  // Spacing & sizing
  if (style.paddingTop && isValidCssSpacing(style.paddingTop)) normalized.paddingTop = style.paddingTop.trim();
  if (style.paddingBottom && isValidCssSpacing(style.paddingBottom)) normalized.paddingBottom = style.paddingBottom.trim();
  if (style.paddingY && isValidCssSpacing(style.paddingY)) normalized.paddingY = style.paddingY.trim();
  if (style.maxWidth && isValidCssMaxWidth(style.maxWidth)) normalized.maxWidth = style.maxWidth.trim();
  if (style.containerWidth && isValidCssMaxWidth(style.containerWidth)) normalized.containerWidth = style.containerWidth.trim();

  if (typeof style.overlayOpacity === "number" && !isNaN(style.overlayOpacity)) {
    normalized.overlayOpacity = Math.max(0, Math.min(1, style.overlayOpacity));
  } else if (style.overlayOpacity) {
    const parsed = parseFloat(style.overlayOpacity);
    if (!isNaN(parsed)) normalized.overlayOpacity = Math.max(0, Math.min(1, parsed));
  }

  return normalized;
}

/**
 * Normalizes responsive image definitions ({ desktop, mobile, alt } or string).
 */
export function normalizeResponsiveImage(imgInput, fallbackAlt = "") {
  if (!imgInput) return null;
  if (typeof imgInput === "string") {
    const sanitized = sanitizeImageUrl(imgInput);
    if (!sanitized) return null;
    return {
      desktop: sanitized,
      mobile: sanitized,
      url: sanitized,
      alt: fallbackAlt,
    };
  }
  if (typeof imgInput === "object") {
    const desktop = sanitizeImageUrl(imgInput.desktop || imgInput.desktopImage || imgInput.url || imgInput.image || imgInput.src);
    const mobile = sanitizeImageUrl(imgInput.mobile || imgInput.mobileImage || imgInput.mobileUrl || desktop);
    const alt = typeof imgInput.alt === "string" ? imgInput.alt.trim() : fallbackAlt;
    if (!desktop && !mobile) return null;
    return {
      desktop: desktop || mobile,
      mobile: mobile || desktop,
      url: desktop || mobile,
      alt,
    };
  }
  return null;
}

/**
 * Normalizes section content overrides.
 */
export function normalizeSectionContent(content = {}) {
  if (!content || typeof content !== "object") return {};
  return { ...content };
}

/**
 * Normalizes section image references.
 */
export function normalizeSectionImages(images = {}) {
  if (!images || typeof images !== "object") return {};
  const normalized = {};
  for (const [key, val] of Object.entries(images)) {
    if (typeof val === "string") {
      normalized[key] = sanitizeImageUrl(val);
    } else if (val && typeof val === "object") {
      normalized[key] = normalizeResponsiveImage(val, typeof val.alt === "string" ? val.alt.trim() : "");
    }
  }
  return normalized;
}

/**
 * Validates and normalizes raw barber configuration data.
 * @param {Object} raw - Raw barber data from JSON or API
 * @returns {Object} Validated and safe barber configuration object
 */
export function validateBarberConfig(raw) {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid barber configuration: expected an object");
  }

  // Required fields - support both businessName and business.name
  const businessName = (
    raw.businessName ||
    raw.business?.name ||
    ""
  ).trim();

  if (!businessName) {
    throw new Error("Invalid barber configuration: businessName is required");
  }

  const legalName = (raw.legalName || raw.business?.legalName || businessName).trim();
  const slug = (raw.slug || raw.business?.slug || businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-")).trim();

  // Validate theme with fallback
  const theme = normalizeTheme(raw.theme);

  // Sanitize text fields
  const tagline = typeof raw.tagline === "string"
    ? raw.tagline.trim()
    : typeof raw.business?.tagline === "string"
    ? raw.business.tagline.trim()
    : "";

  const businessDescription = typeof raw.businessDescription === "string"
    ? raw.businessDescription.trim()
    : typeof raw.business?.description === "string"
    ? raw.business.description.trim()
    : "";

  const category = (raw.category || raw.business?.category || "barbershop").trim();

  // Address & Location normalization
  const location = typeof raw.location === "string"
    ? raw.location.trim()
    : typeof raw.business?.location === "string"
    ? raw.business.location.trim()
    : "";

  const rawAddress = raw.address || raw.business?.address || {};
  const city = typeof raw.city === "string"
    ? raw.city.trim()
    : typeof rawAddress.city === "string"
    ? rawAddress.city.trim()
    : "Perth, WA";

  const addressLine = typeof raw.addressLine === "string"
    ? raw.addressLine.trim()
    : typeof rawAddress.street === "string"
    ? rawAddress.street.trim()
    : location;

  const address = {
    street: rawAddress.street || addressLine || "",
    suburb: rawAddress.suburb || "",
    city: rawAddress.city || city || "Perth",
    state: rawAddress.state || "WA",
    postcode: rawAddress.postcode || "",
    country: rawAddress.country || "Australia",
  };

  const mapUrl = sanitizeUrl(
    raw.mapUrl ||
    raw.location?.googleMapsUrl ||
    raw.business?.location?.googleMapsUrl ||
    raw.business?.mapUrl ||
    ""
  );

  const mapEmbedUrl = sanitizeUrl(
    raw.mapEmbedUrl ||
    raw.location?.googleMapsEmbedUrl ||
    raw.business?.location?.googleMapsEmbedUrl ||
    ""
  );

  const phone = typeof raw.phone === "string"
    ? raw.phone.trim()
    : typeof raw.business?.phone === "string"
    ? raw.business.phone.trim()
    : "";

  const rawWhatsapp = raw.whatsapp || raw.business?.whatsapp || "";
  const whatsapp = formatWhatsAppUrl(rawWhatsapp || phone);

  const email = typeof raw.email === "string"
    ? raw.email.trim()
    : typeof raw.business?.email === "string"
    ? raw.business.email.trim()
    : "";

  const bookingUrl = sanitizeUrl(
    raw.bookingUrl ||
    raw.business?.bookingUrl ||
    ""
  );

  // Normalize hours & holiday hours
  const hours = Array.isArray(raw.hours)
    ? raw.hours.filter((h) => h && h.days && h.time).map((h) => ({ days: String(h.days).trim(), time: String(h.time).trim() }))
    : raw.hours && typeof raw.hours === "object"
    ? Object.entries(raw.hours).map(([days, time]) => ({ days: String(days).trim(), time: String(time).trim() }))
    : [];

  const holidayHours = Array.isArray(raw.holidayHours)
    ? raw.holidayHours.filter((h) => h && (h.date || h.day)).map((h) => ({
        date: String(h.date || h.day).trim(),
        time: String(h.time || "Closed").trim(),
        note: h.note ? String(h.note).trim() : "",
      }))
    : [];

  // Normalize services
  const services = Array.isArray(raw.services)
    ? raw.services
        .filter((s) => s && (s.name || s.label))
        .map((s, index) => {
          const rawPrice = s.price !== undefined && s.price !== null ? String(s.price).trim() : "";
          let price = "";
          let currency = s.currency || "$";
          if (rawPrice) {
            if (/^[$€£¥]/.test(rawPrice)) {
              currency = rawPrice.charAt(0);
              price = rawPrice;
            } else {
              price = `${currency}${rawPrice}`;
            }
          }

          const normSrvImg = normalizeResponsiveImage(s.image || s.images, s.alt || `${s.name || "Service"} at ${businessName}`);
          return {
            id: s.id || `srv-${index + 1}`,
            number: s.number || String(index + 1).padStart(2, "0"),
            name: String(s.name || s.label).trim(),
            category: s.category ? String(s.category).trim() : "General",
            description: s.description ? String(s.description).trim() : "",
            price,
            currency,
            duration: s.duration ? String(s.duration).trim() : "",
            popular: Boolean(s.popular),
            icon: s.icon || null,
            image: normSrvImg?.url || sanitizeImageUrl(s.image),
            responsiveImage: normSrvImg,
            badge: s.badge ? String(s.badge).trim() : null,
            bookingUrl: sanitizeUrl(s.bookingUrl || bookingUrl),
            alt: s.alt ? String(s.alt).trim() : `${s.name || "Service"} at ${businessName}`,
          };
        })
    : [];

  // Normalize packages
  const packages = Array.isArray(raw.packages)
    ? raw.packages
        .filter((p) => p && p.name)
        .map((p, index) => {
          const rawPrice = p.price !== undefined && p.price !== null ? String(p.price).trim() : "";
          let price = "";
          let currency = p.currency || "$";
          if (rawPrice) {
            if (/^[$€£¥]/.test(rawPrice)) {
              currency = rawPrice.charAt(0);
              price = rawPrice;
            } else {
              price = `${currency}${rawPrice}`;
            }
          }

          const normPkgImg = normalizeResponsiveImage(p.image || p.images, `${p.name} package`);
          return {
            id: p.id || `pkg-${index + 1}`,
            number: p.number || String(index + 1).padStart(2, "0"),
            name: String(p.name).trim(),
            price,
            currency,
            description: p.description ? String(p.description).trim() : "",
            services: Array.isArray(p.services) ? p.services.map((item) => String(item).trim()) : [],
            image: normPkgImg?.url || sanitizeImageUrl(p.image),
            responsiveImage: normPkgImg,
            accent: p.accent || null,
            badge: p.badge ? String(p.badge).trim() : null,
            bookingUrl: sanitizeUrl(p.bookingUrl || bookingUrl),
            style: normalizeSectionStyle(p.style),
          };
        })
    : [];

  // Normalize team
  const team = Array.isArray(raw.team)
    ? raw.team
        .filter((t) => t && t.name)
        .map((t, index) => {
          const normTeamImg = normalizeResponsiveImage(t.image || t.images, t.alt || `${t.name} - Master Barber at ${businessName}`);
          return {
            id: t.id || `team-${index + 1}`,
            name: String(t.name).trim(),
            role: t.role ? String(t.role).trim() : "Barber",
            experience: t.experience ? String(t.experience).trim() : "",
            bio: t.bio ? String(t.bio).trim() : "",
            image: normTeamImg?.url || sanitizeImageUrl(t.image),
            responsiveImage: normTeamImg,
            alt: t.alt ? String(t.alt).trim() : `${t.name} - Master Barber at ${businessName}`,
            bookingUrl: sanitizeUrl(t.bookingUrl || bookingUrl),
            socialLinks: Array.isArray(t.socialLinks)
              ? t.socialLinks.filter((s) => s && s.url).map((s) => ({
                  platform: s.platform || "Instagram",
                  url: sanitizeUrl(s.url),
                  label: s.label || s.platform || "",
                }))
              : [],
          };
        })
    : [];

  // Normalize reviews
  const reviews = Array.isArray(raw.reviews)
    ? raw.reviews
        .filter((r) => r && (r.review || r.text) && (r.name || r.author))
        .map((r, index) => {
          const ratingNum = Number(r.rating);
          const rating = isNaN(ratingNum) ? 5 : Math.max(1, Math.min(5, Math.round(ratingNum)));
          return {
            id: r.id || `rev-${index + 1}`,
            name: String(r.name || r.author).trim(),
            review: String(r.review || r.text).trim(),
            date: r.date ? String(r.date).trim() : "",
            rating,
            source: r.source ? String(r.source).trim() : "Google Review",
            sourceUrl: sanitizeUrl(r.sourceUrl || ""),
          };
        })
    : [];

  // Rating summary
  const ratingSummary = raw.ratingSummary && typeof raw.ratingSummary === "object"
    ? {
        score: Number(raw.ratingSummary.score) || 4.9,
        totalReviews: raw.ratingSummary.totalReviews || `${reviews.length}+ reviews`,
        platform: raw.ratingSummary.platform || "Google Verified",
        url: sanitizeUrl(raw.ratingSummary.url || mapUrl),
      }
    : reviews.length > 0
    ? {
        score: 4.8,
        totalReviews: `${reviews.length}+ reviews`,
        platform: "Verified Reviews",
        url: mapUrl,
      }
    : null;

  // Normalize gallery
  const gallery = Array.isArray(raw.gallery)
    ? raw.gallery
        .filter((g) => g && (g.image || g.src))
        .map((g, index) => {
          const normGalImg = normalizeResponsiveImage(g.image || g.src || g.images, g.alt || `${businessName} photography`);
          return {
            id: g.id || `gal-${index + 1}`,
            title: g.title ? String(g.title).trim() : `Craft Moment ${index + 1}`,
            image: normGalImg?.url || sanitizeImageUrl(g.image || g.src),
            responsiveImage: normGalImg,
            alt: g.alt ? String(g.alt).trim() : `${businessName} photography`,
            link: sanitizeUrl(g.link || ""),
            focalPoint: g.focalPoint || "center",
          };
        })
    : [];

  // Social links
  const socialLinks = Array.isArray(raw.socialLinks)
    ? raw.socialLinks
        .filter((s) => s && s.url && (s.platform || s.label))
        .map((s) => ({
          platform: String(s.platform || s.label).trim(),
          url: sanitizeUrl(s.url),
          label: s.label ? String(s.label).trim() : String(s.platform).trim(),
        }))
    : [];

  // Section visibility flags with 100% backward compatibility
  // In existing tests, result.sections.services is expected to be a boolean!
  const rawSec = raw.sections || {};
  const isEnabled = (key, defaultTrueIfCondition = true) => {
    const val = rawSec[key];
    if (typeof val === "boolean") return val;
    if (val && typeof val === "object" && typeof val.enabled === "boolean") return val.enabled;
    return defaultTrueIfCondition;
  };

  const sections = {
    hero: isEnabled("hero", true),
    marquee: isEnabled("marquee", true),
    story: isEnabled("story", Boolean(businessDescription)),
    splitContent: isEnabled("splitContent", true),
    services: isEnabled("services", services.length > 0),
    packages: isEnabled("packages", packages.length > 0),
    gallery: isEnabled("gallery", gallery.length > 0),
    team: isEnabled("team", team.length > 0),
    reviews: isEnabled("reviews", reviews.length > 0),
    hours: isEnabled("hours", hours.length > 0),
    contact: isEnabled("contact", true),
    footer: isEnabled("footer", true),
  };

  // Section configs for detailed content, images, style overrides
  const sectionKeys = [
    "navigation",
    "hero",
    "marquee",
    "story",
    "splitContent",
    "services",
    "packages",
    "team",
    "reviews",
    "gallery",
    "hours",
    "contact",
    "footer",
  ];

  const sectionConfigs = {};
  for (const key of sectionKeys) {
    const sectionRaw = rawSec[key];
    const isObj = sectionRaw && typeof sectionRaw === "object";

    sectionConfigs[key] = {
      enabled: sections[key] !== false,
      order: isObj && typeof sectionRaw.order === "number" ? sectionRaw.order : null,
      content: isObj ? normalizeSectionContent(sectionRaw.content) : {},
      images: isObj ? normalizeSectionImages(sectionRaw.images) : {},
      style: isObj ? normalizeSectionStyle(sectionRaw.style) : {},
    };
  }

  // Configurable Section Order
  const sectionOrder = Array.isArray(raw.sectionOrder)
    ? raw.sectionOrder.filter((k) => typeof k === "string" && sectionKeys.includes(k.trim()))
    : null;

  // SEO details
  const rawSeo = raw.seo || {};
  const seo = {
    title: rawSeo.title ? String(rawSeo.title).trim() : `${businessName} | Master Barber & Grooming | Perth`,
    description:
      rawSeo.description ? String(rawSeo.description).trim()
      : businessDescription
      ? businessDescription
      : `Experience premier grooming, precision fades, and bespoke barbering at ${businessName} in Perth, Western Australia.`,
    canonicalUrl: sanitizeUrl(rawSeo.canonicalUrl || ""),
    ogTitle: rawSeo.ogTitle ? String(rawSeo.ogTitle).trim() : rawSeo.title || `${businessName} | Master Barber`,
    ogDescription: rawSeo.ogDescription ? String(rawSeo.ogDescription).trim() : rawSeo.description || businessDescription,
    ogImage: sanitizeImageUrl(rawSeo.ogImage || raw.branding?.heroImage || raw.heroImage || null),
    robots: rawSeo.robots ? String(rawSeo.robots).trim() : "index, follow",
    keywords: Array.isArray(rawSeo.keywords)
      ? rawSeo.keywords.map((k) => String(k).trim())
      : [
          "Perth barber",
          "barbershop Perth",
          "mens haircut Perth",
          "skin fade Perth",
          "hot towel shave",
        ],
  };

  // Branding / images / global theme styling
  const rawBranding = raw.branding || {};
  const headingFont = sanitizeFontFamily(rawBranding.headingFont);
  const bodyFont = sanitizeFontFamily(rawBranding.bodyFont);

  // Validate remote font sources
  const rawFontSources = rawBranding.fontSources || rawBranding.fontUrls || rawBranding.fontUrl || rawBranding.fontSource || [];
  const fontSourcesList = Array.isArray(rawFontSources) ? rawFontSources : [rawFontSources];
  const fontSources = fontSourcesList
    .filter((url) => typeof url === "string" && isValidFontUrl(url))
    .map((url) => url.trim());

  const branding = {
    logo: sanitizeImageUrl(rawBranding.logo || raw.logo || null),
    logoAlt: rawBranding.logoAlt ? String(rawBranding.logoAlt).trim() : `${businessName} logo`,
    logoWidth: rawBranding.logoWidth || null,
    logoHeight: rawBranding.logoHeight || null,
    favicon: sanitizeImageUrl(rawBranding.favicon || "/favicon.svg"),
    heroImage: sanitizeImageUrl(rawBranding.heroImage || raw.heroImage || null),
    heroImageMobile: sanitizeImageUrl(rawBranding.heroImageMobile || null),
    heroImageAlt: rawBranding.heroImageAlt ? String(rawBranding.heroImageAlt).trim() : `${businessName} hero showcase`,
    ambientVideo: sanitizeUrl(rawBranding.ambientVideo || null),
    accentColor: sanitizeColor(rawBranding.accentColor || null),
    primaryColor: sanitizeColor(rawBranding.primaryColor || null),
    secondaryColor: sanitizeColor(rawBranding.secondaryColor || null),
    backgroundColor: sanitizeColor(rawBranding.backgroundColor || null),
    surfaceColor: sanitizeColor(rawBranding.surfaceColor || null),
    textColor: sanitizeColor(rawBranding.textColor || null),
    mutedTextColor: sanitizeColor(rawBranding.mutedTextColor || null),
    borderColor: sanitizeColor(rawBranding.borderColor || null),
    headingFont,
    bodyFont,
    fontSources,
    fontUrl: fontSources[0] || null,
    tag: rawBranding.tag ? String(rawBranding.tag).trim() : "EST. PERTH",
  };

  // Navigation configuration
  const rawNav = raw.navigation || {};
  const navigation = {
    links: Array.isArray(rawNav.links)
      ? rawNav.links.filter((l) => l && l.label && l.href).map((l) => ({
          label: String(l.label).trim(),
          href: String(l.href).trim(),
          id: l.id || l.label.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        }))
      : [],
    bookButtonText: rawNav.bookButtonText ? String(rawNav.bookButtonText).trim() : "Book Chair",
    bookButtonUrl: sanitizeUrl(rawNav.bookButtonUrl || bookingUrl),
    phone: rawNav.phone ? String(rawNav.phone).trim() : phone,
    style: normalizeSectionStyle(rawNav.style),
  };

  // Footer configuration
  const rawFooter = raw.footer || {};
  const footer = {
    copyrightText: rawFooter.copyrightText ? String(rawFooter.copyrightText).trim() : `© ${new Date().getFullYear()} ${businessName}. All rights reserved.`,
    slogan: rawFooter.slogan ? String(rawFooter.slogan).trim() : "",
    description: rawFooter.description ? String(rawFooter.description).trim() : "",
    ctaText: rawFooter.ctaText ? String(rawFooter.ctaText).trim() : "Book Appointment",
    ctaUrl: sanitizeUrl(rawFooter.ctaUrl || bookingUrl),
    style: normalizeSectionStyle(rawFooter.style),
  };

  return {
    businessName,
    legalName,
    slug,
    theme,
    tagline,
    businessDescription,
    category,
    location,
    city,
    addressLine,
    address,
    mapUrl,
    mapEmbedUrl,
    phone,
    whatsapp,
    email,
    bookingUrl,
    hours,
    holidayHours,
    services,
    packages,
    team,
    reviews,
    ratingSummary,
    gallery,
    socialLinks,
    sections,
    sectionConfigs,
    sectionOrder,
    navigation,
    footer,
    seo,
    branding,
  };
}

/**
 * Helper to retrieve a normalized section's configuration with safe fallbacks.
 */
export function getSectionConfig(barber, sectionKey) {
  if (!barber) return { enabled: true, content: {}, style: {}, images: {} };
  const config = barber.sectionConfigs?.[sectionKey] || {};
  const isEnabled = barber.sections?.[sectionKey] !== false && config.enabled !== false;

  return {
    enabled: isEnabled,
    order: config.order ?? null,
    content: config.content || {},
    style: config.style || {},
    images: config.images || {},
  };
}

/**
 * Builds CSS style objects from section-specific style tokens.
 * Maps colors to CSS custom properties and direct style attributes safely.
 */
export function getSectionStyleProperties(sectionStyle = {}, fallbackColors = {}) {
  const style = { ...sectionStyle };
  const properties = {};

  const bg = style.backgroundColor || fallbackColors.backgroundColor;
  if (bg) {
    properties["--section-bg"] = bg;
    properties.backgroundColor = bg;
  }

  const text = style.textColor || fallbackColors.textColor;
  if (text) {
    properties["--section-text"] = text;
    properties.color = text;
  }

  const heading = style.headingColor || fallbackColors.headingColor;
  if (heading) properties["--section-heading"] = heading;

  const accent = style.accentColor || fallbackColors.accentColor;
  if (accent) properties["--section-accent"] = accent;

  const border = style.borderColor || fallbackColors.borderColor;
  if (border) properties["--section-border"] = border;

  const cardBg = style.cardBackground || fallbackColors.cardBackground;
  if (cardBg) properties["--section-card-bg"] = cardBg;

  const priceColor = style.priceColor || fallbackColors.priceColor;
  if (priceColor) properties["--section-price"] = priceColor;

  // Button styles & hover tokens
  const btnBg = style.buttonBackground || fallbackColors.buttonBackground;
  if (btnBg) properties["--section-btn-bg"] = btnBg;

  const btnText = style.buttonTextColor || fallbackColors.buttonTextColor;
  if (btnText) properties["--section-btn-text"] = btnText;

  const btnBorder = style.buttonBorderColor || fallbackColors.buttonBorderColor;
  if (btnBorder) properties["--section-btn-border"] = btnBorder;

  const btnHoverBg = style.buttonHoverBackgroundColor || style.btnHoverBg || fallbackColors.buttonHoverBackgroundColor;
  if (btnHoverBg) properties["--section-btn-hover-bg"] = btnHoverBg;

  const btnHoverText = style.buttonHoverTextColor || style.btnHoverText || fallbackColors.buttonHoverTextColor;
  if (btnHoverText) properties["--section-btn-hover-text"] = btnHoverText;

  const cardHoverBg = style.cardHoverBackgroundColor || style.cardHoverBg || fallbackColors.cardHoverBackgroundColor;
  if (cardHoverBg) properties["--section-card-hover-bg"] = cardHoverBg;

  const accentHover = style.accentHoverColor || style.accentHover || fallbackColors.accentHoverColor;
  if (accentHover) properties["--section-accent-hover"] = accentHover;

  const linkHover = style.linkHoverColor || style.linkHover || fallbackColors.linkHoverColor;
  if (linkHover) properties["--section-link-hover"] = linkHover;

  // Spacing & padding
  const pt = style.paddingTop || style.paddingY;
  if (pt && isValidCssSpacing(pt)) {
    properties["--section-pt"] = pt;
    properties.paddingTop = pt;
  }

  const pb = style.paddingBottom || style.paddingY;
  if (pb && isValidCssSpacing(pb)) {
    properties["--section-pb"] = pb;
    properties.paddingBottom = pb;
  }

  const maxW = style.maxWidth || style.containerWidth;
  if (maxW && isValidCssMaxWidth(maxW)) {
    properties["--section-max-w"] = maxW;
    properties.maxWidth = maxW;
  }

  return properties;
}
