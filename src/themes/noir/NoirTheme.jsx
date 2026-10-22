import { useRef, useEffect } from "react";
import { Scissors, MapPin, Phone, Mail, Clock, Star, ExternalLink, ArrowRight, ShieldCheck } from "lucide-react";
import { createHeroTimeline, animateOnScroll, createAnimationScope } from "../../utils/animations.js";
import NoiseOverlay from "../../components/shared/NoiseOverlay.jsx";

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
  } = barber;

  return (
    <div ref={rootRef} className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-[#d4af37] selection:text-black">
      <NoiseOverlay opacity={0.035} />

      {/* =========================================================
          NOIR LUXURY NAVIGATION
      ========================================================= */}
      <header className="absolute left-0 top-0 z-40 w-full px-6 py-6 md:px-12 lg:px-20">
        <nav aria-label="Main Navigation" className="mx-auto flex max-w-[1400px] items-center justify-between">
          <a href="#noir-hero" className="flex items-center gap-3.5 group">
            {branding.logo ? (
              <img
                src={branding.logo}
                alt={`${businessName} logo`}
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
            {sections.services && (
              <a
                href="#noir-services"
                className="hidden font-helvetica text-xs uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 hover:text-[#d4af37] sm:block"
              >
                Services
              </a>
            )}
            {sections.packages && (
              <a
                href="#noir-packages"
                className="hidden font-helvetica text-xs uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 hover:text-[#d4af37] md:block"
              >
                Packages
              </a>
            )}
            {sections.gallery && (
              <a
                href="#noir-gallery"
                className="hidden font-helvetica text-xs uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 hover:text-[#d4af37] lg:block"
              >
                Gallery
              </a>
            )}
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
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden border border-[#d4af37]/80 bg-neutral-950 px-6 py-3 font-helvetica text-xs uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#d4af37] hover:shadow-[0_0_25px_rgba(212,175,55,0.2)]"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-[#d4af37] transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="relative z-10 font-medium transition-colors duration-500 group-hover:text-black">
                  Book Chair
                </span>
              </a>
            )}
          </div>
        </nav>
      </header>

      {/* =========================================================
          HERO SECTION — CINEMATIC EDITORIAL
      ========================================================= */}
      {sections.hero && (
        <section
          id="noir-hero"
          ref={heroRef}
          className="relative min-h-screen overflow-hidden flex flex-col justify-end px-6 pb-16 pt-36 md:px-12 md:pb-24 lg:px-20"
        >
          {/* Background image & gradient overlay */}
          <div
            data-hero-image
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{
              backgroundImage: `url(${branding.heroImage || "/src/assets/hero.png"})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/70 to-[#09090b]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[#09090b]/50 to-[#09090b]" />

          {/* Hero Content */}
          <div className="relative z-10 mx-auto w-full max-w-[1400px]">
            <div data-hero-badge className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#d4af37]" />
              <p className="font-helvetica text-xs uppercase tracking-[0.3em] text-[#d4af37]">
                {location || "Perth Western Australia"}
              </p>
            </div>

            <h1
              data-hero-title
              className="max-w-[1200px] font-gt-super text-5xl font-medium leading-[0.88] tracking-[-0.03em] text-white sm:text-7xl md:text-8xl lg:text-[9.5rem]"
            >
              {businessName.split(" ")[0]}
              <br />
              <span className="ml-[6vw] text-[#e4e4e7]">
                {businessName.split(" ").slice(1).join(" ") || "STUDIO"}
              </span>
            </h1>

            <div className="mt-10 flex flex-col justify-between gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end">
              <div data-hero-desc className="max-w-[540px]">
                <p className="font-helvetica text-base leading-relaxed text-white/80 md:text-lg">
                  {tagline || "Precision cuts, sharp razor work, and a proper chair experience crafted for discerning gentlemen."}
                </p>
                {addressLine && (
                  <p className="mt-3 flex items-center gap-2 text-xs uppercase tracking-wider text-white/50">
                    <MapPin className="h-3.5 w-3.5 text-[#d4af37]" />
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
                    className="group relative overflow-hidden border border-[#d4af37] bg-[#d4af37] px-8 py-4 font-helvetica text-xs font-semibold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-transparent hover:text-white"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Book Appointment
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </a>

                  {services.length > 0 && (
                    <a
                      href="#noir-services"
                      className="border border-white/20 px-6 py-4 font-helvetica text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-white hover:text-white text-center"
                    >
                      View Service Menu
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          MARQUEE OF CRAFT PILLARS
      ========================================================= */}
      {sections.marquee && (
        <section aria-label="Brand Pillars" className="relative border-y border-white/10 bg-[#121214] py-4 overflow-hidden">
          <div className="flex w-max motion-safe:animate-[marquee_26s_linear_infinite]" style={{ animation: "marquee 26s linear infinite" }}>
            {[1, 2, 3].flatMap(() => [
              "PRECISION HAIRCUTS",
              "SEAMLESS SKIN FADES",
              "HOT TOWEL STRAIGHT RAZOR SHAVES",
              "BEARD ARCHITECTURE",
              "PERTH CBD MASTER CRAFT",
            ]).map((phrase, idx) => (
              <div key={idx} className="flex items-center gap-8 px-6 text-xs uppercase tracking-[0.25em] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                <span className="font-helvetica font-medium">{phrase}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================
          STORY SECTION — SOPHISTICATED ASYMMETRY
      ========================================================= */}
      {sections.story && businessDescription && (
        <section id="noir-story" className="px-6 py-28 md:px-12 md:py-36 lg:px-20 border-b border-white/10">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="sticky top-28 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-[#d4af37]" />
                    <p className="font-helvetica text-xs uppercase tracking-[0.3em] text-[#d4af37]">
                      The Philosophy
                    </p>
                  </div>
                  <h2
                    data-animate-heading
                    className="font-gt-super text-4xl font-light leading-[1.05] tracking-tight text-white md:text-5xl"
                  >
                    More than a trim.
                    <br />
                    <span className="text-[#a1a1aa]">An art-directed standard.</span>
                  </h2>
                  <div className="border-t border-white/10 pt-6 space-y-3 text-xs text-white/60">
                    <p className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-[#d4af37]" />
                      Licensed Master Barbers
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#d4af37]" />
                      Dedicated time allocation per chair
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-8 text-white/80">
                <p className="font-helvetica text-2xl font-light leading-relaxed md:text-3xl text-white">
                  {businessDescription}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/10 pt-8">
                  <div className="space-y-2">
                    <p className="font-helvetica text-xs uppercase tracking-[0.2em] text-[#d4af37]">
                      01 / The Consultation
                    </p>
                    <p className="text-sm leading-relaxed text-white/60">
                      We study facial structure, growth whorls, lifestyle routines, and personal aesthetic before cutting a single follicle.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-helvetica text-xs uppercase tracking-[0.2em] text-[#d4af37]">
                      02 / The Finish
                    </p>
                    <p className="text-sm leading-relaxed text-white/60">
                      Every session culminates with hot aromatic towels, razor lineup on the neckline, and tailored botanical styling pomade.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          SERVICES SECTION — LUXURY ACCORDION / GRID
      ========================================================= */}
      {sections.services && services.length > 0 && (
        <section id="noir-services" className="bg-[#0e0e11] px-6 py-28 md:px-12 md:py-36 lg:px-20 border-b border-white/10">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-20">
              <div>
                <p className="font-helvetica text-xs uppercase tracking-[0.3em] text-[#d4af37] mb-4">
                  The Service Menu
                </p>
                <h2
                  data-animate-heading
                  className="font-gt-super text-4xl font-light tracking-tight text-white md:text-6xl lg:text-7xl"
                >
                  Crafted for distinction.
                </h2>
              </div>
              <p className="max-w-[360px] text-sm text-white/60">
                Transparent pricing, uncompromised chair time, and tailored grooming using top-tier Japanese steel and organic pomades.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {services.map((service) => (
                <article
                  key={service.id}
                  data-animate-service
                  className="group relative flex flex-col justify-between border border-white/10 bg-[#141418] p-8 transition-all duration-300 hover:border-[#d4af37]/60 hover:bg-[#18181f]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-[#d4af37]/80">
                        {service.number} // {service.category}
                      </span>
                      <h3 className="mt-2 font-gt-super text-2xl font-normal text-white group-hover:text-[#d4af37] transition-colors">
                        {service.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="font-gt-super text-2xl font-light text-white">
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

                  {bookingUrl && (
                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="text-white/40 uppercase tracking-wider">Perth CBD</span>
                      <a
                        href={bookingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#d4af37] hover:text-white transition-colors"
                      >
                        Reserve Service
                        <ExternalLink className="h-3 w-3" />
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
          SIGNATURE PACKAGES
      ========================================================= */}
      {sections.packages && packages.length > 0 && (
        <section id="noir-packages" className="px-6 py-28 md:px-12 md:py-36 lg:px-20 border-b border-white/10">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-20 text-center max-w-[800px] mx-auto">
              <p className="font-helvetica text-xs uppercase tracking-[0.3em] text-[#d4af37] mb-4">
                Curated Experiences
              </p>
              <h2
                data-animate-heading
                className="font-gt-super text-4xl font-light tracking-tight text-white md:text-6xl"
              >
                Signature Rituals
              </h2>
              <p className="mt-4 text-sm text-white/60">
                Complete grooming combinations engineered for milestones, weddings, executive presentations, and regular chair refinement.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="group relative flex flex-col justify-between overflow-hidden border border-white/10 bg-[#121215] transition-all duration-500 hover:border-[#d4af37]/70"
                >
                  {pkg.image && (
                    <div className="relative h-[320px] w-full overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={`${pkg.name} package`}
                        className="h-full w-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent" />
                      {pkg.badge && (
                        <span className="absolute top-4 left-4 rounded-full border border-[#d4af37] bg-black/80 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#d4af37]">
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
                        <span className="font-gt-super text-3xl text-[#d4af37]">
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
                                <span className="h-1 w-1 rounded-full bg-[#d4af37]" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {bookingUrl && (
                      <div className="mt-8 pt-6 border-t border-white/10">
                        <a
                          href={bookingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 w-full border border-[#d4af37] bg-transparent py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37] transition-colors duration-300 hover:bg-[#d4af37] hover:text-black"
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
      )}

      {/* =========================================================
          TEAM SECTION — MASTER CRAFTSMEN
      ========================================================= */}
      {sections.team && team.length > 0 && (
        <section id="noir-team" className="bg-[#0b0b0e] px-6 py-28 md:px-12 md:py-36 lg:px-20 border-b border-white/10">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="font-helvetica text-xs uppercase tracking-[0.3em] text-[#d4af37] mb-4">
                  The Artisans
                </p>
                <h2
                  data-animate-heading
                  className="font-gt-super text-4xl font-light tracking-tight text-white md:text-6xl"
                >
                  Behind the chair.
                </h2>
              </div>
              <p className="max-w-[340px] text-sm text-white/60">
                Experienced hands, sharp eyes, and uncompromising standards dedicated to every individual cut.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <div key={member.id} className="group relative border border-white/10 bg-[#121215] overflow-hidden">
                  <div className="relative h-[420px] overflow-hidden bg-neutral-900">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
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
                      <p className="text-xs uppercase tracking-wider text-[#d4af37]">
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
      )}

      {/* =========================================================
          REVIEWS & SOCIAL PROOF
      ========================================================= */}
      {sections.reviews && reviews.length > 0 && (
        <section id="noir-reviews" className="px-6 py-28 md:px-12 md:py-36 lg:px-20 border-b border-white/10">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end mb-20">
              <div>
                <p className="font-helvetica text-xs uppercase tracking-[0.3em] text-[#d4af37] mb-4">
                  Client Words
                </p>
                <h2
                  data-animate-heading
                  className="font-gt-super text-4xl font-light tracking-tight text-white md:text-6xl"
                >
                  Reputation earned.
                </h2>
              </div>

              {ratingSummary && (
                <div className="flex items-center gap-5 border border-white/10 bg-[#141418] px-6 py-4">
                  <div>
                    <span className="font-gt-super text-4xl font-light text-white">
                      {ratingSummary.score}
                    </span>
                    <div className="flex gap-1 text-[#d4af37] text-sm mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[#d4af37]" />
                      ))}
                    </div>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#d4af37]">
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
                  className="border border-white/10 bg-[#101013] p-8 transition-colors hover:border-white/20"
                >
                  <div className="flex items-center gap-1 text-[#d4af37] mb-4">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-[#d4af37]" />
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
      )}

      {/* =========================================================
          PHOTO GALLERY
      ========================================================= */}
      {sections.gallery && gallery.length > 0 && (
        <section id="noir-gallery" className="bg-[#0b0b0e] px-6 py-28 md:px-12 md:py-36 lg:px-20 border-b border-white/10">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-16">
              <p className="font-helvetica text-xs uppercase tracking-[0.3em] text-[#d4af37] mb-4">
                Visual Archive
              </p>
              <h2
                data-animate-heading
                className="font-gt-super text-4xl font-light tracking-tight text-white md:text-6xl"
              >
                The Perth Atelier
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
                  <img
                    src={item.image}
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
      )}

      {/* =========================================================
          HOURS & LOCATION
      ========================================================= */}
      <section className="px-6 py-28 md:px-12 md:py-36 lg:px-20 border-b border-white/10">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="font-helvetica text-xs uppercase tracking-[0.3em] text-[#d4af37] mb-3">
                  Find Our Chair
                </p>
                <h2 className="font-gt-super text-4xl font-light text-white md:text-5xl">
                  {city || "Perth CBD"}
                </h2>
              </div>
              <div className="space-y-4 text-sm text-white/70">
                <p className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white block font-medium">Studio Address:</strong>
                    {location}
                  </span>
                </p>
                {phone && (
                  <p className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#d4af37] shrink-0" />
                    <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors">
                      {phone}
                    </a>
                  </p>
                )}
                {email && (
                  <p className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#d4af37] shrink-0" />
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
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d4af37] hover:text-white transition-colors border-b border-[#d4af37]/40 pb-1"
                >
                  Open in Google Maps
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>

            {sections.hours && hours.length > 0 && (
              <div className="lg:col-span-7 border border-white/10 bg-[#121215] p-8 md:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <Clock className="h-5 w-5 text-[#d4af37]" />
                  <h3 className="font-gt-super text-2xl font-light text-white">
                    Trading Hours
                  </h3>
                </div>
                <div className="space-y-4 divide-y divide-white/5">
                  {hours.map((h, i) => (
                    <div key={i} className="flex justify-between items-center pt-3 text-sm">
                      <span className="text-white/80">{h.days}</span>
                      <span className="font-mono text-xs text-[#d4af37]">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          NOIR LUXURY FOOTER
      ========================================================= */}
      <footer className="bg-black px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end border-b border-white/10 pb-16">
            <div>
              <p className="font-helvetica text-xs uppercase tracking-[0.3em] text-[#d4af37] mb-4">
                {businessName}
              </p>
              <h2 className="font-gt-super text-4xl font-light text-white md:text-6xl">
                Ready for the chair?
              </h2>
            </div>
            {bookingUrl && (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[#d4af37] bg-[#d4af37] px-8 py-4 font-helvetica text-xs font-semibold uppercase tracking-[0.2em] text-black transition-colors hover:bg-transparent hover:text-white"
              >
                Book Appointment
                <ArrowRight className="h-4 w-4" />
              </a>
            )}
          </div>

          <div className="flex flex-col justify-between gap-6 pt-8 text-xs text-white/50 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} {businessName}. All rights reserved.</p>
            <div className="flex flex-wrap gap-6">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              {socialLinks.map((s, idx) => (
                <a key={idx} href={s.url} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
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
