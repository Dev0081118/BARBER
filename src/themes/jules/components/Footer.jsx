export default function Footer({ barber }) {
  const businessName = barber?.businessName || "Hammoudi Barber Shop";
  const addressLine = barber?.addressLine || "188 Adelaide Terrace";
  const cityLocation = barber?.city || "Perth WA 6004, Australia";
  const phone = barber?.phone || "+61 416 917 772";
  const email = barber?.email || "hello@hammoudibarber.com";
  const bookingUrl = barber?.bookingUrl || "#packages";

  const instagramLink =
    barber?.socialLinks?.find((s) => s.platform?.toLowerCase() === "instagram")?.url ||
    "https://www.instagram.com/hammoudi_barber_shop/";

  const facebookLink =
    barber?.socialLinks?.find((s) => s.platform?.toLowerCase() === "facebook")?.url ||
    "https://www.facebook.com/p/Hammoudi-barber-shop-100063867472962";

  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 lg:px-20">
        {/* Top */}
        <div className="grid gap-16 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-6">
            <p className="mb-8 text-xs uppercase tracking-[0.3em] text-neutral-500">
              {businessName}
            </p>

            <h2 className="max-w-[700px] text-5xl font-light leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
              Good hair.
              <br />
              Good mood.
              <br />
              <span className="text-neutral-600">
                Good times.
              </span>
            </h2>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-neutral-500">
              Explore
            </p>

            <nav className="flex flex-col gap-4 text-sm">
              <a
                href="#home"
                className="w-fit transition-colors duration-300 hover:text-[#c96b3c] active:text-[#c96b3c]"
              >
                Home
              </a>

              <a
                href="#services"
                className="w-fit transition-colors duration-300 hover:text-[#c96b3c] active:text-[#c96b3c]"
              >
                Services
              </a>

              <a
                href="#packages"
                className="w-fit transition-colors duration-300 hover:text-[#c96b3c] active:text-[#c96b3c]"
              >
                Packages
              </a>

              <a
                href="#whoarewe"
                className="w-fit transition-colors duration-300 hover:text-[#c96b3c] active:text-[#c96b3c]"
              >
                About
              </a>

              <a
                href="#photo-gallery"
                className="w-fit transition-colors duration-300 hover:text-[#c96b3c] active:text-[#c96b3c]"
              >
                Photo Gallery
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-neutral-500">
              Visit us
            </p>

            <div className="space-y-5 text-sm text-neutral-300">
              <p>
                {addressLine}
                <br />
                {cityLocation}
              </p>

              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="block w-fit transition-colors duration-300 hover:text-[#c96b3c] active:text-[#c96b3c]"
              >
                {phone}
              </a>

              <a
                href={`mailto:${email}`}
                className="block w-fit transition-colors duration-300 hover:text-[#c96b3c] active:text-[#c96b3c]"
              >
                {email}
              </a>
            </div>
          </div>
        </div>

        {/* Appointment CTA */}
        <div className="mt-32 border-y border-neutral-800 py-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-neutral-500">
                Your chair is waiting
              </p>

              <h3 className="text-3xl font-light tracking-[-0.03em] md:text-4xl">
                Ready for a fresh cut?
              </h3>
            </div>

            <a
              href={bookingUrl}
              target={bookingUrl.startsWith("http") ? "_blank" : undefined}
              rel={bookingUrl.startsWith("http") ? "noopener noreferrer" : undefined}
              className="
                group
                relative
                overflow-hidden
                border
                border-white
                px-8
                py-4
                text-sm
                font-medium
                uppercase
                tracking-[0.15em]
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
                Book Appointment
              </span>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col justify-between gap-6 pt-8 text-xs text-neutral-600 md:flex-row">
          <p>
            © {new Date().getFullYear()} {businessName}
          </p>

          <div className="flex gap-8">
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-white active:text-white"
            >
              Instagram
            </a>

            <a
              href={facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-white active:text-white"
            >
              Facebook
            </a>

            <a
              href="/privacy"
              className="transition-colors duration-300 hover:text-white active:text-white"
            >
              Privacy
            </a>
          </div>

          <p>Crafted with precision.</p>
        </div>
      </div>
    </footer>
  );
}
