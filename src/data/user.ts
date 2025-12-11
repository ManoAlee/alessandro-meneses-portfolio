import { Facebook, Github, Linkedin, Mail, MapPin } from "lucide-react";

export const userData = {
  profile: {
    name: "Alessandro Meneses",
    role: "Especialista em Infraestrutura & Automação",
    bio: "Orquestrando infraestruturas resilientes e automatizando fluxos de trabalho críticos para maximizar a eficiência operacional.",
    email: "ale_meneses2004@hotmail.com",
    linkedin: "https://www.linkedin.com/in/alessandro-meneses/",
    github: "https://github.com/ManoAlee",
    location: "São Paulo, SP"
  },
  skills: {
    infrastructure: [
      "Windows Server", "Linux", "Active Directory (AD)", "DNS/DHCP", "VPN", "TCP/IP", "Hyper-V", "VMware", "Proxmox", "Office 365", "Azure AD"
    ],
    automation: [
      "PowerShell", "Bash", "Python", "Restic", "Rclone"
    ],
    support: [
      "Troubleshooting", "Service Desk", "Hardware Maintenance", "Cabling", "Network Administration", "ITIL"
    ],
    data: [
      "SQL", "Power BI", "Excel", "Data Analysis"
    ]
  },
  experience: [
    {
      company: "Automotion",
      role: "Assistente de TI JR",
      period: "Jun 2025 - Presente", 
      description: "Lidero a modernização da infraestrutura on-premise, migrando 100% dos servidores físicos para virtualização Proxmox. Implementei rotinas de backup criptografado (Restic) protegendo 5TB+ de dados críticos. Reduzi o tempo de resolução de chamados em 30% através da automação de scripts PowerShell.",
      tags: ["Virtualização", "Backup Strategy", "Automação", "Windows Server"]
    },
    {
      company: "Bellacor Indústria",
      role: "Assistente de Produção",
      period: "Abr 2024 - Dez 2024",
      description: "Otimizei o fluxo de linha de produção, garantindo 99% de conformidade com os padrões de qualidade. Atuei na manutenção preventiva de maquinário, reduzindo paradas operacionais não planejadas.",
      tags: ["Eficiência Operacional", "Qualidade", "Processos"]
    },
    {
      company: "BR Conecta",
      role: "Analista de Rede e Comunicação de Dados Jr.",
      period: "Jan 2024 - Fev 2024",
      description: "Gerenciei incidentes de conectividade para carteira de clientes corporativos. Realizei diagnóstico e troubleshooting de redes (TCP/IP, DNS), mantendo SLA de atendimento acima de 95%.",
      tags: ["Redes", "SLA Management", "Troubleshooting"]
    },
    {
      company: "Schmersal Brasil",
      role: "Assistente Administrativo",
      period: "Jan 2023 - Dez 2023",
      description: "Digitalizei e organizei mais de 1000 documentos técnicos, facilitando auditorias de qualidade ISO. Otimizei processos de controle interno, reduzindo redundâncias administrativas.",
      tags: ["Gestão Documental", "ISO 9001", "Processos"]
    },
    {
      company: "Coocerqui",
      role: "Repositor / Empacotador",
      period: "Set 2020 - Jan 2023",
      description: "Desenvolvi soft skills de comunicação e resolução de conflitos em ambiente de alto volume. Responsável pela organização logística e controle de estoque do setor.",
      tags: ["Logística", "Atendimento", "Trabalho em Equipe"]
    }
  ],
  education: [
    {
      institution: "Fatec Tatuí",
      degree: "Gestão da Tecnologia da Informação",
      period: "Fev 2022 - Jul 2025",
      status: "Graduado"
    },
    {
      institution: "SENAI 'Ítalo Bologna'",
      degree: "Assistente Administrativo",
      period: "Jan 2023 - Dez 2023"
    },
    {
      institution: "SENAI 'Ítalo Bologna'",
      degree: "Power BI, Administração",
      period: "Dez 2023"
    }
  ],
  projects: [
    {
      title: "AutoBackup-365",
      description: "Sistema de backup automatizado utilizando Restic e Rclone. Criptografa dados sensíveis localmente e sincroniza com versionamento para o OneDrive/SharePoint, garantindo proteção contra ransomware.",
      details: "Desenvolvi este script para resolver a falta de versionamento confiável em backups locais. A solução utiliza criptografia AES-256 (Restic) antes do upload, garantindo que os dados no OneDrive estejam seguros mesmo em caso de comprometimento da conta.",
      impact: "Redução de 90% no tempo de recuperação de arquivos (RTO) e economia de 100% em licenças de software de backup proprietário.",
      codeSnippet: "restic backup --verbose --exclude-file=excludes.txt /data\nrclone sync /local/repo remote:backup --transfers=8",
      tech: ["PowerShell", "Restic", "Rclone", "Azure Blob"],
      type: "Automação / Segurança",
      complexity: 85,
      stats: { "RTO": "-90%", "Savings": "100%", "Encryption": "AES-256" }
    },
    {
      title: "AD User Manager Pro",
      description: "Ferramenta CLI interativa para 'onboarding' e 'offboarding' de usuários no Active Directory. Automatiza criação de contas, atribuição de grupos por setor e criação de caixas de correio no Exchange/Office 365.",
      details: "Para padronizar a entrada de novos funcionários, criei este utilitário que recebe um CSV do RH ou input manual. Ele gera senhas fortes, configura atributos do AD (Cargo, Depto) e sincroniza com o Azure AD Connect.",
      impact: "Eliminação de erros manuais na criação de usuários e redução do tempo de onboarding de 20min para 30 segundos.",
      codeSnippet: "New-ADUser -Name $User -SamAccountName $Logon -UserPrincipalName \"$Logon@domain.com\" -Enabled $true\nAdd-ADGroupMember -Identity $DeptGroup -Members $Logon",
      tech: ["PowerShell", "Active Directory", "Exchange Online"],
      type: "Infraestrutura",
      complexity: 70,
      stats: { "Time Saved": "98%", "Errors": "0%", "Type": "CLI" }
    },
    {
      title: "NetWatch Python Monitor",
      description: "Dashboard de monitoramento leve que verifica latência (Ping), disponibilidade de portas (TCP) e serviços críticos em servidores Windows/Linux, enviando alertas via Webhook (Discord/Slack).",
      details: "Uma alternativa leve ao Zabbix/Nagios para ambientes menores. O script roda como um serviço systemd (Linux) ou Windows Service, verificando cada alvo a cada 60s e reportando downtime imediatamente.",
      impact: "Detecção proativa de quedas de link e travamento de serviços, permitindo resposta antes do chamado do usuário.",
      codeSnippet: "def check_ping(host):\n    response = ping(host, timeout=2)\n    return 'ONLINE' if response else 'OFFLINE'\n\nif check_ping('192.168.1.1') == 'OFFLINE':\n    send_discord_alert('Router Down!')",
      tech: ["Python", "Flask", "Ping3", "Webhooks"],
      type: "Monitoramento",
      complexity: 60,
      stats: { "Latency": "<1ms", "Alerts": "Real-time", "Platform": "Cross" }
    },
    {
      title: "Secure File Server Setup",
      description: "Script de provisionamento para servidores de arquivos Linux (Samba) com integração ao AD via Winbind/SSSD, incluindo configuração automática de permissões ACL e auditoria de acesso.",
      details: "Automatiza a configuração 'hardened' de um servidor Samba, incluindo VFS modules para lixeira (Recycle Bin) e auditoria (Audit). Integra-se perfeitamente ao AD para autenticação transparente.",
      impact: "Criação de servidores de arquivos padronizados e seguros em menos de 10 minutos, com logs de auditoria completos para conformidade.",
      codeSnippet: "[global]\n   security = ADS\n   realm = DOMAIN.LOCAL\n   vfs objects = acl_xattr full_audit recycle\n   full_audit:success = connect open mkdir write unlink rename",
      tech: ["Bash", "Linux", "Samba", "Security"],
      type: "Linux / Infra",
      complexity: 90,
      stats: { "Security": "Hardened", "Integr": "AD/LDAP", "Audit": "Full" }
    }
  ],
  certifications: [
    "Fundamentos de Data Science e IA",
    "Fundamentos do Power BI",
    "Administrando Banco de Dados",
    "Microsoft Excel 2016"
  ],
  setup: {
    workstation: [
      { name: "OS", value: "Windows 11 Pro / Ubuntu 22.04 LTS" },
      { name: "Terminal", value: "Windows Terminal + PowerShell 7" },
      { name: "Code Editor", value: "VS Code (Dracula Theme)" },
      { name: "Browser", value: "Brave (Privacy Focus)" },
    ],
    hardware: [
      { name: "CPU", value: "AMD Ryzen 7 5700X" },
      { name: "RAM", value: "32GB DDR4 3200MHz" },
      { name: "GPU", value: "NVIDIA RTX 3060 12GB" },
      { name: "Monitor", value: "2x LG UltraGear 27' 144Hz" },
    ]
  }
};
