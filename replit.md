# DytaDex AI — BS in Data Science

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite (artifacts/transcript-viewer)
- **Payments**: Cashfree (₹99 one-time per course)
- **Deployed at**: ai.dytadex.com

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm run build:content` — compile `content/maths2/notes/*.md` → `src/data/maths2/notes.json`
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Transcript Viewer App (`artifacts/transcript-viewer`)

React + Vite SPA for browsing BS in Data Science courses under **DytaDex AI** brand.

### URL Routing
- `/` → Welcome screen
- `/bs-data-science/{courseId}/{tab}` → Course view
  - `{tab}` = `transcripts` | `curriculum` | `notes` (default: transcripts)
- `/ai-group` → AI Group page

### Architecture
- **`src/lib/courseRegistry.ts`** — single source of truth for all course metadata, transcripts, curriculum, notes
- **`src/data/maths2/`** — course data: `transcripts.json`, `curriculum.json`, `notes.json`
- **`content/maths2/notes/*.md`** — content-first notes (18 .md files → compiled to notes.json via `pnpm build:content`)
- **`scripts/build-notes.mjs`** — notes compiler (YAML frontmatter + markdown body)
- **`scripts/extract-notes.mjs`** — one-time extractor from notes.json → .md files

### Features
- Per-course tabs: Transcripts, Curriculum, Notes
- URL deep-linking for tabs and videos
- Full-text search across all transcripts
- TTS (text-to-speech)
- User auth (phone + password)
- Course subscriptions + progress tracking (per-video/concept/note checkmarks)
- Equal-weight tracking type selection per course
- Per-course paywall (₹99 one-time, Cashfree) — content free, progress saving requires payment
- Dark mode toggle
- Responsive mobile-friendly layout

### Progress Tracking Keys (stored in DB `video_code` column, TS property `itemKey`)
- `v:{youtubeCode}` — video progress
- `{conceptName}` — concept/curriculum progress  
- `note:{id}` — notes progress

### Data Shape
```ts
// TranscriptsData
{ weeks: [{ key, label, topic, videos: [{ id, code, title, youtubeUrl, available, segments: [{time, timestamp, text}] }] }], totalVideos, availableVideos }
```

### Status
- 109/110 transcripts available (W5_T6 has transcripts disabled on YouTube)
- 18 notes for maths2 (content-first in `content/maths2/notes/`)

## API Server (`artifacts/api-server`)

Express API with Fastify-style structured logging (pino).

### Routes
- `POST/GET /api/auth/*` — auth (register, login, me, logout)
- `GET/POST/DELETE /api/progress` — progress tracking (requires auth + payment)
- `GET/POST/DELETE /api/subscriptions` — course subscriptions
- `POST /api/payments/create-order` — create Cashfree order
- `POST /api/payments/verify` — verify payment
- `POST /api/payments/webhook` — Cashfree webhook
- `GET /api/payments/status` — payment status check

## DB Schema (`lib/db`)

Key tables: `users`, `sessions`, `user_progress`, `course_subscriptions`, `course_purchases`

Note: `user_progress.video_code` column stores progress item keys (TypeScript property `itemKey`).
