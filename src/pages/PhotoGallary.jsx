import React from "react";

const gallery = [
  {
    id: "01",
    image: "https://scontent.famd21-1.fna.fbcdn.net/v/t1.6435-9/32737760_1161330197356851_7705410528637616128_n.jpg?stp=dst-jpg_tt6&cstp=mx640x960&ctp=s640x960&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=WIyFjAF5fMcQ7kNvwE9ijIA&_nc_oc=Adq_tfp8ViP02wYsmLBrGJc1cfoPoT-uEq7nQOfuiTLslNtLksdhAPZ5TwcE2Za8tCSm9m4u-LMIcF9X8A4PgMwz&_nc_zt=23&_nc_ht=scontent.famd21-1.fna&_nc_gid=jBVo3vqVhZrCjyY1pTxEZg&_nc_ss=7b2a8&oh=00_AQKxIXOr5OwtLaOX8wuWmwPSTqUZg5E0QrXyhfP2Z_tJpw&oe=6AC8A8D9",
    title: "The Craft",
  },
  {
    id: "02",
    image: "https://scontent.famd21-2.fna.fbcdn.net/v/t51.82787-15/574029850_18517736830067893_6812504223946027173_n.jpg?stp=dst-jpegr_tt6&cstp=mx1440x1918&ctp=s1440x1918&_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Xx8GgwG-vnYQ7kNvwFJmpFz&_nc_oc=AdrMrjWbeqKXTflzwa3mamiBWy-VG-Y4KY0bqHZgmHSI1VbVHSsebc2g-ofMfz1ws7LmMaXZK7nGSLN2YK3D06Su&_nc_zt=23&se=-1&_nc_ht=scontent.famd21-2.fna&_nc_gid=Rr5lYsyPzSPYVW3ehSjuNg&_nc_ss=7b2a8&oh=00_AQJTlMozW-GWDjNlNXtzf4IyZdyRPabYhLyLY1r0y_UMuw&oe=6AA7137A",
    title: "Inside Next Level",
  },
  {
    id: "03",
    image: "https://scontent.famd21-2.fna.fbcdn.net/v/t39.30808-6/497646781_1263287665807780_8942998066644112633_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx946x2048&ctp=s946x2048&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=vRbJ8J2cPrgQ7kNvwG8uz1p&_nc_oc=AdolTQFDK_o1nwlcbfJzbviJxg3McQoBCeElJkSpjnlEqwJryQMkgP3btRU1Q7bb1zZsUuQ2PnTVylCpiMYF1en8&_nc_zt=23&_nc_ht=scontent.famd21-2.fna&_nc_gid=VKvChjdfsAUTZCsEseH6pA&_nc_ss=7b2a8&oh=00_AQJTekEM5xcf8IrTLj9jomnON4l6o8KOFcAvE_7PEZc4SQ&oe=6AA72233",
    title: "The Details",
  },
  {
    id: "04",
    image: "https://scontent.famd21-2.fna.fbcdn.net/v/t51.82787-15/588238274_18521394226067893_522931156072755661_n.jpg?stp=dst-jpg_tt6&cstp=mx1179x1572&ctp=s1179x1572&_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=1ZBedlkEgs8Q7kNvwF7bYoD&_nc_oc=Adp58Qi0d30f-Q_Y49NBuzwGACc7exHL866vp-VEo9CQPTHbLUdD76BQaaxevL2uLKcx3s1n8tVFGkvEAvYl7JSu&_nc_zt=23&_nc_ht=scontent.famd21-2.fna&_nc_gid=7earFe0U9Xe0hDMpJEKshA&_nc_ss=7b2a8&oh=00_AQLAsP1-M705okvif2kaqbe8lTl7ALXglM_jpCK-AdoxVA&oe=6AA6FDB9",
    title: "Sharp & Clean",
  },
  {
    id: "05",
    image: "https://scontent.famd21-1.fna.fbcdn.net/v/t1.6435-9/32697992_1161330247356846_8886881411005415424_n.jpg?stp=dst-jpg_tt6&cstp=mx960x598&ctp=s960x598&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=_RC-JwhR_mgQ7kNvwHjPKnt&_nc_oc=AdoX5Q99JNiDRbaJVllTH9ynHG2qrAkyVJ219aq-MOih7J3V4MdSlKnyTBSPkKo-IazS1Ub7wWT5Ybxz-rmoBZkG&_nc_zt=23&_nc_ht=scontent.famd21-1.fna&_nc_gid=MBxdl5HeBgrgOvwj-iQbHw&_nc_ss=7b2a8&oh=00_AQIggEVLtuh2UUkCcaKNRohUNGy3XHgS1MkbwrHoufgLrQ&oe=6AC8C7D5",
    title: "The Experience",
  },
  {
    id: "06",
    image: "https://scontent.famd21-2.fna.fbcdn.net/v/t1.6435-9/170349878_2044466709043191_305730072244995955_n.jpg?stp=dst-jpg_tt6&cstp=mx720x960&ctp=s720x960&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=CJWH3gbB0SoQ7kNvwGIGNwJ&_nc_oc=AdpyBGgyE9wdzHe2FxTMc644DaNuE1b8bk-VneHiuzJEIMbbjBjHthl42_Xb3ZjB0d5H3nSwkZl9HEuKV0ucZaPr&_nc_zt=23&_nc_ht=scontent.famd21-2.fna&_nc_gid=G-YnrAJ7OVNrwVaiQq4Dvw&_nc_ss=7b2a8&oh=00_AQKHOyVayzmDJ45ivlZB-zLIiMLtQbHX7L4b3xMSD5LLXQ&oe=6AC8A570",
    title: "Behind The Chair",
  },
];

const PhotoGallery = () => {
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
              Next Level.
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
            item={gallery[0]}
            className="md:col-span-7 md:h-[650px]"
          />

          {/* IMAGE 02 */}
          <GalleryImage
            item={gallery[1]}
            className="md:col-span-5 md:h-[500px] md:mt-32"
          />

          {/* IMAGE 03 */}
          <GalleryImage
            item={gallery[2]}
            className="md:col-span-5 md:h-[550px]"
          />

          {/* IMAGE 04 */}
          <GalleryImage
            item={gallery[3]}
            className="md:col-span-7 md:h-[650px]"
          />

          {/* IMAGE 05 */}
          <GalleryImage
            item={gallery[4]}
            className="md:col-span-7 md:h-[500px] md:mt-20"
          />

          {/* IMAGE 06 */}
          <GalleryImage
            item={gallery[5]}
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
            More from Next Level.
          </h3>
        </div>


        <a
          href="https://www.instagram.com/next_level_barbershop_perth/"
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
};


/* -------------------------
   Gallery Image Component
------------------------- */

const GalleryImage = ({ item, className }) => {
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
};

export default PhotoGallery;