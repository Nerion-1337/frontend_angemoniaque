import { test, expect } from 'vitest'; import { terrain, setWorld } from '../src/lib/terrain'; import { pathEnergy } from '../src/lib/energy';
import { RES_BY_ID } from '../src/lib/resources';
test('terrain déterministe (les 3 mondes)', () => { for (const m of [1, 2, 3]) expect(terrain(12, 34, m)).toEqual(terrain(12, 34, m)); });
test('énergie : ligne droite = somme des coûts (volant)', () => { setWorld(2); expect(pathEnergy({ x: 0, y: 0 }, { x: 3, y: 0 }, { flying: true })).toBe(3); });
test('stopAt réduit le trajet', () => { setWorld(2); expect(pathEnergy({ x: 0, y: 0 }, { x: 4, y: 0 }, { flying: true, stopAt: 1 })).toBe(3); });

// Catalogue (miroir de back/src/game/resources.ts) : le nom affiché d'une ressource est celui du catalogue —
// clé stable resourceId (la récolte du back stocke l'id dans characters.resources, pas le nom)
test('carte v2 : le nom de la ressource vient du catalogue (nom stable, 3 mondes)', () => {
  for (const mapId of [1, 2, 3]) for (let x = 0; x < 60; x++) for (let y = 0; y < 60; y++) {
    const t = terrain(x, y, mapId);
    expect(t.resourceId ? RES_BY_ID[t.resourceId].name : null).toBe(t.resource);
  }
});
// Miroir de stepCost (back/src/game/movement.ts) : 1 pas depuis la case de l'est = coût de la case cible uniquement.
// Le monde courant est global (`setWorld`) : on le fixe avant chaque bloc.
const find = (k, mapId) => { for (let x = 0; x < 200; x++) for (let y = 0; y < 200; y++) if (terrain(x, y, mapId).kind === k) return { x, y }; throw new Error(k); };
const stepInto = (c, o = {}) => pathEnergy({ x: c.x + 1, y: c.y }, c, o);
test('eau : peu profonde = 4 à pied, profonde interdite (mondes procéduraux)', () => {
  setWorld(2);
  expect(stepInto(find('shallow', 2))).toBe(4);
  expect(stepInto(find('deep', 2))).toBe(Infinity);
});
test('monture aquatique = 1 sur l’eau / rien sur terre ; monture volante = 1 partout', () => {
  setWorld(2);
  expect(stepInto(find('deep', 2), { aquatic: true })).toBe(1);
  expect(stepInto(find('plain', 2), { aquatic: true })).toBe(Infinity);
  expect(stepInto(find('mountain', 2), { flying: true })).toBe(1);
});
test('nouvelles cases du Monde des Hommes : aride = 2, volcan = 3 (traversable ; la brûlure se paie côté serveur)', () => {
  setWorld(1);
  expect(stepInto(find('arid', 1))).toBe(2);
  expect(stepInto(find('volcano', 1))).toBe(3);
  expect(stepInto(find('volcano', 1), { aquatic: true })).toBe(Infinity); // le volcan est une terre pour la monture aquatique
  expect(stepInto(find('volcano', 1), { flying: true })).toBe(1);
});
setWorld(1); // état global du miroir : on repart du Monde des Hommes
