import { Scissors, SoapDispenserDroplet } from "lucide-react";
import { getSectionConfig, getSectionStyleProperties } from "../../../schemas/barberSchema.js";

import fade from "/cut.png";
import beard from "/beard.png";
import towel from "/towel.png";
import styling from "/barber-shop.png";

const defaultMarqueeServices = [
  {
    icon: <Scissors size={28} strokeWidth={1.5} />,
    label: "Haircut",
  },
  {
    icon: (
      <img
        src={beard}
        alt="Beard Trim"
        className="h-[30px] w-[30px] object-contain"
      />
    ),
    label: "Beard Trim",
  },
  {
    icon: (
      <img
        src={fade}
        alt="Fade"
        className="h-[30px] w-[30px] object-contain"
      />
    ),
    label: "Fade",
  },
  {
    icon: (
      <img
        src={towel}
        alt="Hot Towel Shave"
        className="h-[28px] w-[30px] object-contain"
      />
    ),
    label: "Hot Towel Shave",
  },
  {
    icon: (
      <img
        src={styling}
        alt="Styling"
        className="h-[30px] w-[30px] object-contain"
      />
    ),
    label: "Styling",
  },
  {
    icon: <SoapDispenserDroplet size={28} strokeWidth={1.5} />,
    label: "Skin Care",
  },
];

export default function WhoareWe({ barber }) {
  const storyConfig = getSectionConfig(barber, "story");
  const marqueeConfig = getSectionConfig(barber, "marquee");

  const businessName = storyConfig.content.businessName || barber?.businessName || "Hammoudi Barber Shop";
  const words = businessName.split(" ");
  const nameLine1 = words[0] || "Hammoudi";
  const nameLine2 = words.slice(1).join(" ") || "Barber Shop";
  const city = barber?.city || "Perth";
  const location = barber?.location || "Western Australia";
  const established = barber?.branding?.tag || "Est. Perth";

  const eyebrow = storyConfig.content.eyebrow || "Who We Are";
  const mainTitle = storyConfig.content.title || "More than a haircut.\nIt's an experience.";
  const titleParts = mainTitle.split("\n");
  const titleL1 = titleParts[0];
  const titleL2 = titleParts.slice(1).join("\n") || "It's an experience.";

  const para1 = storyConfig.content.paragraph1 || "Nestled in central Perth, our shop offers far more than standard trims, delivering a refined grooming experience.";
  const para2 = storyConfig.content.paragraph2 || "We blend classic techniques, exceptional attention to detail, and top-tier products for men focused on elevating their personal style.";
  const para3 = storyConfig.content.paragraph3 || "Every touchpoint goes beyond routine grooming. We cultivate sharp confidence, distinct character, and calibre service crafted to the highest standards.";
  const welcomeTitle = storyConfig.content.welcomeTitle || `Welcome to ${nameLine1} Barber.`;
  const welcomeSub = storyConfig.content.welcomeSubtitle || "Where tradition meets innovation.";

  const marqueeItems = marqueeConfig.content.items && marqueeConfig.content.items.length > 0
    ? marqueeConfig.content.items.map((item) => ({
        label: typeof item === "string" ? item : item.label,
        icon: typeof item === "object" && item.icon ? (
          typeof item.icon === "string" ? (
            <img src={item.icon} alt={item.label} className="h-[30px] w-[30px] object-contain" />
          ) : item.icon
        ) : <Scissors size={28} strokeWidth={1.5} />,
      }))
    : defaultMarqueeServices;

  const storyStyles = getSectionStyleProperties(storyConfig.style, {
    backgroundColor: "#0e291b",
    textColor: "#ffffff",
    headingColor: "#ffffff",
  });

  const marqueeStyles = getSectionStyleProperties(marqueeConfig.style, {
    backgroundColor: "#ffffff",
    textColor: "#000000",
    borderColor: "#e5e5e5",
  });

  return (
    <section id="whoarewe" className="bg-white text-black">
      {/* SERVICE MARQUEE */}
      {barber?.sections?.marquee !== false && marqueeConfig.enabled !== false && (
        <div
          style={marqueeStyles}
          className="overflow-hidden border-y border-neutral-200 bg-white py-4"
        >
          <style>
            {`
              @keyframes julesMarquee {
                from {
                  transform: translateX(0);
                }
                to {
                  transform: translateX(-50%);
                }
              }
            `}
          </style>

          <div className="relative">
            {/* Left fade */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />

            {/* Right fade */}
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

            <div
              className="flex w-max"
              style={{
                animation: "julesMarquee 22s linear infinite",
              }}
            >
              {[...marqueeItems, ...marqueeItems].map((service, index) => (
                <div
                  key={`${service.label}-${index}`}
                  className="flex min-w-[230px] items-center justify-center gap-4 border-r border-neutral-200 px-8 py-3"
                >
                  <span className="flex items-center justify-center">
                    {service.icon}
                  </span>

                  <span className="whitespace-nowrap font-helvetica text-sm uppercase tracking-[0.15em]">
                    {service.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* WHO WE ARE */}
      <section
        style={storyStyles}
        className="bg-[#0e291b] px-6 py-28 text-white md:px-12 md:py-36 lg:px-20"
      >
        <div className="mx-auto max-w-[1400px]">
          {/* TOP */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            {/* SMALL LABEL */}
            <div className="md:col-span-3">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-white/40" />
                <p className="font-helvetica text-xs uppercase tracking-[0.3em] text-white/60">
                  {eyebrow}
                </p>
              </div>
            </div>

            {/* MAIN HEADING */}
            <div className="md:col-span-9">
              <h2
                style={{ color: storyConfig.style?.headingColor }}
                className="max-w-[1000px] font-gt-super text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-7xl lg:text-8xl"
              >
                {titleL1}
                <br />
                <span className="text-white/40">
                  {titleL2}
                </span>
              </h2>
            </div>
          </div>

          {/* CONTENT */}
          <div className="mt-24 grid grid-cols-1 gap-12 md:grid-cols-12">
            {/* LEFT META */}
            <div className="md:col-span-3">
              <p className="font-helvetica text-xs uppercase tracking-[0.25em] text-white/30">
                {nameLine1}
                <br />
                {nameLine2}
              </p>

              <p className="mt-8 font-helvetica text-xs leading-5 text-white/40">
                {city}
                <br />
                {location}
              </p>
            </div>

            {/* TEXT */}
            <div className="md:col-span-8 md:col-start-5">
              <p className="font-helvetica text-2xl font-light leading-[1.4] tracking-[-0.02em] md:text-3xl">
                {para1}
              </p>

              <p className="mt-10 max-w-[850px] font-helvetica text-lg font-light leading-8 text-white/60">
                {para2}
              </p>

              <p className="mt-8 max-w-[850px] font-helvetica text-lg font-light leading-8 text-white/60">
                {para3}
              </p>

              {/* FINAL STATEMENT */}
              <div className="mt-16 border-t border-white/10 pt-8">
                <p
                  style={{ color: storyConfig.style?.headingColor }}
                  className="font-gt-super text-3xl font-light leading-tight md:text-4xl"
                >
                  {welcomeTitle}
                </p>

                <p className="mt-2 font-helvetica text-sm uppercase tracking-[0.2em] text-white/40">
                  {welcomeSub}
                </p>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="mt-24 flex items-center justify-between border-t border-white/10 pt-6">
            <span className="font-helvetica text-[10px] uppercase tracking-[0.3em] text-white/30">
              {established}
            </span>

            <span className="font-helvetica text-[10px] uppercase tracking-[0.3em] text-white/30">
              Scroll to discover
            </span>
          </div>
        </div>
      </section>
    </section>
  );
}
