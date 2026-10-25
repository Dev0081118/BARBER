import barberImage from "/scrollwindow/joshua-lawrence-dU6eE_j2My8-unsplash.jpg";
import ResponsiveImage from "../../../components/shared/ResponsiveImage.jsx";
import { getSectionConfig, getSectionStyleProperties } from "../../../schemas/barberSchema.js";

const defaultPackages = [
  {
    number: "01",
    name: "Silver",
    price: "$55",
    image: barberImage,
    description:
      "Everything you need for a clean, refined look without overcomplicating it.",
    services: [
      "Classic Haircut",
      "Beard Trim",
      "Hair Styling",
      "Hot Towel Finish",
    ],
    accent: "bg-[#e8e8e8]",
  },
  {
    number: "02",
    name: "Gold",
    price: "$85",
    image: barberImage,
    description:
      "Our complete grooming experience, combining precision, relaxation and style.",
    services: [
      "Premium Haircut",
      "Skin Fade",
      "Beard Sculpting",
      "Hot Towel Shave",
      "Hair Styling",
    ],
    accent: "bg-[#d6b36a]",
  },
];

export default function Packages({ barber }) {
  const packagesConfig = getSectionConfig(barber, "packages");

  const eyebrow = packagesConfig.content.eyebrow || "Packages";
  const mainTitle = packagesConfig.content.title || "Choose your\nexperience.";
  const titleParts = mainTitle.split("\n");
  const titleL1 = titleParts[0];
  const titleL2 = titleParts.slice(1).join("\n") || "experience.";
  const subtitle = packagesConfig.content.description || "Thoughtfully designed grooming experiences for those who appreciate precision, quality and timeless style.";
  const bookPrefix = packagesConfig.content.bookCtaText || "Book";

  const packageList =
    barber?.packages && barber.packages.length > 0
      ? barber.packages.map((pkg, idx) => ({
          ...pkg,
          number: pkg.number || String(idx + 1).padStart(2, "0"),
          image: !pkg.image || pkg.image.startsWith("/src/assets/") ? barberImage : pkg.image,
          accent: pkg.accent || (idx % 2 === 0 ? "bg-[#e8e8e8]" : "bg-[#d6b36a]"),
        }))
      : defaultPackages;

  const defaultBookingUrl = barber?.bookingUrl || "#packages";

  const packagesStyles = getSectionStyleProperties(packagesConfig.style, {
    backgroundColor: "#ffffff",
    cardBackground: "#fafafa",
    textColor: "#000000",
    headingColor: "#000000",
    borderColor: "rgb(229, 229, 229)",
  });

  return (
    <section
      id="packages"
      style={packagesStyles}
      className="min-h-screen bg-white px-6 py-32 text-black md:px-12 lg:px-20"
    >
      {/* HEADER */}
      <div className="mx-auto mb-24 max-w-[1400px]">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-neutral-500">
          {eyebrow}
        </p>

        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2
            style={{ color: packagesConfig.style?.headingColor }}
            className="max-w-[800px] text-5xl font-light leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl"
          >
            {titleL1}
            <br />
            <span className="text-neutral-400">
              {titleL2}
            </span>
          </h2>

          <p className="max-w-[350px] text-sm leading-6 text-neutral-500">
            {subtitle}
          </p>
        </div>
      </div>

      {/* PACKAGE CARDS */}
      <div className="mx-auto grid max-w-[1400px] gap-8 md:grid-cols-2">
        {packageList.map((pkg) => {
          const pkgBooking = pkg.bookingUrl || defaultBookingUrl;
          return (
            <div
              key={pkg.id || pkg.name}
              style={{
                backgroundColor: packagesConfig.style?.cardBackground,
                borderColor: packagesConfig.style?.borderColor,
              }}
              className="
                group
                flex
                h-full
                flex-col
                overflow-hidden
                border
                border-neutral-200
                bg-[#fafafa]
                transition-all
                duration-500
                hover:-translate-y-2
                active:-translate-y-2
              "
            >
              {/* IMAGE */}
              <div className="relative h-[450px] overflow-hidden">
                <ResponsiveImage
                  image={pkg.responsiveImage || pkg.image}
                  alt={`${pkg.name} package`}
                  className="
                    h-full
                    w-full
                    object-cover
                    grayscale
                    transition-all
                    duration-700
                    ease-out
                    group-hover:scale-105
                    group-hover:grayscale-0
                    group-active:scale-105
                    group-active:grayscale-0
                  "
                />

                {/* NUMBER */}
                <div className="absolute left-6 top-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-xs font-medium backdrop-blur-sm">
                    {pkg.number}
                  </span>
                </div>

                {/* PACKAGE LABEL */}
                <div className="absolute bottom-6 left-6">
                  <span
                    className={`inline-block px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] ${pkg.accent}`}
                  >
                    {pkg.name} Package
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col p-8 md:p-10">
                {/* NAME + PRICE */}
                <div className="flex items-start justify-between border-b border-neutral-200 pb-8">
                  <div>
                    <h3 className="text-4xl font-light tracking-[-0.04em] md:text-5xl">
                      {pkg.name}
                    </h3>

                    <p className="mt-3 max-w-[350px] text-sm leading-6 text-neutral-500">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="text-right">
                    <span
                      style={{ color: packagesConfig.style?.priceColor }}
                      className="text-3xl font-light tracking-[-0.03em]"
                    >
                      {pkg.price}
                    </span>
                  </div>
                </div>

                {/* SERVICES */}
                <div className="py-8">
                  <p className="mb-6 text-xs uppercase tracking-[0.2em] text-neutral-400">
                    Includes
                  </p>

                  <div className="space-y-4">
                    {(pkg.services || []).map((service, index) => (
                      <div
                        key={service}
                        className="flex items-center justify-between border-b border-neutral-100 pb-4"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-neutral-400">
                            0{index + 1}
                          </span>

                          <span className="text-sm">
                            {service}
                          </span>
                        </div>

                        <span className="text-neutral-300">
                          +
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  <a
                    href={pkgBooking}
                    target={pkgBooking.startsWith("http") ? "_blank" : undefined}
                    rel={pkgBooking.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{
                      backgroundColor: packagesConfig.style?.buttonBackground,
                      color: packagesConfig.style?.buttonTextColor,
                    }}
                    className="
                      group/button
                      relative
                      block
                      w-full
                      overflow-hidden
                      border
                      border-black
                      bg-black
                      px-6
                      py-4
                      text-center
                      text-sm
                      font-medium
                      text-white
                    "
                  >
                    <span
                      style={{
                        backgroundColor: packagesConfig.style?.buttonHoverBackgroundColor || packagesConfig.style?.btnHoverBg,
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
                        group-hover/button:scale-x-100
                        group-active/button:scale-x-100
                      "
                    />

                    <span
                      style={{
                        color: packagesConfig.style?.buttonHoverTextColor || packagesConfig.style?.btnHoverText,
                      }}
                      className="
                        relative
                        z-10
                        transition-colors
                        duration-500
                        group-hover/button:text-black
                        group-active/button:text-black
                      "
                    >
                      {bookPrefix} {pkg.name} Package
                    </span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
