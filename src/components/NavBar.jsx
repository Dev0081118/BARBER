import React from "react";
import logo from "../assets/logo/logo2.png";

const NavBar = () => {
  return (
    <nav className="absolute left-0 top-0 z-50 w-full px-6 py-6 text-white md:px-10 lg:px-16">

      <div className="flex items-center justify-between">

        {/* LOGO + BRAND */}
        <a href="#home" className="flex items-center gap-4">

          <img
            src={logo}
            alt="Next Level Barbershop logo"
            className="h-14 w-auto object-contain md:h-16"
          />

          <div className="hidden sm:block">
            <p className="font-helvetica text-[10px] uppercase tracking-[0.3em] text-white/60">
              Perth
            </p>

            <h1 className="mt-1 font-gt-super text-lg font-medium tracking-tight md:text-xl">
              NEXT LEVEL
            </h1>
          </div>

        </a>


        {/* NAVIGATION */}
        <div className="flex items-center gap-6 md:gap-10">

          <a
            href="#services"
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
            Services
          </a>


          <a
            href="https://www.fresha.com/lvp/next-level-barber-shop-william-street-perth-KzBqYq"
            target="_blank"
            rel="noreferrer"
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
              md:block
            "
          >
            Packages
          </a>


          {/* PHONE */}
          <a
            href="tel:+61415300889"
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
            0415 300 889
          </a>


          {/* BOOK BUTTON */}
          <a
            href="https://www.fresha.com/lvp/next-level-barber-shop-william-street-perth-KzBqYq"
            target="_blank"
            rel="noreferrer"
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
              Book Now
            </span>

          </a>

        </div>

      </div>

    </nav>
  );
};

export default NavBar;