import trimmerImage from "/scrollwindow/trimmer.avif";
import settingImage from "/scrollwindow/setting.avif";

export default function ImageCardRight({ barber }) {
  const bookingUrl = barber?.bookingUrl || "#packages";

  return (
    <div className="relative flex w-full flex-col overflow-hidden md:h-screen md:flex-row">
      {/* RIGHT SIDE (TEXT) */}
      <div className="order-2 flex h-screen w-full items-center justify-center bg-white p-5 py-14 md:order-none md:h-full md:w-1/2 md:px-0 md:py-0">
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
            Premium grooming, timeless style and a relaxing atmosphere. From
            precision cuts to traditional shaves, every service is crafted with
            attention to detail and tailored to you.
          </p>

          <a
            href={bookingUrl}
            target={bookingUrl.startsWith("http") ? "_blank" : undefined}
            rel={bookingUrl.startsWith("http") ? "noopener noreferrer" : undefined}
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
              Book an appointment
            </span>
          </a>
        </div>
      </div>

      {/* LEFT SIDE (IMAGE) */}
      <div className="order-1 relative h-screen w-full md:order-none md:h-full md:w-1/2">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${trimmerImage})`,
          }}
        />

        {/* Small Image on top */}
        <div className="absolute top-1/2 right-[15%] h-[55%] w-[45%] -translate-y-1/2">
          <img
            src={settingImage}
            alt="Barber shop"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
