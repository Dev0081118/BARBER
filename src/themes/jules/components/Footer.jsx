import { getSectionConfig, getSectionStyleProperties } from "../../../schemas/barberSchema.js";

export default function Footer({ barber }) {
  const footerConfig = getSectionConfig(barber, "footer");

  const businessName = footerConfig.content.eyebrow || barber?.businessName || "Hammoudi Barber Shop";
  const addressLine = barber?.addressLine || "188 Adelaide Terrace";
  const cityLocation = barber?.city || "Perth WA 6004, Australia";
  const phone = barber?.phone || "+61 416 917 772";
  const email = barber?.email || "hello@hammoudibarber.com";
  const bookingUrl = barber?.footer?.ctaUrl || barber?.bookingUrl || "#packages";

  const mainTitle = footerConfig.content.title || "Good hair.\nGood mood.\nGood times.";
  const titleParts = mainTitle.split("\n");
  const titleL1 = titleParts[0];
  const titleL2 = titleParts[1] || "Good mood.";
  const titleL3 = titleParts.slice(2).join("\n") || "Good times.";

  const chairTag = footerConfig.content.chairTag || "Your chair is waiting";
  const chairTitle = footerConfig.content.chairTitle || "Ready for a fresh cut?";
  const ctaText = barber?.footer?.ctaText || "Book Appointment";
  const copyright = barber?.footer?.copyrightText || `© ${new Date().getFullYear()} ${businessName}`;

  const instagramLink =
    barber?.socialLinks?.find((s) => s.platform?.toLowerCase() === "instagram")?.url ||
    "https://www.instagram.com/hammoudi_barber_shop/";

  const facebookLink =
    barber?.socialLinks?.find((s) => s.platform?.toLowerCase() === "facebook")?.url ||
    "https://www.facebook.com/p/Hammoudi-barber-shop-100063867472962";

  const sections = barber?.sections || {};

  const exploreLinks = [
    { label: "Home", href: "#home", id: "home" },
    sections.services !== false && { label: "Services", href: "#services", id: "services" },
    sections.packages !== false && { label: "Packages", href: "#packages", id: "packages" },
    sections.story !== false && { label: "About", href: "#whoarewe", id: "story" },
    sections.gallery !== false && { label: "Photo Gallery", href: "#photo-gallery", id: "gallery" },
  ].filter(Boolean);

  const footerStyles = getSectionStyleProperties(footerConfig.style || barber?.footer?.style, {
    backgroundColor: "#000000",
    textColor: "#ffffff",
    headingColor: "#ffffff",
    borderColor: "rgb(38, 38, 38)",
  });

  return (
    <footer
      style={footerStyles}
      className="bg-black text-white"
    >
      {/* Main Footer */}
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 lg:px-20">
        {/* Top */}
        <div className="grid gap-16 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-6">
            <p className="mb-8 text-xs uppercase tracking-[0.3em] text-neutral-500">
              {businessName}
            </p>

            <h2
              style={{ color: footerConfig.style?.headingColor }}
              className="max-w-[700px] text-5xl font-light leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl"
            >
              {titleL1}
              <br />
              {titleL2}
              <br />
              <span className="text-neutral-600">
                {titleL3}
              </span>
            </h2>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-neutral-500">
              Explore
            </p>

            <nav className="flex flex-col gap-4 text-sm">
              {exploreLinks.map((link) => (
                <a
                  key={link.id || link.label}
                  href={link.href}
                  className="w-fit transition-colors duration-300 hover:text-[#c96b3c] active:text-[#c96b3c]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-neutral-500">
              Visit us
            </p>

            <div className="space-y-5 text-sm text-neutral-300">
              <p>
                {addressLine}
                <br />
                {cityLocation}
              </p>

              {phone && (
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="block w-fit transition-colors duration-300 hover:text-[#c96b3c] active:text-[#c96b3c]"
                >
                  {phone}
                </a>
              )}

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="block w-fit transition-colors duration-300 hover:text-[#c96b3c] active:text-[#c96b3c]"
                >
                  {email}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Appointment CTA */}
        <div className="mt-32 border-y border-neutral-800 py-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-neutral-500">
                {chairTag}
              </p>

              <h3 className="text-3xl font-light tracking-[-0.03em] md:text-4xl">
                {chairTitle}
              </h3>
            </div>

            {bookingUrl && (
              <a
                href={bookingUrl}
                target={bookingUrl.startsWith("http") ? "_blank" : undefined}
                rel={bookingUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  backgroundColor: footerConfig.style?.buttonBackground,
                  color: footerConfig.style?.buttonTextColor,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  border
                  border-white
                  px-8
                  py-4
                  text-sm
                  font-medium
                  uppercase
                  tracking-[0.15em]
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
                  {ctaText}
                </span>
              </a>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col justify-between gap-6 pt-8 text-xs text-neutral-600 md:flex-row">
          <p>{copyright}</p>

          <div className="flex gap-8">
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-white active:text-white"
            >
              Instagram
            </a>

            <a
              href={facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-white active:text-white"
            >
              Facebook
            </a>

            <a
              href="/privacy"
              className="transition-colors duration-300 hover:text-white active:text-white"
            >
              Privacy
            </a>
          </div>

          <p>Crafted with precision.</p>
        </div>
      </div>
    </footer>
  );
}
