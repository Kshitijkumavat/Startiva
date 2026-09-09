import LandingNav from "./LandingNav";
import HeroSection from "./HeroSection";
import MeshGradientHero from "../ui/MeshGradientHero";

export default function HeroWithNav() {
  return (
    <div className="relative">
      <MeshGradientHero />
      <div className="relative z-10">
        <LandingNav />
        <HeroSection />
      </div>
    </div>
  );
}