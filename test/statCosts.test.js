// Admin « Améliorations » : même calcul que le serveur (rules.statUpgradeCost), corps envoyé, aperçu.
import { test, expect } from 'vitest';
import { upgradeCost, preview, ruleBody } from '../src/admin/statCosts.js';
test('coût par palier : base × multiplicateur, palier = achats ÷ améliorations par palier, plafonné au 3e', () => {
  const r = { base_xp_cost: 25, numb_up: 10, multi_1: 1, multi_2: 2, multi_3: 3 };
  expect([0, 9, 10, 19, 20, 99].map(n => upgradeCost(r, n))).toEqual([25, 25, 50, 50, 75, 75]);
  expect(preview(r)).toEqual({ t1: 25, t2: 50, t3: 75, toT3: 750 });
});
test('ruleBody : entiers ≥ bornes, multiplicateurs décimaux', () => {
  expect(ruleBody({ base_xp_cost: '12.7', numb_up: '0', multi_1: '1.25', multi_2: 'x', multi_3: '-2' })).toEqual({ base_xp_cost: 12, numb_up: 1, multi_1: 1.25, multi_2: 0, multi_3: 0 });
});
