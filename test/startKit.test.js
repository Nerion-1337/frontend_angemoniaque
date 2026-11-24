// Équipement de départ par race (onglet Races & Rangs).
import { test, expect } from 'vitest';
import { kitDraft, kitBody, kitSummary } from '../src/admin/startKit.js';
test('kitDraft : kit absent = premier palier, 0 or, listes vides', () => {
  expect(kitDraft(undefined)).toEqual({ rank: '', gold: 0, xp: 0, resources: {}, items: [], spells: [], mounts: [] });
});
test('kitBody : entiers ≥ 0, rang vide = null, sorts uniques, une seule monture active', () => {
  const b = kitBody({ rank: '2', gold: '-5', xp: '42', resources: { bois: '3', vide: 0 }, items: [{ itemId: '7', qty: '0', place: 'chest' }, { itemId: 8, qty: 2, place: 'x' }],
    spells: [4, '4', 5], mounts: [{ mountId: 1, active: true }, { mountId: 2, active: true }] });
  expect(b).toEqual({ rank: 2, gold: 0, xp: 42, resources: { bois: 3 }, items: [{ itemId: 7, qty: 1, place: 'chest' }, { itemId: 8, qty: 2, place: 'bag' }],
    spells: [4, 5], mounts: [{ mountId: 1, active: true }, { mountId: 2, active: false }] });
  expect(kitBody(kitDraft({})).rank).toBeNull();
});
test('kitSummary : résumé lisible', () => {
  expect(kitSummary(kitDraft({ gold: 150, items: [{}, {}], mounts: [{}] }))).toBe('Premier palier · 150 or · 2 objets · 1 monture');
  expect(kitSummary(kitDraft({ rank: 2, gold: 500, xp: 42, spells: [1], resources: { a: 1, b: 2 } }))).toBe('Palier 2 · 500 or · 42 XP · 1 sort · 2 ressources');
});
