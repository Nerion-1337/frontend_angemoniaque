import { test, expect } from 'vitest';
/**
 * Régression — crash au changement d'onglet du dashboard admin (« destroy is not a function »).
 * Cause : les loaders renvoyant une Promise (`api(...).then(...)`) étaient passés directement à
 * `useEffect` (`useEffect(load, [])`) ; React traite la valeur retournée par l'effet comme
 * fonction de nettoyage et l'appelle à l'unmount (changement d'onglet) → TypeError.
 * Contrat : les effets des panneaux admin déclenchent le loader dans un corps de bloc
 * (`useEffect(() => { load(); }, deps)` → retourne undefined, jamais une Promise).
 */
const raw = p => import(p + '?raw').then(m => m.default);
const PANELS = [
  ['../src/admin/Races.jsx', /useEffect\(\s*\(\)\s*=>\s*\{\s*load\(\);\s*\}\s*,\s*\[\]\s*\)/],
  ['../src/admin/StructuresTab.jsx', /useEffect\(\s*\(\)\s*=>\s*\{\s*list\(\);\s*\}\s*,\s*\[\]\s*\)/],
  ['../src/admin/Divine.jsx', /useEffect\(\s*\(\)\s*=>\s*\{\s*load\(\);\s*\}\s*,\s*\[itemId\]\s*\)/],
  ['../src/admin/PlayersTab.jsx', /useEffect\(\s*\(\)\s*=>\s*\{\s*load\(\);\s*\}\s*,\s*\[race, page, q\]\s*\)/],
];
test('panneaux admin : l’effet de chargement ne retourne jamais de Promise (changement d’onglet sûr)', async () => {
  for (const [f, ok] of PANELS) {
    const s = await raw(f);
    expect(s, f).toMatch(ok);                                     // corps de bloc présent
    expect(s, f).not.toMatch(/useEffect\(\s*(load|list)\s*,/);   // et jamais le loader passé directement
  }
});
test('unité : un effet qui déclenche un loader asynchrone retourne undefined (contrat React)', () => {
  const load = () => Promise.resolve(42);
  let triggered = 0;
  const effect = () => { triggered += 1; load(); };
  expect(effect()).toBeUndefined();   // React n'accepte qu'undefined (ou une fonction cleanup)
  expect(triggered).toBe(1);
});
