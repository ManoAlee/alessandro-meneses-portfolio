import { userData } from "../data/user";
import { GraduationCap, Award } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-20 bg-[#0b0f19]">
      <div className="container mx-auto px-4">
        
        <div className="grid md:grid-cols-2 gap-12">
            
            {/* Education Column */}
            <div>
                <div className="flex items-center gap-3 mb-8">
                    <GraduationCap className="text-primary" size={32} />
                    <h2 className="text-3xl font-bold text-white">Formação Acadêmica</h2>
                </div>
                <div className="space-y-6">
                    {userData.education.map((edu, index) => (
                        <div key={index} className="p-6 bg-slate-900/50 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                            <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                            <p className="text-primary mb-2">{edu.institution}</p>
                            <div className="flex justify-between items-center text-sm text-slate-500">
                                <span>{edu.period}</span>
                                {edu.status && <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">{edu.status}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Certifications Column */}
            <div>
                <div className="flex items-center gap-3 mb-8">
                    <Award className="text-purple-400" size={32} />
                    <h2 className="text-3xl font-bold text-white">Certificações</h2>
                </div>
                <div className="space-y-4">
                    {userData.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-lg hover:bg-slate-800/50 transition-colors">
                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                            <span className="text-slate-300 font-medium">{cert}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}
