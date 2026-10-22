import React from "react";
import heroImage from "../assets/hero.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative h-screen min-h-[700px] overflow-hidden bg-black"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Subtle bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-8 md:px-12 md:py-10 lg:px-20">

        {/* TOP */}
        <div className="flex items-start justify-between">


        </div>


        {/* CENTER / BOTTOM CONTENT */}
        <div className="pb-6">

          <div className="mb-8 flex items-center gap-4">

            <span className="h-px w-12 bg-white/60" />

            <p className="font-helvetica text-xs font-medium uppercase tracking-[0.3em] text-white/80">
              56 William St / Perth WA 6000
            </p>

          </div>


          <h1 className="max-w-[1200px] font-gt-super text-6xl font-medium leading-[0.85] tracking-[-0.04em] text-white sm:text-7xl md:text-8xl lg:text-[10rem]">
            NEXT LEVEL
            <br />
            <span className="ml-[8vw]">BARBERSHOP</span>
          </h1>


          <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <p className="max-w-[500px] font-helvetica text-sm leading-6 text-white/70 md:text-base">
              Precision cuts, sharp fades,
              <br className="hidden md:block" />
              and a proper chair experience.
            </p>


            {/* BOOK BUTTON */}
            <a
              href="https://www.fresha.com/lvp/next-level-barber-shop-william-street-perth-KzBqYq"
              target="_blank"
              rel="noreferrer"
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
                Book an appointment →
              </span>

            </a>

          </div>

        </div>


        {/* BOTTOM INDICATOR */}
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">

          <span className="font-helvetica text-[10px] uppercase tracking-[0.3em] text-white/50">
            Scroll
          </span>

          <span className="h-12 w-px bg-white/40" />

        </div>

      </div>
    </section>
  );
};

export default Hero;