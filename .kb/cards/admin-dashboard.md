---
title: Admin dashboard (Étape 2 phase 1) : shell + éditeurs d'entités génériques
slug: admin-dashboard
status: done
updated: 2026-11-21
files:
  - src/admin/index.jsx
  - src/admin/Dashboard.jsx
  - src/admin/Entities.jsx
  - src/admin/EntityRules.jsx
  - src/admin/Races.jsx
  - src/admin/Divine.jsx
  - src/admin/entityFields.js
  - src/store/admin.js
  - src/store/index.js
symbols:
  - src/admin/entityFields.js:FIELDS
  - src/admin/entityFields.js:URL_KIND
  - src/admin/Entities.jsx:Entities
  - src/store/admin.js:Ad
tests:
  - test/admin.test.js
---
## Purpose
Front of the admin back-office (Étape 2 phase 1): a self-contained `src/admin/` module mounted on the existing
`#admin` route. Provides a shell (section nav), a pilotage dashboard, a generic entity editor driven by field
descriptors (monsters/items/mounts/buildings), a races & ranks editor, a cross-cutting rules editor
(costs/caps/modifiers), and a divine-items panel. Replaces the legacy `components/Admin.jsx`.



## How it works
- **Shell** (`src/admin/index.jsx`): reads the active section from the Redux `admin` slice, renders the matching
  panel; a shared `msg` toast shows API errors/success. Gated by `auth.admin` in `App.jsx` (`#admin`). Phase 2:
  the monster tab renders the `MonsterDetails` panel only (phase 3c removed the generic
  `Entities` CRUD and the `Bestiary` panel from this tab — the monster panel owns the type
  list + instances; the `Bestiary` component was deleted). Phase 3: the
  equipment (7 slots) / auras / caps + the all-monsters placement dashboard; card
  `monster-details-ui`. Section headers (`.headrow`) re-styled: baseline alignment, optional
  `.sub` subtitle, `.grow` spacer for right-aligned actions, bottom border separator —
  backward-compatible with the unchanged `Entities`/`Races`/`Bestiary` markup.
- **Field descriptors** (`entityFields.js` `FIELDS`): one array per entity type — `[column, label, type?]`
  where type is `number|check|json`. JSON fields (behaviour, effects, multipliers, base_stats, prerequisites,
  production/collection) are edited as textareas and parsed with `jsonOr` (default on empty, undefined on
  invalid). `URL_KIND` maps the singular class to the PLURAL route segment (`monster -> monsters`).
- **Generic editor** (`Entities.jsx`): list from `GET /admin/content/{plural}`, open →
  `GET /admin/content/{plural}/{id}` (includes costs/caps/modifiers), form built from `FIELDS`, save →
  `PUT` (existing) / `POST` (new). A "Règles transverses" tab renders `EntityRules.jsx`.
- **Rules editor** (`EntityRules.jsx`): `RuleForms` adds a cost / cap / modifier via `POST .../{res|scope|}`;
  `RulesList` lists and deletes the existing rows from the joined detail.
- **Races** (`Races.jsx`): races list + per-race rank (paliers) tree with prereq_xp and multipliers; create/
  edit/delete races and ranks.
- **Divine** (`Divine.jsx`): list of arcana/relics/artifacts with holder/guardian, and a capped "create n".
- **Store** (`store/admin.js`): small slice (section/kind/list/detail/msg) registered in `store/index.js`.
- All API calls go through `lib/api.js` (relative `/api/...`, Bearer token).



## Entry points
- `App.jsx` renders `<Admin />` when `hash === '#admin'` and `auth.admin` (import `./admin/index.jsx`). Auto-reached after a successful admin login/registration (`postAuth`, card `admin-login-nav`); otherwise via the `#admin` links in `CharSelect` / `Account` or by hand.
- `Account.jsx` links to `#admin` for admin users; `Login.jsx` `CharSelect` shows the admin link.
- After a **successful** login/registration an admin account is auto-navigated to `#admin` via `src/lib/postAuth.js` `postAuth` (card `admin-login-nav`); the two links above stay as the access points once in-game / after a session reload.
- Redux: `store/admin.js` slice, actions `Ad.*`.



## Data flow
- Reads/writes the `/admin/content/*` + `/admin/dashboard` + `/admin/audit` + `/admin/tick` endpoints.
- Entity detail payloads embed `costs`, `caps`, `modifiers` (from the back `extras()`); the rules editor
  mutates them through the per-entity endpoints then re-fetches the detail.
- State: `admin` slice (section, selected entity detail, toast). No persistence (each visit re-fetches).



## Tests
- `test/admin.test.js`: `admin` slice transitions (section/detail/msg), `FIELDS` covers the required
  cross-cutting fields per entity type (durability, speed/carry, structure, prereq_xp, multipliers, base_stats),
  and `jsonOr` tolerant parsing. (Node env — no DOM rendering tests in this repo.)
- `test/adminEffects.test.js`: regression guard — the data-loading effects in `Races`/`Entities`/`Divine`
  use a block body that returns `undefined` (never the loader Promise, which crashed tab switches),
  plus a unit check of the React cleanup contract on an async loader.
- The API surface it calls is integration-tested in `back/test/integration/admin.test.ts`.



## Gotchas
- **Plural vs singular**: routes use the PLURAL table name; `URL_KIND` (entityFields.js) must stay in sync with
  the back `common.ts URL_KIND`. A new entity type = add its FIELDS entry AND its URL_KIND key.
- **JSON fields**: edited as text; an invalid JSON blocks the save with a message (`jsonOr` returns undefined).
  Keep the sentinel check (`jsonOr(v, undefined)`).
- **`POST /characters`/entity POST returns the row** (id) but the list/detail GETs return full objects — after
  creating, re-open by `r.id` (the editor already does `open(r.id)`).
- The legacy `components/Admin.jsx` was deleted; don't re-import it. `styles.css` holds the `.admin` layout.
- Keep components small; shared UI lives in `EntityRules.jsx`/`entityFields.js`, not duplicated per panel.
- **useEffect contract (data loaders)**: an effect that triggers a loader returning a Promise (`api(...).then(...)`)
  must use a block body (`useEffect(() => { load(); }, deps)`) — passing the loader directly
  (`useEffect(load, [])`) makes the effect return the Promise, which React treats as the cleanup fn and calls
  on unmount (tab switch) → `Uncaught TypeError: destroy is not a function` + the
  « useEffect must not return anything besides a function » warning. Regression-guarded by `test/adminEffects.test.js`.
  (`Bestiary.jsx`/`Dashboard.jsx` already use block bodies.)

