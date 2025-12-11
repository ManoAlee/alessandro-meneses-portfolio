import { useRef, useState } from "react";
import { userData } from "../data/user";
import { Mail, Linkedin, Github, MapPin, Printer, ArrowLeft, Edit2, Check, RefreshCw, Plus, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Resume() {
  const componentRef = useRef(null);
  const [data, setData] = useState(JSON.parse(JSON.stringify(userData))); // Deep copy for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editSection, setEditSection] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm("Reset to original identity protocols?")) {
        setData(JSON.parse(JSON.stringify(userData)));
    }
  };

  const updateProfile = (field: string, value: string) => {
    setData((prev: any) => ({
        ...prev,
        profile: { ...prev.profile, [field]: value }
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans print:bg-white print:text-black flex flex-col md:flex-row">
      
      {/* EDITOR SIDEBAR (No-Print) */}
      <AnimatePresence>
        {isEditing && (
            <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                className="print:hidden w-full md:w-96 bg-[#0a0f18] text-slate-300 border-r border-primary/20 h-screen sticky top-0 overflow-y-auto custom-scrollbar z-40 shadow-2xl"
            >
                <div className="p-6 border-b border-primary/10 flex justify-between items-center sticky top-0 bg-[#0a0f18]/95 backdrop-blur z-10">
                    <h2 className="text-primary font-bold font-mono tracking-wider flex items-center gap-2">
                        <Edit2 size={16} /> IDENTITY_EDITOR
                    </h2>
                    <button onClick={() => setIsEditing(false)} className="text-slate-500 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Profile Section */}
                    <section>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Core Profile</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] uppercase text-primary/70">Full Name</label>
                                <input 
                                    value={data.profile.name}
                                    onChange={(e) => updateProfile("name", e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-primary outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase text-primary/70">Current Role</label>
                                <input 
                                    value={data.profile.role}
                                    onChange={(e) => updateProfile("role", e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-primary outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase text-primary/70">Professional Summary</label>
                                <textarea 
                                    value={data.profile.bio}
                                    onChange={(e) => updateProfile("bio", e.target.value)}
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-primary outline-none transition-colors resize-none"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section>
                         <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Comms Channels</h3>
                         <div className="space-y-4">
                            <input 
                                value={data.profile.email} 
                                onChange={(e) => updateProfile("email", e.target.value)}
                                placeholder="Email"
                                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:border-primary outline-none"
                            />
                             <input 
                                value={data.profile.location} 
                                onChange={(e) => updateProfile("location", e.target.value)}
                                placeholder="Location"
                                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:border-primary outline-none"
                            />
                         </div>
                    </section>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      
      {/* MAIN PREVIEW AREA */}
      <div className="flex-1 relative">
        {/* Top Controls */}
        <div className="print:hidden sticky top-0 left-0 w-full bg-[#0a0f18]/90 backdrop-blur text-white p-4 z-30 flex flex-wrap gap-4 justify-between items-center shadow-lg border-b border-primary/20">
            <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">EXIT_SYSTEM</span>
            </Link>

            <div className="flex items-center gap-3">
                {!isEditing ? (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 text-primary border border-primary/20 rounded-full hover:bg-primary/10 transition-all text-xs font-bold uppercase tracking-wider"
                    >
                        <Edit2 size={14} />
                        Override_Identity
                    </button>
                ) : (
                    <button 
                        onClick={handleReset}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full hover:bg-red-500/20 transition-all text-xs font-bold uppercase tracking-wider"
                    >
                        <RefreshCw size={14} />
                        Reset_Data
                    </button>
                )}

                <button 
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-2 bg-primary text-black font-bold rounded-full hover:bg-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] text-xs uppercase tracking-wider"
                >
                    <Printer size={16} />
                    <span className="hidden sm:inline">System_Print</span>
                    <span className="sm:hidden">Print</span>
                </button>
            </div>
        </div>

        {/* Paper Container */}
        <div className="flex justify-center p-4 md:p-12 print:p-0">
             <div 
                ref={componentRef}
                className="w-full max-w-[210mm] bg-white shadow-2xl print:shadow-none min-h-[297mm] p-8 md:p-16 print:p-0 relative text-slate-900"
            >
                {/* Header */}
                <header className="border-b-2 border-slate-900 pb-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 break-inside-avoid">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-2 text-slate-900">{data.profile.name || "YOUR NAME"}</h1>
                        <p className="text-xl text-slate-600 font-medium">{data.profile.role || "Your Role"}</p>
                    </div>
                    <div className="text-sm text-slate-600 space-y-1 text-right">
                        <div className="flex items-center justify-end gap-2">
                            {data.profile.location} <MapPin size={14} />
                        </div>
                        <div className="flex items-center justify-end gap-2">
                             {data.profile.email} <Mail size={14} />
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <span className="text-slate-400">linkedin.com/in/</span>... <Linkedin size={14} />
                        </div>
                    </div>
                </header>

                {/* 2-Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 print:grid-cols-[2fr_1fr]">
                    
                    {/* Main Column */}
                    <div className="space-y-8">
                        {/* Summary */}
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-3 text-slate-800">Resumo Profissional</h2>
                            <p className="text-slate-700 leading-relaxed text-sm text-justify whitespace-pre-wrap">
                                {data.profile.bio}
                            </p>
                        </section>

                        {/* Experience */}
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-4 text-slate-800">Experiência Profissional</h2>
                            <div className="space-y-6">
                                {data.experience.map((job: any, index: number) => (
                                    <div key={index} className="break-inside-avoid">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-base text-slate-900">{job.role}</h3>
                                            <span className="text-xs font-mono text-slate-500 whitespace-nowrap">{job.period}</span>
                                        </div>
                                        <div className="text-sm font-semibold text-slate-700 mb-2">{job.company}</div>
                                        <p className="text-sm text-slate-600 leading-relaxed text-justify mb-2 whitespace-pre-wrap">
                                            {job.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            {job.tags && job.tags.slice(0, 4).map((tag: string, i: number) => (
                                                <span key={i} className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Projects (Static for now in Builder Mode to save space, or could be editable) */}
                        <section className="print:break-inside-avoid">
                            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-4 text-slate-800">Principais Projetos</h2>
                            <div className="space-y-4">
                                {data.projects.slice(0, 3).map((project: any, index: number) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold text-sm text-slate-900">{project.title}</h3>
                                            <span className="text-[10px] uppercase text-slate-500">{project.type}</span>
                                        </div>
                                        <p className="text-xs text-slate-600 mt-1">
                                            <span className="font-semibold text-slate-800">Impacto:</span> {project.impact}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-8">
                        {/* Education */}
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-4 text-slate-800">Educação</h2>
                            <div className="space-y-4">
                                {data.education.map((edu: any, index: number) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-sm text-slate-900">{edu.degree}</h3>
                                        <div className="text-xs text-slate-600">{edu.institution}</div>
                                        <div className="text-[10px] text-slate-500 mt-0.5">{edu.period}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Skills */}
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-4 text-slate-800">Competências</h2>
                            
                            <div className="mb-4">
                                <h3 className="text-xs font-bold uppercase text-slate-500 mb-2">Infraestrutura</h3>
                                <div className="flex flex-wrap gap-1">
                                    {data.skills.infrastructure.map((skill: string, i: number) => (
                                        <span key={i} className="text-[10px] px-2 py-1 bg-slate-900 text-white rounded-sm print:border print:border-slate-800 print:text-black print:bg-transparent">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-xs font-bold uppercase text-slate-500 mb-2">Automação</h3>
                                <div className="flex flex-wrap gap-1">
                                    {data.skills.automation.map((skill: string, i: number) => (
                                        <span key={i} className="text-[10px] px-2 py-1 bg-slate-200 text-slate-800 rounded-sm print:border print:border-slate-300 print:bg-transparent">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                
                {/* Footer */}
                <div className="absolute bottom-12 left-0 w-full text-center text-[10px] text-slate-400 print:bottom-0 print:text-black">
                    Gerado via Sistema Operacional de {userData.profile.name} • {new Date().getFullYear()}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
