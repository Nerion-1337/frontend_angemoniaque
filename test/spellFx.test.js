// Lot 2 : éditeur des effets de sort (miroir du schéma back).
import { test, expect } from 'vitest';
import { fxDraft, fxBody, fxSummary } from '../src/admin/spellFx.js';
test('moteur désactivé → {} (sort historique)', () => {
  expect(fxDraft({}).on).toBe(false); expect(fxBody(fxDraft({}))).toEqual({});
});
test('fxBody : bornes, rayon seulement en zone, portée 0 pour soi, caractéristiques nulles retirées', () => {
  const d = { ...fxDraft({ damage: 1 }), target: 'self', range: 9, radius: 4, heal: '12', stats: [{ stat: 'energy', value: '30' }, { stat: 'armor', value: 0 }], durationH: '-3' };
  expect(fxBody(d)).toEqual({ target: 'self', range: 0, radius: 0, affects: 'enemies', damage: 1, heal: 12, dot: null, stats: [{ stat: 'energy', value: 30 }], durationH: 0 });
  const a = { ...fxDraft({ target: 'area', radius: 2 }), on: true, dotOn: true, dotDamage: 4, dotHours: 2, stats: [{ stat: 'agility', value: '-5' }], durationH: 3 };
  expect(fxBody(a)).toMatchObject({ target: 'area', radius: 2, dot: { damage: 4, hours: 2 }, stats: [{ stat: 'agility', value: -5 }], durationH: 3 });
});
test('fxSummary : résumé lisible', () => {
  expect(fxSummary({ target: 'area', range: 3, radius: 2, affects: 'allies', heal: 20, stats: [{ stat: 'energy_max', value: 30 }], durationH: 2 }))
    .toBe("Zone d'impact · portée 3 · rayon 2 · Alliés (même race) · +20 PV · +30 Énergie max · 2 h");
  expect(fxSummary({})).toBe('');
});
