// Lot du 2026-11-27 : option « arme à distance » envoyée seulement pour une arme ; classe de rareté en jeu.
import { test, expect } from 'vitest';
import { itemBody } from '../src/admin/divine.js';
import { rarClass } from '../src/components/Rarity.jsx';
test('itemBody : ranged seulement pour une arme', () => {
  expect(itemBody({ name: 'Arc', slot: 'weapon', reach: '3', ranged: true })).toMatchObject({ reach: 3, ranged: true });
  expect(itemBody({ name: 'Lance', slot: 'weapon', reach: '2' })).toMatchObject({ reach: 2, ranged: false });
  expect(itemBody({ name: 'Casque', slot: 'head', ranged: true }).ranged).toBeUndefined();
});
test('rarClass : clé connue, sinon commun', () => {
  expect(rarClass('epique')).toBe('rar-epique'); expect(rarClass(undefined)).toBe('rar-commun'); expect(rarClass('x')).toBe('rar-commun');
});
