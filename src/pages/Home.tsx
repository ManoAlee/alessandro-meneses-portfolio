import { HeroSection } from "@/widgets/home/HeroSection";
import { FeatureSection } from "@/widgets/home/FeatureSection";
import { CTASection } from "@/widgets/home/CTASection";
import { TechStackMarquee } from "@/widgets/home/TechStackMarquee";
import { ImpactMetrics } from "@/widgets/home/ImpactMetrics";

export default function HomePage() {
  return (
    <div className="animate-fade-in space-y-20">
      <HeroSection />
      <div className="space-y-0">
        <TechStackMarquee />
        <ImpactMetrics />
      </div>
      <FeatureSection />
      <CTASection />
    </div>
  );
}