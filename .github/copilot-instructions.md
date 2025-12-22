# GitHub Copilot Instructions for Alessandro Meneses Portfolio

## Project Overview

This is a professional portfolio for Alessandro Meneses showcasing Infrastructure, Cloud, DevOps, and Security expertise. Built with React 18, TypeScript, Vite, Tailwind CSS, and Framer Motion (motion.dev).

**Live Site:** https://am-infrastructure.netlify.app/

## Architecture: Feature-Sliced Design (FSD)

This project follows **Feature-Sliced Design** strictly. All code must be placed in the correct layer:

```
src/
├── app/          # Application setup (Routing, Providers, Global Styles)
├── shared/       # Reusable, domain-agnostic code (UI Kit, Utils, Hooks)
│   ├── ui/       # Atomic components (Button, Card) - NO business logic
│   ├── lib/      # Utilities and helpers
│   └── types/    # Shared TypeScript interfaces
├── entities/     # Business domains (User, Project, Skill) - Data structures
├── features/     # User interactions (Forms, Filters, Theme Toggling)
├── widgets/      # Composed components (Navbar, Footer, Hero)
└── pages/        # Route components - compose Widgets and Features
```

## Critical Rules

### File Organization
- **NO files outside folders**: `src/Box.tsx` is FORBIDDEN. Use `src/shared/ui/Box.tsx`
- **Use absolute imports**: Always use path aliases (`@/shared`, `@/features`) defined in `tsconfig.json`
- **One component per file**: Keep files focused and modular

### TypeScript
- **Strict mode is enabled**: All code must satisfy strict TypeScript checks
- **No `any` types**: Use proper typing or `unknown` with type guards
- **Export interfaces**: Define types for all component props
- Run `npm run typecheck` to verify before committing

### Styling with Tailwind CSS
- **Utility-first approach**: Use Tailwind classes, avoid custom CSS
- **Semantic color names only**: Use `bg-primary`, `text-secondary`, etc. from `tailwind.config.js`
- **Forbidden**: Hardcoded hex colors, inline styles
- **Typography**:
  - Headings: `font-display` (Plus Jakarta Sans)
  - Body text: `font-sans` (Inter)
- **Spacing**: Use 4px grid multiples (`p-4`, `gap-6`, `my-12`)

### Design Philosophy
- **Aesthetic**: Corporate Minimalist, Professional, Swiss Style
- **Keywords**: Trust, Expertise, Precision, Clarity
- **FORBIDDEN**: Glitch effects, Gamification, Cyberpunk visuals, Neon colors, Low-contrast text
- **Preferred**: Glassmorphism, Subtle animations, Clean layouts

### Animation with Framer Motion
- Use `framer-motion` for animations and transitions
- Keep animations subtle and professional
- Use spring physics for smooth, natural motion

### Data Management
- Centralize domain data in `src/entities/*/data/`
- DO NOT hardcode content in components if it belongs to a domain
- Example: Expertise data lives in `src/entities/skill/data/expertise.ts`

## Development Commands

```bash
# Development
npm install          # Install dependencies
npm run dev          # Start dev server (port 5173)
npm run start        # Alias for npm run dev

# Quality Checks
npm run typecheck    # TypeScript type checking (MUST pass)
npm run build        # Production build (MUST pass)
npm run serve        # Preview production build

# CI Check (runs both typecheck and build)
npm run ci-check
```

## Before Completing Any Task

1. **TypeCheck**: `npm run typecheck` MUST pass with no errors
2. **Build**: `npm run build` MUST succeed
3. **Verify**: No legacy components (Game, Glitch, Cyberpunk) in active imports
4. **Review**: Check that FSD structure is maintained

## Additional Guidelines

- **Detailed rules**: See `/docs/AI_GUIDELINES.md` for comprehensive architectural rules
- **Security**: Follow guidelines in `/SECURITY.md`
- **React patterns**: Use functional components with hooks
- **Router**: Use React Router DOM v6 for navigation
- **State management**: Use React Context for global state
- **Error handling**: Implement proper error boundaries
- **Accessibility**: Ensure components are keyboard-navigable and screen-reader friendly

## Tech Stack Reference

| Category | Technologies |
|----------|--------------|
| **Core** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, Lucide Icons |
| **Animation** | Motion.dev (Framer Motion) |
| **Routing** | React Router DOM v6 |
| **Quality** | ESLint, TypeScript Strict Mode |

## Key Features to Maintain

- **Dark/Light Theme Toggle**: Global theme system with persistence
- **Gooey Navigation**: Fluid navigation menu with spring physics
- **Glassmorphism Design**: Translucent backgrounds throughout
- **Responsive Design**: Mobile-first approach
- **Performance**: Optimized animations and lazy loading

## Common Pitfalls to Avoid

❌ Placing components directly in `src/` without folder structure  
❌ Using relative imports instead of `@/` aliases  
❌ Hardcoding colors or content that should be in the theme or data layer  
❌ Adding inline styles or custom CSS outside Tailwind  
❌ Breaking TypeScript strict mode with `any` or type assertions  
❌ Introducing cyberpunk/glitch/neon aesthetics inconsistent with brand  

## Questions?

Refer to `/docs/AI_GUIDELINES.md` for detailed architectural rules and conventions.
