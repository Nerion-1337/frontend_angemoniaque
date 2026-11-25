import { test, expect } from 'vitest';
import { rowsOf, tableOf, rankPercent, diffLabel } from '../src/admin/xpRank.js';
test('table ⇄ lignes : tri, écarts entiers bornés, % ≥ 0', () => {
  expect(rowsOf({ '1': 125, '-1': 75, '0': 100 }).map(r => r.diff)).toEqual([-1, 0, 1]);
  expect(tableOf([{ diff: '2.7', pct: '150' }, { diff: -120, pct: -5 }, { diff: '', pct: 10 }])).toEqual({ '2': 150, '-99': 0 });
});
test('pourcentage appliqué (miroir du serveur) et libellés', () => {
  const t = { '-2': 50, '0': 100, '2': 150 };
  expect(rankPercent(t, 0)).toBe(100); expect(rankPercent(t, 9)).toBe(150); expect(rankPercent(t, -1)).toBe(50); expect(rankPercent({}, 3)).toBe(100);
  expect(diffLabel(0)).toBe('Même rang'); expect(diffLabel(2)).toBe('Cible 2 rangs au-dessus'); expect(diffLabel(-1)).toBe('Cible 1 rang en dessous');
});
