import ImageCardLeft from "./ImageCardLeft.jsx";
import ImageCardRight from "./ImageCardRight.jsx";
import { getSectionConfig, getSectionStyleProperties } from "../../../schemas/barberSchema.js";

export default function ScrollWindow({ barber }) {
  const splitConfig = getSectionConfig(barber, "splitContent");
  const styles = getSectionStyleProperties(splitConfig.style, {
    backgroundColor: "#ffffff",
  });

  return (
    <div
      style={styles}
      className="w-full h-full bg-white px-0 py-40 text-8xl text-black md:px-30"
    >
      <ImageCardLeft barber={barber} />
      <ImageCardRight barber={barber} />
    </div>
  );
}
