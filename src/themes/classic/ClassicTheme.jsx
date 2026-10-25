import { useRef, useEffect } from "react";
import { Scissors, MapPin, Phone, Mail, Clock, Shield, Award, Star, ExternalLink } from "lucide-react";
import { createAnimationScope, animateOnScroll } from "../../utils/animations.js";
import NoiseOverlay from "../../components/shared/NoiseOverlay.jsx";
import ResponsiveImage from "../../components/shared/ResponsiveImage.jsx";
import { getSectionConfig, getSectionStyleProperties } from "../../schemas/barberSchema.js";

const DEFAULT_CLASSIC_ORDER = [
  "hero",
  "story",
  "services",
  "packages",
  "team",
  "reviews",
  "gallery",
  "hours",
  "footer",
];

export default function ClassicTheme({ barber }) {
  const rootRef = useRef(null);

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

  useEffect(() => {
    return createAnimationScope(() => {
      const headings = rootRef.current?.querySelectorAll("[data-heritage-heading]");
      if (headings) {
        headings.forEach((h) => {
          animateOnScroll(h, { y: 25, opacity: 0, duration: 0.8 });
        });
      }

      const ledgerItems = rootRef.current?.querySelectorAll("[data-ledger-item]");
      if (ledgerItems?.length) {
        animateOnScroll(ledgerItems, {
          y: 15,
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
  const reviewsConfig = getSectionConfig(barber, "reviews");
  const galleryConfig = getSectionConfig(barber, "gallery");
  const hoursConfig = getSectionConfig(barber, "hours");
  const contactConfig = getSectionConfig(barber, "contact");
  const footerConfig = getSectionConfig(barber, "footer");

  const defaultBurgundy = branding.accentColor || "#87232e";
  const defaultGold = "#bca061";

  const tickerStyles = getSectionStyleProperties(marqueeConfig.style, {
    backgroundColor: "#251214",
    textColor: "#d6b77b",
    borderColor: "rgba(34, 24, 21, 0.15)",
  });

  const navStyles = getSectionStyleProperties(navConfig.style, {
    backgroundColor: "rgba(251, 249, 244, 0.95)",
    textColor: "#221815",
    accentColor: defaultBurgundy,
    borderColor: "rgba(34, 24, 21, 0.15)",
  });

  const heroStyles = getSectionStyleProperties(heroConfig.style, {
    backgroundColor: "#fbf9f4",
    textColor: "#221815",
    accentColor: defaultBurgundy,
    borderColor: "rgba(34, 24, 21, 0.15)",
  });

  const storyStyles = getSectionStyleProperties(storyConfig.style, {
    backgroundColor: "#251214",
    textColor: "#fbf9f4",
    accentColor: defaultGold,
    borderColor: "rgba(34, 24, 21, 0.15)",
  });

  const servicesStyles = getSectionStyleProperties(servicesConfig.style, {
    backgroundColor: "#fbf9f4",
    cardBackground: "#f5efe4",
    textColor: "#221815",
    accentColor: defaultBurgundy,
    borderColor: "rgba(34, 24, 21, 0.15)",
  });

  const packagesStyles = getSectionStyleProperties(packagesConfig.style, {
    backgroundColor: "#eae2d3",
    cardBackground: "#fbf9f4",
    textColor: "#221815",
    accentColor: defaultBurgundy,
    borderColor: "rgba(34, 24, 21, 0.15)",
  });

  const teamStyles = getSectionStyleProperties(teamConfig.style, {
    backgroundColor: "#fbf9f4",
    cardBackground: "#f5efe4",
    textColor: "#221815",
    accentColor: defaultBurgundy,
    borderColor: "rgba(34, 24, 21, 0.15)",
  });

  const reviewsStyles = getSectionStyleProperties(reviewsConfig.style, {
    backgroundColor: "#251214",
    cardBackground: "#1d0d10",
    textColor: "#fbf9f4",
    accentColor: "#d6b77b",
    borderColor: "rgba(34, 24, 21, 0.15)",
  });

  const galleryStyles = getSectionStyleProperties(galleryConfig.style, {
    backgroundColor: "#f5efe4",
    cardBackground: "#fbf9f4",
    textColor: "#221815",
    accentColor: defaultBurgundy,
    borderColor: "rgba(34, 24, 21, 0.15)",
  });

  const contactStyles = getSectionStyleProperties(contactConfig.style, {
    backgroundColor: "#fbf9f4",
    cardBackground: "#f5efe4",
    textColor: "#221815",
    accentColor: defaultBurgundy,
    borderColor: "rgba(34, 24, 21, 0.15)",
  });

  const footerStyles = getSectionStyleProperties(footerConfig.style || footer?.style, {
    backgroundColor: "#251214",
    textColor: "#fbf9f4",
    accentColor: "#d6b77b",
    borderColor: "#251214",
  });

  // Active navigation links - dynamically hides links for disabled sections
  const navLinks = (navigation?.links && navigation.links.length > 0)
    ? navigation.links
    : [
        sections.services && { label: "The Ledger", href: "#heritage-services", id: "services" },
        sections.packages && { label: "Guild Rituals", href: "#heritage-packages", id: "packages" },
        sections.story && { label: "Tradition", href: "#heritage-story", id: "story" },
        sections.team && { label: "Guildsmen", href: "#heritage-team", id: "team" },
      ].filter(Boolean);

  // SECTION RENDERERS
  const renderHero = () => {
    if (!sections.hero) return null;
    const eyebrow = heroConfig.content.eyebrow || location || "St Georges Terrace, Perth";
    const titleLine1 = heroConfig.content.titleLine1 || "Master Barbering.";
    const titleLine2 = heroConfig.content.titleLine2 || "Uncompromising Tradition.";
    const heroDesc = heroConfig.content.description || tagline || "Cut-throat straight razor rituals, hot eucalyptus steam towels, and single-malt hospitality in Perth's historic quarter.";
    const primaryCta = heroConfig.content.primaryCtaText || "Request An Appointment";

    const frame1Img = heroConfig.images.frame1 || "/gallery/gallery-1.jpg";
    const frame1Cap = heroConfig.content.frame1Caption || "I. Feather Edge Stropping";
    const frame2Img = heroConfig.images.frame2 || branding.heroImage || "/src/assets/hero2.png";
    const frame2Cap = heroConfig.content.frame2Caption || "II. Handcrafted Timber Stations";
    const frame3Img = heroConfig.images.frame3 || "/gallery/gallery-5.jpg";
    const frame3Cap = heroConfig.content.frame3Caption || "III. Traditional Fellowship";

    return (
      <section
        key="hero"
        id="heritage-hero"
        style={heroStyles}
        className="border-b border-[#221815]/15 px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-[1400px]">
          {/* Ornamental Top Flourish */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-16 bg-[#bca061]" />
            <Shield className="h-5 w-5 text-[#bca061]" />
            <span className="h-px w-16 bg-[#bca061]" />
          </div>

          <div className="text-center max-w-[960px] mx-auto space-y-6">
            <p className="font-sans text-xs uppercase tracking-[0.35em] text-[var(--section-accent,#87232e)] font-semibold">
              {eyebrow}
            </p>

            <h1
              data-heritage-heading
              style={{ color: heroConfig.style?.headingColor }}
              className="font-gt-super text-5xl font-normal leading-[0.95] tracking-tight text-[#221815] sm:text-7xl md:text-8xl"
            >
              {titleLine1}
              <br />
              <span className="italic text-[var(--section-accent,#87232e)]">{titleLine2}</span>
            </h1>

            <p className="font-sans text-base leading-relaxed text-[#221815]/80 md:text-lg max-w-[700px] mx-auto">
              {heroDesc}
            </p>

            {bookingUrl && (
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    backgroundColor: heroConfig.style?.buttonBackground || "var(--section-accent,#87232e)",
                    color: heroConfig.style?.buttonTextColor || "#ffffff",
                    borderColor: heroConfig.style?.buttonBorderColor || "var(--section-accent,#87232e)",
                  }}
                  className="border-2 bg-[#87232e] px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#251214] hover:border-[#251214] btn-dynamic-hover"
                >
                  {primaryCta}
                </a>
                {addressLine && (
                  <span className="font-sans text-xs text-[#221815]/70 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#bca061]" />
                    {addressLine}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Editorial Triple Framing */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="border border-[#221815]/15 bg-[#f5efe4] p-3 shadow-sm">
              <div className="h-[300px] overflow-hidden bg-neutral-800">
                <ResponsiveImage
                  image={heroConfig.images.frame1 || frame1Img}
                  alt={frame1Cap}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <p className="mt-3 text-center font-sans text-xs uppercase tracking-wider text-[#221815]/70">
                {frame1Cap}
              </p>
            </div>

            <div className="border border-[#221815]/15 bg-[#f5efe4] p-3 shadow-sm">
              <div className="h-[300px] overflow-hidden bg-neutral-800">
                <ResponsiveImage
                  image={heroConfig.images.frame2 || branding.heroImageResponsive || frame2Img}
                  alt={frame2Cap}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <p className="mt-3 text-center font-sans text-xs uppercase tracking-wider text-[#221815]/70">
                {frame2Cap}
              </p>
            </div>

            <div className="border border-[#221815]/15 bg-[#f5efe4] p-3 shadow-sm">
              <div className="h-[300px] overflow-hidden bg-neutral-800">
                <ResponsiveImage
                  image={heroConfig.images.frame3 || frame3Img}
                  alt={frame3Cap}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <p className="mt-3 text-center font-sans text-xs uppercase tracking-wider text-[#221815]/70">
                {frame3Cap}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderStory = () => {
    if (!sections.story) return null;
    const eyebrow = storyConfig.content.eyebrow || "The Guild Charter";
    const title = storyConfig.content.title || "\"Barbering is an ancient craft of hands, honour, and razor discipline.\"";
    const pillars = storyConfig.content.pillars || "Single-Malt Hospitality • Hot Sandalwood Steam • Japanese High-Carbon Blades";

    return (
      <section
        key="story"
        id="heritage-story"
        style={storyStyles}
        className="border-b border-[#221815]/15 bg-[#251214] text-[#fbf9f4] px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="border border-[#bca061]/40 p-8 md:p-14 relative">
            {/* Corner Ornaments */}
            <div className="absolute -top-3 -left-3 h-6 w-6 border-t-2 border-l-2 border-[#bca061]" />
            <div className="absolute -top-3 -right-3 h-6 w-6 border-t-2 border-r-2 border-[#bca061]" />
            <div className="absolute -bottom-3 -left-3 h-6 w-6 border-b-2 border-l-2 border-[#bca061]" />
            <div className="absolute -bottom-3 -right-3 h-6 w-6 border-b-2 border-r-2 border-[#bca061]" />

            <div className="text-center max-w-[850px] mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.3em] text-[#d6b77b]">
                <Award className="h-4 w-4" />
                <span>{eyebrow}</span>
              </div>

              <h2
                style={{ color: storyConfig.style?.headingColor }}
                className="font-gt-super text-3xl font-light leading-snug md:text-5xl text-white"
              >
                {title}
              </h2>

              <p className="font-sans text-sm font-light leading-relaxed text-[#fbf9f4]/80 md:text-base">
                {storyConfig.content.description || businessDescription}
              </p>

              <div className="pt-6 flex flex-wrap justify-center items-center gap-4 md:gap-8 font-sans text-xs uppercase tracking-wider text-[#d6b77b]">
                {pillars}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderServices = () => {
    if (!sections.services || services.length === 0) return null;
    const eyebrow = servicesConfig.content.eyebrow || "Service Tariff";
    const title = servicesConfig.content.title || "The Guild Ledger";
    const desc = servicesConfig.content.description || "All services include complimentary refreshment and hot towel treatment";
    const reserveCta = servicesConfig.content.reserveCtaText || "Reserve Chair →";

    return (
      <section
        key="services"
        id="heritage-services"
        style={servicesStyles}
        className="border-b border-[#221815]/15 px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-16">
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-[var(--section-accent,#87232e)] font-semibold">
              {eyebrow}
            </span>
            <h2
              data-heritage-heading
              style={{ color: servicesConfig.style?.headingColor }}
              className="mt-2 font-gt-super text-4xl font-normal md:text-6xl text-[#221815]"
            >
              {title}
            </h2>
            <p className="font-sans text-xs text-[#221815]/60 mt-3 uppercase tracking-widest">
              {desc}
            </p>
          </div>

          <div
            style={{
              backgroundColor: servicesConfig.style?.cardBackground,
              borderColor: servicesConfig.style?.borderColor,
            }}
            className="border-2 border-[#221815] bg-[#f5efe4] p-8 md:p-14 shadow-md space-y-8"
          >
            {services.map((srv, idx) => (
              <div
                key={srv.id}
                data-ledger-item
                className="group flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-[#221815]/10 pb-6"
              >
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-sans text-xs font-bold text-[var(--section-accent,#87232e)] tracking-wider">
                      {srv.number || idx + 1}.
                    </span>
                    <h3 className="font-gt-super text-2xl font-normal text-[#221815] group-hover:text-[var(--section-accent,#87232e)] transition-colors">
                      {srv.name}
                    </h3>
                    <span className="hidden md:inline-block flex-1 border-b border-dotted border-[#221815]/30 mx-3" />
                    <span
                      style={{ color: servicesConfig.style?.priceColor }}
                      className="font-gt-super text-2xl font-bold text-[var(--section-accent,#87232e)]"
                    >
                      {srv.price}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[#221815]/75 mt-2 pl-6 max-w-[700px] leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                {(srv.bookingUrl || bookingUrl) && (
                  <a
                    href={srv.bookingUrl || bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 md:mt-0 font-sans text-[11px] font-semibold uppercase tracking-wider text-[var(--section-accent,#87232e)] hover:underline self-end md:self-auto"
                  >
                    {reserveCta}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderPackages = () => {
    if (!sections.packages || packages.length === 0) return null;
    const eyebrow = packagesConfig.content.eyebrow || "Signature Experiences";
    const title = packagesConfig.content.title || "Gentlemen's Rituals";
    const appointPrefix = packagesConfig.content.appointCtaText || "Appoint";

    return (
      <section
        key="packages"
        id="heritage-packages"
        style={packagesStyles}
        className="border-b border-[#221815]/15 bg-[#eae2d3] px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center mb-16">
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-[var(--section-accent,#87232e)] font-semibold">
              {eyebrow}
            </span>
            <h2
              data-heritage-heading
              style={{ color: packagesConfig.style?.headingColor }}
              className="mt-2 font-gt-super text-4xl font-normal md:text-5xl"
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
                className="border-2 border-[#251214] bg-[#fbf9f4] p-8 md:p-10 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline justify-between border-b-2 border-[#251214] pb-4">
                    <div>
                      <span className="font-sans text-xs uppercase tracking-widest text-[var(--section-accent,#87232e)]">
                        Ritual {pkg.number}
                      </span>
                      <h3 className="font-gt-super text-3xl text-[#221815]">
                        {pkg.name}
                      </h3>
                    </div>
                    <span
                      style={{ color: packagesConfig.style?.priceColor }}
                      className="font-gt-super text-3xl font-bold text-[var(--section-accent,#87232e)]"
                    >
                      {pkg.price}
                    </span>
                  </div>

                  <p className="font-sans text-sm text-[#221815]/80 mt-4 leading-relaxed">
                    {pkg.description}
                  </p>

                  {pkg.services.length > 0 && (
                    <div className="mt-6 border-t border-[#221815]/10 pt-4">
                      <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[var(--section-accent,#87232e)] mb-2">
                        Ceremony Components:
                      </p>
                      <ul className="font-sans text-xs space-y-1.5 text-[#221815]/80">
                        {pkg.services.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--section-accent,#87232e)]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {(pkg.bookingUrl || bookingUrl) && (
                  <div className="mt-8 pt-4 border-t border-[#221815]/15">
                    <a
                      href={pkg.bookingUrl || bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        backgroundColor: packagesConfig.style?.buttonBackground || "var(--section-accent,#87232e)",
                        color: packagesConfig.style?.buttonTextColor || "#ffffff",
                      }}
                      className="flex w-full items-center justify-center border-2 border-[#87232e] bg-[#87232e] py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-[#251214] hover:border-[#251214] transition-colors btn-dynamic-hover"
                    >
                      {appointPrefix} {pkg.name}
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
    const eyebrow = teamConfig.content.eyebrow || "Guild Registry";
    const title = teamConfig.content.title || "The Master Craftsmen";

    return (
      <section
        key="team"
        id="heritage-team"
        style={teamStyles}
        className="border-b border-[#221815]/15 px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center mb-16">
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-[var(--section-accent,#87232e)] font-semibold">
              {eyebrow}
            </span>
            <h2
              data-heritage-heading
              style={{ color: teamConfig.style?.headingColor }}
              className="mt-2 font-gt-super text-4xl font-normal md:text-5xl"
            >
              {title}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-[900px] mx-auto">
            {team.map((member) => (
              <div
                key={member.id}
                style={{
                  backgroundColor: teamConfig.style?.cardBackground,
                  borderColor: teamConfig.style?.borderColor,
                }}
                className="border border-[#221815]/20 bg-[#f5efe4] p-4 text-center"
              >
                <div className="h-[360px] overflow-hidden bg-neutral-900 border border-[#221815]/20">
                  {member.responsiveImage || member.image ? (
                    <ResponsiveImage
                      image={member.responsiveImage || member.image}
                      alt={member.alt || member.name}
                      className="h-full w-full object-cover grayscale sepia-[0.2] transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-neutral-400">
                      <Scissors className="h-10 w-10" />
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="font-gt-super text-2xl text-[#221815]">{member.name}</h3>
                  <p className="font-sans text-xs uppercase tracking-wider text-[var(--section-accent,#87232e)] font-semibold">
                    {member.role}
                  </p>
                  {member.experience && (
                    <p className="font-sans text-xs text-[#221815]/60 mt-1">
                      {member.experience}
                    </p>
                  )}
                  {member.bio && (
                    <p className="font-sans text-xs text-[#221815]/75 mt-3 leading-relaxed border-t border-[#221815]/10 pt-3">
                      {member.bio}
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

  const renderReviews = () => {
    if (!sections.reviews || reviews.length === 0) return null;
    const eyebrow = reviewsConfig.content.eyebrow || "Patron Testimonials";
    const title = reviewsConfig.content.title || "The Heritage Ledger";

    return (
      <section
        key="reviews"
        style={reviewsStyles}
        className="border-b border-[#221815]/15 bg-[#251214] text-[#fbf9f4] px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-[#d6b77b]">
              {eyebrow}
            </span>
            <h2
              style={{ color: reviewsConfig.style?.headingColor }}
              className="mt-2 font-gt-super text-4xl text-white md:text-5xl"
            >
              {title}
            </h2>
            {ratingSummary && (
              <div className="mt-3 font-sans text-xs text-[#d6b77b] uppercase tracking-wider">
                ★ {ratingSummary.score} / 5.0 • {ratingSummary.totalReviews}
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
                className="border border-[#bca061]/30 bg-[#1d0d10] p-8 space-y-4"
              >
                <div className="flex gap-1 text-[#d6b77b]">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#d6b77b]" />
                  ))}
                </div>
                <p className="font-gt-super text-lg font-light leading-relaxed text-[#fbf9f4]/90 italic">
                  "{rev.review}"
                </p>
                <footer className="font-sans text-xs uppercase tracking-wider text-[#d6b77b] border-t border-[#bca061]/20 pt-3 flex justify-between">
                  <span>{rev.name}</span>
                  <span className="text-white/40">{rev.source}</span>
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
    const eyebrow = galleryConfig.content.eyebrow || "Photographic Record";
    const title = galleryConfig.content.title || "The Guild Archive";

    return (
      <section
        key="gallery"
        style={galleryStyles}
        className="border-b border-[#221815]/15 bg-[#f5efe4] px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-[var(--section-accent,#87232e)] font-semibold">
              {eyebrow}
            </span>
            <h2
              style={{ color: galleryConfig.style?.headingColor }}
              className="mt-2 font-gt-super text-4xl text-[#221815] md:text-5xl"
            >
              {title}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((g) => (
              <div key={g.id} className="border-2 border-[#221815] p-2 bg-[#fbf9f4] shadow-sm">
                <div className="h-[220px] overflow-hidden bg-neutral-900">
                  <ResponsiveImage
                    image={g.responsiveImage || g.image}
                    alt={g.alt || g.title}
                    className="h-full w-full object-cover grayscale sepia-[0.15] transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <p className="mt-2 text-center font-sans text-[11px] uppercase tracking-wider text-[#221815]/75 truncate">
                  {g.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderHoursAndContact = () => {
    if (!sections.contact && !sections.hours) return null;
    const eyebrow = contactConfig.content.eyebrow || "Terrace Coordinates";
    const title = contactConfig.content.title || "Visit the Guild";
    const hoursTitle = hoursConfig.content.title || "Hours of Barbering";

    return (
      <section
        key="hours"
        style={contactStyles}
        className="px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <span className="font-sans text-xs uppercase tracking-[0.35em] text-[var(--section-accent,#87232e)] font-semibold">
                {eyebrow}
              </span>
              <h2
                style={{ color: contactConfig.style?.headingColor }}
                className="font-gt-super text-4xl text-[#221815] md:text-5xl"
              >
                {title}
              </h2>
              <div className="font-sans text-sm space-y-4 text-[#221815]/80">
                <p className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[var(--section-accent,#87232e)] shrink-0 mt-0.5" />
                  <span>{location}</span>
                </p>
                {phone && (
                  <p className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[var(--section-accent,#87232e)] shrink-0" />
                    <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:underline">
                      {phone}
                    </a>
                  </p>
                )}
                {email && (
                  <p className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[var(--section-accent,#87232e)] shrink-0" />
                    <a href={`mailto:${email}`} className="hover:underline">
                      {email}
                    </a>
                  </p>
                )}
                {mapUrl && (
                  <p className="pt-2">
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-wider text-[var(--section-accent,#87232e)] hover:underline"
                    >
                      <span>Locate on Terrace Map</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </p>
                )}
              </div>
            </div>

            {sections.hours && hours.length > 0 && (
              <div className="border-2 border-[#251214] bg-[#f5efe4] p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-6 font-sans text-xs uppercase tracking-wider text-[var(--section-accent,#87232e)] font-semibold">
                  <Clock className="h-4 w-4" />
                  <span>{hoursTitle}</span>
                </div>
                <div className="font-sans text-xs space-y-3 divide-y divide-[#221815]/10">
                  {hours.map((h, i) => (
                    <div key={i} className="flex justify-between items-center pt-2.5">
                      <span>{h.days}</span>
                      <span className="font-bold text-[var(--section-accent,#87232e)]">{h.time}</span>
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
    const slogan = footerConfig.content.title || footer?.slogan || "Preserving the gentle art of the straight razor.";
    const footerEyebrow = footerConfig.content.eyebrow || businessName;
    const ctaText = footer?.ctaText || "Appoint Chair";
    const copyright = footer?.copyrightText || `© ${new Date().getFullYear()} ${businessName}. Handcrafted in Perth, Western Australia.`;

    return (
      <footer
        key="footer"
        style={footerStyles}
        className="border-t-2 border-[#251214] bg-[#251214] px-6 py-16 text-[#fbf9f4] md:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center border-b border-white/10 pb-12">
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#d6b77b]">
                {footerEyebrow}
              </p>
              <h2
                style={{ color: footerConfig.style?.headingColor }}
                className="font-gt-super text-3xl font-light md:text-5xl text-white mt-1"
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
                  backgroundColor: footerConfig.style?.buttonBackground || "#d6b77b",
                  color: footerConfig.style?.buttonTextColor || "#251214",
                  borderColor: footerConfig.style?.buttonBorderColor || "#d6b77b",
                }}
                className="border-2 border-[#d6b77b] bg-[#d6b77b] px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#251214] hover:bg-transparent hover:text-[#d6b77b] transition-colors btn-dynamic-hover"
              >
                {ctaText}
              </a>
            )}
          </div>

          <div className="flex flex-col justify-between gap-4 pt-8 font-sans text-xs text-white/50 sm:flex-row">
            <p>{copyright}</p>
            <div className="flex gap-6">
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

  const renderedKeys = new Set();
  const activeOrder = Array.isArray(sectionOrder) && sectionOrder.length > 0
    ? sectionOrder
    : DEFAULT_CLASSIC_ORDER;

  return (
    <div
      ref={rootRef}
      style={{
        backgroundColor: branding.backgroundColor || "#fbf9f4",
        color: branding.textColor || "#221815",
        ...(barber?.branding?.headingFont ? { "--font-heading": barber.branding.headingFont } : {}),
        ...(barber?.branding?.bodyFont ? { "--font-body": barber.branding.bodyFont, fontFamily: barber.branding.bodyFont } : {}),
      }}
      className="relative min-h-screen bg-[#fbf9f4] text-[#221815] font-serif selection:bg-[#87232e] selection:text-[#fbf9f4]"
    >
      <NoiseOverlay opacity={0.03} blendMode="multiply" />

      {/* HERITAGE CREST & GUILD BADGE TOP BAR */}
      {sections.marquee !== false && (
        <div
          style={tickerStyles}
          className="border-b border-[#221815]/15 bg-[#251214] py-2 px-6 text-center text-[11px] font-sans uppercase tracking-[0.25em] text-[#d6b77b]"
        >
          <span>{marqueeConfig.content.tickerMessage || "MASTER BARBERING GUILD • ESTABLISHED PERTH • TRADITIONAL STRAIGHT RAZOR SHAVES"}</span>
        </div>
      )}

      {/* HERITAGE NAVIGATION */}
      <header
        style={navStyles}
        className="border-b border-[#221815]/15 bg-[#fbf9f4]/95 px-6 py-6 md:px-12 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <a href="#heritage-hero" className="flex items-center gap-3.5 group">
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
              <div className="flex h-12 w-12 items-center justify-center border-2 border-[#bca061] bg-[#251214] text-[#d6b77b] shadow-sm">
                <Scissors className="h-6 w-6" />
              </div>
            )}
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--section-accent,#87232e)] font-semibold">
                {branding.tag || "PERTH HERITAGE QUARTER"}
              </p>
              <h1 className="font-gt-super text-xl font-medium tracking-tight text-[#221815] md:text-2xl">
                {businessName}
              </h1>
            </div>
          </a>

          <nav aria-label="Heritage Navigation" className="hidden lg:flex items-center gap-8 font-sans text-xs uppercase tracking-[0.2em] text-[#221815]/80">
            {navLinks.map((link) => (
              <a key={link.id || link.label} href={link.href} className="hover:text-[var(--section-accent,#87232e)] transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="hidden sm:inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-wider text-[#221815]/80 hover:text-[var(--section-accent,#87232e)]"
              >
                <Phone className="h-3.5 w-3.5 text-[#bca061]" />
                {phone}
              </a>
            )}
            {bookingUrl && (
              <a
                href={navigation?.bookButtonUrl || bookingUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: navConfig.style?.buttonBackground || "#251214",
                  color: navConfig.style?.buttonTextColor || "#fbf9f4",
                }}
                className="border-2 border-[#251214] bg-[#251214] px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#fbf9f4] shadow-sm transition-all hover:bg-[#87232e] hover:border-[#87232e] btn-dynamic-hover"
              >
                {navigation?.bookButtonText || "Appoint Chair"}
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
