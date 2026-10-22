import React from "react";

const services = [
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

const Services = () => {
  return (
    <section id="services" className="min-h-[2000px] bg-black text-white">

      {/* INTRO */}
      <div className="mx-auto flex min-h-[550px] w-[90%] max-w-[1400px] flex-col justify-center">

        <p className="mb-8 text-sm font-medium uppercase tracking-[0.3em] text-[#c0c0c0]">
          Our Services
        </p>

        <h2 className="max-w-[1000px] text-6xl font-light leading-[0.95] tracking-[-0.04em] md:text-8xl">
          Crafted for
          <br />
          <span className="text-neutral-500">
            your best look.
          </span>
        </h2>

        <div className="mt-16 flex max-w-[600px] justify-between border-t border-neutral-800 pt-6">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            Precision
          </p>

          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            Style
          </p>

          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            Tradition
          </p>
        </div>
      </div>


      {/* SERVICES */}
      <div className="mx-auto w-[90%] max-w-[1400px]">

        {/* HEADER */}
        <div className="mb-4 grid grid-cols-12 border-b border-neutral-700 pb-5 text-xs uppercase tracking-[0.2em] text-neutral-500">
          <div className="col-span-2">
            No.
          </div>

          <div className="col-span-7">
            Service
          </div>

          <div className="col-span-3 text-right">
            Price
          </div>
        </div>


        {/* SERVICE LIST */}
        <div>
          {services.map((service) => (
            <a
              key={service.number}
              href="https://www.fresha.com/lvp/next-level-barber-shop-william-street-perth-KzBqYq"
              target="_blank"
              rel="noreferrer"
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
                  <span className="text-sm text-neutral-600 transition-colors duration-500 group-hover:text-[#c0c0c0] group-active:text-[#c0c0c0]">
                  {service.number}
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

                <span className="text-lg font-light md:text-2xl">
                  {service.price}
                </span>

                <div className="mt-3 overflow-hidden">
                  <span
                    className="
                      inline-block
                      translate-x-full
                      text-xs
                      uppercase
                      tracking-[0.15em]
                      text-[#c0c0c0]
                      transition-transform
                      duration-500
                      group-hover:translate-x-0
                      group-active:translate-x-0
                    "
                  >
                    Book →
                  </span>
                </div>

              </div>

            </a>
          ))}
        </div>

      </div>


      {/* BOTTOM CTA */}
      <div className="mx-auto flex min-h-[450px] w-[90%] max-w-[1400px] items-center justify-between border-t border-neutral-800">

        <div>
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-neutral-500">
            Ready when you are
          </p>

          <h3 className="text-5xl font-light tracking-[-0.04em] md:text-7xl">
            Sit back.
            <br />
            We got you.
          </h3>
        </div>


        <a
          href="https://www.fresha.com/lvp/next-level-barber-shop-william-street-perth-KzBqYq"
          target="_blank"
          rel="noreferrer"
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

          <span className="relative z-10 transition-colors duration-500 group-hover:text-black group-active:text-black">
            Book Appointment
          </span>
        </a>

      </div>

    </section>
  );
};

export default Services;