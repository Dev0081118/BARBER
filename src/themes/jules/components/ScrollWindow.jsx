import ImageCardLeft from "./ImageCardLeft.jsx";
import ImageCardRight from "./ImageCardRight.jsx";

export default function ScrollWindow({ barber }) {
  return (
    <div className="w-full h-full  bg-white px-0 py-40 text-8xl text-black md:px-30">
      <ImageCardLeft barber={barber} />
      <ImageCardRight barber={barber} />
    </div>
  );
}
