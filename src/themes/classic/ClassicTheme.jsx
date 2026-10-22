import { useRef, useEffect } from "react";
import { Scissors, MapPin, Phone, Mail, Clock, Shield, Award, Star, ExternalLink } from "lucide-react";
import { createAnimationScope, animateOnScroll } from "../../utils/animations.js";
import NoiseOverlay from "../../components/shared/NoiseOverlay.jsx";

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

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen bg-[#fbf9f4] text-[#221815] font-serif selection:bg-[#87232e] selection:text-[#fbf9f4]"
    >
      <NoiseOverlay opacity={0.03} blendMode="multiply" />

      {/* =========================================================
          HERITAGE CREST & GUILD BADGE TOP BAR
      ========================================================= */}
      <div className="border-b border-[#221815]/15 bg-[#251214] py-2 px-6 text-center text-[11px] font-sans uppercase tracking-[0.25em] text-[#d6b77b]">
        <span>MASTER BARBERING GUILD • ESTABLISHED PERTH • TRADITIONAL STRAIGHT RAZOR SHAVES</span>
      </div>

      {/* =========================================================
          HERITAGE NAVIGATION
      ========================================================= */}
      <header className="border-b border-[#221815]/15 bg-[#fbf9f4]/95 px-6 py-6 md:px-12 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <a href="#heritage-hero" className="flex items-center gap-3.5 group">
            <div className="flex h-12 w-12 items-center justify-center border-2 border-[#bca061] bg-[#251214] text-[#d6b77b] shadow-sm">
              <Scissors className="h-6 w-6" />
            </div>
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#87232e] font-semibold">
                {branding.tag || "PERTH HERITAGE QUARTER"}
              </p>
              <h1 className="font-gt-super text-xl font-medium tracking-tight text-[#221815] md:text-2xl">
                {businessName}
              </h1>
            </div>
          </a>

          <nav aria-label="Heritage Navigation" className="hidden lg:flex items-center gap-8 font-sans text-xs uppercase tracking-[0.2em] text-[#221815]/80">
            {sections.services && (
              <a href="#heritage-services" className="hover:text-[#87232e] transition-colors">
                The Ledger
              </a>
            )}
            {sections.packages && (
              <a href="#heritage-packages" className="hover:text-[#87232e] transition-colors">
                Guild Rituals
              </a>
            )}
            {sections.story && (
              <a href="#heritage-story" className="hover:text-[#87232e] transition-colors">
                Tradition
              </a>
            )}
            {sections.team && (
              <a href="#heritage-team" className="hover:text-[#87232e] transition-colors">
                Guildsmen
              </a>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="hidden sm:inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-wider text-[#221815]/80 hover:text-[#87232e]"
              >
                <Phone className="h-3.5 w-3.5 text-[#bca061]" />
                {phone}
              </a>
            )}
            {bookingUrl && (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="border-2 border-[#251214] bg-[#251214] px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#fbf9f4] shadow-sm transition-all hover:bg-[#87232e] hover:border-[#87232e]"
              >
                Appoint Chair
              </a>
            )}
          </div>
        </div>
      </header>

      {/* =========================================================
          HERO — TRADITIONAL EDITORIAL CRAFTSMANSHIP
      ========================================================= */}
      {sections.hero && (
        <section id="heritage-hero" className="border-b border-[#221815]/15 px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1400px]">
            {/* Ornamental Top Flourish */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-16 bg-[#bca061]" />
              <Shield className="h-5 w-5 text-[#bca061]" />
              <span className="h-px w-16 bg-[#bca061]" />
            </div>

            <div className="text-center max-w-[960px] mx-auto space-y-6">
              <p className="font-sans text-xs uppercase tracking-[0.35em] text-[#87232e] font-semibold">
                {location || "St Georges Terrace, Perth"}
              </p>

              <h1
                data-heritage-heading
                className="font-gt-super text-5xl font-normal leading-[0.95] tracking-tight text-[#221815] sm:text-7xl md:text-8xl"
              >
                Master Barbering.
                <br />
                <span className="italic text-[#87232e]">Uncompromising Tradition.</span>
              </h1>

              <p className="font-sans text-base leading-relaxed text-[#221815]/80 md:text-lg max-w-[700px] mx-auto">
                {tagline || "Cut-throat straight razor rituals, hot eucalyptus steam towels, and single-malt hospitality in Perth's historic quarter."}
              </p>

              {bookingUrl && (
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="border-2 border-[#87232e] bg-[#87232e] px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#251214] hover:border-[#251214]"
                  >
                    Request An Appointment
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
                  <img
                    src="/gallery/gallery-1.jpg"
                    alt="Straight razor stropping ritual"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-center font-sans text-xs uppercase tracking-wider text-[#221815]/70">
                  I. Feather Edge Stropping
                </p>
              </div>

              <div className="border border-[#221815]/15 bg-[#f5efe4] p-3 shadow-sm">
                <div className="h-[300px] overflow-hidden bg-neutral-800">
                  <img
                    src={branding.heroImage || "/src/assets/hero2.png"}
                    alt="Master barber station"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-center font-sans text-xs uppercase tracking-wider text-[#221815]/70">
                  II. Handcrafted Timber Stations
                </p>
              </div>

              <div className="border border-[#221815]/15 bg-[#f5efe4] p-3 shadow-sm">
                <div className="h-[300px] overflow-hidden bg-neutral-800">
                  <img
                    src="/gallery/gallery-5.jpg"
                    alt="Heritage barbershop atmosphere"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-center font-sans text-xs uppercase tracking-wider text-[#221815]/70">
                  III. Traditional Fellowship
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          HERITAGE MANIFESTO & CRAFT CHARTER
      ========================================================= */}
      {sections.story && (
        <section id="heritage-story" className="border-b border-[#221815]/15 bg-[#251214] text-[#fbf9f4] px-6 py-20 md:px-12 md:py-28">
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
                  <span>The Guild Charter</span>
                </div>

                <h2 className="font-gt-super text-3xl font-light leading-snug md:text-5xl text-white">
                  "Barbering is an ancient craft of hands, honour, and razor discipline."
                </h2>

                <p className="font-sans text-sm font-light leading-relaxed text-[#fbf9f4]/80 md:text-base">
                  {businessDescription}
                </p>

                <div className="pt-6 flex justify-center items-center gap-8 font-sans text-xs uppercase tracking-wider text-[#d6b77b]">
                  <span>Single-Malt Hospitality</span>
                  <span>•</span>
                  <span>Hot Sandalwood Steam</span>
                  <span>•</span>
                  <span>Japanese High-Carbon Blades</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          THE SERVICE LEDGER (TRADITIONAL PRINTED MENU)
      ========================================================= */}
      {sections.services && services.length > 0 && (
        <section id="heritage-services" className="border-b border-[#221815]/15 px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center mb-16">
              <span className="font-sans text-xs uppercase tracking-[0.35em] text-[#87232e] font-semibold">
                Service Tariff
              </span>
              <h2
                data-heritage-heading
                className="mt-2 font-gt-super text-4xl font-normal md:text-6xl text-[#221815]"
              >
                The Guild Ledger
              </h2>
              <p className="font-sans text-xs text-[#221815]/60 mt-3 uppercase tracking-widest">
                All services include complimentary refreshment and hot towel treatment
              </p>
            </div>

            <div className="border-2 border-[#221815] bg-[#f5efe4] p-8 md:p-14 shadow-md space-y-8">
              {services.map((srv, idx) => (
                <div
                  key={srv.id}
                  data-ledger-item
                  className="group flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-[#221815]/10 pb-6"
                >
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-sans text-xs font-bold text-[#87232e] tracking-wider">
                        {srv.number || idx + 1}.
                      </span>
                      <h3 className="font-gt-super text-2xl font-normal text-[#221815] group-hover:text-[#87232e] transition-colors">
                        {srv.name}
                      </h3>
                      <span className="hidden md:inline-block flex-1 border-b border-dotted border-[#221815]/30 mx-3" />
                      <span className="font-gt-super text-2xl font-bold text-[#87232e]">
                        {srv.price}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-[#221815]/75 mt-2 pl-6 max-w-[700px] leading-relaxed">
                      {srv.description}
                    </p>
                  </div>

                  {bookingUrl && (
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 md:mt-0 font-sans text-[11px] font-semibold uppercase tracking-wider text-[#87232e] hover:underline self-end md:self-auto"
                    >
                      Reserve Chair →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          GUILD PACKAGES & RITUALS
      ========================================================= */}
      {sections.packages && packages.length > 0 && (
        <section id="heritage-packages" className="border-b border-[#221815]/15 bg-[#eae2d3] px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="text-center mb-16">
              <span className="font-sans text-xs uppercase tracking-[0.35em] text-[#87232e] font-semibold">
                Signature Experiences
              </span>
              <h2
                data-heritage-heading
                className="mt-2 font-gt-super text-4xl font-normal md:text-5xl"
              >
                Gentlemen's Rituals
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="border-2 border-[#251214] bg-[#fbf9f4] p-8 md:p-10 shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-baseline justify-between border-b-2 border-[#251214] pb-4">
                      <div>
                        <span className="font-sans text-xs uppercase tracking-widest text-[#87232e]">
                          Ritual {pkg.number}
                        </span>
                        <h3 className="font-gt-super text-3xl text-[#221815]">
                          {pkg.name}
                        </h3>
                      </div>
                      <span className="font-gt-super text-3xl font-bold text-[#87232e]">
                        {pkg.price}
                      </span>
                    </div>

                    <p className="font-sans text-sm text-[#221815]/80 mt-4 leading-relaxed">
                      {pkg.description}
                    </p>

                    {pkg.services.length > 0 && (
                      <div className="mt-6 border-t border-[#221815]/10 pt-4">
                        <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[#87232e] mb-2">
                          Ceremony Components:
                        </p>
                        <ul className="font-sans text-xs space-y-1.5 text-[#221815]/80">
                          {pkg.services.map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#87232e]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {bookingUrl && (
                    <div className="mt-8 pt-4 border-t border-[#221815]/15">
                      <a
                        href={bookingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-center border-2 border-[#87232e] bg-[#87232e] py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-[#251214] hover:border-[#251214] transition-colors"
                      >
                        Appoint {pkg.name}
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
          GUILDSMEN (MASTER CRAFTSMEN)
      ========================================================= */}
      {sections.team && team.length > 0 && (
        <section id="heritage-team" className="border-b border-[#221815]/15 px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="text-center mb-16">
              <span className="font-sans text-xs uppercase tracking-[0.35em] text-[#87232e] font-semibold">
                Guild Registry
              </span>
              <h2
                data-heritage-heading
                className="mt-2 font-gt-super text-4xl font-normal md:text-5xl"
              >
                The Master Craftsmen
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-[900px] mx-auto">
              {team.map((member) => (
                <div key={member.id} className="border border-[#221815]/20 bg-[#f5efe4] p-4 text-center">
                  <div className="h-[360px] overflow-hidden bg-neutral-900 border border-[#221815]/20">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
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
                    <p className="font-sans text-xs uppercase tracking-wider text-[#87232e] font-semibold">
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
      )}

      {/* =========================================================
          PATRON REVIEWS & TESTIMONIALS
      ========================================================= */}
      {sections.reviews && reviews.length > 0 && (
        <section className="border-b border-[#221815]/15 bg-[#251214] text-[#fbf9f4] px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center mb-14">
              <span className="font-sans text-xs uppercase tracking-[0.35em] text-[#d6b77b]">
                Patron Testimonials
              </span>
              <h2 className="mt-2 font-gt-super text-4xl text-white md:text-5xl">
                The Heritage Ledger
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
      )}

      {/* =========================================================
          HERITAGE VISUAL ARCHIVE
      ========================================================= */}
      {sections.gallery && gallery.length > 0 && (
        <section className="border-b border-[#221815]/15 bg-[#f5efe4] px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center mb-14">
              <span className="font-sans text-xs uppercase tracking-[0.35em] text-[#87232e] font-semibold">
                Photographic Record
              </span>
              <h2 className="mt-2 font-gt-super text-4xl text-[#221815] md:text-5xl">
                The Guild Archive
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map((g) => (
                <div key={g.id} className="border-2 border-[#221815] p-2 bg-[#fbf9f4] shadow-sm">
                  <div className="h-[220px] overflow-hidden bg-neutral-900">
                    <img
                      src={g.image}
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
      )}

      {/* =========================================================
          TRADING HOURS & LOCATION
      ========================================================= */}
      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <span className="font-sans text-xs uppercase tracking-[0.35em] text-[#87232e] font-semibold">
                Terrace Coordinates
              </span>
              <h2 className="font-gt-super text-4xl text-[#221815] md:text-5xl">
                Visit the Guild
              </h2>
              <div className="font-sans text-sm space-y-4 text-[#221815]/80">
                <p className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#87232e] shrink-0 mt-0.5" />
                  <span>{location}</span>
                </p>
                {phone && (
                  <p className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#87232e] shrink-0" />
                    <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:underline">
                      {phone}
                    </a>
                  </p>
                )}
                {email && (
                  <p className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#87232e] shrink-0" />
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
                      className="inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-wider text-[#87232e] hover:underline"
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
                <div className="flex items-center gap-2 mb-6 font-sans text-xs uppercase tracking-wider text-[#87232e] font-semibold">
                  <Clock className="h-4 w-4" />
                  <span>Hours of Barbering</span>
                </div>
                <div className="font-sans text-xs space-y-3 divide-y divide-[#221815]/10">
                  {hours.map((h, i) => (
                    <div key={i} className="flex justify-between items-center pt-2.5">
                      <span>{h.days}</span>
                      <span className="font-bold text-[#87232e]">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          HERITAGE FOOTER
      ========================================================= */}
      <footer className="border-t-2 border-[#251214] bg-[#251214] px-6 py-16 text-[#fbf9f4] md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center border-b border-white/10 pb-12">
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#d6b77b]">
                {businessName}
              </p>
              <h2 className="font-gt-super text-3xl font-light md:text-5xl text-white mt-1">
                Preserving the gentle art of the straight razor.
              </h2>
            </div>
            {bookingUrl && (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="border-2 border-[#d6b77b] bg-[#d6b77b] px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#251214] hover:bg-transparent hover:text-[#d6b77b] transition-colors"
              >
                Appoint Chair
              </a>
            )}
          </div>

          <div className="flex flex-col justify-between gap-4 pt-8 font-sans text-xs text-white/50 sm:flex-row">
            <p>© {new Date().getFullYear()} {businessName}. Handcrafted in Perth, Western Australia.</p>
            <div className="flex gap-6">
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
