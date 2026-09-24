import { Button } from "@/shared/ui/Button";
import { Printer, ChevronLeft, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RESUME_CONTENT } from "@/entities/user/data/resume";

export default function ResumePage() {
  const navigate = useNavigate();
  const data = RESUME_CONTENT;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pt-12 pb-20 container max-w-5xl animate-fade-in relative selection:bg-primary/20 selection:text-primary px-4 md:px-8">
        
        {/* Controls - Hidden on Print */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 print:hidden">
            <Button 
                variant="ghost" 
                className="gap-2 pl-0 hover:pl-2 transition-all text-muted-foreground hover:text-foreground"
                onClick={() => navigate("/")}
            >
                <ChevronLeft className="w-4 h-4" /> Voltar ao Início
            </Button>

            <div className="flex flex-wrap gap-3">
                <Button 
                    className="gap-2 rounded-full px-6 shadow-md shadow-primary/20"
                    onClick={handlePrint}
                >
                    <Printer className="w-4 h-4" /> Imprimir / Salvar PDF
                </Button>
            </div>
        </div>

        {/* CV Container */}
        <div className="bg-card w-full rounded-2xl shadow-xl border border-border/60 overflow-hidden relative print:bg-white print:text-black print:border-none print:shadow-none print:m-0 print:block">
            <div className="w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-indigo-600 print:hidden" />

            {/* Header / Personal Info */}
            <div className="p-6 md:p-12 border-b border-border/40 bg-muted/20 print:bg-white print:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-card border border-border/60 p-2 flex items-center justify-center shrink-0 print:border-gray-300">
                        <img 
                          src="/logo-dark.png" 
                          alt="Alessandro Meneses Logo" 
                          className="w-10 h-10 hidden dark:block object-contain print:hidden"
                        />
                        <img 
                          src="/logo-light.png" 
                          alt="Alessandro Meneses Logo" 
                          className="w-10 h-10 block dark:hidden object-contain print:block"
                        />
                      </div>
                      <div className="space-y-1">
                        <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground tracking-tight print:text-black leading-tight">
                            {data.personal.name}
                        </h1>
                        <p className="text-lg md:text-xl text-primary font-medium print:text-gray-700">
                             {data.personal.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-xs sm:text-sm text-muted-foreground print:text-gray-800">
                        <span className="flex items-center gap-2.5">
                            <Mail className="w-4 h-4 text-primary print:text-black" /> 
                            {data.personal.email}
                        </span>
                        <span className="flex items-center gap-2.5">
                            <Phone className="w-4 h-4 text-primary print:text-black" /> 
                            {data.personal.phone}
                        </span>
                        <span className="flex items-center gap-2.5">
                            <MapPin className="w-4 h-4 text-primary print:text-black" /> 
                            {data.personal.location}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-[2fr_1fr] print:flex print:flex-row">
                {/* Main Content (Left) */}
                <div className="p-6 md:p-12 space-y-10 border-r-0 md:border-r border-border/40 print:p-8 print:border-r print:border-gray-200 print:w-2/3">
                    
                    {/* Summary */}
                    <section className="space-y-3">
                        <h2 className="text-xs font-mono uppercase tracking-widest text-primary font-bold flex items-center gap-2 print:text-black">
                            <span className="w-6 h-[2px] bg-primary print:bg-black"></span> Resumo Profissional
                        </h2>
                        <div className="text-sm text-muted-foreground leading-relaxed print:text-black print:text-[13px] print:leading-5">
                          {data.summary}
                        </div>
                    </section>

                    {/* Experience */}
                    <section className="space-y-6">
                        <h2 className="text-xs font-mono uppercase tracking-widest text-primary font-bold flex items-center gap-2 print:text-black">
                            <span className="w-6 h-[2px] bg-primary print:bg-black"></span> Experiência Profissional
                        </h2>

                        <div className="space-y-8">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="relative pl-6 border-l border-border/60 print:border-gray-300 before:absolute before:left-[-4px] before:top-1.5 before:w-2 before:h-2 before:rounded-full before:bg-primary print:before:bg-black">
                                    <h3 className="text-base font-bold text-foreground print:text-black">
                                        {exp.role}
                                    </h3>
                                    <p className="text-primary font-medium text-xs sm:text-sm mb-1 print:text-black">
                                        {exp.company} • {exp.period}
                                    </p>
                                    <p className="text-xs text-muted-foreground/80 mb-3 font-mono print:text-gray-500">
                                        {exp.location}
                                    </p>
                                    <ul className="list-disc space-y-1.5 text-muted-foreground text-xs sm:text-sm pl-4 marker:text-primary print:text-black print:text-[12px] print:marker:text-black">
                                        {exp.highlights.map((h, j) => (
                                            <li key={j}>
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar (Right) */}
                <div className="bg-muted/10 p-6 md:p-10 space-y-10 print:bg-white print:p-8 print:w-1/3">
                   
                   {/* Hard Skills */}
                   <section>
                        <h2 className="text-xs font-mono uppercase tracking-widest text-foreground font-bold mb-4 print:text-black border-b border-border/40 pb-2">
                          Competências
                        </h2>
                        <div className="space-y-5">
                            {data.skills.map((cat, i) => (
                                <div key={i} className="space-y-2">
                                    <h3 className="text-primary text-[11px] font-bold uppercase tracking-wider print:text-black">
                                      {cat.category}
                                    </h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {cat.items.map((s, j) => (
                                            <span key={j} className="bg-secondary/60 px-2.5 py-1 rounded text-[11px] font-medium text-foreground border border-border/40 print:bg-gray-100 print:text-black">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                   </section>

                   {/* Education */}
                   <section>
                        <h2 className="text-xs font-mono uppercase tracking-widest text-foreground font-bold mb-4 print:text-black border-b border-border/40 pb-2">
                          Formação Acadêmica
                        </h2>
                        <div className="space-y-4">
                            {data.education.map((edu, i) => (
                                <div key={i} className="space-y-1">
                                    <h4 className="font-semibold text-foreground text-xs sm:text-sm print:text-black">
                                        {edu.degree}
                                    </h4>
                                    <p className="text-xs text-muted-foreground print:text-gray-600">
                                        {edu.institution} • {edu.period}
                                    </p>
                                    {edu.status && (
                                        <span className="inline-block text-[10px] uppercase font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                                            {edu.status}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                   </section>

                   {/* Languages */}
                   <section>
                        <h2 className="text-xs font-mono uppercase tracking-widest text-foreground font-bold mb-4 print:text-black border-b border-border/40 pb-2">
                          Idiomas
                        </h2>
                        <ul className="space-y-2 text-xs text-muted-foreground print:text-black">
                            {data.languages.map((l, i) => (
                                <li key={i} className="flex justify-between items-center py-1">
                                    <span className="font-medium text-foreground">{l.name}</span>
                                    <span className="text-muted-foreground text-[11px] bg-secondary/80 px-2 py-0.5 rounded">
                                        {l.level}
                                    </span>
                                </li>
                            ))}
                        </ul>
                   </section>
                </div>
            </div>
        </div>

        {/* Global Print Styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body { 
                background: white !important; 
                -webkit-print-color-adjust: exact !important; 
                print-color-adjust: exact !important;
            }
            .container { 
                max-width: 100% !important; 
                padding: 0 !important; 
                margin: 0 !important; 
                width: 100% !important; 
            }
            main { padding-top: 0 !important; }
            nav, footer, .MagneticCursor, .GooeyNavBar, button, .print\\:hidden { display: none !important; }
            .bg-card { background: white !important; }
            .border { border: 1px solid #e5e7eb !important; }
            .text-muted-foreground { color: #4b5563 !important; }
            .text-primary { color: #000000 !important; }
            .bg-background\\/50 { background: white !important; }
            @page { margin: 1cm; size: A4; }
          }
        `}} />
    </div>
  );
}
