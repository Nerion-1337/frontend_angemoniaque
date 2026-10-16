import { test, expect } from 'vitest'; import { terrain } from '../src/lib/terrain'; import { pathEnergy } from '../src/lib/energy';
test('terrain déterministe', () => expect(terrain(12, 34)).toEqual(terrain(12, 34)));
test('énergie : ligne droite = somme des coûts', () => { const e = pathEnergy({ x: 0, y: 0 }, { x: 3, y: 0 }, { flying: true }); expect(e).toBe(3); });
test('stopAt réduit le trajet', () => expect(pathEnergy({ x: 0, y: 0 }, { x: 4, y: 0 }, { flying: true, stopAt: 1 })).toBe(3));
