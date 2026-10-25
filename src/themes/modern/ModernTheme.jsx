import { useState, useRef, useEffect } from "react";
import { Scissors, MapPin, Phone, Mail, Clock, ArrowUpRight, CheckCircle2, Sparkles, Filter } from "lucide-react";
import { createAnimationScope, animateOnScroll } from "../../utils/animations.js";
import NoiseOverlay from "../../components/shared/NoiseOverlay.jsx";
import ResponsiveImage from "../../components/shared/ResponsiveImage.jsx";
import { getSectionConfig, getSectionStyleProperties } from "../../schemas/barberSchema.js";

const DEFAULT_MODERN_ORDER = [
  "hero",
  "story",
  "services",
  "packages",
  "team",
  "gallery",
  "reviews",
  "hours",
  "footer",
];

export default function ModernTheme({ barber }) {
  const rootRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [perthTime, setPerthTime] = useState("");

  const {
    businessName,
    tagline,
    location,
    addressLine,
    mapUrl,
    phone,
    email,
    bookingUrl,
    businessDescription,
    hours,
    services,
    packages,
    team,
    reviews,
    ratingSummary,
    gallery,
    socialLinks,
    branding,
    sections,
    navigation,
    footer,
    sectionOrder,
  } = barber;

  // Real-time Perth local time (AWST, UTC+8)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-AU", {
          timeZone: "Australia/Perth",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(now);
        setPerthTime(formatted);
      } catch {
        setPerthTime("Perth AWST");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP animation hooks
  useEffect(() => {
    return createAnimationScope(() => {
      const headings = rootRef.current?.querySelectorAll("[data-studio-heading]");
      if (headings) {
        headings.forEach((heading) => {
          animateOnScroll(heading, { y: 25, opacity: 0, duration: 0.8 });
        });
      }

      const gridCards = rootRef.current?.querySelectorAll("[data-studio-card]");
      if (gridCards?.length) {
        animateOnScroll(gridCards, {
          y: 20,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
        });
      }
    }, rootRef);
  }, [barber?.slug]);

  // Section configurations & styles
  const navConfig = getSectionConfig(barber, "navigation");
  const heroConfig = getSectionConfig(barber, "hero");
  const marqueeConfig = getSectionConfig(barber, "marquee");
  const storyConfig = getSectionConfig(barber, "story");
  const servicesConfig = getSectionConfig(barber, "services");
  const packagesConfig = getSectionConfig(barber, "packages");
  const teamConfig = getSectionConfig(barber, "team");
  const galleryConfig = getSectionConfig(barber, "gallery");
  const reviewsConfig = getSectionConfig(barber, "reviews");
  const hoursConfig = getSectionConfig(barber, "hours");
  const contactConfig = getSectionConfig(barber, "contact");
  const footerConfig = getSectionConfig(barber, "footer");

  const defaultAccent = branding.accentColor || "#414b3c";

  const tickerStyles = getSectionStyleProperties(marqueeConfig.style, {
    backgroundColor: "#eae6dc",
    textColor: "rgba(28, 29, 31, 0.8)",
    borderColor: "rgba(28, 29, 31, 0.1)",
  });

  const navStyles = getSectionStyleProperties(navConfig.style, {
    backgroundColor: "rgba(244, 241, 234, 0.9)",
    textColor: "#1c1d1f",
    accentColor: defaultAccent,
    borderColor: "rgba(28, 29, 31, 0.1)",
  });

  const heroStyles = getSectionStyleProperties(heroConfig.style, {
    backgroundColor: "#f4f1ea",
    textColor: "#1c1d1f",
    accentColor: defaultAccent,
    borderColor: "rgba(28, 29, 31, 0.1)",
  });

  const storyStyles = getSectionStyleProperties(storyConfig.style, {
    backgroundColor: "#ffffff",
    textColor: "#1c1d1f",
    accentColor: defaultAccent,
    borderColor: "rgba(28, 29, 31, 0.1)",
  });

  const servicesStyles = getSectionStyleProperties(servicesConfig.style, {
    backgroundColor: "#f4f1ea",
    cardBackground: "#ffffff",
    textColor: "#1c1d1f",
    accentColor: defaultAccent,
    borderColor: "rgba(28, 29, 31, 0.15)",
  });

  const packagesStyles = getSectionStyleProperties(packagesConfig.style, {
    backgroundColor: "#eae6dc",
    cardBackground: "#ffffff",
    textColor: "#1c1d1f",
    accentColor: defaultAccent,
    borderColor: "rgba(28, 29, 31, 0.1)",
  });

  const teamStyles = getSectionStyleProperties(teamConfig.style, {
    backgroundColor: "#f4f1ea",
    cardBackground: "#ffffff",
    textColor: "#1c1d1f",
    accentColor: defaultAccent,
    borderColor: "rgba(28, 29, 31, 0.15)",
  });

  const galleryStyles = getSectionStyleProperties(galleryConfig.style, {
    backgroundColor: "#ffffff",
    textColor: "#1c1d1f",
    accentColor: defaultAccent,
    borderColor: "rgba(28, 29, 31, 0.1)",
  });

  const reviewsStyles = getSectionStyleProperties(reviewsConfig.style, {
    backgroundColor: "#f4f1ea",
    cardBackground: "#ffffff",
    textColor: "#1c1d1f",
    accentColor: defaultAccent,
    borderColor: "rgba(28, 29, 31, 0.1)",
  });

  const contactStyles = getSectionStyleProperties(contactConfig.style, {
    backgroundColor: "#f4f1ea",
    cardBackground: "#ffffff",
    textColor: "#1c1d1f",
    accentColor: defaultAccent,
    borderColor: "rgba(28, 29, 31, 0.1)",
  });

  const footerStyles = getSectionStyleProperties(footerConfig.style || footer?.style, {
    backgroundColor: "#1c1d1f",
    textColor: "#f4f1ea",
    accentColor: defaultAccent,
    borderColor: "rgba(255, 255, 255, 0.1)",
  });

  // Categories for filtering
  const categories = ["All", ...new Set(services.map((s) => s.category || "General"))];
  const filteredServices =
    selectedCategory === "All"
      ? services
      : services.filter((s) => (s.category || "General") === selectedCategory);

  // Active navigation links - hides links for disabled sections
  const navLinks = (navigation?.links && navigation.links.length > 0)
    ? navigation.links
    : [
        sections.services && { label: "// 01. Services", href: "#studio-services", id: "services" },
        sections.packages && { label: "// 02. Curated", href: "#studio-packages", id: "packages" },
        sections.team && { label: "// 03. Stylists", href: "#studio-team", id: "team" },
        sections.gallery && { label: "// 04. Space", href: "#studio-gallery", id: "gallery" },
      ].filter(Boolean);

  // SECTION RENDERERS
  const renderHero = () => {
    if (!sections.hero) return null;
    const heroBgImg = heroConfig.images.heroImage || branding.heroImage || "/scrollwindow/photo-1599351431202-1e0f0137899a.avif";
    const badge = heroConfig.content.badge || "Contemporary Barber Studio";
    const titleLine1 = heroConfig.content.titleLine1 || "Architectural cuts.";
    const titleLine2 = heroConfig.content.titleLine2 || "Textured craft.";
    const heroDesc = heroConfig.content.description || tagline || "Modern hair architecture, taper fades, and low-fi atmosphere designed for the creative community of Perth.";
    const primaryCta = heroConfig.content.primaryCtaText || "Reserve Appointment";
    const primaryCtaUrl = heroConfig.content.primaryCtaUrl || bookingUrl;
    const cardTag = heroConfig.content.cardTag || "PERTH STUDIO SPECIMEN";
    const cardIndex = heroConfig.content.cardIndex || "INDEX NO. 6003";
    const cardSlogan = heroConfig.content.cardSlogan || "CRAFT OVER HASTE";

    return (
      <section
        key="hero"
        id="studio-hero"
        style={heroStyles}
        className="border-b border-[#1c1d1f]/10 px-6 py-16 md:px-12 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#414b3c]/30 bg-[#414b3c]/10 px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-[var(--section-accent,#414b3c)]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{badge}</span>
              </div>

              <h1
                data-studio-heading
                style={{ color: heroConfig.style?.headingColor }}
                className="font-gt-super text-5xl font-normal leading-[0.92] tracking-tight text-[#1c1d1f] sm:text-7xl md:text-8xl"
              >
                {titleLine1}
                <br />
                <span className="italic text-[var(--section-accent,#414b3c)]">{titleLine2}</span>
              </h1>

              <p className="max-w-[620px] text-lg font-light leading-relaxed text-[#1c1d1f]/80 md:text-xl">
                {heroDesc}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                {primaryCtaUrl && (
                  <a
                    href={primaryCtaUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      backgroundColor: heroConfig.style?.buttonBackground || "var(--section-accent,#414b3c)",
                      color: heroConfig.style?.buttonTextColor || "#f4f1ea",
                    }}
                    className="flex items-center gap-2 bg-[#414b3c] px-8 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-[#f4f1ea] transition-all hover:bg-[#1c1d1f] btn-dynamic-hover"
                  >
                    <span>{primaryCta}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
                {addressLine && (
                  <a
                    href={mapUrl || "#studio-location"}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#1c1d1f]/70 hover:text-[#1c1d1f] border-b border-[#1c1d1f]/20 pb-1"
                  >
                    <MapPin className="h-3.5 w-3.5 text-[var(--section-accent,#414b3c)]" />
                    {addressLine}
                  </a>
                )}
              </div>
            </div>

            {/* Asymmetric Hero Card / Image */}
            <div className="lg:col-span-4">
              <div className="relative border border-[#1c1d1f] bg-white p-3 shadow-[8px_8px_0px_0px_#1c1d1f]">
                <div className="relative h-[420px] overflow-hidden bg-[#eae6dc]">
                  <ResponsiveImage
                    image={heroConfig.images.heroImage || branding.heroImageResponsive || heroBgImg}
                    alt={branding.heroImageAlt || businessName}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#1c1d1f] px-3 py-1 text-[11px] font-mono text-[#f4f1ea]">
                    {cardTag}
                  </div>
                </div>
                <div className="mt-3 flex justify-between text-xs font-mono text-[#1c1d1f]/70">
                  <span>{cardIndex}</span>
                  <span>{cardSlogan}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderStory = () => {
    if (!sections.story) return null;
    const eyebrow = storyConfig.content.eyebrow || "// 00. The Studio Ethos";
    const title = storyConfig.content.title || "Rejecting assembly lines for deliberate craft.";
    const bullet1 = storyConfig.content.bullet1 || "One client per chair block";
    const bullet2 = storyConfig.content.bullet2 || "Non-toxic organic grooming formulas";
    const bullet3 = storyConfig.content.bullet3 || "Specialty batch espresso bar on site";
    const stat1Val = storyConfig.content.stat1Value || "45m";
    const stat1Lbl = storyConfig.content.stat1Label || "Standard Consult";
    const stat2Val = storyConfig.content.stat2Value || "100%";
    const stat2Lbl = storyConfig.content.stat2Label || "Shear & Razor Precision";
    const stat3Val = storyConfig.content.stat3Value || "6003";
    const stat3Lbl = storyConfig.content.stat3Label || "Northbridge Postal";

    return (
      <section
        key="story"
        id="studio-story"
        style={storyStyles}
        className="border-b border-[#1c1d1f]/10 bg-white px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4 border-r-0 lg:border-r border-[#1c1d1f]/10 lg:pr-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--section-accent,#414b3c)]">
                {eyebrow}
              </span>
              <h2
                style={{ color: storyConfig.style?.headingColor }}
                className="mt-4 font-gt-super text-3xl font-medium leading-snug md:text-4xl"
              >
                {title}
              </h2>
              <div className="mt-8 space-y-4 font-mono text-xs text-[#1c1d1f]/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--section-accent,#414b3c)]" />
                  <span>{bullet1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--section-accent,#414b3c)]" />
                  <span>{bullet2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--section-accent,#414b3c)]" />
                  <span>{bullet3}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <p className="text-xl font-light leading-relaxed text-[#1c1d1f] md:text-2xl">
                {storyConfig.content.description || businessDescription}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#1c1d1f]/10 pt-8 font-mono">
                <div className="border border-[#1c1d1f]/10 bg-[#f4f1ea] p-5">
                  <span className="text-3xl font-bold text-[var(--section-accent,#414b3c)]">{stat1Val}</span>
                  <p className="mt-1 text-xs uppercase text-[#1c1d1f]/60">{stat1Lbl}</p>
                </div>
                <div className="border border-[#1c1d1f]/10 bg-[#f4f1ea] p-5">
                  <span className="text-3xl font-bold text-[var(--section-accent,#414b3c)]">{stat2Val}</span>
                  <p className="mt-1 text-xs uppercase text-[#1c1d1f]/60">{stat2Lbl}</p>
                </div>
                <div className="border border-[#1c1d1f]/10 bg-[#f4f1ea] p-5">
                  <span className="text-3xl font-bold text-[var(--section-accent,#414b3c)]">{stat3Val}</span>
                  <p className="mt-1 text-xs uppercase text-[#1c1d1f]/60">{stat3Lbl}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderServices = () => {
    if (!sections.services || services.length === 0) return null;
    const eyebrow = servicesConfig.content.eyebrow || "// 01. The Matrix";
    const title = servicesConfig.content.title || "Service Catalog";
    const bookCtaText = servicesConfig.content.bookCtaText || "Book This Cut";

    return (
      <section
        key="services"
        id="studio-services"
        style={servicesStyles}
        className="border-b border-[#1c1d1f]/10 px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--section-accent,#414b3c)]">
                {eyebrow}
              </span>
              <h2
                data-studio-heading
                style={{ color: servicesConfig.style?.headingColor }}
                className="mt-2 font-gt-super text-4xl font-normal tracking-tight md:text-6xl"
              >
                {title}
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 font-mono text-xs uppercase text-[#1c1d1f]/60 mr-2">
                <Filter className="h-3 w-3" /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 font-mono text-xs uppercase transition-colors ${
                    selectedCategory === cat
                      ? "bg-[#1c1d1f] text-[#f4f1ea]"
                      : "border border-[#1c1d1f]/20 bg-white text-[#1c1d1f] hover:bg-[#eae6dc]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredServices.map((service) => (
              <article
                key={service.id}
                data-studio-card
                style={{
                  backgroundColor: servicesConfig.style?.cardBackground,
                  borderColor: servicesConfig.style?.borderColor,
                }}
                className="group relative flex flex-col justify-between border border-[#1c1d1f]/15 bg-white p-7 transition-all duration-200 hover:border-[#1c1d1f] hover:shadow-[4px_4px_0px_0px_#414b3c]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-[var(--section-accent,#414b3c)]">
                      {service.number} // {service.category}
                    </span>
                    <h3 className="mt-1 font-gt-super text-2xl font-medium text-[#1c1d1f]">
                      {service.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span
                      style={{ color: servicesConfig.style?.priceColor }}
                      className="font-mono text-2xl font-bold text-[#1c1d1f]"
                    >
                      {service.price}
                    </span>
                    {service.duration && (
                      <p className="font-mono text-[11px] text-[#1c1d1f]/50">
                        {service.duration}
                      </p>
                    )}
                  </div>
                </div>

                <p className="mt-4 text-sm font-light leading-relaxed text-[#1c1d1f]/80">
                  {service.description}
                </p>

                {(service.bookingUrl || bookingUrl) && (
                  <div className="mt-6 flex items-center justify-between border-t border-[#1c1d1f]/10 pt-4">
                    <span className="font-mono text-[11px] text-[var(--section-accent,#414b3c)]">
                      {service.popular ? "★ Studio Favorite" : "Standard Allocation"}
                    </span>
                    <a
                      href={service.bookingUrl || bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-[#1c1d1f] hover:text-[var(--section-accent,#414b3c)] group-hover:translate-x-1 transition-transform"
                    >
                      {bookCtaText}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderPackages = () => {
    if (!sections.packages || packages.length === 0) return null;
    const eyebrow = packagesConfig.content.eyebrow || "// 02. Curated";
    const title = packagesConfig.content.title || "Studio Packages";

    return (
      <section
        key="packages"
        id="studio-packages"
        style={packagesStyles}
        className="border-b border-[#1c1d1f]/10 bg-[#eae6dc] px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--section-accent,#414b3c)]">
              {eyebrow}
            </span>
            <h2
              data-studio-heading
              style={{ color: packagesConfig.style?.headingColor }}
              className="mt-2 font-gt-super text-4xl font-normal tracking-tight md:text-5xl"
            >
              {title}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                style={{
                  backgroundColor: packagesConfig.style?.cardBackground,
                  borderColor: packagesConfig.style?.borderColor,
                }}
                className="flex flex-col justify-between border border-[#1c1d1f] bg-white p-8 shadow-[6px_6px_0px_0px_#1c1d1f]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#1c1d1f]/10 pb-4">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--section-accent,#414b3c)]">
                        Package {pkg.number}
                      </span>
                      <h3 className="font-gt-super text-3xl font-medium text-[#1c1d1f]">
                        {pkg.name}
                      </h3>
                    </div>
                    <span
                      style={{ color: packagesConfig.style?.priceColor }}
                      className="font-mono text-3xl font-bold text-[var(--section-accent,#414b3c)]"
                    >
                      {pkg.price}
                    </span>
                  </div>

                  <p className="mt-4 text-sm font-light leading-relaxed text-[#1c1d1f]/80">
                    {pkg.description}
                  </p>

                  {pkg.services.length > 0 && (
                    <div className="mt-6 space-y-2">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-[#1c1d1f]/60">
                        Package Breakdown:
                      </p>
                      <ul className="space-y-1.5 font-mono text-xs text-[#1c1d1f]/80">
                        {pkg.services.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 bg-[var(--section-accent,#414b3c)]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {(pkg.bookingUrl || bookingUrl) && (
                  <div className="mt-8 pt-4 border-t border-[#1c1d1f]/10">
                    <a
                      href={pkg.bookingUrl || bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-center gap-2 bg-[#1c1d1f] py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[var(--section-accent,#414b3c)] btn-dynamic-hover"
                    >
                      Book {pkg.name}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderTeam = () => {
    if (!sections.team || team.length === 0) return null;
    const eyebrow = teamConfig.content.eyebrow || "// 03. Stylists";
    const title = teamConfig.content.title || "The Roster";

    return (
      <section
        key="team"
        id="studio-team"
        style={teamStyles}
        className="border-b border-[#1c1d1f]/10 px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--section-accent,#414b3c)]">
              {eyebrow}
            </span>
            <h2
              data-studio-heading
              style={{ color: teamConfig.style?.headingColor }}
              className="mt-2 font-gt-super text-4xl font-normal tracking-tight md:text-5xl"
            >
              {title}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((stylist) => (
              <div
                key={stylist.id}
                style={{
                  backgroundColor: teamConfig.style?.cardBackground,
                  borderColor: teamConfig.style?.borderColor,
                }}
                className="border border-[#1c1d1f]/15 bg-white p-4 transition-all hover:border-[#1c1d1f]"
              >
                <div className="relative h-[340px] overflow-hidden bg-[#eae6dc]">
                  {stylist.responsiveImage || stylist.image ? (
                    <ResponsiveImage
                      image={stylist.responsiveImage || stylist.image}
                      alt={stylist.alt || stylist.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-neutral-400">
                      <Scissors className="h-8 w-8" />
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <p className="font-gt-super text-xl font-bold">{stylist.name}</p>
                  <p className="font-mono text-xs uppercase text-[var(--section-accent,#414b3c)]">{stylist.role}</p>
                  {stylist.bio && (
                    <p className="mt-2 text-xs font-light leading-relaxed text-[#1c1d1f]/70">
                      {stylist.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderGallery = () => {
    if (!sections.gallery || gallery.length === 0) return null;
    const eyebrow = galleryConfig.content.eyebrow || "// 04. Space";
    const title = galleryConfig.content.title || "Studio Archive";

    return (
      <section
        key="gallery"
        id="studio-gallery"
        style={galleryStyles}
        className="border-b border-[#1c1d1f]/10 bg-white px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--section-accent,#414b3c)]">
              {eyebrow}
            </span>
            <h2
              data-studio-heading
              style={{ color: galleryConfig.style?.headingColor }}
              className="mt-2 font-gt-super text-4xl font-normal tracking-tight md:text-5xl"
            >
              {title}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.map((g) => (
              <div key={g.id} className="relative h-[280px] overflow-hidden border border-[#1c1d1f]/10 bg-[#eae6dc]">
                <ResponsiveImage
                  image={g.responsiveImage || g.image}
                  alt={g.alt || g.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-2 left-2 bg-[#1c1d1f]/80 px-2 py-0.5 text-[10px] font-mono text-white">
                  {g.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderReviews = () => {
    if (!sections.reviews || reviews.length === 0) return null;
    const eyebrow = reviewsConfig.content.eyebrow || "// 05. Evidence";
    const title = reviewsConfig.content.title || "Client Logs";

    return (
      <section
        key="reviews"
        style={reviewsStyles}
        className="border-b border-[#1c1d1f]/10 px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--section-accent,#414b3c)]">
                {eyebrow}
              </span>
              <h2
                style={{ color: reviewsConfig.style?.headingColor }}
                className="mt-2 font-gt-super text-4xl font-normal md:text-5xl"
              >
                {title}
              </h2>
            </div>
            {ratingSummary && (
              <div className="font-mono text-xs bg-white border border-[#1c1d1f]/15 px-4 py-2">
                <span>{ratingSummary.score} / 5.0 Rating</span>
                <span className="mx-2">•</span>
                <span>{ratingSummary.totalReviews}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                style={{
                  backgroundColor: reviewsConfig.style?.cardBackground,
                  borderColor: reviewsConfig.style?.borderColor,
                }}
                className="flex flex-col justify-between border border-[#1c1d1f]/15 bg-white p-6"
              >
                <p className="text-sm font-light leading-relaxed text-[#1c1d1f]/90">
                  "{rev.review}"
                </p>
                <div className="mt-6 border-t border-[#1c1d1f]/10 pt-3 font-mono text-xs flex justify-between text-[#1c1d1f]/60">
                  <span className="font-semibold text-[#1c1d1f]">{rev.name}</span>
                  <span>{rev.date || rev.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderHoursAndContact = () => {
    if (!sections.contact && !sections.hours) return null;
    const eyebrow = contactConfig.content.eyebrow || "// Coordinates";
    const title = contactConfig.content.title || "Northbridge Studio";
    const scheduleTitle = hoursConfig.content.title || "Operating Schedule";

    return (
      <section
        key="hours"
        id="studio-location"
        style={contactStyles}
        className="px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--section-accent,#414b3c)]">
                {eyebrow}
              </span>
              <h2
                style={{ color: contactConfig.style?.headingColor }}
                className="font-gt-super text-4xl font-normal md:text-5xl"
              >
                {title}
              </h2>
              <div className="space-y-4 font-mono text-xs text-[#1c1d1f]/80">
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-[var(--section-accent,#414b3c)] shrink-0" />
                  <span>{location}</span>
                </p>
                {phone && (
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[var(--section-accent,#414b3c)] shrink-0" />
                    <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:underline">
                      {phone}
                    </a>
                  </p>
                )}
                {email && (
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[var(--section-accent,#414b3c)] shrink-0" />
                    <a href={`mailto:${email}`} className="hover:underline">
                      {email}
                    </a>
                  </p>
                )}
              </div>
              {mapUrl && (
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[var(--section-accent,#414b3c)] hover:underline"
                >
                  Open Directions in Maps
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>

            {sections.hours && hours.length > 0 && (
              <div className="lg:col-span-6 border border-[#1c1d1f] bg-white p-8">
                <div className="flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-[var(--section-accent,#414b3c)]">
                  <Clock className="h-4 w-4" />
                  <span>{scheduleTitle}</span>
                </div>
                <div className="space-y-3 font-mono text-xs divide-y divide-[#1c1d1f]/10">
                  {hours.map((h, i) => (
                    <div key={i} className="flex justify-between items-center pt-2.5">
                      <span>{h.days}</span>
                      <span className="font-bold text-[var(--section-accent,#414b3c)]">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  const renderFooter = () => {
    if (!sections.footer) return null;
    const slogan = footerConfig.content.title || footer?.slogan || "Step up to the chair.";
    const footerEyebrow = footerConfig.content.eyebrow || `${businessName} • Perth Studio System`;
    const ctaText = footer?.ctaText || "Book An Appointment";
    const copyright = footer?.copyrightText || `© ${new Date().getFullYear()} ${businessName}. Independent Perth Grooming.`;

    return (
      <footer
        key="footer"
        style={footerStyles}
        className="border-t border-[#1c1d1f] bg-[#1c1d1f] px-6 py-16 text-[#f4f1ea] md:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center border-b border-white/10 pb-12">
            <div>
              <p className="font-mono text-xs uppercase text-[var(--section-accent,#414b3c)]">
                {footerEyebrow}
              </p>
              <h2
                style={{ color: footerConfig.style?.headingColor }}
                className="font-gt-super text-3xl font-light md:text-5xl mt-1"
              >
                {slogan}
              </h2>
            </div>
            {bookingUrl && (
              <a
                href={footer?.ctaUrl || bookingUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: footerConfig.style?.buttonBackground || "var(--section-accent,#414b3c)",
                  color: footerConfig.style?.buttonTextColor || "#ffffff",
                }}
                className="bg-[#414b3c] px-8 py-4 font-mono text-xs uppercase tracking-wider text-white hover:bg-white hover:text-black transition-colors btn-dynamic-hover"
              >
                {ctaText}
              </a>
            )}
          </div>

          <div className="flex flex-col justify-between gap-4 pt-8 font-mono text-xs text-white/50 sm:flex-row">
            <p>{copyright}</p>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </a>
              {socialLinks.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  {s.label || s.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  };

  // Section dispatcher mapping
  const sectionRendererMap = {
    hero: renderHero,
    story: renderStory,
    services: renderServices,
    packages: renderPackages,
    team: renderTeam,
    gallery: renderGallery,
    reviews: renderReviews,
    hours: renderHoursAndContact,
    contact: renderHoursAndContact,
    footer: renderFooter,
  };

  const renderedKeys = new Set();
  const activeOrder = Array.isArray(sectionOrder) && sectionOrder.length > 0
    ? sectionOrder
    : DEFAULT_MODERN_ORDER;

  return (
    <div
      ref={rootRef}
      style={{
        backgroundColor: branding.backgroundColor || "#f4f1ea",
        color: branding.textColor || "#1c1d1f",
        ...(barber?.branding?.headingFont ? { "--font-heading": barber.branding.headingFont } : {}),
        ...(barber?.branding?.bodyFont ? { "--font-body": barber.branding.bodyFont, fontFamily: barber.branding.bodyFont } : {}),
      }}
      className="relative min-h-screen bg-[#f4f1ea] text-[#1c1d1f] font-sans selection:bg-[#414b3c] selection:text-[#f4f1ea]"
    >
      <NoiseOverlay opacity={0.025} blendMode="multiply" />

      {/* TOP TICKER & TIME BAR */}
      {sections.marquee !== false && (
        <div
          style={tickerStyles}
          className="border-b border-[#1c1d1f]/10 bg-[#eae6dc] px-6 py-2 text-[11px] font-mono uppercase tracking-wider text-[#1c1d1f]/80"
        >
          <div className="mx-auto flex max-w-[1400px] flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{marqueeConfig.content.tickerMessage || "PERTH INDEPENDENT STUDIO • WALK-INS & APPOINTMENTS"}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{marqueeConfig.content.timeLabel || "PERTH LOCAL TIME (AWST)"}: {perthTime || "14:30 AWST"}</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">{marqueeConfig.content.precinctLabel || "NORTHBRIDGE PRECINCT"}</span>
            </div>
          </div>
        </div>
      )}

      {/* STUDIO HEADER / NAVIGATION */}
      <header
        style={navStyles}
        className="sticky top-0 z-40 border-b border-[#1c1d1f]/10 bg-[#f4f1ea]/90 backdrop-blur-md px-6 py-5 md:px-12"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <a href="#studio-hero" className="flex items-center gap-3">
            {branding.logo ? (
              <img
                src={branding.logo}
                alt={branding.logoAlt || `${businessName} logo`}
                style={{
                  width: branding.logoWidth || undefined,
                  height: branding.logoHeight || undefined,
                }}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center bg-[#1c1d1f] text-[#f4f1ea]">
                <Scissors className="h-5 w-5" />
              </div>
            )}
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--section-accent,#414b3c)]">
                {branding.tag || "STUDIO 6003"}
              </span>
              <h1 className="font-gt-super text-lg font-bold tracking-tight text-[#1c1d1f]">
                {businessName}
              </h1>
            </div>
          </a>

          <nav aria-label="Studio navigation" className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider">
            {navLinks.map((link) => (
              <a key={link.id || link.label} href={link.href} className="hover:text-[var(--section-accent,#414b3c)] transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="hidden lg:inline-flex items-center gap-1.5 font-mono text-xs text-[#1c1d1f]/70 hover:text-[#1c1d1f]"
              >
                <Phone className="h-3 w-3" />
                {phone}
              </a>
            )}
            {bookingUrl && (
              <a
                href={navigation?.bookButtonUrl || bookingUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: navConfig.style?.buttonBackground,
                  color: navConfig.style?.buttonTextColor,
                }}
                className="flex items-center gap-2 bg-[#1c1d1f] px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-[#f4f1ea] transition-all duration-200 hover:bg-[#414b3c] hover:shadow-lg btn-dynamic-hover"
              >
                <span>{navigation?.bookButtonText || "Book Chair"}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* RENDER DYNAMIC SECTIONS */}
      {activeOrder.map((sectionKey) => {
        if (renderedKeys.has(sectionKey)) return null;
        renderedKeys.add(sectionKey);
        const renderer = sectionRendererMap[sectionKey];
        return renderer ? renderer() : null;
      })}
    </div>
  );
}
