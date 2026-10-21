import { test, expect } from 'vitest'; import { terrain } from '../src/lib/terrain'; import { pathEnergy } from '../src/lib/energy';
test('terrain déterministe', () => expect(terrain(12, 34)).toEqual(terrain(12, 34)));
test('énergie : ligne droite = somme des coûts', () => { const e = pathEnergy({ x: 0, y: 0 }, { x: 3, y: 0 }, { flying: true }); expect(e).toBe(3); });
test('stopAt réduit le trajet', () => expect(pathEnergy({ x: 0, y: 0 }, { x: 4, y: 0 }, { flying: true, stopAt: 1 })).toBe(3));

// Ressources : le miroir de back/src/game/terrain.ts (chaque case porte une ressource récoltable)
const RES = { deep: 'perle', shallow: 'eau', plain: 'herbe', forest: 'bois', mountain: 'pierre' };
test('terrain : la ressource suit la case — perle/eau/herbe/bois/pierre, et les 5 cases existent', () => {
  const seen = new Set();
  for (let x = 0; x < 100; x++) for (let y = 0; y < 100; y++) { const t = terrain(x, y); expect(t.resource).toBe(RES[t.kind]); seen.add(t.kind); }
  expect([...seen].sort()).toEqual(['deep', 'forest', 'mountain', 'plain', 'shallow']);
});
// Miroir de stepCost (back/src/game/movement.ts) : 1 pas depuis la case de l'est = coût de la case cible uniquement
const find = k => { for (let x = 0; x < 200; x++) for (let y = 0; y < 200; y++) if (terrain(x, y).kind === k) return { x, y }; throw new Error(k); };
const stepInto = (c, o = {}) => pathEnergy({ x: c.x + 1, y: c.y }, c, o);
test('énergie à pied : eau peu profonde = 4, eau profonde interdite (∞)', () => {
  expect(stepInto(find('shallow'))).toBe(4);
  expect(stepInto(find('deep'))).toBe(Infinity);
});
test('énergie : monture aquatique = 1 sur l’eau / rien sur terre ; monture volante = 1 partout', () => {
  expect(stepInto(find('deep'), { aquatic: true })).toBe(1);
  expect(stepInto(find('shallow'), { aquatic: true })).toBe(1);
  expect(stepInto(find('plain'), { aquatic: true })).toBe(Infinity);
  expect(stepInto(find('deep'), { flying: true })).toBe(1);
  expect(stepInto(find('mountain'), { flying: true })).toBe(1);
});
