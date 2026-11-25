// Objets divins (même formulaire que les objets + familles libres) et section Joueurs.
import { test, expect } from 'vitest';
import { itemBody, familyLabel, validFamilyKey } from '../src/admin/divine.js';
import { statDiff, posLabel, pageWindow, STAT_KEYS } from '../src/admin/players.js';
test('itemBody : champs du formulaire seulement, sans vides ni null ; famille seulement en Divin', () => {
  const b = itemBody({ name: ' Lame ', rarity: 'rare', slot: '', price: '', armor: 0, req_strength: '3', usable_by: ['ange'], divine_family: 'relique', holders: 4, copies: 2, data: null });
  expect(b).toEqual({ name: 'Lame', rarity: 'rare', usable_by: ['ange'], two_handed: false, armor: 0, req_strength: 3, bonuses: {}, divine_family: null, shop: false, shop_races: [] });
  expect(itemBody({ name: 'Arc long', slot: 'weapon', two_handed: true }).two_handed).toBe(true);
  expect(itemBody({ name: 'Bouclier', slot: 'shield', two_handed: true }).two_handed).toBe(false);   // deux mains : armes seulement
  expect(itemBody({ name: 'Sceau', rarity: 'divin', divine_family: 'sceau' }).divine_family).toBe('sceau');
});
test('familles divines : libellé et clé valide (même règle que le back)', () => {
  expect(familyLabel({ key: 'arcane', name: 'Arcanes', copies: 3, cap: 4 })).toBe('Arcanes (arcane) · 3 / 4');
  expect(familyLabel({ key: 'sceau', name: 'Sceaux', cap: null })).toBe('Sceaux (sceau) · 0 / ∞');
  expect(validFamilyKey('sceau_ancien')).toBe(true); expect(validFamilyKey('Sceau')).toBe(false); expect(validFamilyKey('1x')).toBe(false);
});
test('joueurs : seules les caractéristiques modifiées partent, entiers ≥ 0', () => {
  const ch = { xp: 10, gold: 5, strength: 7, specialization_id: 2 };
  expect(statDiff(ch, { ...ch, xp: '12', gold: '5', strength: '-3', specialization_id: '3' })).toEqual({ xp: 12, strength: 0, specialization_id: 3 });
  expect(statDiff(ch, ch)).toEqual({});
  expect(STAT_KEYS).toContain('chest_size');
});
test('joueurs : position et pagination', () => {
  expect(posLabel({ map_id: 2, x: 4, y: 9 })).toBe('Monde 2 · 4, 9'); expect(posLabel({})).toBe('—');
  expect(pageWindow(1, 10)).toEqual([1, 2, 3]); expect(pageWindow(5, 10)).toEqual([3, 4, 5, 6, 7]); expect(pageWindow(1, 1)).toEqual([1]);
});
