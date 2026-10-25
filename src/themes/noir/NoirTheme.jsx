import { useRef, useEffect } from "react";
import { Scissors, MapPin, Phone, Mail, Clock, Star, ExternalLink, ArrowRight, ShieldCheck } from "lucide-react";
import { createHeroTimeline, animateOnScroll, createAnimationScope } from "../../utils/animations.js";
import NoiseOverlay from "../../components/shared/NoiseOverlay.jsx";
import ResponsiveImage from "../../components/shared/ResponsiveImage.jsx";
import { getSectionConfig, getSectionStyleProperties } from "../../schemas/barberSchema.js";

const DEFAULT_NOIR_ORDER = [
  "hero",
  "marquee",
  "story",
  "services",
  "packages",
  "team",
  "reviews",
  "gallery",
  "hours",
  "footer",
];

export default function NoirTheme({ barber }) {
  const rootRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    return createAnimationScope(() => {
      // Hero entrance
      createHeroTimeline(heroRef);

      // Section headings animation
      const headings = rootRef.current?.querySelectorAll("[data-animate-heading]");
      if (headings) {
        headings.forEach((heading) => {
          animateOnScroll(heading, { y: 30, opacity: 0, duration: 0.8 });
        });
      }

      // Service items animation
      const serviceCards = rootRef.current?.querySelectorAll("[data-animate-service]");
      if (serviceCards?.length) {
        animateOnScroll(serviceCards, {
          y: 25,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
        });
      }
    }, rootRef);
  }, [barber?.slug]);

  const {
    businessName,
    tagline,
    location,
    city,
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

  // Section configurations & styles
  const navConfig = getSectionConfig(barber, "navigation");
  const heroConfig = getSectionConfig(barber, "hero");
  const marqueeConfig = getSectionConfig(barber, "marquee");
  const storyConfig = getSectionConfig(barber, "story");
  const servicesConfig = getSectionConfig(barber, "services");
  const packagesConfig = getSectionConfig(barber, "packages");
  const teamConfig = getSectionConfig(barber, "team");
  const reviewsConfig = getSectionConfig(barber, "reviews");
  const galleryConfig = getSectionConfig(barber, "gallery");
  const hoursConfig = getSectionConfig(barber, "hours");
  const contactConfig = getSectionConfig(barber, "contact");
  const footerConfig = getSectionConfig(barber, "footer");

  const navStyles = getSectionStyleProperties(navConfig.style, {
    accentColor: branding.accentColor || "#d4af37",
  });

  const heroStyles = getSectionStyleProperties(heroConfig.style, {
    backgroundColor: "#09090b",
    textColor: "#f4f4f5",
    accentColor: branding.accentColor || "#d4af37",
    headingColor: "#ffffff",
  });

  const marqueeStyles = getSectionStyleProperties(marqueeConfig.style, {
    backgroundColor: "#121214",
    textColor: "rgba(255, 255, 255, 0.7)",
    accentColor: branding.accentColor || "#d4af37",
    borderColor: "rgba(255, 255, 255, 0.1)",
  });

  const storyStyles = getSectionStyleProperties(storyConfig.style, {
    textColor: "rgba(255, 255, 255, 0.8)",
    headingColor: "#ffffff",
    accentColor: branding.accentColor || "#d4af37",
    borderColor: "rgba(255, 255, 255, 0.1)",
  });

  const servicesStyles = getSectionStyleProperties(servicesConfig.style, {
    backgroundColor: "#0e0e11",
    cardBackground: "#141418",
    textColor: "#f4f4f5",
    headingColor: "#ffffff",
    accentColor: branding.accentColor || "#d4af37",
    borderColor: "rgba(255, 255, 255, 0.1)",
  });

  const packagesStyles = getSectionStyleProperties(packagesConfig.style, {
    cardBackground: "#121215",
    textColor: "#f4f4f5",
    headingColor: "#ffffff",
    accentColor: branding.accentColor || "#d4af37",
    borderColor: "rgba(255, 255, 255, 0.1)",
  });

  const teamStyles = getSectionStyleProperties(teamConfig.style, {
    backgroundColor: "#0b0b0e",
    cardBackground: "#121215",
    textColor: "#f4f4f5",
    headingColor: "#ffffff",
    accentColor: branding.accentColor || "#d4af37",
    borderColor: "rgba(255, 255, 255, 0.1)",
  });

  const reviewsStyles = getSectionStyleProperties(reviewsConfig.style, {
    cardBackground: "#101013",
    textColor: "#f4f4f5",
    headingColor: "#ffffff",
    accentColor: branding.accentColor || "#d4af37",
    borderColor: "rgba(255, 255, 255, 0.1)",
  });

  const galleryStyles = getSectionStyleProperties(galleryConfig.style, {
    backgroundColor: "#0b0b0e",
    textColor: "#f4f4f5",
    headingColor: "#ffffff",
    accentColor: branding.accentColor || "#d4af37",
    borderColor: "rgba(255, 255, 255, 0.1)",
  });

  const contactStyles = getSectionStyleProperties(contactConfig.style, {
    cardBackground: "#121215",
    textColor: "rgba(255, 255, 255, 0.7)",
    headingColor: "#ffffff",
    accentColor: branding.accentColor || "#d4af37",
    borderColor: "rgba(255, 255, 255, 0.1)",
  });

  const footerStyles = getSectionStyleProperties(footerConfig.style || footer?.style, {
    backgroundColor: "#000000",
    textColor: "rgba(255, 255, 255, 0.5)",
    headingColor: "#ffffff",
    accentColor: branding.accentColor || "#d4af37",
    borderColor: "rgba(255, 255, 255, 0.1)",
  });

  // Active navigation links - dynamically hides links for disabled sections
  const navLinks = (navigation?.links && navigation.links.length > 0)
    ? navigation.links
    : [
        sections.services && { label: "Services", href: "#noir-services", id: "services" },
        sections.packages && { label: "Packages", href: "#noir-packages", id: "packages" },
        sections.gallery && { label: "Gallery", href: "#noir-gallery", id: "gallery" },
      ].filter(Boolean);

  // SECTION RENDERERS
  const renderHero = () => {
    if (!sections.hero) return null;
    const heroBgImg = heroConfig.images.heroImage || branding.heroImage || "/src/assets/hero.png";
    const title = heroConfig.content.title || businessName;
    const words = title.split(" ");
    const line1 = words[0];
    const line2 = words.slice(1).join(" ") || "STUDIO";
    const heroDesc = heroConfig.content.description || tagline || "Precision cuts, sharp razor work, and a proper chair experience crafted for discerning gentlemen.";
    const heroBadge = heroConfig.content.badge || location || "Perth Western Australia";
    const primaryCta = heroConfig.content.primaryCtaText || "Book Appointment";
    const secondaryCta = heroConfig.content.secondaryCtaText || "View Service Menu";
    const secondaryCtaUrl = heroConfig.content.secondaryCtaUrl || "#noir-services";

    return (
      <section
        key="hero"
        id="noir-hero"
        ref={heroRef}
        style={heroStyles}
        className="relative min-h-screen overflow-hidden flex flex-col justify-end px-6 pb-16 pt-36 md:px-12 md:pb-24 lg:px-20"
      >
        <div
          data-hero-image
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url(${heroBgImg})` }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--section-bg,#09090b)] via-[var(--section-bg,#09090b)]/70 to-[var(--section-bg,#09090b)]/40"
          style={{ opacity: heroConfig.style?.overlayOpacity ?? 1 }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[var(--section-bg,#09090b)]/50 to-[var(--section-bg,#09090b)]" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px]">
          <div data-hero-badge className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--section-accent,#d4af37)]" />
            <p className="font-helvetica text-xs uppercase tracking-[0.3em] text-[var(--section-accent,#d4af37)]">
              {heroBadge}
            </p>
          </div>

          <h1
            data-hero-title
            style={{ color: heroConfig.style?.headingColor }}
            className="max-w-[1200px] font-gt-super text-5xl font-medium leading-[0.88] tracking-[-0.03em] text-white sm:text-7xl md:text-8xl lg:text-[9.5rem]"
          >
            {line1}
            <br />
            <span className="ml-[6vw] text-[#e4e4e7]">
              {line2}
            </span>
          </h1>

          <div className="mt-10 flex flex-col justify-between gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end">
            <div data-hero-desc className="max-w-[540px]">
              <p className="font-helvetica text-base leading-relaxed text-white/80 md:text-lg">
                {heroDesc}
              </p>
              {addressLine && (
                <p className="mt-3 flex items-center gap-2 text-xs uppercase tracking-wider text-white/50">
                  <MapPin className="h-3.5 w-3.5 text-[var(--section-accent,#d4af37)]" />
                  {addressLine}
                </p>
              )}
            </div>

            {bookingUrl && (
              <div data-hero-cta className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    backgroundColor: heroConfig.style?.buttonBackground || "var(--section-accent,#d4af37)",
                    color: heroConfig.style?.buttonTextColor || "#000000",
                    borderColor: heroConfig.style?.buttonBorderColor || "var(--section-accent,#d4af37)",
                  }}
                  className="group relative overflow-hidden border px-8 py-4 font-helvetica text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-transparent hover:text-white btn-dynamic-hover"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {primaryCta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>

                {services.length > 0 && sections.services && (
                  <a
                    href={secondaryCtaUrl}
                    className="border border-white/20 px-6 py-4 font-helvetica text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-white hover:text-white text-center"
                  >
                    {secondaryCta}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  const renderMarquee = () => {
    if (!sections.marquee) return null;
    const defaultPhrases = [
      "PRECISION HAIRCUTS",
      "SEAMLESS SKIN FADES",
      "HOT TOWEL STRAIGHT RAZOR SHAVES",
      "BEARD ARCHITECTURE",
      "PERTH CBD MASTER CRAFT",
    ];
    const marqueeItems = marqueeConfig.content.items && marqueeConfig.content.items.length > 0
      ? marqueeConfig.content.items
      : defaultPhrases;

    return (
      <section
        key="marquee"
        aria-label="Brand Pillars"
        style={marqueeStyles}
        className="relative border-y bg-[#121214] py-4 overflow-hidden"
      >
        <div className="flex w-max motion-safe:animate-[marquee_26s_linear_infinite]" style={{ animation: "marquee 26s linear infinite" }}>
          {[1, 2, 3].flatMap(() => marqueeItems).map((phrase, idx) => (
            <div key={idx} className="flex items-center gap-8 px-6 text-xs uppercase tracking-[0.25em] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--section-accent,#d4af37)]" />
              <span className="font-helvetica font-medium">{phrase}</span>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderStory = () => {
    if (!sections.story || !businessDescription) return null;
    const storyBadge = storyConfig.content.badge || "The Philosophy";
    const storyTitle = storyConfig.content.title || "More than a trim.\nAn art-directed standard.";
    const feature1 = storyConfig.content.feature1 || "Licensed Master Barbers";
    const feature2 = storyConfig.content.feature2 || "Dedicated time allocation per chair";
    const step1Title = storyConfig.content.step1Title || "01 / The Consultation";
    const step1Desc = storyConfig.content.step1Desc || "We study facial structure, growth whorls, lifestyle routines, and personal aesthetic before cutting a single follicle.";
    const step2Title = storyConfig.content.step2Title || "02 / The Finish";
    const step2Desc = storyConfig.content.step2Desc || "Every session culminates with hot aromatic towels, razor lineup on the neckline, and tailored botanical styling pomade.";

    return (
      <section
        key="story"
        id="noir-story"
        style={storyStyles}
        className="px-6 py-28 md:px-12 md:py-36 lg:px-20 border-b border-white/10"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--section-accent,#d4af37)]" />
                  <p className="font-helvetica text-xs uppercase tracking-[0.3em] text-[var(--section-accent,#d4af37)]">
                    {storyBadge}
                  </p>
                </div>
                <h2
                  data-animate-heading
                  style={{ color: storyConfig.style?.headingColor }}
                  className="font-gt-super text-4xl font-light leading-[1.05] tracking-tight text-white md:text-5xl whitespace-pre-line"
                >
                  {storyTitle}
                </h2>
                <div className="border-t border-white/10 pt-6 space-y-3 text-xs text-white/60">
                  <p className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[var(--section-accent,#d4af37)]" />
                    {feature1}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[var(--section-accent,#d4af37)]" />
                    {feature2}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8 text-white/80">
              <p className="font-helvetica text-2xl font-light leading-relaxed md:text-3xl text-white">
                {storyConfig.content.description || businessDescription}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <div className="space-y-2">
                  <p className="font-helvetica text-xs uppercase tracking-[0.2em] text-[var(--section-accent,#d4af37)]">
                    {step1Title}
                  </p>
                  <p className="text-sm leading-relaxed text-white/60">
                    {step1Desc}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-helvetica text-xs uppercase tracking-[0.2em] text-[var(--section-accent,#d4af37)]">
                    {step2Title}
                  </p>
                  <p className="text-sm leading-relaxed text-white/60">
                    {step2Desc}
                  </p>
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
    const eyebrow = servicesConfig.content.eyebrow || "The Service Menu";
    const title = servicesConfig.content.title || "Crafted for distinction.";
    const desc = servicesConfig.content.description || "Transparent pricing, uncompromised chair time, and tailored grooming using top-tier Japanese steel and organic pomades.";
    const reserveCta = servicesConfig.content.reserveCtaText || "Reserve Service";

    return (
      <section
        key="services"
        id="noir-services"
        style={servicesStyles}
        className="bg-[#0e0e11] px-6 py-28 md:px-12 md:py-36 lg:px-20 border-b border-white/10"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-20">
            <div>
              <p className="font-helvetica text-xs uppercase tracking-[0.3em] text-[var(--section-accent,#d4af37)] mb-4">
                {eyebrow}
              </p>
              <h2
                data-animate-heading
                style={{ color: servicesConfig.style?.headingColor }}
                className="font-gt-super text-4xl font-light tracking-tight text-white md:text-6xl lg:text-7xl"
              >
                {title}
              </h2>
            </div>
            <p className="max-w-[360px] text-sm text-white/60">
              {desc}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.id}
                data-animate-service
                style={{
                  backgroundColor: servicesConfig.style?.cardBackground,
                  borderColor: servicesConfig.style?.borderColor,
                }}
                className="group relative flex flex-col justify-between border border-white/10 bg-[#141418] p-8 transition-all duration-300 hover:border-[#d4af37]/60 hover:bg-[#18181f] card-dynamic-hover"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[var(--section-accent,#d4af37)]/80">
                      {service.number} // {service.category}
                    </span>
                    <h3 className="mt-2 font-gt-super text-2xl font-normal text-white group-hover:text-[var(--section-accent,#d4af37)] transition-colors">
                      {service.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span
                      style={{ color: servicesConfig.style?.priceColor }}
                      className="font-gt-super text-2xl font-light text-white"
                    >
                      {service.price}
                    </span>
                    {service.duration && (
                      <p className="text-[11px] uppercase tracking-wider text-white/50">
                        {service.duration}
                      </p>
                    )}
                  </div>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-white/70">
                  {service.description}
                </p>

                {(service.bookingUrl || bookingUrl) && (
                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-white/40 uppercase tracking-wider">{city || "Perth CBD"}</span>
                    <a
                      href={service.bookingUrl || bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[var(--section-accent,#d4af37)] hover:text-white transition-colors"
                    >
                      {reserveCta}
                      <ExternalLink className="h-3 w-3" />
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
    const eyebrow = packagesConfig.content.eyebrow || "Curated Experiences";
    const title = packagesConfig.content.title || "Signature Rituals";
    const desc = packagesConfig.content.description || "Complete grooming combinations engineered for milestones, weddings, executive presentations, and regular chair refinement.";

    return (
      <section
        key="packages"
        id="noir-packages"
        style={packagesStyles}
        className="px-6 py-28 md:px-12 md:py-36 lg:px-20 border-b border-white/10"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-20 text-center max-w-[800px] mx-auto">
            <p className="font-helvetica text-xs uppercase tracking-[0.3em] text-[var(--section-accent,#d4af37)] mb-4">
              {eyebrow}
            </p>
            <h2
              data-animate-heading
              style={{ color: packagesConfig.style?.headingColor }}
              className="font-gt-super text-4xl font-light tracking-tight text-white md:text-6xl"
            >
              {title}
            </h2>
            <p className="mt-4 text-sm text-white/60">
              {desc}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                style={{
                  backgroundColor: packagesConfig.style?.cardBackground,
                  borderColor: packagesConfig.style?.borderColor,
                }}
                className="group relative flex flex-col justify-between overflow-hidden border border-white/10 bg-[#121215] transition-all duration-500 hover:border-[#d4af37]/70"
              >
                {(pkg.responsiveImage || pkg.image) && (
                  <div className="relative h-[320px] w-full overflow-hidden">
                    <ResponsiveImage
                      image={pkg.responsiveImage || pkg.image}
                      alt={`${pkg.name} package`}
                      className="h-full w-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent" />
                    {pkg.badge && (
                      <span className="absolute top-4 left-4 rounded-full border border-[var(--section-accent,#d4af37)] bg-black/80 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--section-accent,#d4af37)]">
                        {pkg.badge}
                      </span>
                    )}
                  </div>
                )}

                <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                      <h3 className="font-gt-super text-3xl font-light text-white">
                        {pkg.name}
                      </h3>
                      <span
                        style={{ color: packagesConfig.style?.priceColor }}
                        className="font-gt-super text-3xl text-[var(--section-accent,#d4af37)]"
                      >
                        {pkg.price}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-white/70">
                      {pkg.description}
                    </p>

                    {pkg.services.length > 0 && (
                      <div className="mt-6 space-y-2.5">
                        <p className="text-[11px] uppercase tracking-widest text-white/50">
                          Includes in ritual:
                        </p>
                        <ul className="space-y-2 text-xs text-white/80">
                          {pkg.services.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2.5">
                              <span className="h-1 w-1 rounded-full bg-[var(--section-accent,#d4af37)]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {(pkg.bookingUrl || bookingUrl) && (
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <a
                        href={pkg.bookingUrl || bookingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 w-full border border-[var(--section-accent,#d4af37)] bg-transparent py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--section-accent,#d4af37)] transition-colors duration-300 hover:bg-[var(--section-accent,#d4af37)] hover:text-black btn-dynamic-hover"
                      >
                        Book {pkg.name}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderTeam = () => {
    if (!sections.team || team.length === 0) return null;
    const eyebrow = teamConfig.content.eyebrow || "The Artisans";
    const title = teamConfig.content.title || "Behind the chair.";
    const desc = teamConfig.content.description || "Experienced hands, sharp eyes, and uncompromising standards dedicated to every individual cut.";

    return (
      <section
        key="team"
        id="noir-team"
        style={teamStyles}
        className="bg-[#0b0b0e] px-6 py-28 md:px-12 md:py-36 lg:px-20 border-b border-white/10"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-helvetica text-xs uppercase tracking-[0.3em] text-[var(--section-accent,#d4af37)] mb-4">
                {eyebrow}
              </p>
              <h2
                data-animate-heading
                style={{ color: teamConfig.style?.headingColor }}
                className="font-gt-super text-4xl font-light tracking-tight text-white md:text-6xl"
              >
                {title}
              </h2>
            </div>
            <p className="max-w-[340px] text-sm text-white/60">
              {desc}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.id}
                style={{
                  backgroundColor: teamConfig.style?.cardBackground,
                  borderColor: teamConfig.style?.borderColor,
                }}
                className="group relative border border-white/10 bg-[#121215] overflow-hidden"
              >
                <div className="relative h-[420px] overflow-hidden bg-neutral-900">
                  {member.responsiveImage || member.image ? (
                    <ResponsiveImage
                      image={member.responsiveImage || member.image}
                      alt={member.alt || member.name}
                      className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-neutral-600">
                      <Scissors className="h-12 w-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-gt-super text-xl font-medium text-white">
                      {member.name}
                    </p>
                    <p className="text-xs uppercase tracking-wider text-[var(--section-accent,#d4af37)]">
                      {member.role}
                    </p>
                    {member.experience && (
                      <p className="text-[11px] text-white/50 mt-1">
                        {member.experience}
                      </p>
                    )}
                  </div>
                </div>
                {member.bio && (
                  <div className="p-4 text-xs text-white/70 border-t border-white/5">
                    <p>{member.bio}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderReviews = () => {
    if (!sections.reviews || reviews.length === 0) return null;
    const eyebrow = reviewsConfig.content.eyebrow || "Client Words";
    const title = reviewsConfig.content.title || "Reputation earned.";

    return (
      <section
        key="reviews"
        id="noir-reviews"
        style={reviewsStyles}
        className="px-6 py-28 md:px-12 md:py-36 lg:px-20 border-b border-white/10"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end mb-20">
            <div>
              <p className="font-helvetica text-xs uppercase tracking-[0.3em] text-[var(--section-accent,#d4af37)] mb-4">
                {eyebrow}
              </p>
              <h2
                data-animate-heading
                style={{ color: reviewsConfig.style?.headingColor }}
                className="font-gt-super text-4xl font-light tracking-tight text-white md:text-6xl"
              >
                {title}
              </h2>
            </div>

            {ratingSummary && (
              <div className="flex items-center gap-5 border border-white/10 bg-[#141418] px-6 py-4">
                <div>
                  <span className="font-gt-super text-4xl font-light text-white">
                    {ratingSummary.score}
                  </span>
                  <div className="flex gap-1 text-[var(--section-accent,#d4af37)] text-sm mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[var(--section-accent,#d4af37)]" />
                    ))}
                  </div>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--section-accent,#d4af37)]">
                    {ratingSummary.platform}
                  </p>
                  <p className="text-xs text-white/50 mt-0.5">
                    {ratingSummary.totalReviews}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {reviews.map((rev) => (
              <blockquote
                key={rev.id}
                style={{
                  backgroundColor: reviewsConfig.style?.cardBackground,
                  borderColor: reviewsConfig.style?.borderColor,
                }}
                className="border border-white/10 bg-[#101013] p-8 transition-colors hover:border-white/20"
              >
                <div className="flex items-center gap-1 text-[var(--section-accent,#d4af37)] mb-4">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-[var(--section-accent,#d4af37)]" />
                  ))}
                </div>
                <p className="font-gt-super text-lg font-light leading-relaxed text-white/90">
                  "{rev.review}"
                </p>
                <footer className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                  <span className="font-medium text-white">{rev.name}</span>
                  <span className="text-white/40">{rev.date || rev.source}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderGallery = () => {
    if (!sections.gallery || gallery.length === 0) return null;
    const eyebrow = galleryConfig.content.eyebrow || "Visual Archive";
    const title = galleryConfig.content.title || "The Perth Atelier";

    return (
      <section
        key="gallery"
        id="noir-gallery"
        style={galleryStyles}
        className="bg-[#0b0b0e] px-6 py-28 md:px-12 md:py-36 lg:px-20 border-b border-white/10"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16">
            <p className="font-helvetica text-xs uppercase tracking-[0.3em] text-[var(--section-accent,#d4af37)] mb-4">
              {eyebrow}
            </p>
            <h2
              data-animate-heading
              style={{ color: galleryConfig.style?.headingColor }}
              className="font-gt-super text-4xl font-light tracking-tight text-white md:text-6xl"
            >
              {title}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item, idx) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden bg-neutral-900 border border-white/10 ${
                  idx === 0 || idx === 3 ? "sm:col-span-2 lg:col-span-2 h-[480px]" : "h-[480px]"
                }`}
              >
                <ResponsiveImage
                  image={item.responsiveImage || item.image}
                  alt={item.alt || item.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-6">
                  <p className="font-gt-super text-lg font-light text-white">
                    {item.title}
                  </p>
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
    const eyebrow = contactConfig.content.eyebrow || "Find Our Chair";
    const title = contactConfig.content.title || city || "Perth CBD";
    const hoursTitle = hoursConfig.content.title || "Trading Hours";

    return (
      <section
        key="hours"
        style={contactStyles}
        className="px-6 py-28 md:px-12 md:py-36 lg:px-20 border-b border-white/10"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="font-helvetica text-xs uppercase tracking-[0.3em] text-[var(--section-accent,#d4af37)] mb-3">
                  {eyebrow}
                </p>
                <h2
                  style={{ color: contactConfig.style?.headingColor }}
                  className="font-gt-super text-4xl font-light text-white md:text-5xl"
                >
                  {title}
                </h2>
              </div>
              <div className="space-y-4 text-sm text-white/70">
                <p className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[var(--section-accent,#d4af37)] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white block font-medium">Studio Address:</strong>
                    {location}
                  </span>
                </p>
                {phone && (
                  <p className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[var(--section-accent,#d4af37)] shrink-0" />
                    <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors">
                      {phone}
                    </a>
                  </p>
                )}
                {email && (
                  <p className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[var(--section-accent,#d4af37)] shrink-0" />
                    <a href={`mailto:${email}`} className="hover:text-white transition-colors">
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
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--section-accent,#d4af37)] hover:text-white transition-colors border-b border-[#d4af37]/40 pb-1"
                >
                  Open in Google Maps
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>

            {sections.hours && hours.length > 0 && (
              <div className="lg:col-span-7 border border-white/10 bg-[#121215] p-8 md:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <Clock className="h-5 w-5 text-[var(--section-accent,#d4af37)]" />
                  <h3 className="font-gt-super text-2xl font-light text-white">
                    {hoursTitle}
                  </h3>
                </div>
                <div className="space-y-4 divide-y divide-white/5">
                  {hours.map((h, i) => (
                    <div key={i} className="flex justify-between items-center pt-3 text-sm">
                      <span className="text-white/80">{h.days}</span>
                      <span className="font-mono text-xs text-[var(--section-accent,#d4af37)]">{h.time}</span>
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
    const footerTitle = footerConfig.content.title || footer?.slogan || "Ready for the chair?";
    const footerEyebrow = footerConfig.content.eyebrow || businessName;
    const footerCta = footer?.ctaText || "Book Appointment";
    const copyright = footer?.copyrightText || `© ${new Date().getFullYear()} ${businessName}. All rights reserved.`;

    return (
      <footer
        key="footer"
        style={footerStyles}
        className="bg-black px-6 py-20 md:px-12 lg:px-20"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end border-b border-white/10 pb-16">
            <div>
              <p className="font-helvetica text-xs uppercase tracking-[0.3em] text-[var(--section-accent,#d4af37)] mb-4">
                {footerEyebrow}
              </p>
              <h2
                style={{ color: footerConfig.style?.headingColor }}
                className="font-gt-super text-4xl font-light text-white md:text-6xl"
              >
                {footerTitle}
              </h2>
            </div>
            {bookingUrl && (
              <a
                href={footer?.ctaUrl || bookingUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: footerConfig.style?.buttonBackground || "var(--section-accent,#d4af37)",
                  color: footerConfig.style?.buttonTextColor || "#000000",
                }}
                className="inline-flex items-center justify-center gap-2 border border-[var(--section-accent,#d4af37)] px-8 py-4 font-helvetica text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-transparent hover:text-white btn-dynamic-hover"
              >
                {footerCta}
                <ArrowRight className="h-4 w-4" />
              </a>
            )}
          </div>

          <div className="flex flex-col justify-between gap-6 pt-8 text-xs text-white/50 sm:flex-row sm:items-center">
            <p>{copyright}</p>
            <div className="flex flex-wrap gap-6">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              {socialLinks.map((s, idx) => (
                <a key={idx} href={s.url} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
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
    marquee: renderMarquee,
    story: renderStory,
    services: renderServices,
    packages: renderPackages,
    team: renderTeam,
    reviews: renderReviews,
    gallery: renderGallery,
    hours: renderHoursAndContact,
    contact: renderHoursAndContact,
    footer: renderFooter,
  };

  // Determine order of sections to render
  const renderedKeys = new Set();
  const activeOrder = Array.isArray(sectionOrder) && sectionOrder.length > 0
    ? sectionOrder
    : DEFAULT_NOIR_ORDER;

  return (
    <div
      ref={rootRef}
      style={{
        backgroundColor: branding.backgroundColor || "#09090b",
        color: branding.textColor || "#f4f4f5",
        ...(barber?.branding?.headingFont ? { "--font-heading": barber.branding.headingFont } : {}),
        ...(barber?.branding?.bodyFont ? { "--font-body": barber.branding.bodyFont, fontFamily: barber.branding.bodyFont } : {}),
      }}
      className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-[#d4af37] selection:text-black"
    >
      <NoiseOverlay opacity={0.035} />

      {/* NOIR LUXURY NAVIGATION */}
      <header
        style={navStyles}
        className="absolute left-0 top-0 z-40 w-full px-6 py-6 md:px-12 lg:px-20"
      >
        <nav aria-label="Main Navigation" className="mx-auto flex max-w-[1400px] items-center justify-between">
          <a href="#noir-hero" className="flex items-center gap-3.5 group">
            {branding.logo ? (
              <img
                src={branding.logo}
                alt={branding.logoAlt || `${businessName} logo`}
                style={{
                  width: branding.logoWidth || undefined,
                  height: branding.logoHeight || undefined,
                }}
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center border border-[#d4af37]/40 bg-neutral-900/80">
                <Scissors className="h-5 w-5 text-[#d4af37]" />
              </div>
            )}
            <div>
              <p className="font-helvetica text-[10px] uppercase tracking-[0.3em] text-[#d4af37]">
                {branding.tag || "PERTH • AUSTRALIA"}
              </p>
              <h1 className="font-gt-super text-lg font-medium tracking-tight text-white md:text-xl">
                {businessName.toUpperCase()}
              </h1>
            </div>
          </a>

          <div className="flex items-center gap-6 md:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.id || link.label}
                href={link.href}
                className="hidden font-helvetica text-xs uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 hover:text-[#d4af37] sm:block"
              >
                {link.label}
              </a>
            ))}
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="hidden font-helvetica text-xs tracking-wider text-white/70 transition-colors duration-300 hover:text-white lg:inline-flex items-center gap-2"
              >
                <Phone className="h-3.5 w-3.5 text-[#d4af37]" />
                {phone}
              </a>
            )}
            {bookingUrl && (
              <a
                href={navigation?.bookButtonUrl || bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden border border-[#d4af37]/80 bg-neutral-950 px-6 py-3 font-helvetica text-xs uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#d4af37] hover:shadow-[0_0_25px_rgba(212,175,55,0.2)]"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-[#d4af37] transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="relative z-10 font-medium transition-colors duration-500 group-hover:text-black">
                  {navigation?.bookButtonText || "Book Chair"}
                </span>
              </a>
            )}
          </div>
        </nav>
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
