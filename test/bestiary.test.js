import { test, expect } from 'vitest';
import { lootLabel, spawnBody } from '../src/admin/bestiary.js';
test('lootLabel : objet classique / divin / ressource', () => {
  expect(lootLabel({ item_name: 'Épée' })).toBe('objet Épée');
  expect(lootLabel({ divine_kind: 'relique', divine_ref: 3 })).toBe('divin relique n°3');
  expect(lootLabel({ divine_kind: 'arcane', divine_ref: 7 })).toBe('divin arcane n°7');
  expect(lootLabel({ resource: 'bois' })).toBe('ressource bois');
});
test('spawnBody : conversion numérique des champs de règle', () => {
  const b = spawnBody({ mapId: '1', xMin: '100', yMin: '100', xMax: '104', yMax: '104', maxInstances: '2', intervalH: '1', probability: '50' });
  expect(b).toEqual({ mapId: 1, xMin: 100, yMin: 100, xMax: 104, yMax: 104, maxInstances: 2, intervalH: 1, probability: 50 });
});
