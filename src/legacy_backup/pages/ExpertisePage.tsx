import { useNavigate, useParams } from "react-router-dom";
import { EXPERTISE_DATA, SkillDomain } from "@/entities/skill/data/expertise";
import { Button } from "@/shared/ui/Button";
import * as Icons from "lucide-react";

// Helper to render dynamic icons
const IconRenderer = ({ name, className }: { name: string; className?: string }) => {
  // @ts-ignore - Dynamic access to Lucide icons
  const Icon = Icons[name] || Icons.HelpCircle;
  return <Icon className={className} />;
};

export default function ExpertisePage() {
  const { domainId } = useParams<{ domainId: string }>();
  const navigate = useNavigate();

  // Detail View
  if (domainId) {
    const domain = EXPERTISE_DATA.find((d) => d.id === domainId);
    if (!domain) return <div className="p-10 text-center">Domain Not Found</div>;

    return (
      <div className="container py-10 fade-in-section animate-fade-in">
        <Button variant="ghost" onClick={() => navigate("/expertise")} className="mb-6 pl-0 hover:pl-2 transition-all">
          ← Back to Overview
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Sidebar Info */}
          <div className="col-span-1 space-y-6">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
               <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                 <IconRenderer name={domain.iconName} className="h-6 w-6" />
               </div>
               <h1 className="text-2xl font-bold font-display">{domain.title}</h1>
               <p className="mt-2 text-muted-foreground">{domain.description}</p>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="col-span-2 grid gap-4 sm:grid-cols-2">
            {domain.skills.map((skill) => (
              <div 
                key={skill.name} 
                className="group relative overflow-hidden rounded-lg border bg-card p-4 transition-all hover:shadow-md hover:border-primary/50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{skill.name}</h3>
                    <span className="text-xs text-muted-foreground rounded-full bg-secondary/10 px-2 py-0.5 mt-2 inline-block">
                      {skill.category}
                    </span>
                  </div>
                  {skill.featured && (
                    <Icons.Star className="h-4 w-4 text-amber-500 fill-amber-500 opacity-50" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="container py-10 animate-fade-in">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-display">Technical Expertise</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Comprehensive breakdown of skills across critical IT domains.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {EXPERTISE_DATA.map((domain) => (
          <div 
            key={domain.id}
            onClick={() => navigate(`/expertise/${domain.id}`)} 
            className="group cursor-pointer rounded-xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary/50"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <IconRenderer name={domain.iconName} className="h-5 w-5" />
            </div>
            <h2 className="mb-2 text-xl font-bold font-display">{domain.title}</h2>
            <p className="text-sm text-muted-foreground">{domain.description}</p>
            
            <div className="mt-4 flex gap-2 flex-wrap">
               {domain.skills.slice(0, 3).map(s => (
                 <span key={s.name} className="text-[10px] bg-secondary/20 px-2 py-1 rounded text-secondary-foreground">
                   {s.name}
                 </span>
               ))}
               {domain.skills.length > 3 && (
                 <span className="text-[10px] text-muted-foreground py-1">+ {domain.skills.length - 3}</span>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
