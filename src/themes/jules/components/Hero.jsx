import heroImageDefault from "../../../assets/hero2.png";
import { getSectionConfig, getSectionStyleProperties } from "../../../schemas/barberSchema.js";

export default function Hero({ barber }) {
  const heroConfig = getSectionConfig(barber, "hero");
  const rawHero = heroConfig.images?.heroImage || barber?.branding?.heroImage;
  const heroImg = !rawHero || rawHero.startsWith("/src/assets/") ? heroImageDefault : rawHero;
  const subtitle = heroConfig.content.badge || barber?.branding?.tag || "Premium Grooming";
  const bookingUrl = heroConfig.content.primaryCtaUrl || barber?.bookingUrl || "#packages";
  const primaryCta = heroConfig.content.primaryCtaText || "Book an appointment →";

  const businessName = (heroConfig.content.title || barber?.businessName || "HAMMOUDI BARBER SHOP").toUpperCase();
  const words = businessName.split(" ");
  const line1 = words[0] || "HAMMOUDI";
  const line2 = words.slice(1).join(" ") || "BARBER SHOP";

  const description =
    heroConfig.content.description ||
    barber?.businessDescription ||
    "The art of traditional barbering,\nrefined for the modern gentleman.";

  const heroStyles = getSectionStyleProperties(heroConfig.style, {
    backgroundColor: "#000000",
    textColor: "#ffffff",
    headingColor: "#ffffff",
    accentColor: barber?.branding?.accentColor || "#c96b3c",
  });

  const overlayColor = heroConfig.style?.overlayColor || "#000000";
  const overlayOpacity = heroConfig.style?.overlayOpacity ?? 0.45;
  const showScroll = heroConfig.content.showScrollIndicator !== false;

  return (
    <section
      id="home"
      style={{
        ...heroStyles,
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative h-screen min-h-[700px] overflow-hidden bg-black"
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }}
      />

      {/* Subtle bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-8 md:px-12 md:py-10 lg:px-20">
        {/* TOP */}
        <div className="flex items-start justify-between" />

        {/* CENTER / BOTTOM CONTENT */}
        <div className="pb-6">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-12 bg-white/60" />
            <p className="font-helvetica text-xs font-medium uppercase tracking-[0.3em] text-white/80">
              {subtitle}
            </p>
          </div>

          <h1
            style={{ color: heroConfig.style?.headingColor }}
            className="max-w-[1200px] font-gt-super text-6xl font-medium leading-[0.85] tracking-[-0.04em] text-white sm:text-7xl md:text-8xl lg:text-[10rem]"
          >
            {line1}
            <br />
            <span className="ml-[8vw]">{line2}</span>
          </h1>

          <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <p className="max-w-[500px] font-helvetica text-sm leading-6 text-white/70 md:text-base whitespace-pre-line">
              {description}
            </p>

            {/* BOOK BUTTON */}
            {bookingUrl && (
              <a
                href={bookingUrl}
                target={bookingUrl.startsWith("http") ? "_blank" : undefined}
                rel={bookingUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  backgroundColor: heroConfig.style?.buttonBackground,
                  color: heroConfig.style?.buttonTextColor,
                  borderColor: heroConfig.style?.buttonBorderColor,
                }}
                className="
                  group
                  relative
                  w-fit
                  overflow-hidden
                  border
                  border-white
                  px-8
                  py-4
                  font-helvetica
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-white
                "
              >
                <span
                  className="
                    absolute
                    inset-0
                    origin-left
                    scale-x-0
                    bg-white
                    transition-transform
                    duration-500
                    ease-out
                    group-hover:scale-x-100
                    group-active:scale-x-100
                  "
                />

                <span
                  className="
                    relative
                    z-10
                    transition-colors
                    duration-500
                    group-hover:text-black
                    group-active:text-black
                  "
                >
                  {primaryCta}
                </span>
              </a>
            )}
          </div>
        </div>

        {/* BOTTOM INDICATOR */}
        {showScroll && (
          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
            <span className="font-helvetica text-[10px] uppercase tracking-[0.3em] text-white/50">
              Scroll
            </span>
            <span className="h-12 w-px bg-white/40" />
          </div>
        )}
      </div>
    </section>
  );
}
