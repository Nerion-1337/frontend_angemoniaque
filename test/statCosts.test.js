// Admin « Améliorations » : même calcul que le serveur (rules.statUpgradeCost), corps envoyé, aperçu, paliers en nombre libre.
import { test, expect } from 'vitest';
import { upgradeCost, preview, ruleBody } from '../src/admin/statCosts.js';
test('coût par palier : base × multiplicateur, palier = achats ÷ améliorations par palier, dernier palier au-delà', () => {
  const r = { base_xp_cost: 25, numb_up: 10, multis: [1, 2, 3] };
  expect([0, 9, 10, 19, 20, 99].map(n => upgradeCost(r, n))).toEqual([25, 25, 50, 50, 75, 75]);
  expect(preview(r)).toEqual({ firsts: [25, 50, 75], toLast: 750 });
  expect(upgradeCost({ base_xp_cost: 25, numb_up: 10, multi_1: 1, multi_2: 2, multi_3: 3 }, 10)).toBe(50);   // ancien format
});
test('paliers ajoutés : 5 multiplicateurs', () => {
  const r = { base_xp_cost: 10, numb_up: 2, multis: [1, 2, 3, 5, 8] };
  expect([0, 2, 4, 6, 8, 50].map(n => upgradeCost(r, n))).toEqual([10, 20, 30, 50, 80, 80]);
  expect(preview(r).firsts).toEqual([10, 20, 30, 50, 80]);
});
test('ruleBody : entiers ≥ bornes, multiplicateurs décimaux', () => {
  expect(ruleBody({ base_xp_cost: '12.7', numb_up: '0', multis: ['1.25', 'x', '-2', '4'] })).toEqual({ base_xp_cost: 12, numb_up: 1, multis: [1.25, 0, 0, 4] });
});
