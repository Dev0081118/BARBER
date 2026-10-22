import { useRef, useEffect } from "react";
import { createAnimationScope } from "../../utils/animations.js";
import NavBar from "./components/NavBar.jsx";
import Hero from "./components/Hero.jsx";
import WhoareWe from "./components/WhoareWe.jsx";
import ScrollWindow from "./components/ScrollWindow.jsx";
import Services from "./components/Services.jsx";
import Packages from "./components/Packages.jsx";
import MeetTheTeam from "./components/MeetTheTeam.jsx";
import Reviews from "./components/Reviews.jsx";
import PhotoGallery from "./components/PhotoGallery.jsx";
import Footer from "./components/Footer.jsx";

export default function JulesTheme({ barber }) {
  const rootRef = useRef(null);

  useEffect(() => {
    return createAnimationScope(() => {
      // Safe scoped animations for Jules theme if any elements opt in
    }, rootRef);
  }, [barber?.slug]);

  const sections = barber?.sections || {};

  return (
    <div ref={rootRef} className="w-full overflow-x-hidden bg-black font-helvetica selection:bg-[#c96b3c] selection:text-white">
      <NavBar barber={barber} />
      {sections.hero !== false && <Hero barber={barber} />}
      {sections.story !== false && <WhoareWe barber={barber} />}
      {sections.splitContent !== false && <ScrollWindow barber={barber} />}
      {sections.services !== false && <Services barber={barber} />}
      {sections.packages !== false && <Packages barber={barber} />}
      {sections.team !== false && <MeetTheTeam barber={barber} />}
      {sections.reviews !== false && <Reviews barber={barber} />}
      {sections.gallery !== false && <PhotoGallery barber={barber} />}
      {sections.footer !== false && <Footer barber={barber} />}
    </div>
  );
}
