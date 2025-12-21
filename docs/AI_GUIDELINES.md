# AI & Development Guidelines: Professional Portfolio

This document defines the **STRICT** architectural and stylistic rules for this project.
**ALL** AI agents and developers must adhere to these rules. Deviations are not permitted without explicit authorization.

## 1. Core Philosophy

- **Aesthetic**: Corporate Minimalist, Professional, "Swiss Style".
- **Keywords**: Trust, Expertise, Precision, Clarity.
- **Forbidden**: Glitch effects, Gamification, Cyberpunk visuals, Neon colors, Low-contrast text.

## 2. Directory Structure (Feature-Sliced Design)

We follow a modified FSD structure. Code must be placed in the correct layer.

```
src/
├── app/          # Application setup (Routing, Context Providers, Global Styles)
├── shared/       # Reusable, domain-agnostic segments (UI Kit, Helpers, Hooks)
│   ├── ui/       # Atomic components (Button, Card, Input) - NO business logic.
│   ├── lib/      # Utils and helpers.
│   └── assets/   # Static assets importable in code.
├── entities/     # Business domains (Data structures, Interfaces) - Renders "Read-only" cards.
│   ├── user/     # User profile data.
│   ├── project/  # Project interfaces and cards.
│   └── skill/    # Skill definitions and icons.
├── features/     # User interactions (Forms, Filters, Search, Theme Toggling).
├── widgets/      # Composition layer (Navbar, Footer, Hero, Sidebar).
└── pages/        # Route components. Each page composes Widgets and Features.
```

## 3. Strict File Rules

- **No file outside of folders**: `src/Box.tsx` is FORBIDDEN. It must be `src/shared/ui/Box.tsx`.
- **Absolute Imports**: Use path aliases (`@/shared`, `@/features`) defined in `tsconfig.json`.
- **One Component, One File**: Avoid massive files. Break them down.

## 4. Design & Styling Rules

- **Framework**: Tailwind CSS (Utility-first).
- **Colors**: Use ONLY semantic names from `tailwind.config.js` (`bg-primary`, `text-secondary`).
- **Typography**:
  - Headings: `font-display` (e.g., Plus Jakarta Sans).
  - Body: `font-body` (e.g., Inter/Roboto).
- **Spacing**: Use standard 4px grid multiples (`p-4`, `GAP-6`, `my-12`).

## 5. Content "Personas"

The site generates content dynamically based on domains.

- Data for expertise is centralized in `src/entities/skill/data/expertise.ts`.
- Do NOT hardcode text in components if it belongs to a specific domain (Security vs Cloud). Use the data layer.

## 6. Verification

Before finishing a task:

1. `npm run typecheck` MUST pass.
2. `npm run build` MUST pass.
3. Verify no "Legacy" components (Game, Glitch) remain in active imports.
