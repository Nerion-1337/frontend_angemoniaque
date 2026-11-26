import { test, expect } from 'vitest';
import { person, rankOf } from '../src/three/entities.js';
// Allure des personnages : Néphilim hybride (une aile de plumes, une membraneuse) ; ornements et ailes selon le rang.
const count = g => { let n = 0; g.traverse(() => { n++; }); return n; };
test('Néphilim : deux ailes de nature différente, distinct d’un humain', () => {
  const n = person('nephilim', false, 1), h = person('human', false, 1);
  expect(n.userData.wings).toHaveLength(2);
  const [l, r] = n.userData.wings; expect(l.children.length).not.toBe(r.children.length);   // plumes (3 pans) / membrane + 3 os
  expect(count(n)).toBeGreaterThan(count(h));
});
test('rang : séraphin à 4 ailes au rang 5 ; ailes de démon dès le rang 3 ; plus d’ornements à chaque rang', () => {
  expect(person('angel', false, 1).userData.wings).toHaveLength(2); expect(person('angel', false, 5).userData.wings).toHaveLength(4);
  expect(person('demon', false, 2).userData.wings).toHaveLength(0); expect(person('demon', false, 3).userData.wings).toHaveLength(2);
  for (const race of ['human', 'angel', 'demon', 'nephilim']) { const n = [1, 2, 3, 4, 5].map(r => count(person(race, false, r)));
    for (let i = 1; i < 5; i++) expect(n[i], `${race} rang ${i + 1}`).toBeGreaterThan(n[i - 1]); }
  expect(person('human', false, 5).scale.x).toBeCloseTo(1.08); expect(rankOf(undefined)).toBe(1); expect(rankOf(9)).toBe(5);
  const p = person('nephilim', false, 5); expect(() => p.userData.tick(1.2)).not.toThrow();
});
import { capital } from '../src/three/entities.js';
test('Hôtel de ville : architecture propre à chaque race, animée', () => {
  const sig = r => { const c = capital(r); let n = 0, col = new Set(); c.traverse(o => { n++; if (o.material?.color) col.add(o.material.color.getHex()); }); return [c, n, [...col].sort().join()]; };
  const [h, hn, hc] = sig('human'), [d, dn, dc] = sig('demon'), [a, an, ac] = sig('angel');
  expect(new Set([hc, dc, ac]).size).toBe(3); expect(new Set([hn, dn, an]).size).toBe(3);
  expect(sig(undefined)[2]).toBe(hc);   // sans race : hôtel de ville humain
  for (const c of [h, d, a]) expect(() => c.userData.tick(2.5)).not.toThrow();
});
