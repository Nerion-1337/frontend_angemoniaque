// Lot 5 : gisements (admin).
import { test, expect } from 'vitest';
import { depositDraft, depositBody, zoneLabel } from '../src/admin/deposits.js';
test('depositBody : case unique → max = min ; rectangle remis dans l’ordre ; stock borné', () => {
  expect(depositBody({ ...depositDraft(), resource: 'bois', xMin: 5, yMin: 6, xMax: 99, yMax: 99, stockMax: '10', stock: '50' }, 2))
    .toEqual({ mapId: 2, xMin: 5, yMin: 6, xMax: 5, yMax: 6, resource: 'bois', stockMax: 10, stock: 10, regenPerH: 1, yieldPerHarvest: 1, active: true });
  expect(depositBody({ ...depositDraft(), shape: 'rect', resource: 'fer', xMin: 9, yMin: 4, xMax: 3, yMax: 8, yieldPerHarvest: 0 }, 1))
    .toMatchObject({ xMin: 3, xMax: 9, yMin: 4, yMax: 8, yieldPerHarvest: 1 });
});
test('zoneLabel et brouillon', () => {
  expect(zoneLabel({ x_min: 1, x_max: 1, y_min: 2, y_max: 2 })).toBe('case 1, 2');
  expect(zoneLabel({ x_min: 1, x_max: 3, y_min: 2, y_max: 3 })).toBe('1–3 × 2–3 (6 cases)');
  expect(depositDraft({ x_min: 1, x_max: 3, y_min: 2, y_max: 2 }).shape).toBe('rect');
});
