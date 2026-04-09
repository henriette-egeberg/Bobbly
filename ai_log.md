# AI Usage Log

## Session 1: Copilot Instructions Generation

**Date**: April 8, 2026  
**Task**: Analyze codebase and generate/update `.github/copilot-instructions.md`

### Actions Taken

1. **File Search** - Searched for existing AI convention files (copilot-instructions.md, AGENT.md, CLAUDE.md, .cursorrules, etc.) - No files found
2. **Codebase Analysis**:
   - Read README.md to understand project scope
   - Analyzed package.json for build tools and scripts
   - Examined tsconfig.json for TypeScript configuration
   - Read src/main.ts to understand entry point and DOM structure
   - Read src/counter.ts to understand component pattern
   - Read index.html for HTML structure
   - Listed src/ directory contents
3. **Created `.github/copilot-instructions.md`** with sections:
   - Project Overview
   - Architecture & Key Files (core structure and build/development)
   - Patterns & Conventions (module organization, state management, TypeScript strictness)
   - Developer Workflow (HMR development, adding features)
   - Integration Points
   - Important Notes
4. **Fixed File Links** - Corrected relative paths in markdown links to use `../` prefix for proper linking from `.github/` directory

### Key Findings

- Bobbly is a TypeScript + Vite learning project with minimal scope
- Uses strict TypeScript settings (`noUnusedLocals`, `noUnusedParameters`)
- Counter component demonstrates closure-based state management
- DOM manipulation done directly via `innerHTML`
- Module-level exports for component setup functions

### Files Created/Modified

- Created: `.github/copilot-instructions.md` (70 lines, comprehensive guide for AI agents)

## Session 2: Registration Form Fix

**Date**: April 9, 2026  
**Task**: Fix 405 Method Not Allowed error on register button click

### Actions Taken

1. **Issue Analysis** - Identified that JavaScript was looking for `#regBtn` element but no HTML content existed in the DOM
2. **Added Registration Form HTML** - Added complete registration form with name, email, password inputs and register button to main.ts
3. **Updated JavaScript Logic** - Modified event handler to:
   - Read values from form inputs instead of using hardcoded values
   - Added input validation to ensure all fields are filled
   - Improved error handling with proper HTTP status checking
   - Added user feedback with alerts for success/failure

### Key Changes

- Added HTML form structure with proper input IDs matching JavaScript selectors
- Replaced hardcoded registration data with dynamic form input reading
- Enhanced error handling to show specific HTTP status codes
- Added form validation to prevent empty submissions

### Files Modified

- Modified: `src/main.ts` (added HTML content, updated JavaScript logic)

## Session 3: Register Button Fix

**Date**: April 9, 2026  
**Task**: Fix register button not attaching click handler and prevent default submit behavior

### Actions Taken

1. Reordered DOM rendering so the register button exists before the click handler is attached
2. Changed `button` to `type="button"` to avoid default form submission behavior
3. Added a runtime guard to throw an error if `#regBtn` is not found after rendering

### Files Modified

- Modified: `src/main.ts` (fixed button event binding order, added explicit button type)
