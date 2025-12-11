import { defineConfig } from 'vite';

// Try to load @vitejs/plugin-react dynamically so the dev server doesn't fail
// with a cryptic error if the plugin isn't installed yet. It's recommended to
// install `@vitejs/plugin-react` as a devDependency for the best DX.
let reactPlugin: any = undefined;
try {
  // use require to avoid TypeScript resolution errors at runtime when module missing
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require('@vitejs/plugin-react');
  reactPlugin = mod && (mod.default || mod);
} catch (e) {
  // plugin not installed — we'll start Vite without it and surface a warning
  // The project will still build using esbuild transformer for JSX, but
  // fast refresh and some React-specific transforms may not be available.
  // Install via: npm install -D @vitejs/plugin-react
  // or run the start-all script that installs dependencies.
  // eslint-disable-next-line no-console
  console.warn('[vite.config] @vitejs/plugin-react not found — starting without it. Install with `npm i -D @vitejs/plugin-react`.');
}

export default defineConfig({
  plugins: reactPlugin ? [reactPlugin()] : [],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});