import React from "react";

const reviews = [
  {
    name: "John Gallager",
    date: "3 weeks ago",
    review:
      "Top notch. Enough said. Give a little extra if you appreciate quality.",
  },
  {
    name: "Michael Kempe",
    date: "1 month ago",
    review:
      "Still the best hairdresser in Perth by far. Great barber shop, friendly quality service and reasonably priced.",
  },
  {
    name: "SK Krishnan",
    date: "1 month ago",
    review:
      "Haircut was good.",
  },
  {
    name: "Abu Omar",
    date: "1 month ago",
    review:
      "Good haircut with affordable price. Till I'm in Perth I will go there.",
  },
  {
    name: "Gabriele",
    date: "1 month ago",
    review:
      "Best barber in town.",
  },
];

const Review = () => {
  return (
    <section className="bg-white px-6 py-32 text-black md:px-12 lg:px-20">

      {/* HEADER */}
      <div className="mx-auto max-w-[1400px]">

        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">

          <div>

            <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-neutral-500">
              Client Stories
            </p>

            <h2 className="text-6xl font-light leading-[0.9] tracking-[-0.05em] md:text-8xl">
              Words from
              <br />
              <span className="text-neutral-400">
                our clients.
              </span>
            </h2>

          </div>


          {/* RATING */}
          <div className="flex items-center gap-5">

            <div>
              <p className="text-5xl font-light tracking-[-0.04em]">
                4.6
              </p>

              <div className="mt-2 flex gap-1 text-[#c0c0c0]">
                ★ ★ ★ ★ ★
              </div>
            </div>

            <div className="h-14 w-px bg-neutral-200" />

            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-neutral-500">
                Google
              </p>

              <p className="mt-1 text-sm text-neutral-400">
                350+ reviews
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* REVIEWS */}
      <div className="mx-auto mt-24 max-w-[1400px]">

        <div className="grid border-t border-neutral-200 md:grid-cols-2">

          {reviews.map((review, index) => (

            <article
              key={review.name}
              className={`
                group
                flex
                min-h-[300px]
                flex-col
                justify-between
                border-b
                border-neutral-200
                p-8
                transition-colors
                duration-500
                hover:bg-neutral-50
                active:bg-neutral-50
                md:p-12
                ${index % 2 === 0 ? "md:border-r" : ""}
              `}
            >

              {/* TOP */}
              <div className="flex items-start justify-between">

                <span className="text-xs text-neutral-400">
                  0{index + 1}
                </span>

                <span className="text-[#c0c0c0]">
                  ★★★★★
                </span>

              </div>


              {/* REVIEW */}
              <p className="mt-12 max-w-[600px] text-2xl font-light leading-[1.3] tracking-[-0.02em] md:text-3xl">
                “{review.review}”
              </p>


              {/* USER */}
              <div className="mt-12 flex items-end justify-between">

                <div>
                  <p className="text-sm font-medium">
                    {review.name}
                  </p>

                  <p className="mt-1 text-xs text-neutral-400">
                    Google Review
                  </p>
                </div>

                <p className="text-xs text-neutral-400">
                  {review.date}
                </p>

              </div>

            </article>

          ))}

        </div>

      </div>


      {/* GOOGLE CTA */}
      <div className="mx-auto mt-20 max-w-[1400px]">

        <div className="flex flex-col items-start justify-between gap-8 border-t border-neutral-200 pt-10 md:flex-row md:items-center">

          <div>

            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">
              Had a good experience?
            </p>

            <h3 className="mt-3 text-3xl font-light tracking-[-0.03em]">
              Tell the world about it.
            </h3>

          </div>


          {/* GOOGLE BUTTON */}
          <a
            href="https://share.google/EpFtcxI55rnpOGp38"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              relative
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

            {/* Hover Background */}
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
              Review us on Google →
            </span>

          </a>

        </div>

      </div>
    </section>
  );
};

export default Review;