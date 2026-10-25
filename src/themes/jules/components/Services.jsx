import { getSectionConfig, getSectionStyleProperties } from "../../../schemas/barberSchema.js";

const defaultServices = [
  {
    number: "01",
    name: "Classic Haircut",
    description: "A timeless cut tailored to your face, style and personality.",
    price: "$35",
  },
  {
    number: "02",
    name: "Skin Fade",
    description: "A precise fade blended seamlessly from skin to your desired length.",
    price: "$40",
  },
  {
    number: "03",
    name: "Beard Trim",
    description: "Shape, trim and define your beard for a clean, refined finish.",
    price: "$25",
  },
  {
    number: "04",
    name: "Hair & Beard",
    description: "Our complete grooming experience. Haircut paired with a detailed beard trim.",
    price: "$55",
  },
  {
    number: "05",
    name: "Hot Towel Shave",
    description: "Traditional straight-razor shave with a warm, relaxing towel treatment.",
    price: "$35",
  },
  {
    number: "06",
    name: "Hair Styling",
    description: "Professional styling and finishing for any occasion.",
    price: "$25",
  },
  {
    number: "07",
    name: "Kids Haircut",
    description: "A comfortable and stylish haircut for our younger guests.",
    price: "$25",
  },
  {
    number: "08",
    name: "Head Shave",
    description: "A clean, smooth shave finished with premium grooming products.",
    price: "$30",
  },
  {
    number: "09",
    name: "Beard Sculpting",
    description: "Detailed beard design, shaping and precision razor work.",
    price: "$35",
  },
  {
    number: "10",
    name: "Premium Grooming",
    description: "Haircut, beard, hot towel and styling — the complete experience.",
    price: "$75",
  },
];

export default function Services({ barber }) {
  const servicesConfig = getSectionConfig(barber, "services");
  const serviceList =
    barber?.services && barber.services.length > 0 ? barber.services : defaultServices;
  const bookingUrl = servicesConfig.content.bottomButtonUrl || barber?.bookingUrl || "#packages";

  const eyebrow = servicesConfig.content.eyebrow || "Our Services";
  const mainTitle = servicesConfig.content.title || "Crafted for\nyour best look.";
  const titleParts = mainTitle.split("\n");
  const titleL1 = titleParts[0];
  const titleL2 = titleParts.slice(1).join("\n") || "your best look.";

  const pillars = servicesConfig.content.pillars || ["Precision", "Style", "Tradition"];
  const col1 = servicesConfig.content.col1 || "No.";
  const col2 = servicesConfig.content.col2 || "Service";
  const col3 = servicesConfig.content.col3 || "Price";

  const bottomTag = servicesConfig.content.bottomTag || "Ready when you are";
  const bottomTitle = servicesConfig.content.bottomTitle || "Sit back.\nWe got you.";
  const bottomCta = servicesConfig.content.bottomButtonText || "Book Appointment";

  const servicesStyles = getSectionStyleProperties(servicesConfig.style, {
    backgroundColor: "#000000",
    textColor: "#ffffff",
    headingColor: "#ffffff",
    accentColor: barber?.branding?.accentColor || "#c96b3c",
    borderColor: "rgb(38, 38, 38)",
  });

  return (
    <section
      id="services"
      style={servicesStyles}
      className="min-h-[1400px] bg-black text-white"
    >
      {/* INTRO */}
      <div className="mx-auto flex min-h-[550px] w-[90%] max-w-[1400px] flex-col justify-center">
        <p className="mb-8 text-sm font-medium uppercase tracking-[0.3em] text-[var(--section-accent,#c96b3c)]">
          {eyebrow}
        </p>

        <h2
          style={{ color: servicesConfig.style?.headingColor }}
          className="max-w-[1000px] text-6xl font-light leading-[0.95] tracking-[-0.04em] md:text-8xl"
        >
          {titleL1}
          <br />
          <span className="text-neutral-500">
            {titleL2}
          </span>
        </h2>

        <div className="mt-16 flex max-w-[600px] justify-between border-t border-neutral-800 pt-6">
          {pillars.map((pillar, idx) => (
            <p key={idx} className="text-sm uppercase tracking-[0.2em] text-neutral-500">
              {pillar}
            </p>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <div className="mx-auto w-[90%] max-w-[1400px]">
        {/* HEADER */}
        <div className="mb-4 grid grid-cols-12 border-b border-neutral-700 pb-5 text-xs uppercase tracking-[0.2em] text-neutral-500">
          <div className="col-span-2">{col1}</div>
          <div className="col-span-7">{col2}</div>
          <div className="col-span-3 text-right">{col3}</div>
        </div>

        {/* SERVICE LIST */}
        <div>
          {serviceList.map((service, index) => {
            const num = service.number || String(index + 1).padStart(2, "0");
            const price = service.price
              ? String(service.price).startsWith("$")
                ? service.price
                : `$${service.price}`
              : "";
            const srvBooking = service.bookingUrl || bookingUrl;

            return (
              <div
                key={service.id || service.number || service.name}
                className="
                  group
                  grid
                  grid-cols-12
                  items-center
                  border-b
                  border-neutral-800
                  py-12
                  transition-all
                  duration-500
                  hover:border-neutral-500
                  active:border-neutral-500
                "
              >
                {/* NUMBER */}
                <div className="col-span-2 self-start">
                  <span className="text-sm text-neutral-600 transition-colors duration-500 group-hover:text-[var(--section-accent,#c96b3c)] group-active:text-[var(--section-accent,#c96b3c)]">
                    {num}
                  </span>
                </div>

                {/* SERVICE NAME */}
                <div className="col-span-7">
                  <h3
                    className="
                      text-3xl
                      font-light
                      tracking-[-0.03em]
                      transition-transform
                      duration-500
                      group-hover:translate-x-3
                      group-active:translate-x-3
                      md:text-5xl
                    "
                  >
                    {service.name}
                  </h3>

                  <p className="mt-4 max-w-[500px] text-sm leading-6 text-neutral-500 transition-colors duration-500 group-hover:text-neutral-300 group-active:text-neutral-300">
                    {service.description}
                  </p>
                </div>

                {/* PRICE */}
                <div className="col-span-3 text-right">
                  <span
                    style={{ color: servicesConfig.style?.priceColor }}
                    className="text-lg font-light md:text-2xl"
                  >
                    {price}
                  </span>

                  {srvBooking && (
                    <div className="mt-3 overflow-hidden">
                      <a
                        href={srvBooking}
                        target={srvBooking.startsWith("http") ? "_blank" : undefined}
                        rel={srvBooking.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="
                          inline-block
                          translate-x-full
                          text-xs
                          uppercase
                          tracking-[0.15em]
                          text-[var(--section-accent,#c96b3c)]
                          transition-transform
                          duration-500
                          group-hover:translate-x-0
                          group-active:translate-x-0
                        "
                      >
                        Book →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="mx-auto flex min-h-[450px] w-[90%] max-w-[1400px] items-center justify-between border-t border-neutral-800">
        <div>
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-neutral-500">
            {bottomTag}
          </p>

          <h3 className="text-5xl font-light tracking-[-0.04em] md:text-7xl whitespace-pre-line">
            {bottomTitle}
          </h3>
        </div>

        {bookingUrl && (
          <a
            href={bookingUrl}
            target={bookingUrl.startsWith("http") ? "_blank" : undefined}
            rel={bookingUrl.startsWith("http") ? "noopener noreferrer" : undefined}
            style={{
              backgroundColor: servicesConfig.style?.buttonBackground,
              color: servicesConfig.style?.buttonTextColor,
              borderColor: servicesConfig.style?.buttonBorderColor,
            }}
            className="
              group
              relative
              hidden
              overflow-hidden
              border
              border-white
              px-8
              py-5
              text-sm
              uppercase
              tracking-[0.15em]
              md:block
            "
          >
            <span
              style={{
                backgroundColor: servicesConfig.style?.buttonHoverBackgroundColor || servicesConfig.style?.btnHoverBg,
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
                color: servicesConfig.style?.buttonHoverTextColor || servicesConfig.style?.btnHoverText,
              }}
              className="relative z-10 transition-colors duration-500 group-hover:text-black group-active:text-black"
            >
              {bottomCta}
            </span>
          </a>
        )}
      </div>
    </section>
  );
}
