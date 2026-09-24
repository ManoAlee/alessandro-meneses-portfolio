import { HeroSection } from "@/widgets/home/HeroSection";
import { FeatureSection } from "@/widgets/home/FeatureSection";
import { FeaturedProjects } from "@/widgets/home/FeaturedProjects";
import { CTASection } from "@/widgets/home/CTASection";
import { TechStackMarquee } from "@/widgets/home/TechStackMarquee";
import { ImpactMetrics } from "@/widgets/home/ImpactMetrics";

export default function HomePage() {
  return (
    <div className="animate-fade-in space-y-8 md:space-y-12">
      <HeroSection />
      <div>
        <TechStackMarquee />
        <ImpactMetrics />
      </div>
      <FeaturedProjects />
      <FeatureSection />
      <CTASection />
    </div>
  );
}