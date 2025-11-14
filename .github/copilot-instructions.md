This project is a React + TypeScript single-page app (Vite) for taking notes during "Blood on the Clocktower" games.

Quick facts (use these to be productive immediately):
- Run locally: `npm run dev` (Vite dev server). Build: `npm run build` (runs `tsc -b && vite build`). Preview: `npm run preview`.
- Path alias: `@` -> `src` as defined in `vite.config.ts`. Use imports like `@/components/...`.
- UI: React + Tailwind + small shadcn-style primitives in `src/components/ui/shadcn`.
- Local DB: Dexie (IndexedDB) wrapper in `src/database/AppDB.ts` + `src/database/db.ts`. Player types in `src/database/types/player.ts`.

Key areas to inspect when changing behavior:
- Player ingestion and persistence: `src/components/ui/GameSetupForm.tsx` calls `parsePlayers()` in `src/database/player.utils.ts` which bulk-adds players to `db.players`.
- Player display (ring layout): `src/components/ui/players/PlayerList.tsx` uses `usePanel`, `computeCircle` and `polarStyle` (see `src/components/ui/players/useRing.ts`) and `ring.css` for layout. CSS custom properties used: `--ring`, `--icon`, `--r-center`.
- App shell & layout: `src/components/layout/AppShell.tsx` and `src/components/layout/GameLayout.tsx` compose the main UI regions (left/center/right). Top-level `src/App.tsx` mounts them.
- Header & lifecycle: `src/components/ui/HeaderBar.tsx` exposes New Game (toggles setup) and Delete Game (calls `db.delete()` and reloads). Be careful: deleting DB triggers full reload.
- Chrome extension helpers: `chrome-extension/` contains a small extension (manifest, background/content scripts) used to extract player names from external sites — useful for integration or testing player imports.

Conventions and patterns to follow:
- Use the `@` alias for imports from `src` to keep paths consistent.
- UI primitives in `src/components/ui/shadcn` are tiny wrappers—prefer reusing them for consistent spacing/aria.
- State & DB: persistent state is kept in Dexie (IndexedDB). UI reads via async helpers (e.g., `getAllPlayers`) — keep DB writes/reads async and local to `src/database/*`.
- Player identity: `Player.id` is treated as the stable key (initially equal to `seat`). Seat numbers are 1..n and determine clockwise order.
- CSS variables: ring sizing and avatar sizing are driven by inline CSS vars in `PlayerList` — adjust there if changing layout behavior.

Examples you might need while editing code:
- Importing a component: `import { PlayerList } from "@/components/ui/players/PlayerList";`
- Programmatically add players (used by GameSetupForm): call `parsePlayers('A, B, C')` which will bulkAdd to `db.players`.
- Reset/delete DB: `await db.delete(); location.reload();` (used by HeaderBar).

Testing & debugging tips:
- Use `npm run dev` and open the console to see `console.log` from `parsePlayers`, `getAllPlayers`, and other helpers; many components log during actions.
- To iterate on the ring layout, change dev viewport size and inspect CSS variables on the `ul.ring` element — `PlayerList` sets `--icon` and `--r-center` dynamically.
- When changing TypeScript types, run `npm run build` (or `tsc -b`) to catch type errors faster.

Files worth reading first:
- `package.json` (scripts, deps)
- `vite.config.ts` (alias `@`)
- `src/components/layout/*` (app composition)
- `src/components/ui/GameSetupForm.tsx` (player import flow)
- `src/database/*` (AppDB.ts, db.ts, player.utils.ts, types/player.ts)
- `src/components/ui/players/*` (ring, presets, avatar)
- `chrome-extension/` (player extraction integration)

If something is unclear or you want example code for a specific change (new DB field, new UI primitive, or changing the ring layout), ask and I'll add a small, runnable change with tests or a verification plan.
