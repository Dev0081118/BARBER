import React from 'react'
import joshuaImage from "../../public/scrollwindow/trimmer.avif";
import secondImage from "../../public/scrollwindow/setting.avif";
const ImageCardRight = () => {
  return (
     <div className="relative flex w-full  flex-col overflow-hidden md:h-screen md:flex-row">
    {/* RIGHT SIDE */}
      <div className="flex h-screen w-full p-5 items-center justify-center bg-white py-14 order-2 md:h-full md:w-1/2 md:px-0 md:py-0 md:order-none">
        
        <div className="w-full md:w-[70%] md:max-w-none">
          <p className="mb-5 text-sm font-semibold uppercase tracking-wide">
            Where tradition meets modern style
          </p>

          <h1 className="text-4xl leading-tight md:text-5xl">
            Crafted with precision.
            <br />
            Defined by style.
          </h1>

          <p className="mt-8 text-base leading-relaxed md:text-lg">
            Premium grooming, timeless style and a relaxing atmosphere. From precision cuts to traditional shaves, every service is crafted with attention to detail and tailored to you.
          </p>

          <a
            href="https://www.fresha.com/lvp/next-level-barber-shop-william-street-perth-KzBqYq"
            target="_blank"
            rel="noreferrer"
            className="
                relative
                inline-block
                mt-8
                w-full
                overflow-hidden
                border-2 border-black
                bg-white
                px-6 py-4
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
    Book an appointment
  </span>
</a>
          
        </div>
          
      </div>

        {/* LEFT SIDE */}
        <div className="relative h-screen w-full order-1 md:h-full md:w-1/2 md:order-none">
        
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${joshuaImage})`,
          }}
        />

        {/* Small Image on top */}
        <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[45%] h-[55%]">
          <img
            src={secondImage}
            alt="Barber shop"
            className="h-full w-full object-cover"
          />
        </div>

      </div>

    </div>
    
  )
};

export default ImageCardRight;
