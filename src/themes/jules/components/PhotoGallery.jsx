const defaultGallery = [
  {
    id: "01",
    image: "/gallery/gallery-1.jpg",
    title: "The Craft",
  },
  {
    id: "02",
    image: "/gallery/gallery-2.jpg",
    title: "Inside Hammoudi",
  },
  {
    id: "03",
    image: "/gallery/gallery-3.jpg",
    title: "The Details",
  },
  {
    id: "04",
    image: "/gallery/gallery-4.jpg",
    title: "Sharp & Clean",
  },
  {
    id: "05",
    image: "/gallery/gallery-5.jpg",
    title: "The Experience",
  },
  {
    id: "06",
    image: "/gallery/gallery-6.jpg",
    title: "Behind The Chair",
  },
];

export default function PhotoGallery({ barber }) {
  const galleryItems =
    barber?.gallery && barber.gallery.length >= 6
      ? barber.gallery.map((item, idx) => ({
          id: item.id || String(idx + 1).padStart(2, "0"),
          image: item.image || item.src || defaultGallery[idx % defaultGallery.length].image,
          title: item.title || defaultGallery[idx % defaultGallery.length].title,
        }))
      : defaultGallery;

  const businessFirstWord =
    barber?.businessName?.split(" ")[0] || "Hammoudi";

  const instagramLink =
    barber?.socialLinks?.find((s) => s.platform?.toLowerCase() === "instagram")?.url ||
    "https://www.instagram.com/hammoudi_barber_shop/";

  return (
    <section id="photo-gallery" className="bg-white px-6 py-32 text-black md:px-12 lg:px-20">
      {/* HEADER */}
      <div className="mx-auto mb-24 max-w-[1400px]">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-neutral-500">
          The Gallery
        </p>

        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 className="text-6xl font-light leading-[0.9] tracking-[-0.05em] md:text-8xl">
            A look inside
            <br />
            <span className="text-neutral-400">
              {businessFirstWord}.
            </span>
          </h2>

          <p className="max-w-[350px] text-sm leading-6 text-neutral-500">
            A glimpse into the atmosphere, craft and attention to detail
            that make every visit different.
          </p>
        </div>
      </div>

      {/* GALLERY */}
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* IMAGE 01 */}
          <GalleryImage
            item={galleryItems[0]}
            className="md:col-span-7 md:h-[650px]"
          />

          {/* IMAGE 02 */}
          <GalleryImage
            item={galleryItems[1]}
            className="md:col-span-5 md:h-[500px] md:mt-32"
          />

          {/* IMAGE 03 */}
          <GalleryImage
            item={galleryItems[2]}
            className="md:col-span-5 md:h-[550px]"
          />

          {/* IMAGE 04 */}
          <GalleryImage
            item={galleryItems[3]}
            className="md:col-span-7 md:h-[650px]"
          />

          {/* IMAGE 05 */}
          <GalleryImage
            item={galleryItems[4]}
            className="md:col-span-7 md:h-[500px] md:mt-20"
          />

          {/* IMAGE 06 */}
          <GalleryImage
            item={galleryItems[5]}
            className="md:col-span-5 md:h-[650px]"
          />
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="mx-auto mt-24 flex max-w-[1400px] flex-col justify-between gap-8 border-t border-neutral-200 pt-10 md:flex-row md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
            Follow the journey
          </p>

          <h3 className="mt-3 text-3xl font-light tracking-[-0.03em]">
            More from {businessFirstWord}.
          </h3>
        </div>

        <a
          href={instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            relative
            w-fit
            overflow-hidden
            border
            border-black
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
              bg-black
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
              group-hover:text-white
              group-active:text-white
            "
          >
            Instagram →
          </span>
        </a>
      </div>
    </section>
  );
}

function GalleryImage({ item, className }) {
  return (
    <div
      className={`
        group
        relative
        h-[500px]
        overflow-hidden
        bg-neutral-100
        ${className}
      `}
    >
      <img
        src={item.image}
        alt={item.title}
        className="
          h-full
          w-full
          object-cover
          transition-transform
          duration-700
          ease-out
          group-hover:scale-105
          group-active:scale-105
        "
      />

      {/* OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-black/0
          transition-all
          duration-500
          group-hover:bg-black/30
          group-active:bg-black/30
        "
      />

      {/* INFO */}
      <div
        className="
          absolute
          bottom-6
          left-6
          right-6
          flex
          items-end
          justify-between
          opacity-0
          transition-all
          duration-500
          group-hover:opacity-100
          group-active:opacity-100
        "
      >
        <div>
          <span className="text-xs text-white/60">
            {item.id}
          </span>

          <p className="mt-1 text-lg font-light text-white">
            {item.title}
          </p>
        </div>

        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 text-white">
          ↗
        </span>
      </div>
    </div>
  );
}
