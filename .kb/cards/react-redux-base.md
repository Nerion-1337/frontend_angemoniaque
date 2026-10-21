---
title: React + Redux base: store, app shell, API client, Vite config
slug: react-redux-base
status: done
updated: 2026-10-21
files:
  - src/main.jsx
  - src/store/index.js
  - src/App.jsx
  - src/lib/api.js
  - vite.config.js
symbols:
  - src/main.jsx:App
  - src/store/index.js:game
  - src/store/index.js:store
  - src/App.jsx:App
  - src/lib/api.js:api
  - vite.config.js:defineConfig
tests:
  - test/lib.test.js
---
## Purpose
The React 18 + Redux Toolkit base that boots the SPA: a single `game` slice holds auth/session, selected character, entities, active panel, hover/selection and toasts. `App.jsx` is the shell that switches Login → character select → game view from slice state, a small fetch-based API client carries the Bearer token, and the Vite dev server proxies `/api` to the backend so the front always talks to relative URLs.

## How it works
- `index.html` → `src/main.jsx` mounts `<Provider store><App/></Provider>` into `#root`.
- `src/store/index.js` defines one `game` slice (`configureStore({ reducer: { game } })`) with state `{auth, charId, me, entities, panel, hover, selected, toast}` and reducers `setAuth`, `setChar`, `setMe`, `setEntities`, `setPanel` (toggle: same payload closes the panel), `setHover`, `setSelected`, `toast`. It exports `A` (the action creators) and the configured `store`.
- `src/App.jsx` (the shell): on mount it restores the session — if `hasToken()` it calls `api('/auth/me')` → `d(A.setAuth(m))` (also restoring the admin role) and clears the token on failure — and listens to `hashchange`. Rendering: `!ready` → nothing; `!auth` → `<Login/>`; `hash === '#admin'` → `<Admin/>` only if `auth.admin`; `!charId` → `<CharSelect admin={auth.admin}/>`; otherwise the game layout: `<GameCanvas/>` (Three.js scene from `src/three/scene.js` + `entities.js`) plus `<TopBar/>`, `<TileCard/>`, `<SidePanel/>`, `<Location/>`, `<Compass/>` (new HUD widget, 8-direction cardinal labels), `<ChatDock/>`, a panel switch (`faith|mounts|guild|world|actions|capital|account`), a toast (auto-cleared after 3.5 s by an effect) and the account-settings button that dispatches `setPanel('account')`.
- `src/lib/api.js` keeps a module-level `token` persisted in `localStorage` (`setToken` / `hasToken`); `api(path, body, method)` does `fetch('/api' + path)` with JSON + `Authorization: Bearer` when a token exists, POST by default when a body is present, and throws `Error` with the backend's `error` string (or `Erreur <status>`, or `Serveur injoignable` on network failure).
- `vite.config.js`: `@vitejs/plugin-react`, dev server proxy `/api` → `process.env.API_URL ?? http://localhost:3000` with `ws: true` and a rewrite that strips the `/api` prefix (the backend routes are `/auth/...`, not `/api/auth/...`); Vitest runs in a `node` environment.
- Pure game helpers live in `src/lib/` (`terrain.js`, `energy.js`, `relief.js`) and the 3D layer in `src/three/` — both consumed by `GameCanvas` and the panels.

## Entry points
- `index.html` → `src/main.jsx` (React root + Redux Provider)
- Every component calls the API through `src/lib/api.js` (`api`, `setToken`, `hasToken`) — never `fetch` directly
- Redux actions come from `import { A } from './store'`; state is read with `useSelector(s => s.game...)`

## Data flow
- Component → `dispatch(A.*)` → `game` slice → re-render via `useSelector`; server responses flow back into the slice (`setAuth` / `setMe` / `setEntities` / `toast`)
- Auth: `localStorage.token` → `Authorization: Bearer …` on every `/api` call; Nginx strips `/api` and forwards to the backend (dev: the Vite proxy targets `API_URL`, default `http://localhost:3000`)
- Live updates: `GameCanvas` (Three.js rendering of entities/terrain) and `ChatDock` consume the same slice state; realtime events arrive through the backend's WS gateway (`/ws?map=N`, see the `back` repo `realtime/ws.ts` card)

## Tests
- `test/lib.test.js` — Vitest unit tests of the pure game helpers: `terrain(x, y)` is deterministic (same inputs → same grid) and `pathEnergy` sums per-tile costs along a straight line and respects `stopAt` (used to cap the movement range).

## Gotchas
- `setPanel` toggles: dispatching the current panel id closes it — do not assume a panel stays open across re-renders, and don't build state that depends on "panel is open" after a toggle.
- The toast clears itself after 3500 ms via an effect: a long-lived message must be re-dispatched, and the effect cleanup clears the timer on unmount.
- `api()` throws on every non-2xx with the backend's `error` string; callers use `.catch` — do not add silent fallbacks or retries here, and keep error messages human-readable (they are shown verbatim in toasts).
- The store is a single `game` slice on purpose: new top-level state should extend this slice or a new slice registered in `store/index.js` (do not scatter `useState` for shared state).
- The dev proxy rewrites `/api` → `` (strips the prefix): backend routes must be written without the `/api` prefix; the prod Nginx does the same stripping, so the client always uses relative `/api/...`.
- There is no router library: navigation is URL hash + slice state (`charId`); `#admin` is the only hash route and is admin-gated.
- The front must stay ignorant of backend internals beyond the `/api` surface (relative URLs only) — keep it deployable behind the infra Nginx without code changes.
