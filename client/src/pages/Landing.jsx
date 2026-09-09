import FeaturesSection from "../components/landing/FeaturesSection";
import HeroWithNav from "../components/landing/HeroWithNav";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import LandingFooter from "../components/landing/LandingFooter";
import ProblemSection from "../components/landing/ProblemSection";

export default function Landing() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <HeroWithNav />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <LandingFooter />
    </main>
  );
}
