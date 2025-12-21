import { Button } from "@/shared/ui/Button";
import { Printer, ChevronLeft, Mail, Phone, MapPin, Linkedin, Github, Wand2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RESUME_CONTENT } from "@/entities/user/data/resume";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";

export default function ResumePage() {
  const navigate = useNavigate();
  const [data, setData] = useState(RESUME_CONTENT);
  const [isEditMode, setIsEditMode] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  // Helper for inline editing
  const updateField = (path: string, value: any) => {
    const newData = { ...data };
    let current: any = newData;
    const parts = path.split(".");
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
    setData(newData);
  };

  const EditableSpan = ({ path, className, value }: { path: string, className?: string, value: string }) => (
    <span 
      contentEditable={isEditMode}
      suppressContentEditableWarning
      onBlur={(e) => updateField(path, e.currentTarget.textContent)}
      className={cn(
        className,
        isEditMode && "border-b border-primary/30 bg-primary/5 outline-none focus:bg-primary/10 transition-colors px-1 rounded-sm cursor-text"
      )}
    >
      {value}
    </span>
  );

  return (
    <div className="min-h-screen pt-32 pb-20 container max-w-5xl animate-fade-in relative selection:bg-primary/30">
        
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
                    variant="outline" 
                    size="sm"
                    className={cn(
                        "gap-2 transition-all",
                        isEditMode ? "bg-primary border-primary text-primary-foreground" : "border-white/10"
                    )}
                    onClick={() => setIsEditMode(!isEditMode)}
                >
                    {isEditMode ? "✔️ Finalizar Edição" : "📝 Editar Campos"}
                </Button>
                
                <Button 
                    variant="outline" 
                    size="sm"
                    className="border-primary/30 text-primary hover:bg-primary/10 gap-2"
                    onClick={() => alert("Simulando análise de LinkedIn... Conectando API... (Feature em desenvolvimento)")}
                >
                    <Wand2 className="w-3.5 h-3.5" /> IA LinkedIn
                </Button>

                <Button 
                    className="gap-2 shadow-xl shadow-primary/20"
                    onClick={handlePrint}
                >
                    <Printer className="w-4 h-4" /> Salvar como PDF
                </Button>
            </div>
        </div>

        {isEditMode && (
             <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary flex items-center gap-2 print:hidden">
                <Sparkles className="w-4 h-4" /> 
                <strong>Modo Edição Ativo:</strong> Clique diretamente nos textos do currículo para alterar o conteúdo. Use "Salvar como PDF" quando terminar.
             </div>
        )}

        {/* CV Container - Paper A4 Ratio-ish */}
        <div className="bg-card w-full rounded-[2px] shadow-2xl border border-white/10 overflow-hidden relative print:bg-white print:text-black print:border-none print:shadow-none print:m-0 print:block">
            <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-primary via-blue-500 to-purple-600 print:h-1" />

            {/* Header / Personal Info */}
            <div className="p-12 md:p-16 border-b border-white/5 bg-background/50 print:bg-white print:p-10 print:pt-14">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="flex-1">
                        <h1 className="text-4xl md:text-5xl font-bold font-display text-primary mb-2 tracking-tight print:text-black">
                            <EditableSpan path="personal.name" value={data.personal.name} />
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground font-light print:text-gray-700">
                             <EditableSpan path="personal.role" value={data.personal.role} />
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 text-sm text-muted-foreground print:text-gray-800">
                        <span className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-primary print:text-black" /> 
                            <EditableSpan path="personal.email" value={data.personal.email} />
                        </span>
                        <span className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-primary print:text-black" /> 
                            <EditableSpan path="personal.phone" value={data.personal.phone} />
                        </span>
                        <span className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-primary print:text-black" /> 
                            <EditableSpan path="personal.location" value={data.personal.location} />
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-[2fr_1fr] print:flex print:flex-row">
                {/* Main Content (Left) */}
                <div className="p-12 md:p-16 space-y-12 border-r border-white/5 print:p-10 print:border-r print:border-gray-200 print:w-2/3">
                    
                    {/* Summary */}
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2 print:text-black print:text-base">
                            <span className="w-8 h-[2px] bg-primary print:bg-black"></span> Perfil Profissional
                        </h2>
                        <div 
                          contentEditable={isEditMode}
                          suppressContentEditableWarning
                          onBlur={(e) => updateField("summary", e.currentTarget.textContent)}
                          className={cn(
                            "text-muted-foreground leading-relaxed text-justify print:text-black print:text-[14px] print:leading-6",
                            isEditMode && "p-2 border border-primary/20 bg-primary/5 rounded"
                          )}
                        >
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
                                        <EditableSpan path={`experience.${i}.role`} value={exp.role} />
                                    </h3>
                                    <p className="text-primary/80 font-medium mb-1 print:text-black print:text-sm">
                                        <EditableSpan path={`experience.${i}.company`} value={exp.company} /> • <EditableSpan path={`experience.${i}.period`} value={exp.period} />
                                    </p>
                                    <p className="text-xs text-muted-foreground/60 mb-4 font-mono print:text-gray-500">
                                        <EditableSpan path={`experience.${i}.location`} value={exp.location} />
                                    </p>
                                    <ul className="list-disc space-y-2 text-muted-foreground text-sm marker:text-primary/50 print:text-black print:text-[13px] print:marker:text-black">
                                        {exp.highlights.map((h, j) => (
                                            <li key={j}>
                                                <EditableSpan path={`experience.${i}.highlights.${j}`} value={h} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar (Right) */}
                <div className="bg-white/[0.02] p-12 md:p-12 space-y-12 print:bg-white print:p-10 print:w-1/3">
                   
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
                                               <EditableSpan path={`skills.${i}.items.${j}`} value={s} />
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
                                       <EditableSpan path={`education.${i}.degree`} value={edu.degree} />
                                   </h4>
                                   <p className="text-xs text-muted-foreground print:text-gray-600">
                                       <EditableSpan path={`education.${i}.institution`} value={edu.institution} /> • <EditableSpan path={`education.${i}.period`} value={edu.period} />
                                   </p>
                                   {edu.status && (
                                       <div className="mt-1">
                                           <span className="text-[10px] uppercase bg-green-500/10 text-green-500 px-2 py-0.5 rounded print:border print:border-green-500">
                                               <EditableSpan path={`education.${i}.status`} value={edu.status} />
                                           </span>
                                       </div>
                                   )}
                               </div>
                           ))}
                       </div>
                   </section>

                   <section>
                       <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-6 print:text-black border-b border-white/5 print:border-gray-300 pb-2">Idiomas</h2>
                       <ul className="space-y-3 text-[13px] text-muted-foreground print:text-black">
                           {data.languages.map((l, i) => (
                               <li key={i} className="flex justify-between items-center group">
                                   <EditableSpan path={`languages.${i}.name`} value={l.name} />
                                   <span className="text-white print:text-black font-semibold bg-white/5 px-1.5 rounded">
                                       <EditableSpan path={`languages.${i}.level`} value={l.level} />
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


