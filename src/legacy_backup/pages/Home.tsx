import { Button } from "@/shared/ui/Button";

function HeroSection() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Infrastructure. Security. <br className="hidden sm:inline" />
          Cloud Intelligence.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Alessandro Meneses provides enterprise-grade DevOps, Cloud Architecture, 
          and System Administration solutions.
        </p>
      </div>
      <div className="flex gap-4">
        <Button size="lg">View Expertise</Button>
        <Button variant="outline" size="lg">Contact Sales</Button>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      {/* Additional sections (Services, Stats) will go here */}
    </div>
  );
}