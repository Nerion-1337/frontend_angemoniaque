// Lot C : toutes les caractéristiques du joueur offertes par un objet (colonnes historiques + bonuses).
import { test, expect } from 'vitest';
import { ITEM_STATS, bonusesBody, statsLine, itemBody } from '../src/admin/divine.js';
test('les 10 caractéristiques du joueur sont proposées', () => {
  expect(ITEM_STATS.map(s => s[0])).toEqual(['strength', 'agility', 'armor', 'magic_armor', 'hp_max', 'recovery', 'energy_max', 'divine_energy_max', 'see', 'range']);
});
test('bonuses : entiers, zéros et vides retirés, malus gardés, colonnes historiques exclues', () => {
  expect(bonusesBody({ hp_max: '20', see: '', range: 0, energy_max: '-5', strength: 9, recovery: '1.7' })).toEqual({ hp_max: 20, energy_max: -5, recovery: 1 });
  expect(itemBody({ name: 'Heaume', strength_bonus: '2', magic_armor: '4', bonuses: { hp_max: 20 } })).toMatchObject({ strength_bonus: 2, magic_armor: 4, bonuses: { hp_max: 20 } });
});
test('résumé', () => {
  expect(statsLine({ strength_bonus: 2, armor: 0, magic_armor: 4, bonuses: { energy_max: -5, see: 1 } })).toBe('+2 Force · +4 Armure magique · -5 Énergie max · +1 Vue');
  expect(statsLine({})).toBe('');
});
