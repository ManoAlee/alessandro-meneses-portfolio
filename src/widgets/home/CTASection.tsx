import { Button } from "@/shared/ui/Button";
import { useNavigate } from "react-router-dom";
import { Mail, FileText, ArrowRight } from "lucide-react";

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="container py-16 md:py-24">
      <div className="rounded-3xl border border-border/60 bg-gradient-to-b from-card/80 to-muted/20 p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-sm">
        <div className="space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            Vamos Conectar
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-foreground">
            Tem um projeto ou demanda técnica em mente?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Estou disponível para conversar sobre desenvolvimento de aplicações, automações de processos corporativos ou oportunidades na área de TI.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-8">
          <Button 
            size="lg" 
            onClick={() => navigate("/contact")}
            className="rounded-full px-7 gap-2 shadow-md shadow-primary/20 hover:shadow-lg transition-all"
          >
            <Mail className="w-4 h-4" /> Entrar em Contato
          </Button>

          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate("/resume")}
            className="rounded-full px-7 gap-2 border-border hover:bg-secondary/60 transition-all"
          >
            <FileText className="w-4 h-4" /> Acessar Currículo
          </Button>
        </div>
      </div>
    </section>
  );
}
