import logoDefault from "../../../assets/logo/logo2.png";
import { getSectionConfig, getSectionStyleProperties } from "../../../schemas/barberSchema.js";

export default function NavBar({ barber }) {
  const navConfig = getSectionConfig(barber, "navigation");
  const rawLogo = barber?.branding?.logo;
  const logoSrc = !rawLogo || rawLogo.startsWith("/src/assets/") ? logoDefault : rawLogo;
  const businessName = barber?.businessName || "Hammoudi Barber Shop";
  const brandFirstWord = navConfig.content.brandWord || businessName.split(" ")[0]?.toUpperCase() || "HAMMOUDI";
  const shortLocation = navConfig.content.location || barber?.city || barber?.location || "Perth";
  const phone = barber?.navigation?.phone || barber?.phone || "04 1691 7772";
  const bookingUrl = barber?.navigation?.bookButtonUrl || barber?.bookingUrl || "#packages";
  const bookButtonText = barber?.navigation?.bookButtonText || "Book Now";

  const navStyles = getSectionStyleProperties(navConfig.style, {
    textColor: "#ffffff",
    accentColor: barber?.branding?.accentColor || "#c96b3c",
  });

  const sections = barber?.sections || {};
  const navLinks = (barber?.navigation?.links && barber.navigation.links.length > 0)
    ? barber.navigation.links
    : [
        sections.services !== false && { label: "Services", href: "#services", id: "services" },
        sections.packages !== false && { label: "Packages", href: "#packages", id: "packages" },
        sections.gallery !== false && { label: "Gallery", href: "#photo-gallery", id: "gallery" },
      ].filter(Boolean);

  return (
    <nav
      style={navStyles}
      className="absolute left-0 top-0 z-50 w-full px-6 py-6 text-white md:px-10 lg:px-16"
    >
      <div className="flex items-center justify-between">
        {/* LOGO + BRAND */}
        <a href="#home" className="flex items-center gap-4">
          <img
            src={logoSrc}
            alt={barber?.branding?.logoAlt || businessName}
            style={{
              width: barber?.branding?.logoWidth || undefined,
              height: barber?.branding?.logoHeight || undefined,
            }}
            className="h-14 w-auto object-contain md:h-16"
          />

          <div className="hidden sm:block">
            <p className="font-helvetica text-[10px] uppercase tracking-[0.3em] text-white/60">
              {shortLocation}
            </p>

            <h1 className="mt-1 font-gt-super text-lg font-medium tracking-tight md:text-xl">
              {brandFirstWord}
            </h1>
          </div>
        </a>

        {/* NAVIGATION */}
        <div className="flex items-center gap-6 md:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.id || link.label}
              href={link.href}
              className="
                hidden
                font-helvetica
                text-xs
                font-medium
                uppercase
                tracking-[0.18em]
                text-white/80
                transition-colors
                duration-300
                hover:text-white
                active:text-white
                sm:block
              "
            >
              {link.label}
            </a>
          ))}

          {/* PHONE */}
          {phone && (
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="
                hidden
                font-helvetica
                text-xs
                font-medium
                tracking-[0.12em]
                text-white/70
                transition-colors
                duration-300
                hover:text-white
                active:text-white
                lg:block
              "
            >
              {phone}
            </a>
          )}

          {/* BOOK BUTTON */}
          {bookingUrl && (
            <a
              href={bookingUrl}
              target={bookingUrl.startsWith("http") ? "_blank" : undefined}
              rel={bookingUrl.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                backgroundColor: navConfig.style?.buttonBackground,
                color: navConfig.style?.buttonTextColor,
                borderColor: navConfig.style?.buttonBorderColor,
              }}
              className="
                group
                relative
                overflow-hidden
                border
                border-white/70
                px-5
                py-3
                font-helvetica
                text-xs
                font-medium
                uppercase
                tracking-[0.15em]
                text-white
                transition-colors
                duration-300
                md:px-7
              "
            >
              {/* Hover background */}
              <span
                style={{
                  backgroundColor: navConfig.style?.buttonHoverBackgroundColor || navConfig.style?.btnHoverBg,
                }}
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
                style={{
                  color: navConfig.style?.buttonHoverTextColor || navConfig.style?.btnHoverText,
                }}
                className="
                  relative
                  z-10
                  transition-colors
                  duration-500
                  group-hover:text-black
                  group-active:text-black
                "
              >
                {bookButtonText}
              </span>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
