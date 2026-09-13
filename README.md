# Bobbly

Bobbly is a small frontend project built with Vite and TypeScript, using Tailwind CSS for styling. The app demonstrates user authentication flows, form validation, and simple API communication with the Noroff authentication API.

## Project overview

This project focuses on:

- User registration and login
- Form validation in the browser
- Basic client-side auth flow with localStorage
- Responsive UI styling with Tailwind
- Minimal social media inspired layout

## Tech stack

- Vite
- TypeScript
- Tailwind CSS v4
- HTML
- Noroff API

## Project structure

- `src/main.ts` – registration page logic and form handling
- `src/login.ts` – login page logic and validation
- `src/input.css` – Tailwind source file
- `src/style.css` – generated CSS output
- `index.html` – home/feed page
- `register/index.html` – registration page
- `login/index.html` – login page

## Getting started

# Getting started

1. Clone the repository:
   ```bash
   git clone https://github.com/henriette-egeberg/Bobbly.git
   cd Bobbly
   ```

Scripts
npm run dev – Start Vite dev server with Tailwind watch mode
npm run build:css – Compile Tailwind CSS to src/style.css
npm run build – Compile TypeScript and build with Vite for production
npm run preview – Preview the production build locally
Authentication
The app uses the Noroff API for authentication:

Register: POST https://v2.api.noroff.dev/auth/register
Login: POST https://v2.api.noroff.dev/auth/login
On successful login, the access token is stored in localStorage under the key authToken.

Form validation
Browser-based validation includes:

Required fields
Email format validation
Minimum password length of 8 characters
Minimum username length of 2 characters
