// Niveaux verticaux (colonnes de cubes) : sol 0, eau −1/−2/−4, massifs +1 → +5, ciel +8.
import { test, expect } from 'vitest';
import { levelAt, levelLabel, standY, FLY_Y, WATER_Y, LEVEL_H, SKY } from '../src/lib/levels.js';
import { terrain } from '../src/lib/terrain';
const scan = (m, w, h, f) => { for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) f(x, y, terrain(x, y, m), levelAt(x, y, m)); };
test('niveaux par type de case sur les trois mondes', () => {
  for (const [m, w, h] of [[1, 200, 200], [2, 300, 300], [3, 100, 100]]) {
    const seen = new Set();
    scan(m, w, h, (x, y, t, l) => {
      seen.add(l);
      if (t.kind === 'deep') expect(l).toBe(-4);
      else if (t.kind === 'shallow') expect([-1, -2]).toContain(l);
      else if (['mountain', 'snow', 'ether', 'volcano'].includes(t.kind)) { expect(l).toBeGreaterThanOrEqual(1); expect(l).toBeLessThanOrEqual(5); }
      else expect(l).toBe(0);
    });
    expect(seen.has(0)).toBe(true);
  }
});
test('massifs : +1 au bord, plus haut au cœur ; eau peu profonde à −2 au bord de l’eau profonde', () => {
  let edge = 0, core = 0, deepEdge = 0;
  scan(1, 200, 200, (x, y, t, l) => { if (t.kind === 'mountain' && l === 1) edge++; if (l >= 4) core++; if (t.kind === 'shallow' && l === -2) deepEdge++; });
  expect(edge).toBeGreaterThan(0); expect(core).toBeGreaterThan(0); expect(deepEdge).toBeGreaterThan(0);
});
test('hauteurs : entités à la surface de l’eau, volants au ciel (+8) ; libellé', () => {
  expect(FLY_Y).toBe(SKY * LEVEL_H); expect(SKY).toBe(8);
  let d = null; scan(1, 200, 200, (x, y, t) => { if (!d && t.kind === 'deep') d = [x, y]; });
  expect(standY(d[0], d[1], 1)).toBe(WATER_Y);
  expect([levelLabel(3), levelLabel(0), levelLabel(-4)]).toEqual(['+3', '0', '-4']);
});
