# Copilot Instructions for Bobbly

## Project Overview
Bobbly is a lightweight TypeScript + Vite web application demonstrating interactive DOM manipulation and HMR (Hot Module Replacement) development. It's a minimal project structure suitable for learning frontend development patterns.

## Architecture & Key Files

### Core Structure
- **[src/main.ts](../src/main.ts)** - Entry point; manages DOM rendering and imports counter module
- **[src/counter.ts](../src/counter.ts)** - Stateful counter component; exports `setupCounter()` function
- **[index.html](../index.html)** - Single-page app with `<div id="app">` mount point
- **[style.css](../src/style.css)** - Global styles
- **[tsconfig.json](../tsconfig.json)** - TypeScript strict mode with `noUnusedLocals`, `noUnusedParameters`

### Build & Development
- **Build tool**: Vite with TypeScript compilation
- **Key scripts** (from [package.json](../package.json)):
  - `npm run dev` - Starts Vite dev server with HMR
  - `npm run build` - Compiles TypeScript + bundles with Vite
  - `npm run preview` - Previews production build locally
- **TypeScript target**: ES2023 with bundler module resolution

## Patterns & Conventions

### Module Organization
- Functions are exported at module level (e.g., `export function setupCounter()`)
- DOM queries use TypeScript non-null assertion `!` when certainty exists
- Module-level side effects in `main.ts` immediately populate the app

### State Management
- Counter state is locally scoped within `setupCounter()` using closure
- DOM updates happen directly via `innerHTML` manipulation
- Event listeners are attached within component setup functions

### TypeScript Strictness
- Strict null checks enabled (implicit in bundler mode)
- Unused variables/parameters are errors—always clean up
- Use type annotations on imports (e.g., `HTMLButtonElement`)

## Developer Workflow

### HMR Development
- Edit files in `src/` and changes auto-reload in dev server
- Tests can be run via `npm run build` to validate TypeScript compilation

### Adding Features
1. Create new module in `src/` with exported functions
2. Import in `main.ts` using ES6 import
3. Use the component by calling exported function with DOM element reference
4. TypeScript will catch unused imports/exports

### Common Tasks
- **Change button text**: Update `setupCounter()` in [src/counter.ts](../src/counter.ts) to modify `innerHTML` content
- **Add styling**: Import CSS in module (`import './styles.css'`) and reference classes in HTML
- **Add interactivity**: Export new functions from modules and call them in `main.ts`

## Integration Points
- No external APIs or databases—purely client-side application
- Vite handles asset imports (SVG, PNG, CSS) natively
- HTML structure is generated dynamically; mount target is `#app` div

## Important Notes
- The project uses aggressive TypeScript settings; keep code clean
- Vite's module federation isn't used; stick to simple ES6 imports
- Always include types when importing Vite or DOM APIs (e.g., `HTMLDivElement`, `HTMLButtonElement`)
