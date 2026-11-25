// Changement de personnage (rechargement du personnage ACTIF) et fenêtres de jeu en onglets.
import { test, expect } from 'vitest'; import fs from 'node:fs';
const src = f => fs.readFileSync(new URL(`../src/components/${f}`, import.meta.url), 'utf8');
test('useRefreshMe lit le personnage actif au moment de l’appel et ignore une réponse arrivée après un changement', () => {
  const g = src('GameCanvas.jsx');
  expect(g).toMatch(/const id = store\.getState\(\)\.game\.charId/);
  expect(g).toMatch(/if \(store\.getState\(\)\.game\.charId !== id\) return me/);
  expect(g).toMatch(/\}, \[charId\]\);/);   // intervalle relancé au changement de personnage
});
test('Hôtel de ville, Actions, Pactes en onglets ; Invocations = une seule liste de créatures', () => {
  expect(src('Capital.jsx')).toMatch(/useTab\('capital', \['shop', 'spells', 'market', 'chest'\]\)/);
  const p = src('Panels.jsx');
  for (const k of ["useTab('faith'", "useTab('actions'"]) expect(p).toContain(k);
  expect(p).toContain('<Panel title="Invocations" wide>');
  expect(p).not.toContain("useTab('mounts'");   // une seule catégorie : les créatures (invocables, montables ou non)
  expect(p).toMatch(/Invoquer et monter/); expect(p).toMatch(/Invoquée par un sort/);
  expect(src('TopBar.jsx')).toContain("nav('mounts', PawPrint, 'Invocations', 'Invocations')");
});
test('monture invoquée à pied : « Monter dessus » proposé (fenêtre Invocations et carte de case)', () => {
  expect(src('Panels.jsx')).toMatch(/near\(x\.summon_id\)/);
  expect(src('TileCard.jsx')).toMatch(/\['ride', `Monter sur \$\{e\.name\}`/);
});
