# Portfólio Profissional — Alessandro Meneses

### Infraestrutura | Cloud | DevOps | Segurança

![Status](https://img.shields.io/badge/Status-Complete-success)
![Tech Stack](https://img.shields.io/badge/Stack-React_|_TypeScript_|_Tailwind_|_Framer_Motion-blue)

Este repositório contém o código-fonte do portfólio profissional de **Alessandro Meneses**. O projeto foi arquitetado não apenas como um site de apresentação, mas como uma demonstração técnica de desenvolvimento frontend moderno, UX avançada e organização de código.

## 🌟 Destaques do Projeto

- **Arquitetura FSD (Feature-Sliced Design)**: Organização escalável e modular (App, Pages, Widgets, Entities, Shared).
- **UX Imersiva**: Animações fluidas com _Framer Motion_, cursor magnético personalizado e _Smooth Scroll_ (Lenis).
- **Design Responsivo & Adaptativo**: Layouts testados desde dispositivos móveis (320px) até desktops 4K.
- **Performance**: Pontuação alta no Lighthouse, carregamento otimizado (Vite) e SEO estruturado.
- **Background Dinâmico**: Padrão de Grid técnico com gradientes animados ("Aurora Effect") para uma estética moderna e profissional.

## 🛠️ Stack Tecnológico

| Categoria       | Tecnologias                                  |
| :-------------- | :------------------------------------------- |
| **Core**        | React 18, TypeScript, Vite                   |
| **Estilização** | Tailwind CSS, Lucide Icons                   |
| **Animação**    | Motion.dev (Framer Motion), GSAP (conceitos) |
| **Rotas**       | React Router DOM v6                          |
| **Qualidade**   | ESLint, Prettier, TypeScript Strict Mode     |

## 📂 Estrutura de Diretórios

O projeto segue estritamente a metodologia **Feature-Sliced Design**:

```
src/
├── app/          # Configurações globais (Rotas, Estilos, Providers)
├── entities/     # Modelos de Domínio (User, Skill, Project - Dados Reais)
├── features/     # Funcionalidades interativas
├── pages/        # Telas da Aplicação (Home, Expertise, Contact, OpenSource)
├── shared/       # Componentes Reutilizáveis agnósticos (UI Kit, Libs)
└── widgets/      # Componentes Compostos (Navbar, Footer, Hero, Timeline)
```

## 🚀 Como Executar

1.  **Instalar Dependências:**

    ```bash
    npm install
    ```

2.  **Rodar Servidor de Desenvolvimento:**

    ```bash
    npm run dev
    ```

3.  **Compilar para Produção:**
    ```bash
    npm run build
    ```

## 🎨 Funcionalidades de UX

- **Gooey Navigation**: Menu de navegação fluido com física de mola.
- **Linha do Tempo Interativa**: Histórico profissional visual com feedback de cor e posição.
- **Glassmorphism**: Uso extensivo de fundos translúcidos (vidro fosco) para modernidade.
- **Micro-interações**: Botões e inputs reagem a hover e foco com escala e brilho.

---

**© 2025 Alessandro Meneses**
