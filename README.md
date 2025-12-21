# Portfólio Profissional — Alessandro Meneses

### Infraestrutura | Cloud | DevOps | Segurança

![Status](https://img.shields.io/badge/Status-Complete-success)
![Stack](https://img.shields.io/badge/Stack-React_|_TypeScript_|_Tailwind_|_Framer_Motion-blue)
![Theme](https://img.shields.io/badge/Theme-Dark%20%26%20Light_Mode-blueviolet)

Este repositório contém o código-fonte do portfólio profissional de **Alessandro Meneses**. O projeto foi arquitetado não apenas como um site de apresentação, mas como uma demonstração técnica de desenvolvimento frontend moderno, UX avançada e organização de código.

## 🌟 Novas Funcionalidades (Atualização Dez/2025)

### 1. Avatar "Cyber-Portrait" 2.0 🤖

Uma experiência visual imersiva e interativa:

- **Parallax 3D**: O avatar reage ao movimento do mouse com física de mola (spring physics).
- **Iluminação Dinâmica**: Efeitos de luz interna seguem o cursor.
- **Adaptação de Tema**: O fundo do avatar transita suavemente entre um "Portal Cósmico" (Dark Mode) e "Nuvens de Vidro" (Light Mode).
- **Badges Físicos**: Elementos flutuantes com inércia e atraso (drag) realista.

### 2. Catálogo de Serviços "Holográfico" 💎

Uma nova página dedicada (`/services`) apresentando as capacidades técnicas:

- **Visual Recursivo**: Um renderizador 3D abstrato com esferas aninhadas e rotação perpétua.
- **Cards Glassmorphism**: Design translúcido premium para exibir domínios como Cloud, DevOps e Segurança.
- **Navegação Inteligente**: Links diretos para detalhes técnicos profundos.

### 3. Sistema de Temas (Dark/Light) 🌗

- **Toggle Global**: Switch acessível integrado à `GooeyNavBar`.
- **Persistência**: Design consistente e legível em ambos os modos.

---

## 🛠️ Stack Tecnológico

| Categoria       | Tecnologias                              |
| :-------------- | :--------------------------------------- |
| **Core**        | React 18, TypeScript, Vite               |
| **Estilização** | Tailwind CSS, Lucide Icons               |
| **Animação**    | Motion.dev (Framer Motion)               |
| **Rotas**       | React Router DOM v6                      |
| **Qualidade**   | ESLint, Prettier, TypeScript Strict Mode |

## 📂 Estrutura de Diretórios (FSD)

O projeto segue estritamente a metodologia **Feature-Sliced Design**:

```
src/
├── app/          # Configurações globais (Rotas, Estilos, Providers)
├── entities/     # Modelos de Domínio (User, Skill, Project - Dados Reais)
├── features/     # Funcionalidades interativas
├── pages/        # Telas da Aplicação (Home, Expertise, Services, Contact)
├── shared/       # Componentes Reutilizáveis agnósticos (UI Kit, Libs)
└── widgets/      # Componentes Compostos (Navbar, Footer, Hero, AvatarVisual)
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
- **Linha do Tempo "System Logs"**: Histórico profissional estilizado como logs de sistema/terminal.
- **Glassmorphism**: Uso extensivo de fundos translúcidos (vidro fosco) para modernidade.
- **Micro-interações**: Botões e inputs reagem a hover e foco com escala e brilho.

---

{{ ... }}
