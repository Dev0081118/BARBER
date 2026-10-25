import ResponsiveImage from "../../../components/shared/ResponsiveImage.jsx";
import { getSectionConfig, getSectionStyleProperties } from "../../../schemas/barberSchema.js";

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
  const galleryConfig = getSectionConfig(barber, "gallery");

  const businessFirstWord =
    galleryConfig.content.businessFirstWord ||
    barber?.businessName?.split(" ")[0] || "Hammoudi";

  const eyebrow = galleryConfig.content.eyebrow || "The Gallery";
  const mainTitle = galleryConfig.content.title || `A look inside\n${businessFirstWord}.`;
  const titleParts = mainTitle.split("\n");
  const titleL1 = titleParts[0];
  const titleL2 = titleParts.slice(1).join("\n") || `${businessFirstWord}.`;
  const subtitle = galleryConfig.content.description || "A glimpse into the atmosphere, craft and attention to detail that make every visit different.";

  const instaTag = galleryConfig.content.instaTag || "Follow the journey";
  const instaTitle = galleryConfig.content.instaTitle || `More from ${businessFirstWord}.`;
  const instaCta = galleryConfig.content.instaCtaText || "Instagram →";

  const galleryItems =
    barber?.gallery && barber.gallery.length >= 6
      ? barber.gallery.map((item, idx) => ({
          id: item.id || String(idx + 1).padStart(2, "0"),
          image: item.image || item.src || defaultGallery[idx % defaultGallery.length].image,
          title: item.title || defaultGallery[idx % defaultGallery.length].title,
        }))
      : defaultGallery;

  const instagramLink =
    galleryConfig.content.instagramUrl ||
    barber?.socialLinks?.find((s) => s.platform?.toLowerCase() === "instagram")?.url ||
    "https://www.instagram.com/hammoudi_barber_shop/";

  const galleryStyles = getSectionStyleProperties(galleryConfig.style, {
    backgroundColor: "#ffffff",
    textColor: "#000000",
    headingColor: "#000000",
    borderColor: "rgb(229, 229, 229)",
  });

  return (
    <section
      id="photo-gallery"
      style={galleryStyles}
      className="bg-white px-6 py-32 text-black md:px-12 lg:px-20"
    >
      {/* HEADER */}
      <div className="mx-auto mb-24 max-w-[1400px]">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-neutral-500">
          {eyebrow}
        </p>

        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2
            style={{ color: galleryConfig.style?.headingColor }}
            className="text-6xl font-light leading-[0.9] tracking-[-0.05em] md:text-8xl"
          >
            {titleL1}
            <br />
            <span className="text-neutral-400">
              {titleL2}
            </span>
          </h2>

          <p className="max-w-[350px] text-sm leading-6 text-neutral-500">
            {subtitle}
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
            {instaTag}
          </p>

          <h3 className="mt-3 text-3xl font-light tracking-[-0.03em]">
            {instaTitle}
          </h3>
        </div>

        <a
          href={instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: galleryConfig.style?.buttonBackground,
            color: galleryConfig.style?.buttonTextColor,
          }}
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
            {instaCta}
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
      <ResponsiveImage
        image={item.responsiveImage || item.image}
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
