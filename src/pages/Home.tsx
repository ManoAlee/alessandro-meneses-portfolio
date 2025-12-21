import { HeroSection } from "@/widgets/home/HeroSection";
import { FeatureSection } from "@/widgets/home/FeatureSection";
import { CTASection } from "@/widgets/home/CTASection";

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      <HeroSection />
      <FeatureSection />
      <CTASection />
    </div>
  );
}