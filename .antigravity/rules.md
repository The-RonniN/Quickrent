# Quickrent — Antigravity Project Rules

## 1. Project Identity & Stack

- **Project:** Quickrent (Rental Services Website & PWA).
- **Frontend (`frontend/`):** React.js, Vite, Tailwind CSS, JavaScript (ES6+).
- **Backend (`backend/`):** Node.js, Express.js, Zod for validation, PostgreSQL (or Supabase) for persistence.
- **Purpose:** This is a learning-first, from-scratch build. Prioritize clarity, simplicity, and clean fundamentals over over-engineered abstractions.

## 2. Vibe-Coding & Learning Workflow

- **One step at a time:** Only implement the specific feature, route, or component requested in the current prompt. Never scaffold unrequested pages or future phases ahead of time.
- **Explain new concepts briefly:** Whenever introducing a new backend concept (middleware, CORS, status codes, SQL queries, JWTs, service workers), include a short, clear comment or summary explaining how it works.
- **Surgical edits only:** When updating existing files, modify only the targeted lines/functions without rewriting unrelated code or deleting working integrations.
- **No unrequested packages:** Do not install third-party libraries unless explicitly asked or strictly required for the current step.

## 3. Folder & Dependency Hygiene

- Keep `frontend/` and `backend/` strictly isolated—each must have its own `package.json` and `node_modules/`.
- Never create a root `node_modules/` or link `frontend` inside `node_modules/`.
- Store static frontend images only in `frontend/public/images/`.
- Never hardcode secrets, database URLs, or JWT keys; read them from `process.env` via `.env` and keep `.env.example` updated.

## 4. Frontend & Tailwind CSS Rules

- **Clean, intentional design:** Avoid generic AI "vibecoded" aesthetics—no harsh neon gradients, glowing orbs, pure `#000000`/purple dark mode, `hover:scale-105` bounce animations, decorative emojis, or unmotivated 3-card/bento grids.
- **Responsive layout:** Build mobile-first layouts using Tailwind spacing and pure viewport units (`vw`, `vh`, `svh`, `dvh`) where needed; avoid CSS `clamp()`.
- **Component structure:** Keep UI components in `frontend/src/components/` (`storefront/` for rental-specific UI, `common/` for shared primitives), API calls in `frontend/src/services/`, and route views in `frontend/src/pages/`.

## 5. Backend & API Rules

- **Consistent JSON responses:** Always return clear JSON payloads with proper HTTP status codes (`200`, `201`, `400`, `401`, `404`, `409` for booking date conflicts, `500`).
- **Validate all inputs:** Every `POST`, `PUT`, and `PATCH` route must validate `req.body` with a Zod schema before touching data.
- **Server-side authority:** Always calculate booking totals and check date-range availability on the backend—never trust prices or availability flags sent from the client.
- **Centralized error handling:** Use a dedicated Express error-handling middleware in `backend/src/middleware/` rather than repeating try/catch boilerplate everywhere.
