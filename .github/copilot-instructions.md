# Copilot Instructions for Bobbly

## Project Overview

Bobbly is a lightweight TypeScript + Vite web application demonstrating user authentication flows and API integration. It's a minimal client-side app suitable for learning frontend auth patterns.

## Architecture & Key Files

### Core Structure

- **[src/main.ts](../src/main.ts)** - Entry point; renders registration form, handles register/login events, fetches Noroff API, manages localStorage auth token
- **[index.html](../index.html)** - Single-page app with `<div id="app">` mount point
- **[register/index.html](../register/index.html)** - Dedicated register page with header/footer layout
- **[login/index.html](../login/index.html)** - Dedicated login page (note: shares main.ts but has conflicting HTML structure)
- **[src/style.css](../src/style.css)** - Global styles with CSS variables for theming
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

- Direct DOM manipulation in `main.ts` using `innerHTML` for form rendering
- Event listeners attached after DOM rendering with `addEventListener`
- Module-level side effects immediately populate the app on load

### State Management

- Authentication state persisted in `localStorage` (key: "authToken")
- No complex state management; direct DOM updates on auth success
- Form inputs read directly from DOM elements on submit

### API Integration

- Fetch requests to `https://v2.api.noroff.dev/auth/register` and `/login`
- JSON body with user credentials; handles response status and JSON parsing
- Error handling via `.catch()` with user alerts

### TypeScript Strictness

- Strict null checks enabled (implicit in bundler mode)
- Unused variables/parameters are errors—always clean up
- Type annotations on DOM queries (e.g., `HTMLButtonElement`, `HTMLInputElement`)

## Developer Workflow

### HMR Development

- Edit files in `src/` and changes auto-reload in dev server
- Build via `npm run build` to validate TypeScript compilation

### Adding Features

1. Update HTML structure in `main.ts` `innerHTML` assignment
2. Add event listeners for new interactive elements
3. Implement API calls using `fetch()` with proper headers and error handling
4. Store/retrieve data in `localStorage` for persistence

### Common Tasks

- **Add form validation**: Check input values before API call in event handler
- **Handle auth states**: Update DOM based on `localStorage.getItem("authToken")` presence
- **Add new API endpoints**: Follow existing fetch pattern with JSON body and response handling

## Integration Points

- External API: Noroff authentication service for register/login
- Persistence: Browser localStorage for auth tokens
- Styling: Shared CSS with class-based theming

## Important Notes

- The project uses aggressive TypeScript settings; keep code clean
- API responses include access tokens stored locally for session management
- Multiple HTML entry points exist but share a single script—consider separating logic for scalability
- Always include types when querying DOM elements to leverage strict mode
