// Races : zone d'apparition et limites de personnages (formulaire admin).
import { test, expect } from 'vitest';
import fs from 'node:fs';
import { rulesDraft, rulesBody, rulesLabel } from '../src/admin/raceRules.jsx';
test('rulesBody : vide = défaut (capitale / illimité), entiers ≥ 0, pas de centre sans monde', () => {
  expect(rulesBody({ spawn_map_id: '', spawn_x: '12', spawn_y: '3', spawn_radius: '', max_per_account: '', max_total: '' }))
    .toEqual({ spawn_map_id: null, spawn_x: null, spawn_y: null, spawn_radius: 4, max_per_account: null, max_total: null });
  expect(rulesBody({ spawn_map_id: '3', spawn_x: '40', spawn_y: '60', spawn_radius: '2', max_per_account: '1', max_total: '-5' }))
    .toEqual({ spawn_map_id: 3, spawn_x: 40, spawn_y: 60, spawn_radius: 2, max_per_account: 1, max_total: 0 });
});
test('rulesDraft : nouvelle race = 3 par compte (règle historique), rayon 4', () => {
  expect(rulesDraft(null)).toMatchObject({ spawn_map_id: '', spawn_radius: 4, max_per_account: 3, max_total: '' });
  expect(rulesDraft({ spawn_map_id: 2, spawn_x: 5, spawn_y: 6, spawn_radius: 1, max_per_account: null, max_total: 10 })).toMatchObject({ spawn_map_id: 2, max_per_account: '', max_total: 10 });
});
test('rulesLabel : résumé lisible', () => {
  expect(rulesLabel({ spawn_map_id: 3, spawn_x: 40, spawn_y: 60, spawn_radius: 3, max_per_account: 3, max_total: 500 })).toBe('Apparition : Monde 3 · 40, 60 (± 3) · 3 / compte · population ≤ 500');
  expect(rulesLabel({ max_per_account: null })).toBe('Apparition : capitale · illimité / compte');
});
test('écran de création : places et refus fournis par le serveur (plus de « 3 » codé en dur)', () => {
  const s = fs.readFileSync('src/components/Login.jsx', 'utf8');
  expect(s.includes("api('/characters/races')")).toBe(true);
  expect(s.includes('< 3')).toBe(false);
});
