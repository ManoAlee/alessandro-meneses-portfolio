import { useRef, useState } from "react";
import { userData } from "../data/user";
import {
    Mail, Linkedin, MapPin, Printer, ArrowLeft, Edit2,
    RefreshCw, Plus, Trash2, X, Save, ChevronDown, ChevronUp, Briefcase, GraduationCap, Code
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
type ResumeData = typeof userData;

// --- Components ---

const SectionHeader = ({ title, icon: Icon }: { title: string, icon?: any }) => (
    <div className="flex items-center gap-2 border-b-2 border-slate-800 pb-1 mb-4 print:mb-2 break-inside-avoid">
        {Icon && <Icon size={18} className="text-slate-600 print:hidden" />}
        <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800">{title}</h2>
    </div>
);

const EditorSection = ({ title, isOpen, onToggle, children }: { title: string, isOpen: boolean, onToggle: () => void, children: React.ReactNode }) => (
    <div className="border border-white/10 rounded-lg bg-white/5 overflow-hidden transition-colors hover:border-white/20">
        <button
            onClick={onToggle}
            className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-300 hover:bg-white/5 active:bg-white/10 transition-colors"
        >
            <span>{title}</span>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                >
                    <div className="p-4 pt-0 border-t border-white/10 space-y-4">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export default function Resume() {
    const componentRef = useRef(null);
    const [data, setData] = useState<ResumeData>(JSON.parse(JSON.stringify(userData)));
    const [isEditing, setIsEditing] = useState(false);
    const [openSection, setOpenSection] = useState<string | null>("profile");

    const handlePrint = () => window.print();

    const handleReset = () => {
        if (confirm("Reset to original identity protocols? Unsaved changes will be lost.")) {
            setData(JSON.parse(JSON.stringify(userData)));
        }
    };

    const toggleSection = (section: string) => setOpenSection(openSection === section ? null : section);

    // --- Updaters ---
    const updateProfile = (field: keyof typeof userData.profile, value: string) => {
        setData(prev => ({ ...prev, profile: { ...prev.profile, [field]: value } }));
    };

    const updateListItem = (section: 'experience' | 'education' | 'projects', index: number, field: string, value: string) => {
        const newList = [...data[section]];
        (newList[index] as any)[field] = value;
        setData(prev => ({ ...prev, [section]: newList }));
    };

    const addListItem = (section: 'experience' | 'education' | 'projects') => {
        const emptyItem: any = section === 'experience' ? { company: "New Company", role: "Role", period: "2024", description: "Description", tags: [] }
            : section === 'education' ? { institution: "Institution", degree: "Degree", period: "2024" }
                : { title: "New Project", description: "Description", impact: "Impact", type: "Type", tech: [] };

        setData(prev => ({ ...prev, [section]: [emptyItem, ...prev[section]] }));
        setOpenSection(section);
    };

    const removeListItem = (section: 'experience' | 'education' | 'projects', index: number) => {
        if (confirm("Remove this item?")) {
            const newList = [...data[section]];
            newList.splice(index, 1);
            setData(prev => ({ ...prev, [section]: newList }));
        }
    };

    const updateSkill = (category: 'infrastructure' | 'automation', value: string) => {
        // Split by comma for simple editing
        const skills = value.split(',').map(s => s.trim()).filter(Boolean);
        setData(prev => ({ ...prev, skills: { ...prev.skills, [category]: skills } }));
    };

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900 font-sans print:bg-white print:text-black flex flex-col md:flex-row overflow-clip">

            {/* --- EDITOR SIDEBAR --- */}
            <AnimatePresence>
                {isEditing && (
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        className="print:hidden fixed md:relative w-full md:w-[450px] bg-[#0a0f18] text-slate-300 border-r border-primary/20 h-screen overflow-y-auto custom-scrollbar z-50 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-primary/10 flex justify-between items-center sticky top-0 bg-[#0a0f18]/95 backdrop-blur z-20">
                            <h2 className="text-primary font-bold font-mono tracking-wider flex items-center gap-2">
                                <Edit2 size={16} /> IDENTITY_EDITOR_V2
                            </h2>
                            <div className="flex gap-2">
                                <button onClick={handleReset} title="Reset Data" className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-red-400 transition-colors">
                                    <RefreshCw size={16} />
                                </button>
                                <button onClick={() => setIsEditing(false)} title="Close" className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="p-4 space-y-4 pb-20">
                            {/* PROFILE */}
                            <EditorSection title="Profile & Contact" isOpen={openSection === "profile"} onToggle={() => toggleSection("profile")}>
                                <div className="space-y-3">
                                    <input value={data.profile.name} onChange={e => updateProfile("name", e.target.value)} placeholder="Full Name" className="editor-input" />
                                    <input value={data.profile.role} onChange={e => updateProfile("role", e.target.value)} placeholder="Current Role" className="editor-input" />
                                    <textarea value={data.profile.bio} onChange={e => updateProfile("bio", e.target.value)} rows={4} placeholder="Professional Summary" className="editor-input resize-none" />
                                    <div className="grid grid-cols-2 gap-2">
                                        <input value={data.profile.email} onChange={e => updateProfile("email", e.target.value)} placeholder="Email" className="editor-input" />
                                        <input value={data.profile.location} onChange={e => updateProfile("location", e.target.value)} placeholder="Location" className="editor-input" />
                                        <input value={data.profile.linkedin} onChange={e => updateProfile("linkedin", e.target.value)} placeholder="LinkedIn URL" className="editor-input col-span-2" />
                                    </div>
                                </div>
                            </EditorSection>

                            {/* EXPERIENCE */}
                            <EditorSection title="Experience" isOpen={openSection === "experience"} onToggle={() => toggleSection("experience")}>
                                <button onClick={() => addListItem('experience')} className="w-full py-2 flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary rounded mb-4 transition-colors text-xs font-bold uppercase">
                                    <Plus size={14} /> Add Role
                                </button>
                                <div className="space-y-6">
                                    {data.experience.map((job, idx) => (
                                        <div key={idx} className="relative pl-4 border-l-2 border-white/10">
                                            <button onClick={() => removeListItem('experience', idx)} className="absolute right-0 top-0 text-slate-600 hover:text-red-400"><Trash2 size={14} /></button>
                                            <div className="space-y-2 pr-6">
                                                <input value={job.role} onChange={e => updateListItem('experience', idx, 'role', e.target.value)} className="editor-input font-bold" placeholder="Role" />
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input value={job.company} onChange={e => updateListItem('experience', idx, 'company', e.target.value)} className="editor-input text-xs" placeholder="Company" />
                                                    <input value={job.period} onChange={e => updateListItem('experience', idx, 'period', e.target.value)} className="editor-input text-xs text-right" placeholder="Period" />
                                                </div>
                                                <textarea value={job.description} onChange={e => updateListItem('experience', idx, 'description', e.target.value)} rows={3} className="editor-input text-xs" placeholder="Description" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </EditorSection>

                            {/* SKILLS */}
                            <EditorSection title="Skills" isOpen={openSection === "skills"} onToggle={() => toggleSection("skills")}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs uppercase text-slate-500 block mb-1">Infrastructure (comma separated)</label>
                                        <textarea
                                            value={data.skills.infrastructure.join(", ")}
                                            onChange={e => updateSkill('infrastructure', e.target.value)}
                                            rows={3}
                                            className="editor-input"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase text-slate-500 block mb-1">Automation (comma separated)</label>
                                        <textarea
                                            value={data.skills.automation.join(", ")}
                                            onChange={e => updateSkill('automation', e.target.value)}
                                            rows={3}
                                            className="editor-input"
                                        />
                                    </div>
                                </div>
                            </EditorSection>

                            {/* PROJECTS */}
                            <EditorSection title="Projects" isOpen={openSection === "projects"} onToggle={() => toggleSection("projects")}>
                                <button onClick={() => addListItem('projects')} className="w-full py-2 flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary rounded mb-4 transition-colors text-xs font-bold uppercase">
                                    <Plus size={14} /> Add Project
                                </button>
                                <div className="space-y-6">
                                    {data.projects.map((proj, idx) => (
                                        <div key={idx} className="relative pl-4 border-l-2 border-white/10">
                                            <button onClick={() => removeListItem('projects', idx)} className="absolute right-0 top-0 text-slate-600 hover:text-red-400"><Trash2 size={14} /></button>
                                            <div className="space-y-2 pr-6">
                                                <input value={proj.title} onChange={e => updateListItem('projects', idx, 'title', e.target.value)} className="editor-input font-bold" placeholder="Title" />
                                                <input value={proj.impact} onChange={e => updateListItem('projects', idx, 'impact', e.target.value)} className="editor-input text-xs" placeholder="Impact" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </EditorSection>

                            {/* EDUCATION */}
                            <EditorSection title="Education" isOpen={openSection === "education"} onToggle={() => toggleSection("education")}>
                                <button onClick={() => addListItem('education')} className="w-full py-2 flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary rounded mb-4 transition-colors text-xs font-bold uppercase">
                                    <Plus size={14} /> Add Education
                                </button>
                                <div className="space-y-4">
                                    {data.education.map((edu, idx) => (
                                        <div key={idx} className="relative pl-4 border-l-2 border-white/10">
                                            <button onClick={() => removeListItem('education', idx)} className="absolute right-0 top-0 text-slate-600 hover:text-red-400"><Trash2 size={14} /></button>
                                            <div className="space-y-2 pr-6">
                                                <input value={edu.degree} onChange={e => updateListItem('education', idx, 'degree', e.target.value)} className="editor-input font-bold" placeholder="Degree" />
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input value={edu.institution} onChange={e => updateListItem('education', idx, 'institution', e.target.value)} className="editor-input text-xs" placeholder="Institution" />
                                                    <input value={edu.period} onChange={e => updateListItem('education', idx, 'period', e.target.value)} className="editor-input text-xs text-right" placeholder="Period" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </EditorSection>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- PREVIEW CONTROLS --- */}
            <div className="print:hidden fixed top-4 right-4 z-40 flex flex-col gap-3">
                <Link to="/" className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform" title="Exit">
                    <ArrowLeft size={20} />
                </Link>

                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all ${isEditing ? 'bg-primary text-black' : 'bg-slate-900 text-primary border border-primary/50'}`}
                    title="Edit Resume"
                >
                    <Edit2 size={20} />
                </button>

                <button
                    onClick={handlePrint}
                    className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    title="Print / Save PDF"
                >
                    <Printer size={20} />
                </button>
            </div>

            {/* --- DOCUMENT PREVIEW --- */}
            <div className="flex-1 overflow-auto p-4 md:p-12 print:p-0 flex justify-center bg-slate-200/50 print:bg-white print:block">
                <div
                    ref={componentRef}
                    className="w-full max-w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl print:shadow-none p-[15mm] md:p-[20mm] print:p-0 relative"
                >
                    {/* Header */}
                    <header className="border-b-2 border-slate-900 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 break-inside-avoid">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-2 text-slate-900">{data.profile.name || "YOUR NAME"}</h1>
                            <p className="text-xl text-slate-600 font-medium">{data.profile.role || "Professional Role"}</p>
                        </div>
                        <div className="text-sm text-slate-600 space-y-1 text-right md:text-right text-left">
                            <div className="flex items-center md:justify-end gap-2">
                                {data.profile.location} <MapPin size={14} className="inline print:hidden" />
                            </div>
                            <div className="flex items-center md:justify-end gap-2">
                                {data.profile.email} <Mail size={14} className="inline print:hidden" />
                            </div>
                            <div className="flex items-center md:justify-end gap-2">
                                <span className="text-slate-400">linkedin.com/in/</span>{data.profile.linkedin.split('/').pop()} <Linkedin size={14} className="inline print:hidden" />
                            </div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 print:grid-cols-[2fr_1fr]">
                        {/* LEFT COLUMN */}
                        <div className="space-y-8">
                            <section>
                                <SectionHeader title="Professional Summary" />
                                <p className="text-sm leading-relaxed text-justify text-slate-700 whitespace-pre-wrap">
                                    {data.profile.bio}
                                </p>
                            </section>

                            <section>
                                <SectionHeader title="Experience" icon={Briefcase} />
                                <div className="space-y-6">
                                    {data.experience.map((job, idx) => (
                                        <div key={idx} className="break-inside-avoid">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-bold text-base text-slate-900">{job.role}</h3>
                                                <span className="text-xs font-mono text-slate-500 whitespace-nowrap">{job.period}</span>
                                            </div>
                                            <div className="text-sm font-semibold text-slate-700 mb-2">{job.company}</div>
                                            <p className="text-xs leading-relaxed text-slate-600 text-justify mb-2 whitespace-pre-wrap">{job.description}</p>
                                            <div className="flex flex-wrap gap-1 print:hidden">
                                                {job.tags?.slice(0, 4).map((tag: string, tIdx: number) => (
                                                    <span key={tIdx} className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="print:break-inside-avoid">
                                <SectionHeader title="Key Projects" icon={Code} />
                                <div className="space-y-4">
                                    {data.projects.slice(0, 4).map((proj, idx) => (
                                        <div key={idx} className="break-inside-avoid">
                                            <div className="flex justify-between items-baseline">
                                                <h3 className="font-bold text-sm text-slate-900">{proj.title}</h3>
                                                <span className="text-[10px] uppercase text-slate-500">{proj.type}</span>
                                            </div>
                                            <p className="text-xs text-slate-600 mt-1">
                                                <span className="font-semibold text-slate-800">Impact:</span> {proj.impact}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="space-y-8">
                            <section>
                                <SectionHeader title="Education" icon={GraduationCap} />
                                <div className="space-y-4">
                                    {data.education.map((edu, idx) => (
                                        <div key={idx} className="break-inside-avoid">
                                            <h3 className="font-bold text-sm text-slate-900">{edu.degree}</h3>
                                            <div className="text-xs text-slate-600">{edu.institution}</div>
                                            <div className="text-[10px] text-slate-500 mt-0.5">{edu.period}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <SectionHeader title="Core Skills" />
                                <div className="mb-4">
                                    <h3 className="text-xs font-bold uppercase text-slate-500 mb-2">Infrastructure</h3>
                                    <div className="flex flex-wrap gap-1">
                                        {data.skills.infrastructure.map((skill: string, i: number) => (
                                            <span key={i} className="text-[11px] px-2 py-1 bg-slate-800 text-white rounded-sm print:border print:border-slate-800 print:text-black print:bg-transparent print:px-0 print:py-0 print:mr-2 print:rounded-none">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-xs font-bold uppercase text-slate-500 mb-2">Automation</h3>
                                    <div className="flex flex-wrap gap-1">
                                        {data.skills.automation.map((skill: string, i: number) => (
                                            <span key={i} className="text-[11px] px-2 py-1 bg-slate-200 text-slate-800 rounded-sm print:border print:border-slate-300 print:bg-transparent print:px-0 print:py-0 print:mr-2 print:rounded-none">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Footer only visible in print or bottom of page */}
                    <div className="mt-12 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400 print:fixed print:bottom-0 print:left-0 print:w-full print:bg-white">
                        System Generated CV • {data.profile.name} • {new Date().getFullYear()}
                    </div>
                </div>
            </div>

            <style>{`
        .editor-input {
            width: 100%;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 4px;
            padding: 8px 12px;
            font-size: 0.875rem;
            color: white;
            outline: none;
            transition: all 0.2s;
        }
        .editor-input:focus {
            border-color: #22d3ee;
            background: rgba(255,255,255,0.1);
        }
        @media print {
            @page { margin: 0; }
            body { background: white; }
            .print\\:hidden { display: none !important; }
            .print\\:block { display: block !important; }
            .print\\:shadow-none { box-shadow: none !important; }
            .print\\:bg-transparent { background: transparent !important; }
            .print\\:text-black { color: black !important; }
            .print\\:border { border-width: 1px !important; }
        }
      `}</style>
        </div>
    );
}
