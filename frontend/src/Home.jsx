import React, { useRef } from "react";
import "./App.css";
import "./landing-page.css";
import Navbar from "./landing-page-components/Navbar";
import Hero from "./landing-page-components/Hero";
import Features from "./landing-page-components/Features";
import HowItWorks from "./landing-page-components/HowItWorks";
import VideoPreview from "./landing-page-components/VideoPreview";
import Pricing from "./landing-page-components/Pricing";
import Footer from "./landing-page-components/Footer";

const Home = () => {
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const videoPreviewRef = useRef(null);
  const pricingRef = useRef(null);

  const handleScroll = (ref, offset) => {
    const element = ref.current;

    const x = element.getBoundingClientRect().top + window.pageYOffset - offset;

    if (!x) return;

    window.scrollTo({ top: x, behavior: "smooth" });
  };

  return (
    <div>
      <Navbar
        onLinkClickFuncs={[
          () => handleScroll(featuresRef, 100),
          () => handleScroll(howItWorksRef, 70),
          () => handleScroll(videoPreviewRef, 130),
          () => handleScroll(pricingRef, 70),
        ]}
      />
      <div className="flex flex-col items-center gap-16">
        <Hero />
        <Features ref={featuresRef} />
        <HowItWorks ref={howItWorksRef} />
        <VideoPreview ref={videoPreviewRef} />
        <Pricing ref={pricingRef} />
        <Footer />
      </div>
      <div className="glow-blur"></div>
    </div>
  );
};

export default Home;
