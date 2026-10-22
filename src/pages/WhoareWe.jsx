// import React from 'react'
// import { Scissors } from 'lucide-react';
// import { SoapDispenserDroplet } from 'lucide-react';
// import fade from '../../public/cut.png'
// import beard from '../../public/beard.png'
// import towel from '../../public/towel.png'
// import styling from '../../public/barber-shop.png'
// const services = [
//   { icon: <Scissors />, label: 'Haircut' },
//   { icon: <img style={{ width: '30px', height: '30px' }} src={beard} alt="Beard Trim" />, label: 'Beard Trim' },
//   { icon: <img style={{ width: '30px', height: '30px' }} src={fade} alt="Fade" />, label: 'Fade' },
//   { icon: <img style={{ width: '30px', height: '25px' }} src={towel} alt="Towel" />, label: 'ShaveHot Towel Shave' },
//   { icon: <img style={{ width: '30px', height: '30px' }} src={styling} alt="Styling" />, label: 'Styling' },
//   { icon: <SoapDispenserDroplet />, label: 'Skin Care' },
// ]

// const WhoareWe = () => {
//   return (
//     <div id="whoarewe" className="min-h-screen bg-white text-black">
//       <style>{`
//         @keyframes marquee {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//       `}</style>

//       <div className="overflow-hidden bg-white py-5">
      
//         <div className="relative overflow-hidden">
//           <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
//           <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

//           <div
//             className="flex w-max gap-6 px-4 motion-safe:animate-[marquee_18s_linear_infinite]"
//             style={{ animation: 'marquee 18s linear infinite' }}
//           >
//             {[...services, ...services].map((service, index) => (
//               <div
//                 key={`${service.label}-${index}`}
//                 className="flex min-w-[220px] items-center justify-center gap-4 px-6 py-4 "
//               >
//                 <span className="text-2xl">{service.icon}</span>
//                 <span className="text-xl font-medium tracking-wide text-black">
//                   {service.label}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <section className="bg-[#0e291b] h-full w-full px-6 py-16 text-white md:px-10 lg:px-16">
//         <div className="flex flex-col pt-15 items-center">
//           <div className="h-full w-1/3"></div>  
//           <div className="mb-6 h-full w-1/2">
//             <p className="text-lg font-medium text-white">
//               Who We Are
//             </p>
//             <p className="mt-4 text-white text-3xl">
//                 Nestled in central Perth, our shop offers far more than standard trims, delivering a refined grooming experience.
//             </p>
//             <p className="mt-8 text-white text-3xl">
//                 We blend classic techniques, exceptional attention to detail, and top-tier products for men focused on elevating their personal style.
//             </p>
//             <p className="mt-8 text-white text-3xl">
//                 Every touchpoint goes beyond routine grooming: we cultivate sharp confidence, distinct character, and caliber service crafted to top standards.
//             </p>
//             <p className="mt-8 text-white text-3xl">
//                 Welcome to Hammoudi Barber.
//                 Where tradition meets innovation.
//             </p>
//           </div>
//           <div className="h-full w-1/3"></div>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default WhoareWe
import React from "react";
import { Scissors, SoapDispenserDroplet } from "lucide-react";

import fade from "../../public/cut.png";
import beard from "../../public/beard.png";
import towel from "../../public/towel.png";
import styling from "../../public/barber-shop.png";

const services = [
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

const WhoareWe = () => {
  return (
    <section id="whoarewe" className="bg-white text-black">

      {/* =========================
          SERVICE MARQUEE
      ========================= */}
      <div className="overflow-hidden border-y border-neutral-200 bg-white py-4">

        <style>
          {`
            @keyframes marquee {
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
              animation: "marquee 22s linear infinite",
            }}
          >
            {[...services, ...services].map((service, index) => (
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


      {/* =========================
          WHO WE ARE
      ========================= */}
      <section className="bg-[#1a1a1a] px-6 py-28 text-white md:px-12 md:py-36 lg:px-20">

        <div className="mx-auto max-w-[1400px]">

          {/* TOP */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">

            {/* SMALL LABEL */}
            <div className="md:col-span-3">

              <div className="flex items-center gap-3">

                <span className="h-px w-8 bg-white/40" />

                <p className="font-helvetica text-xs uppercase tracking-[0.3em] text-white/60">
                  Who We Are
                </p>

              </div>

            </div>


            {/* MAIN HEADING */}
            <div className="md:col-span-9">

              <h2 className="max-w-[1000px] font-gt-super text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-7xl lg:text-8xl">
                More than a haircut.
                <br />
                <span className="text-white/40">
                  It's an experience.
                </span>
              </h2>

            </div>

          </div>


          {/* CONTENT */}
          <div className="mt-24 grid grid-cols-1 gap-12 md:grid-cols-12">

            {/* LEFT EMPTY / META */}
            <div className="md:col-span-3">

              <p className="font-helvetica text-xs uppercase tracking-[0.25em] text-white/30">
                Next Level
                <br />
                Barbershop
              </p>

              <p className="mt-8 font-helvetica text-xs leading-5 text-white/40">
                56 William St
                <br />
                Perth WA 6000
                <br />
                Australia
              </p>

            </div>


            {/* TEXT */}
            <div className="md:col-span-8 md:col-start-5">

              <p className="font-helvetica text-2xl font-light leading-[1.4] tracking-[-0.02em] md:text-3xl">
                Built for Perth. Next Level is a modern barbershop for clean
                cuts, confident fades and proper conversation.
              </p>


              <p className="mt-10 max-w-[850px] font-helvetica text-lg font-light leading-8 text-white/60">
                We blend classic barbering technique with a sharp, current
                point of view, delivering an experience that feels as good
                as the finish looks.
              </p>


              <p className="mt-8 max-w-[850px] font-helvetica text-lg font-light leading-8 text-white/60">
                Every touchpoint goes beyond routine grooming. We cultivate
                sharp confidence, distinct character, and calibre service
                crafted to the highest standards.
              </p>


              {/* FINAL STATEMENT */}
              <div className="mt-16 border-t border-white/10 pt-8">

                <p className="font-gt-super text-3xl font-light leading-tight md:text-4xl">
                  Welcome to Next Level Barbershop.
                </p>

                <p className="mt-2 font-helvetica text-sm uppercase tracking-[0.2em] text-white/40">
                  Where tradition meets innovation.
                </p>

              </div>

            </div>

          </div>


          {/* BOTTOM */}
          <div className="mt-24 flex items-center justify-between border-t border-white/10 pt-6">

            <span className="font-helvetica text-[10px] uppercase tracking-[0.3em] text-white/30">
              Est. Perth
            </span>

            <span className="font-helvetica text-[10px] uppercase tracking-[0.3em] text-white/30">
              Scroll to discover
            </span>

          </div>

        </div>

      </section>

    </section>
  );
};

export default WhoareWe;