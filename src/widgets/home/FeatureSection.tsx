export function FeatureSection() {
  return (
    <section className="container py-20 border-t">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="group rounded-2xl border bg-card/50 backdrop-blur-sm p-8 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
          </div>
          <h3 className="text-xl font-bold font-display mb-3">Infraestrutura Híbrida</h3>
          <p className="text-muted-foreground leading-relaxed">
            Gerenciamento especializado de ambientes virtualizados com <strong>Proxmox, Hyper-V e VMware</strong>. 
            Migração segura de servidores e administração de Active Directory e redes corporativas (VPN/TCP-IP).
          </p>
        </div>
        
        <div className="group rounded-2xl border bg-card/50 backdrop-blur-sm p-8 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h3 className="text-xl font-bold font-display mb-3">Segurança de Dados</h3>
          <p className="text-muted-foreground leading-relaxed">
            Estratégias de backup imutável automatizadas com <strong>Restic e Rclone</strong>. 
            Criptografia AES-256 para proteção contra ransomware e auditoria de conformidade (ISO/LGPD).
          </p>
        </div>

        <div className="group rounded-2xl border bg-card/50 backdrop-blur-sm p-8 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <h3 className="text-xl font-bold font-display mb-3">Automação & Scripting</h3>
          <p className="text-muted-foreground leading-relaxed">
             Eliminação de tarefas repetitivas através de scripts avançados em <strong>PowerShell, Bash e Python</strong>.
             Criação de ferramentas CLI para onboarding de usuários e gestão de infraestrutura.
          </p>
        </div>
      </div>
    </section>
  );
}
