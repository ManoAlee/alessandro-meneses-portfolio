import { Button } from "@/shared/ui/Button";
import { useNavigate } from "react-router-dom";

export function CTASection() {
  const navigate = useNavigate();
  return (
    <section className="container py-24">
      <div className="relative p-[1px] rounded-3xl overflow-hidden group">
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-blue-500/50 to-primary/50 opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-gradient-xy" />
        
        <div className="relative rounded-3xl bg-card/50 backdrop-blur-sm px-6 py-20 md:px-12 text-center flex flex-col items-center justify-center gap-8 border border-white/5 shadow-2xl">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-4xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Pronto para elevar sua infraestrutura?
            </h2>
            <p className="text-xl text-muted-foreground">
              Vamos discutir como otimizar seus processos, reduzir custos de nuvem e garantir a segurança dos seus dados.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="px-8 h-12 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105" onClick={() => navigate("/contact")}>
              Iniciar Conversa
            </Button>
            <Button size="lg" variant="outline" className="px-8 h-12 text-lg border-primary/20 hover:bg-primary/5" onClick={() => navigate("/resume")}>
              Currículo PDF
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
