export const userData = {
  profile: {
    name: "Alessandro Meneses",
    role: "Graduado em Gestão da Tecnologia da Informação | Assistente de Infraestrutura JR | HelpDesk | Suporte Técnico",
    bio: "Especialista em Suporte Técnico, Infraestrutura de TI e Automação. Graduado em Gestão da TI, com foco em transformar operações complexas em fluxos eficientes através de virtualização, backup seguro e automação de scripts.",
    email: "ale_meneses2004@hotmail.com",
    phone: "+55 (15) 99801-7732",
    address: "Av. Alexandrina Bertoldi Vercellino, 461, Boituva - SP",
    linkedin: "https://www.linkedin.com/in/alessandromeneses/",
    github: "https://github.com/ManoAlee",
    location: "Boituva, São Paulo, Brasil"
  },
  skills: {
    infrastructure: [
      "Windows Server", "Linux", "Active Directory (AD)", "DNS/DHCP", "VPN/SSH", "TCP/IP", "Hyper-V", "VMware", "Proxmox", "Office 365", "Azure AD", "Hardware & Cabling"
    ],
    automation: [
      "PowerShell", "Bash", "Python", "Restic", "Rclone", "Log Analysis"
    ],
    support: [
      "Troubleshooting", "Service Desk", "Gestão de Ativos", "Manutenção Preventiva", "Documentação Técnica", "Suporte Remoto (RDP/VNC)", "ITIL"
    ],
    data: [
      "SQL", "Power BI", "Excel Avançado", "Pesquisa e Análise", "Administração de Banco de Dados"
    ],
    languages: [
      "Português (Nativo)", "Inglês (Elementar)"
    ]
  },
  experience: [
    {
      company: "Automotion",
      role: "Assistente de TI JR",
      period: "Jun 2025 - Presente",
      description: "Planejamento e administração de infraestrutura focada em alta disponibilidade. Migração de servidores físicos para Proxmox, implementação de backup robusto (Restic/Rclone) e automação via PowerShell/Bash. Gerenciamento de ativos, AD, GPO, redes (TCP/IP, VPN, Firewall) e suporte N1/N2/N3.",
      tags: ["Proxmox", "Restic", "PowerShell", "Windows Server", "AD/GPO", "Office 365"]
    },
    {
      company: "Bellacor Indústria",
      role: "Assistente de Produção",
      period: "Abr 2024 - Dez 2024",
      description: "Operação e monitoramento de máquinas de envase, preparação de insumos e controle de qualidade visual e etiquetagem, mantendo a organização do setor.",
      tags: ["Produção", "Qualidade", "Organização"]
    },
    {
      company: "BR Conecta",
      role: "Analista de Rede e Comunicação de Dados Jr",
      period: "Jan 2024 - Fev 2024",
      description: "Suporte técnico focado em conectividade e infraestrutura. Atendimento ao cliente, resolução de problemas de rede e troubleshooting ágil para garantir SLA e satisfação do cliente.",
      tags: ["Redes", "Atendimento", "Troubleshooting"]
    },
    {
      company: "Schmersal Brasil",
      role: "Assistente Administrativo",
      period: "Jan 2023 - Dez 2023",
      description: "Controle de qualidade e documentação técnica. Auditorias internas/externas (ISO), registros e inspeção de embalagens para garantia de conformidade.",
      tags: ["ISO", "Documentação", "Qualidade"]
    },
    {
      company: "Coocerqui",
      role: "Repositor / Empacotador",
      period: "Set 2020 - Jan 2023",
      description: "Atuação na logística interna, reposição e atendimento ao cliente.",
      tags: ["Logística", "Atendimento"]
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
  certifications: [
    "Administrando Banco de Dados",
    "Fundamentos de Data Science e IA",
    "Fundamentos do Power BI",
    "Microsoft Excel 2016"
  ],
  projects: [
    {
      title: "AutoBackup-365",
      description: "Sistema de backup automatizado utilizando Restic e Rclone. Criptografa dados sensíveis localmente e sincroniza com versionamento para o OneDrive/SharePoint.",
      details: "Solução para garantir DRP (Disaster Recovery Plan) com criptografia AES-256 antes do upload para a nuvem.",
      impact: "Proteção de 5TB+ de dados críticos contra ransomware.",
      codeSnippet: "restic backup --verbose --exclude-file=excludes.txt /data",
      tech: ["PowerShell", "Restic", "Rclone", "Azure Blob"],
      type: "Automação / Segurança",
      complexity: 85,
      stats: { "RTO": "-90%", "Savings": "100%", "Encryption": "AES-256" }
    },
    {
      title: "AD User Manager Pro",
      description: "Ferramenta CLI para onboarding/offboarding no Active Directory. Automatiza criação de contas, grupos e caixas de correio.",
      details: "Padronização de entrada de funcionários com geração de credenciais e sincronização Azure AD.",
      impact: "Redução do tempo de onboarding de 20min para segundos.",
      codeSnippet: "New-ADUser -Name $User -SamAccountName $Logon",
      tech: ["PowerShell", "Active Directory", "Exchange Online"],
      type: "Infraestrutura",
      complexity: 70,
      stats: { "Time Saved": "98%", "Errors": "0%", "Type": "CLI" }
    },
    {
      title: "NetWatch Monitor",
      description: "Dashboard de monitoramento leve para latência e serviços críticos em servidores Windows/Linux.",
      details: "Serviço de monitoramento com alertas via Webhook.",
      impact: "Detecção proativa de quedas de link.",
      codeSnippet: "if check_ping('192.168.1.1') == 'OFFLINE': send_alert()",
      tech: ["Python", "Network", "Ping3"],
      type: "Monitoramento",
      complexity: 60,
      stats: { "Latency": "<1ms", "Alerts": "Real-time", "Platform": "Cross" }
    }
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
