// Races & rangs : XP de combat / entraînement — valeurs générales (entiers ≥ 0), valeur d'un rang (vide = générale).
import { test, expect } from 'vitest';
import { combatBody, rankCombatValue, COMBAT_KEYS } from '../src/admin/combatXp.js';
test('combatBody : quatre entiers ≥ 0', () => {
  expect(combatBody({ xp_hit_player: '3', xp_dodge: '-2', train_energy: '4.7' })).toEqual({ xp_hit_player: 3, xp_dodge: 0, train_energy: 4, train_xp: 0 });
  expect(COMBAT_KEYS).toEqual(['xp_hit_player', 'xp_dodge', 'train_energy', 'train_xp']);
});
test('rankCombatValue : vide = valeur générale (null), 0 reste 0', () => {
  expect(rankCombatValue('')).toBeNull(); expect(rankCombatValue(null)).toBeNull(); expect(rankCombatValue('0')).toBe(0); expect(rankCombatValue('7')).toBe(7);
});
