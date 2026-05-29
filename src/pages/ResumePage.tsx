import { Button } from "@/shared/ui/Button";
import { Printer, ChevronLeft, Mail, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RESUME_CONTENT } from "@/entities/user/data/resume";

export default function ResumePage() {
  const navigate = useNavigate();
  const data = RESUME_CONTENT;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 container max-w-5xl animate-fade-in relative selection:bg-primary/30 px-4 md:px-8">
        
        {/* Controls - Hidden on Print */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 print:hidden">
            <Button 
                variant="ghost" 
                className="gap-2 pl-0 hover:pl-2 transition-all text-muted-foreground"
                onClick={() => navigate("/")}
            >
                <ChevronLeft className="w-4 h-4" /> Voltar ao Portfólio
            </Button>

            <div className="flex flex-wrap gap-3">
                <Button 
                    className="gap-2 shadow-xl shadow-primary/20"
                    onClick={handlePrint}
                >
                    <Printer className="w-4 h-4" /> Salvar como PDF
                </Button>
            </div>
        </div>

        {/* CV Container - Paper A4 Ratio-ish */}
        <div className="bg-card w-full rounded-[2px] shadow-2xl border border-white/10 overflow-hidden relative print:bg-white print:text-black print:border-none print:shadow-none print:m-0 print:block">
            <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-primary via-blue-500 to-purple-600 print:h-1" />

            {/* Header / Personal Info */}
            <div className="p-6 md:p-16 border-b border-white/5 bg-background/50 print:bg-white print:p-10 print:pt-14">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="flex-1">
                        <h1 className="text-3xl md:text-5xl font-bold font-display text-primary mb-2 tracking-tight print:text-black leading-tight">
                            {data.personal.name}
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground font-light print:text-gray-700">
                             {data.personal.role}
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 text-sm text-muted-foreground print:text-gray-800">
                        <span className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-primary print:text-black" /> 
                            {data.personal.email}
                        </span>
                        <span className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-primary print:text-black" /> 
                            {data.personal.phone}
                        </span>
                        <span className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-primary print:text-black" /> 
                            {data.personal.location}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-[2fr_1fr] print:flex print:flex-row">
                {/* Main Content (Left) */}
                <div className="p-6 md:p-16 space-y-12 border-r border-white/5 print:p-10 print:border-r print:border-gray-200 print:w-2/3">
                    
                    {/* Summary */}
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2 print:text-black print:text-base">
                            <span className="w-8 h-[2px] bg-primary print:bg-black"></span> Perfil Profissional
                        </h2>
                        <div className="text-muted-foreground leading-relaxed text-justify print:text-black print:text-[14px] print:leading-6">
                          {data.summary}
                        </div>
                    </section>

                    {/* Experience */}
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2 print:text-black print:text-base">
                            <span className="w-8 h-[2px] bg-primary print:bg-black"></span> Experiência Profissional
                        </h2>

                        <div className="space-y-10">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="relative pl-8 border-l border-white/10 print:border-gray-300 before:absolute before:left-[-5px] before:top-0 before:w-2.5 before:h-2.5 before:rounded-full before:bg-primary print:before:bg-black">
                                    <h3 className="text-xl font-bold text-foreground print:text-black print:text-lg">
                                        {exp.role}
                                    </h3>
                                    <p className="text-primary/80 font-medium mb-1 print:text-black print:text-sm">
                                        {exp.company} • {exp.period}
                                    </p>
                                    <p className="text-xs text-muted-foreground/60 mb-4 font-mono print:text-gray-500">
                                        {exp.location}
                                    </p>
                                    <ul className="list-disc space-y-2 text-muted-foreground text-sm marker:text-primary/50 print:text-black print:text-[13px] print:marker:text-black">
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
                <div className="bg-white/[0.02] p-6 md:p-12 space-y-12 print:bg-white print:p-10 print:w-1/3">
                   
                   {/* Hard Skills */}
                   <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-6 print:text-black border-b border-white/5 print:border-gray-300 pb-2">Habilidades</h2>
                        <div className="space-y-6">
                            {data.skills.map((cat, i) => (
                                <div key={i}>
                                    <h3 className="text-primary text-[10px] font-bold mb-3 uppercase print:text-black">{cat.category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.items.map((s, j) => (
                                            <span key={j} className="bg-white/5 px-2 py-1 rounded text-[10px] text-muted-foreground border border-white/5 print:bg-gray-100 print:text-black print:border-gray-300">
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
                        <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-6 print:text-black border-b border-white/5 print:border-gray-300 pb-2">Formação</h2>
                        <div className="space-y-5">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h4 className="font-bold text-white text-sm print:text-black">
                                        {edu.degree}
                                    </h4>
                                    <p className="text-xs text-muted-foreground print:text-gray-600">
                                        {edu.institution} • {edu.period}
                                    </p>
                                    {edu.status && (
                                        <div className="mt-1">
                                            <span className="text-[10px] uppercase bg-green-500/10 text-green-500 px-2 py-0.5 rounded print:border print:border-green-500">
                                                {edu.status}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                   </section>

                   {/* Languages */}
                   <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-6 print:text-black border-b border-white/5 print:border-gray-300 pb-2">Idiomas</h2>
                        <ul className="space-y-3 text-[13px] text-muted-foreground print:text-black">
                            {data.languages.map((l, i) => (
                                <li key={i} className="flex justify-between items-center group">
                                    {l.name}
                                    <span className="text-white print:text-black font-semibold bg-white/5 px-1.5 rounded">
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
            @page { margin: 0; size: A4; }
          }
        `}} />
    </div>
  );
}
