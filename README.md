<<<<<<< HEAD
# Kisaansahyog
=======
# KisaanSahyog

KisaanSahyog is a mobile-first PWA for the Smart India Hackathon (SIH) designed to help smallholder farmers with crop advisory, soil health, mandi prices, buyer discovery, and practical skills in Hindi and English. Stitch UI screens can be dropped into the scaffold as they are delivered.

## Tech stack

- **Monorepo:** npm workspaces (`apps/*`, `packages/*`)
- **Web:** Vite + React + TypeScript + Tailwind CSS + Zustand
- **API:** Node.js + Express
- **Shared contracts:** TypeScript + Zod schemas + Hindi/English i18n dictionaries
- **Skills engine:** Pure TypeScript agronomic helpers (Vitest ready for Phase 6)
- **Data:** Mock datasets in `data/`
- **Docs:** Project tracking in `docs/`

## Project structure

```text
apps/
  web/   # Vite PWA (Stitch UI zone)
  api/   # Express health-check API
packages/
  shared/  # Types, schemas, constants, bilingual i18n
  skills/  # Agronomic calculation engine
data/     # Knowledge base and mock datasets
docs/     # TASKS.md and technical documentation
```

## Quick start

1. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build shared packages:
   ```bash
   npm run build -w @kisaansahyog/shared
   npm run build -w @kisaansahyog/skills
   ```

4. Run the app in development (builds shared and starts web + API together):
   ```bash
   npm run dev
   ```

   Or run separately:
   ```bash
   npm run dev:web
   npm run dev:api
   ```

5. Build everything:
   ```bash
   npm run build
   ```

6. Preview the web build:
   ```bash
   npm run preview
   ```

7. Start the API in production mode after building:
   ```bash
   npm run start:api
   ```

8. Run tests:
   ```bash
   npm run test
   ```

9. Run lint:
   ```bash
   npm run lint
   ```

## Environment variables

See `.env.example` for the full list. Browser-exposed values must be prefixed with `VITE_`.

## Where to add Stitch UI

- **Page-level screens:** `apps/web/src/screens/` (use `ScaffoldScreen` as a drop-in pattern)
- **Reusable components:** `apps/web/src/components/stitch/` (buttons, gauges, cards, badges)
- **Layouts:** `apps/web/src/components/layout/` (TopBar, BottomNav)
- **App state:** `apps/web/src/store/useAppStore.ts` (language, role, tabs, 2G mode, voice)

The Phase 1 scaffold sets a mobile-first `max-w-md` container, bilingual copy, role switching, 2G/data-saver state, and a voice assistant entry point ready for later phases.
>>>>>>> f5ae1e1 (feat(phase-2): integrate stitch ui design system, i18n, zustand navigation, and screen shells)
