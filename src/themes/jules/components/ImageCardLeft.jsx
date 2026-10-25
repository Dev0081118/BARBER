import joshuaImage from "/scrollwindow/joshua-lawrence-dU6eE_j2My8-unsplash.jpg";
import secondImage from "/scrollwindow/photo-1599351431202-1e0f0137899a.avif";
import ResponsiveImage from "../../../components/shared/ResponsiveImage.jsx";
import { getSectionConfig, getSectionStyleProperties } from "../../../schemas/barberSchema.js";

export default function ImageCardLeft({ barber }) {
  const splitConfig = getSectionConfig(barber, "splitContent");
  const businessName = splitConfig.content.leftTag || barber?.businessName || "Hammoudi Barber Shop";
  const bookingUrl = splitConfig.content.leftCtaUrl || barber?.bookingUrl || "#packages";
  const leftHeading = splitConfig.content.leftHeading || "Experience the art of\ntraditional barbering";
  const leftDesc = splitConfig.content.leftDescription || "Premium grooming, timeless style and a relaxing atmosphere. Discover an experience designed around you.";
  const leftCta = splitConfig.content.leftCtaText || "Book an appointment";

  const bgImg = splitConfig.images.leftBg || joshuaImage;
  const overlayImg = splitConfig.images.leftOverlay || secondImage;

  const leftStyles = getSectionStyleProperties(splitConfig.style, {
    backgroundColor: "#ffffff",
    textColor: "#000000",
    headingColor: "#000000",
  });

  return (
    <div
      style={leftStyles}
      className="relative mb-45 flex w-full flex-col overflow-hidden md:h-screen md:flex-row"
    >
      {/* LEFT SIDE */}
      <div className="relative h-screen w-full md:h-full md:w-1/2">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${bgImg})`,
          }}
        />

        {/* Small Image on top */}
        <div className="absolute top-1/2 right-[15%] h-[55%] w-[45%] -translate-y-1/2">
          <ResponsiveImage
            image={splitConfig.images.leftOverlay || overlayImg}
            alt="Barber shop craft"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex h-screen w-full items-center justify-center bg-white px-5 py-14 md:h-full md:w-1/2 md:px-0 md:py-0">
        <div className="w-full md:w-[70%] md:max-w-none">
          <p className="mb-5 text-sm font-semibold uppercase tracking-wide">
            {businessName}
          </p>

          <h1
            style={{ color: splitConfig.style?.headingColor }}
            className="text-4xl leading-tight md:text-5xl whitespace-pre-line"
          >
            {leftHeading}
          </h1>

          <p className="mt-8 text-base leading-relaxed md:text-lg">
            {leftDesc}
          </p>

          <a
            href={bookingUrl}
            target={bookingUrl.startsWith("http") ? "_blank" : undefined}
            rel={bookingUrl.startsWith("http") ? "noopener noreferrer" : undefined}
            style={{
              backgroundColor: splitConfig.style?.buttonBackground,
              color: splitConfig.style?.buttonTextColor,
              borderColor: splitConfig.style?.buttonBorderColor,
            }}
            className="
              relative
              mt-8
              inline-block
              w-full
              overflow-hidden
              border-2 border-black
              bg-white
              px-6 py-4
              text-center
              text-sm font-semibold
              text-black
              md:w-fit

              before:absolute
              before:inset-y-0
              before:left-0
              before:w-full
              before:origin-left
              before:scale-x-0
              before:bg-black
              before:transition-transform
              before:duration-300
              before:ease-in-out
              hover:before:scale-x-100
              active:before:scale-x-100
              hover:text-white
              active:text-white
            "
          >
            <span className="relative z-10 transition-colors duration-300">
              {leftCta}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
