import teamImage1 from "../../../assets/Team/emp1.png";
import teamImage2 from "../../../assets/Team/emp2.png";
import teamImage4 from "../../../assets/Team/emp4.png";
import teamImage5 from "../../../assets/Team/emp5.png";

const teamAssetMap = {
  "emp1": teamImage1,
  "emp2": teamImage2,
  "emp4": teamImage4,
  "emp5": teamImage5,
};

function resolveTeamImage(img, fallback) {
  if (!img) return fallback;
  for (const [key, asset] of Object.entries(teamAssetMap)) {
    if (img.includes(key)) return asset;
  }
  if (img.startsWith("/src/assets/")) return fallback;
  return img;
}

const defaultTeam = [
  {
    id: "01",
    name: "Joshua Lawrence",
    role: "Master Barber",
    image: teamImage5,
  },
  {
    id: "02",
    name: "Marcus Miller",
    role: "Senior Barber",
    image: teamImage1,
  },
  {
    id: "03",
    name: "Daniel Smith",
    role: "Barber & Stylist",
    image: teamImage2,
  },
  {
    id: "04",
    name: "Ryan Wilson",
    role: "Senior Stylist",
    image: teamImage4,
  },
];

export default function MeetTheTeam({ barber }) {
  const teamList =
    barber?.team && barber.team.length > 0
      ? barber.team.map((member, idx) => {
          const fallback = defaultTeam[idx % defaultTeam.length].image;
          return {
            ...member,
            id: member.id || String(idx + 1).padStart(2, "0"),
            image: resolveTeamImage(member.image, fallback),
          };
        })
      : defaultTeam;

  const countStr = `${String(teamList.length).padStart(2, "0")} / ${String(teamList.length).padStart(2, "0")}`;

  return (
    <section className="bg-black py-32 text-white">
      {/* HEADER */}
      <div className="mx-auto mb-20 w-[90%] max-w-[1400px]">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-neutral-500">
          The People Behind The Chair
        </p>

        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 className="text-6xl font-light leading-[0.9] tracking-[-0.05em] md:text-8xl">
            Meet the
            <br />
            <span className="text-neutral-600">
              team.
            </span>
          </h2>

          <p className="max-w-[350px] text-sm leading-6 text-neutral-500">
            Experienced hands, sharp eyes and a passion for making
            every client leave looking their best.
          </p>
        </div>
      </div>

      {/* HORIZONTAL TEAM SCROLL */}
      <div className="w-full overflow-x-auto px-[5%] pb-8 scrollbar-hide">
        <div className="flex w-max gap-6">
          {teamList.map((member) => (
            <div
              key={member.id}
              className="
                group
                w-[75vw]
                max-w-[450px]
                shrink-0
                md:w-[400px]
              "
            >
              {/* IMAGE */}
              <div className="relative h-[520px] overflow-hidden bg-neutral-900">
                <img
                  src={member.image}
                  alt={member.name}
                  className="
                    h-full
                    w-full
                    object-cover
                    grayscale
                    transition-all
                    duration-700
                    ease-out
                    group-hover:scale-105
                    group-hover:grayscale-0
                    group-active:scale-105
                    group-active:grayscale-0
                  "
                />

                {/* NUMBER */}
                <div className="absolute left-5 top-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-xs backdrop-blur-sm">
                    {member.id}
                  </span>
                </div>
              </div>

              {/* INFO */}
              <div className="flex items-end justify-between border-b border-neutral-800 py-6">
                <div>
                  <h3 className="text-2xl font-light tracking-[-0.03em]">
                    {member.name}
                  </h3>

                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
                    {member.role}
                  </p>
                </div>

                {/* Arrow */}
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-neutral-700
                    text-neutral-400
                    transition-all
                    duration-500
                    group-hover:border-[#c96b3c]
                    group-hover:bg-[#c96b3c]
                    group-hover:text-white
                    group-active:border-[#c96b3c]
                    group-active:bg-[#c96b3c]
                    group-active:text-white
                  "
                >
                  →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mx-auto mt-16 flex w-[90%] max-w-[1400px] justify-between border-t border-neutral-800 pt-6 text-xs uppercase tracking-[0.2em] text-neutral-600">
        <span>Scroll to explore</span>
        <span>{countStr}</span>
      </div>
    </section>
  );
}
