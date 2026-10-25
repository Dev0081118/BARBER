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

const DEFAULT_JULES_ORDER = [
  "hero",
  "story",
  "splitContent",
  "services",
  "packages",
  "team",
  "reviews",
  "gallery",
  "footer",
];

export default function JulesTheme({ barber }) {
  const rootRef = useRef(null);

  useEffect(() => {
    return createAnimationScope(() => {
      // Safe scoped animations for Jules theme if any elements opt in
    }, rootRef);
  }, [barber?.slug]);

  const sections = barber?.sections || {};

  const sectionMap = {
    hero: () => sections.hero !== false && <Hero key="hero" barber={barber} />,
    story: () => sections.story !== false && <WhoareWe key="story" barber={barber} />,
    splitContent: () => sections.splitContent !== false && <ScrollWindow key="splitContent" barber={barber} />,
    services: () => sections.services !== false && <Services key="services" barber={barber} />,
    packages: () => sections.packages !== false && <Packages key="packages" barber={barber} />,
    team: () => sections.team !== false && <MeetTheTeam key="team" barber={barber} />,
    reviews: () => sections.reviews !== false && <Reviews key="reviews" barber={barber} />,
    gallery: () => sections.gallery !== false && <PhotoGallery key="gallery" barber={barber} />,
    footer: () => sections.footer !== false && <Footer key="footer" barber={barber} />,
  };

  const renderedKeys = new Set();
  const activeOrder = Array.isArray(barber?.sectionOrder) && barber.sectionOrder.length > 0
    ? barber.sectionOrder
    : DEFAULT_JULES_ORDER;

  return (
    <div
      ref={rootRef}
      style={{
        backgroundColor: barber?.branding?.backgroundColor || "#000000",
        color: barber?.branding?.textColor || "#ffffff",
        ...(barber?.branding?.headingFont ? { "--font-heading": barber.branding.headingFont } : {}),
        ...(barber?.branding?.bodyFont ? { "--font-body": barber.branding.bodyFont, fontFamily: barber.branding.bodyFont } : {}),
      }}
      className="w-full overflow-x-hidden bg-black font-helvetica selection:bg-[#c96b3c] selection:text-white"
    >
      <NavBar barber={barber} />
      {activeOrder.map((sectionKey) => {
        if (renderedKeys.has(sectionKey)) return null;
        renderedKeys.add(sectionKey);
        const renderSection = sectionMap[sectionKey];
        return renderSection ? renderSection() : null;
      })}
    </div>
  );
}
