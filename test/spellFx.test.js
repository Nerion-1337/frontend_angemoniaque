// Lot 2 : éditeur des effets de sort (miroir du schéma back).
import { test, expect } from 'vitest';
import { fxDraft, fxBody, fxSummary, LINK_MODES, modeLabel } from '../src/admin/spellFx.js';
test('moteur désactivé → {} (sort historique)', () => {
  expect(fxDraft({}).on).toBe(false); expect(fxBody(fxDraft({}))).toEqual({});
});
test('fxBody : bornes, rayon seulement en zone, portée 0 pour soi, caractéristiques nulles retirées', () => {
  const d = { ...fxDraft({ damage: 1 }), target: 'self', range: 9, radius: 4, heal: '12', stats: [{ stat: 'energy', value: '30' }, { stat: 'armor', value: 0 }], durationH: '-3' };
  expect(fxBody(d)).toEqual({ target: 'self', range: 0, radius: 0, affects: 'enemies', damage: 1, heal: 12, dot: null, stats: [{ stat: 'energy', value: 30 }], durationH: 0, summon: null });
  const a = { ...fxDraft({ target: 'area', radius: 2 }), on: true, dotOn: true, dotDamage: 4, dotHours: 2, stats: [{ stat: 'agility', value: '-5' }], durationH: 3 };
  expect(fxBody(a)).toMatchObject({ target: 'area', radius: 2, dot: { damage: 4, hours: 2 }, stats: [{ stat: 'agility', value: -5 }], durationH: 3 });
});
test('fxSummary : résumé lisible', () => {
  expect(fxSummary({ target: 'area', range: 3, radius: 2, affects: 'allies', heal: 20, stats: [{ stat: 'energy_max', value: 30 }], durationH: 2 }))
    .toBe("Zone d'impact · portée 3 · rayon 2 · Alliés (même race) · +20 PV · +30 Énergie max · 2 h");
  expect(fxSummary({})).toBe('');
});
// Lot D : invocation par sort ; modes des sorts liés à un élément.
test('invocation : quantité seulement pour un objet, durée bornée, sans élément → null ; relue depuis l\'API', () => {
  const d = { ...fxDraft({ target: 'self' }), sumOn: true, sumKind: 'item', sumRef: '7', sumQty: '150', sumH: '-2' };
  expect(fxBody(d).summon).toEqual({ kind: 'item', refId: 7, qty: 99, durationH: 0 });
  expect(fxBody({ ...d, sumKind: 'monster', sumQty: 5, sumH: 3 }).summon).toEqual({ kind: 'monster', refId: 7, qty: 1, durationH: 3 });
  expect(fxBody({ ...d, sumRef: '' }).summon).toBeNull();
  expect(fxDraft({ target: 'self', summon: { kind: 'building', refId: 4, qty: 1, durationH: 12 } })).toMatchObject({ sumOn: true, sumKind: 'building', sumRef: 4, sumH: 12 });
  expect(fxSummary({ target: 'self', summon: { kind: 'item', refId: 7, qty: 2, durationH: 0 } })).toBe('Soi-même · invoque : Objet n°7 ×2 (permanent)');
});
test('modes de lien : au coup porté / à l\'attaque reçue pour les objets seulement', () => {
  expect(LINK_MODES.item.map(m => m[0])).toEqual(['passive', 'active', 'on_hit', 'on_struck']);
  expect(LINK_MODES.building.map(m => m[0])).toEqual(['passive', 'active']); expect(LINK_MODES.mount.map(m => m[0])).toEqual(['passive', 'active']);
  expect(modeLabel('item', 'on_struck')).toBe("À l'attaque reçue (armure, bouclier)");
});
