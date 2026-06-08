import FeaturesSection from "../components/landing/FeaturesSection";
import HeroSection from "../components/landing/HeroSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import LandingFooter from "../components/landing/LandingFooter";
import LandingNav from "../components/landing/LandingNav";
import ProblemSection from "../components/landing/ProblemSection";

export default function Landing() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <LandingNav />
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <LandingFooter />
    </main>
  );
}
