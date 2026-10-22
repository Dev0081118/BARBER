import { useState, useRef, useEffect } from "react";
import { Scissors, MapPin, Phone, Mail, Clock, ArrowUpRight, CheckCircle2, Sparkles, Filter } from "lucide-react";
import { createAnimationScope, animateOnScroll } from "../utils/animations.js";
import NoiseOverlay from "../components/shared/NoiseOverlay.jsx";

export default function ModernStudioTemplate({ barber }) {
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
  }, [barber.slug]);

  // Categories for filtering
  const categories = ["All", ...new Set(services.map((s) => s.category || "General"))];
  const filteredServices =
    selectedCategory === "All"
      ? services
      : services.filter((s) => (s.category || "General") === selectedCategory);

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen bg-[#f4f1ea] text-[#1c1d1f] font-sans selection:bg-[#414b3c] selection:text-[#f4f1ea]"
    >
      <NoiseOverlay opacity={0.025} blendMode="multiply" />

      {/* =========================================================
          TOP TICKER & TIME BAR
      ========================================================= */}
      <div className="border-b border-[#1c1d1f]/10 bg-[#eae6dc] px-6 py-2 text-[11px] font-mono uppercase tracking-wider text-[#1c1d1f]/80">
        <div className="mx-auto flex max-w-[1400px] flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>PERTH INDEPENDENT STUDIO • WALK-INS & APPOINTMENTS</span>
          </div>
          <div className="flex items-center gap-4">
            <span>PERTH LOCAL TIME (AWST): {perthTime || "14:30 AWST"}</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">NORTHBRIDGE PRECINCT</span>
          </div>
        </div>
      </div>

      {/* =========================================================
          STUDIO HEADER / NAVIGATION
      ========================================================= */}
      <header className="sticky top-0 z-40 border-b border-[#1c1d1f]/10 bg-[#f4f1ea]/90 backdrop-blur-md px-6 py-5 md:px-12">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <a href="#studio-hero" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-[#1c1d1f] text-[#f4f1ea]">
              <Scissors className="h-5 w-5" />
            </div>
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[#414b3c]">
                {branding.tag || "STUDIO 6003"}
              </span>
              <h1 className="font-gt-super text-lg font-bold tracking-tight text-[#1c1d1f]">
                {businessName}
              </h1>
            </div>
          </a>

          <nav aria-label="Studio navigation" className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider">
            {sections.services && (
              <a href="#studio-services" className="hover:text-[#414b3c] transition-colors">
                // 01. Services
              </a>
            )}
            {sections.packages && (
              <a href="#studio-packages" className="hover:text-[#414b3c] transition-colors">
                // 02. Curated
              </a>
            )}
            {sections.team && (
              <a href="#studio-team" className="hover:text-[#414b3c] transition-colors">
                // 03. Stylists
              </a>
            )}
            {sections.gallery && (
              <a href="#studio-gallery" className="hover:text-[#414b3c] transition-colors">
                // 04. Space
              </a>
            )}
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
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-[#1c1d1f] px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-[#f4f1ea] transition-all duration-200 hover:bg-[#414b3c] hover:shadow-lg"
              >
                <span>Book Chair</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* =========================================================
          HERO — SWISS GRID EDITORIAL
      ========================================================= */}
      {sections.hero && (
        <section id="studio-hero" className="border-b border-[#1c1d1f]/10 px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-end">
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#414b3c]/30 bg-[#414b3c]/10 px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-[#414b3c]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Contemporary Barber Studio</span>
                </div>

                <h1
                  data-studio-heading
                  className="font-gt-super text-5xl font-normal leading-[0.92] tracking-tight text-[#1c1d1f] sm:text-7xl md:text-8xl"
                >
                  Architectural cuts.
                  <br />
                  <span className="italic text-[#414b3c]">Textured craft.</span>
                </h1>

                <p className="max-w-[620px] text-lg font-light leading-relaxed text-[#1c1d1f]/80 md:text-xl">
                  {tagline || "Modern hair architecture, taper fades, and low-fi atmosphere designed for the creative community of Perth."}
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-4">
                  {bookingUrl && (
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 bg-[#414b3c] px-8 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-[#f4f1ea] transition-all hover:bg-[#1c1d1f]"
                    >
                      <span>Reserve Appointment</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  {addressLine && (
                    <a
                      href={mapUrl || "#studio-location"}
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#1c1d1f]/70 hover:text-[#1c1d1f] border-b border-[#1c1d1f]/20 pb-1"
                    >
                      <MapPin className="h-3.5 w-3.5 text-[#414b3c]" />
                      {addressLine}
                    </a>
                  )}
                </div>
              </div>

              {/* Asymmetric Hero Card / Image */}
              <div className="lg:col-span-4">
                <div className="relative border border-[#1c1d1f] bg-white p-3 shadow-[8px_8px_0px_0px_#1c1d1f]">
                  <div className="relative h-[420px] overflow-hidden bg-[#eae6dc]">
                    <img
                      src={branding.heroImage || "/scrollwindow/photo-1599351431202-1e0f0137899a.avif"}
                      alt={businessName}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute bottom-3 left-3 bg-[#1c1d1f] px-3 py-1 text-[11px] font-mono text-[#f4f1ea]">
                      PERTH STUDIO SPECIMEN
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between text-xs font-mono text-[#1c1d1f]/70">
                    <span>INDEX NO. 6003</span>
                    <span>CRAFT OVER HASTE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          STUDIO ETHOS & METRICS
      ========================================================= */}
      {sections.story && (
        <section id="studio-story" className="border-b border-[#1c1d1f]/10 bg-white px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4 border-r-0 lg:border-r border-[#1c1d1f]/10 lg:pr-12">
                <span className="font-mono text-xs uppercase tracking-widest text-[#414b3c]">
                  // 00. The Studio Ethos
                </span>
                <h2 className="mt-4 font-gt-super text-3xl font-medium leading-snug md:text-4xl">
                  Rejecting assembly lines for deliberate craft.
                </h2>
                <div className="mt-8 space-y-4 font-mono text-xs text-[#1c1d1f]/70">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#414b3c]" />
                    <span>One client per chair block</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#414b3c]" />
                    <span>Non-toxic organic grooming formulas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#414b3c]" />
                    <span>Specialty batch espresso bar on site</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-8">
                <p className="text-xl font-light leading-relaxed text-[#1c1d1f] md:text-2xl">
                  {businessDescription}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#1c1d1f]/10 pt-8 font-mono">
                  <div className="border border-[#1c1d1f]/10 bg-[#f4f1ea] p-5">
                    <span className="text-3xl font-bold text-[#414b3c]">45m</span>
                    <p className="mt-1 text-xs uppercase text-[#1c1d1f]/60">Standard Consult</p>
                  </div>
                  <div className="border border-[#1c1d1f]/10 bg-[#f4f1ea] p-5">
                    <span className="text-3xl font-bold text-[#414b3c]">100%</span>
                    <p className="mt-1 text-xs uppercase text-[#1c1d1f]/60">Shear & Razor Precision</p>
                  </div>
                  <div className="border border-[#1c1d1f]/10 bg-[#f4f1ea] p-5">
                    <span className="text-3xl font-bold text-[#414b3c]">6003</span>
                    <p className="mt-1 text-xs uppercase text-[#1c1d1f]/60">Northbridge Postal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          INTERACTIVE SERVICE MATRIX
      ========================================================= */}
      {sections.services && services.length > 0 && (
        <section id="studio-services" className="border-b border-[#1c1d1f]/10 px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-12">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#414b3c]">
                  // 01. The Matrix
                </span>
                <h2
                  data-studio-heading
                  className="mt-2 font-gt-super text-4xl font-normal tracking-tight md:text-6xl"
                >
                  Service Catalog
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
                  className="group relative flex flex-col justify-between border border-[#1c1d1f]/15 bg-white p-7 transition-all duration-200 hover:border-[#1c1d1f] hover:shadow-[4px_4px_0px_0px_#414b3c]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#414b3c]">
                        {service.number} // {service.category}
                      </span>
                      <h3 className="mt-1 font-gt-super text-2xl font-medium text-[#1c1d1f]">
                        {service.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-2xl font-bold text-[#1c1d1f]">
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

                  {bookingUrl && (
                    <div className="mt-6 flex items-center justify-between border-t border-[#1c1d1f]/10 pt-4">
                      <span className="font-mono text-[11px] text-[#414b3c]">
                        {service.popular ? "★ Studio Favorite" : "Standard Allocation"}
                      </span>
                      <a
                        href={bookingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-[#1c1d1f] hover:text-[#414b3c] group-hover:translate-x-1 transition-transform"
                      >
                        Book This Cut
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          CURATED PACKAGES
      ========================================================= */}
      {sections.packages && packages.length > 0 && (
        <section id="studio-packages" className="border-b border-[#1c1d1f]/10 bg-[#eae6dc] px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-14">
              <span className="font-mono text-xs uppercase tracking-widest text-[#414b3c]">
                // 02. Curated
              </span>
              <h2
                data-studio-heading
                className="mt-2 font-gt-super text-4xl font-normal tracking-tight md:text-5xl"
              >
                Studio Packages
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex flex-col justify-between border border-[#1c1d1f] bg-white p-8 shadow-[6px_6px_0px_0px_#1c1d1f]"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[#1c1d1f]/10 pb-4">
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#414b3c]">
                          Package {pkg.number}
                        </span>
                        <h3 className="font-gt-super text-3xl font-medium text-[#1c1d1f]">
                          {pkg.name}
                        </h3>
                      </div>
                      <span className="font-mono text-3xl font-bold text-[#414b3c]">
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
                              <span className="h-1.5 w-1.5 bg-[#414b3c]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {bookingUrl && (
                    <div className="mt-8 pt-4 border-t border-[#1c1d1f]/10">
                      <a
                        href={bookingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-center gap-2 bg-[#1c1d1f] py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#414b3c]"
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
      )}

      {/* =========================================================
          STYLIST ROSTER
      ========================================================= */}
      {sections.team && team.length > 0 && (
        <section id="studio-team" className="border-b border-[#1c1d1f]/10 px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-14">
              <span className="font-mono text-xs uppercase tracking-widest text-[#414b3c]">
                // 03. Stylists
              </span>
              <h2
                data-studio-heading
                className="mt-2 font-gt-super text-4xl font-normal tracking-tight md:text-5xl"
              >
                The Roster
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((stylist) => (
                <div
                  key={stylist.id}
                  className="border border-[#1c1d1f]/15 bg-white p-4 transition-all hover:border-[#1c1d1f]"
                >
                  <div className="relative h-[340px] overflow-hidden bg-[#eae6dc]">
                    {stylist.image ? (
                      <img
                        src={stylist.image}
                        alt={stylist.name}
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
                    <p className="font-mono text-xs uppercase text-[#414b3c]">{stylist.role}</p>
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
      )}

      {/* =========================================================
          STUDIO SPACE / ARCHIVE
      ========================================================= */}
      {sections.gallery && gallery.length > 0 && (
        <section id="studio-gallery" className="border-b border-[#1c1d1f]/10 bg-white px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[#414b3c]">
                // 04. Space
              </span>
              <h2
                data-studio-heading
                className="mt-2 font-gt-super text-4xl font-normal tracking-tight md:text-5xl"
              >
                Studio Archive
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {gallery.map((g) => (
                <div key={g.id} className="relative h-[280px] overflow-hidden border border-[#1c1d1f]/10 bg-[#eae6dc]">
                  <img
                    src={g.image}
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
      )}

      {/* =========================================================
          VERIFIED CLIENT FEEDBACK
      ========================================================= */}
      {sections.reviews && reviews.length > 0 && (
        <section className="border-b border-[#1c1d1f]/10 px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#414b3c]">
                  // 05. Evidence
                </span>
                <h2 className="mt-2 font-gt-super text-4xl font-normal md:text-5xl">
                  Client Logs
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
      )}

      {/* =========================================================
          HOURS & STUDIO COORDINATES
      ========================================================= */}
      <section id="studio-location" className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#414b3c]">
                // Coordinates
              </span>
              <h2 className="font-gt-super text-4xl font-normal md:text-5xl">
                Northbridge Studio
              </h2>
              <div className="space-y-4 font-mono text-xs text-[#1c1d1f]/80">
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-[#414b3c] shrink-0" />
                  <span>{location}</span>
                </p>
                {phone && (
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#414b3c] shrink-0" />
                    <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:underline">
                      {phone}
                    </a>
                  </p>
                )}
                {email && (
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#414b3c] shrink-0" />
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
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#414b3c] hover:underline"
                >
                  Open Directions in Maps
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>

            {sections.hours && hours.length > 0 && (
              <div className="lg:col-span-6 border border-[#1c1d1f] bg-white p-8">
                <div className="flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-[#414b3c]">
                  <Clock className="h-4 w-4" />
                  <span>Operating Schedule</span>
                </div>
                <div className="space-y-3 font-mono text-xs divide-y divide-[#1c1d1f]/10">
                  {hours.map((h, i) => (
                    <div key={i} className="flex justify-between items-center pt-2.5">
                      <span>{h.days}</span>
                      <span className="font-bold text-[#414b3c]">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          MODERN STUDIO FOOTER
      ========================================================= */}
      <footer className="border-t border-[#1c1d1f] bg-[#1c1d1f] px-6 py-16 text-[#f4f1ea] md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center border-b border-white/10 pb-12">
            <div>
              <p className="font-mono text-xs uppercase text-[#414b3c]">
                {businessName} • Perth Studio System
              </p>
              <h2 className="font-gt-super text-3xl font-light md:text-5xl mt-1">
                Step up to the chair.
              </h2>
            </div>
            {bookingUrl && (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-[#414b3c] px-8 py-4 font-mono text-xs uppercase tracking-wider text-white hover:bg-white hover:text-black transition-colors"
              >
                Book An Appointment
              </a>
            )}
          </div>

          <div className="flex flex-col justify-between gap-4 pt-8 font-mono text-xs text-white/50 sm:flex-row">
            <p>© {new Date().getFullYear()} {businessName}. Independent Perth Grooming.</p>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </a>
              {socialLinks.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  {s.platform || s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
