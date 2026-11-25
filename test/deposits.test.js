// Secteurs de ressources (admin) : tirage miroir du back, parts par type de case, corps d'API, ressources naturelles.
import { test, expect } from 'vitest';
import { sectorDraft, sectorBody, zoneLabel, cellRoll, pickShare, shareTotals, overLimit, newShare, cellResource, sortSectors, naturalScan } from '../src/admin/deposits.js';
import { terrain } from '../src/lib/terrain';
test('cellRoll : mêmes valeurs que le serveur (back/test/deposits.test.ts)', () => {
  expect([cellRoll(0, 0, 1), cellRoll(12, 40, 3), cellRoll(199, 7, 25)]).toEqual([39, 66, 67]);
});
test('sectorBody : coins remis dans l’ordre, parts 1..100, type vide = toute case, stock borné', () => {
  const f = { ...sectorDraft(null, 2), name: ' Bois ', xMin: 9, yMin: 8, xMax: 3, yMax: 4,
    resources: [{ resource: 'lorien', kind: 'forest', percent: '150', stockMax: '10', stock: '50', regenPerH: '2', yieldPerHarvest: '0' }, { resource: 'mithril', kind: '', percent: '0', stockMax: 5, stock: 1, regenPerH: 0, yieldPerHarvest: 2 }] };
  expect(sectorBody(f, 2)).toEqual({ mapId: 2, name: 'Bois', active: true, xMin: 3, yMin: 4, xMax: 9, yMax: 8, resources: [
    { resource: 'lorien', kind: 'forest', percent: 100, stockMax: 10, stock: 10, regenPerH: 2, yieldPerHarvest: 1 },
    { resource: 'mithril', kind: null, percent: 1, stockMax: 5, stock: 1, regenPerH: 0, yieldPerHarvest: 2 }] });
  const back = { id: 4, name: 'X', active: false, map_id: 1, x_min: 1, x_max: 3, y_min: 2, y_max: 2, resources: [{ resource: 'a', kind: null, percent: 40, stock: 3, stock_max: 9, regen_per_h: 1, yield_per_harvest: 2 }] };
  expect(sectorDraft(back)).toMatchObject({ name: 'X', active: false, xMax: 3, resources: [{ resource: 'a', kind: '', percent: 40, stockMax: 9, stock: 3 }] });
  expect(sectorDraft(null, 1, { xMin: 5, yMin: 6, xMax: 7, yMax: 8 })).toMatchObject({ xMin: 5, yMax: 8, resources: [] });
});
test('parts : totaux par type de case, dépassement signalé, nouvelle ressource = reste disponible', () => {
  const sh = [{ resource: 'a', percent: 70, kind: 'forest' }, { resource: 'b', percent: 50, kind: '' }];
  expect(shareTotals(sh)).toMatchObject({ forest: 120, plain: 50 });
  expect(overLimit(sh)).toEqual(['Forêt 120 %']);
  expect(newShare('c', 'forest', [{ percent: 60, kind: 'forest' }]).percent).toBe(40);
  expect(newShare('c', '', [{ percent: 60, kind: 'forest' }, { percent: 20, kind: 'plain' }]).percent).toBe(40);
  expect(newShare('c', 'plain', [{ percent: 100, kind: '' }]).percent).toBe(1);
});
test('une seule ressource par case : secteur (le plus petit d’abord) sinon terrain naturel ; type de case respecté', () => {
  const big = { id: 1, active: true, x_min: 0, x_max: 49, y_min: 0, y_max: 49, resources: [{ resource: 'fer', percent: 100, kind: null }] };
  const small = { id: 2, active: true, x_min: 0, x_max: 4, y_min: 0, y_max: 4, resources: [{ resource: 'bois', percent: 100, kind: 'forest' }] };
  const sorted = sortSectors([big, small, { ...small, id: 3, active: false }]);
  expect(sorted.map(s => s.id)).toEqual([2, 1]);
  expect(cellResource(1, 1, { kind: 'forest', resourceId: 'x' }, sorted)).toMatchObject({ id: 'bois', sector: small });
  expect(cellResource(1, 1, { kind: 'plain', resourceId: 'x' }, sorted)).toMatchObject({ id: 'fer', sector: big });   // bois refusé hors forêt → secteur suivant
  expect(cellResource(80, 80, { kind: 'plain', resourceId: 'x' }, sorted)).toEqual({ id: 'x', sector: null });
  let n = 0; for (let x = 0; x < 40; x++) for (let y = 0; y < 40; y++) if (pickShare([{ resource: 'a', percent: 30 }], 'plain', x, y, 7)) n++;
  expect(n / 1600).toBeGreaterThan(0.25); expect(n / 1600).toBeLessThan(0.35);
});
test('naturalScan : ressources déjà présentes sur le Monde des Hommes, avec leur type de case dominant', () => {
  const nat = naturalScan(200, 200, (x, y) => terrain(x, y, 1));
  expect(nat.lorien.n).toBeGreaterThan(1000); expect(nat.lorien.kind).toBe('forest');
  expect(nat.yggdrasil.n).toBe(8);
});
test('zoneLabel', () => {
  expect(zoneLabel({ x_min: 1, x_max: 1, y_min: 2, y_max: 2 })).toBe('case 1, 2');
  expect(zoneLabel({ x_min: 1, x_max: 3, y_min: 2, y_max: 3 })).toBe('1–3 × 2–3 (6 cases)');
});
test('conditions de récolte : éditeur branché (objets équipés ou sac, sort), texte public sur la carte de case', async () => {
  const fs = await import('node:fs');
  const tab = fs.readFileSync(new URL('../src/admin/ResourcesTab.jsx', import.meta.url), 'utf8'), card = fs.readFileSync(new URL('../src/components/TileCard.jsx', import.meta.url), 'utf8');
  expect(tab).toMatch(/resource-rules\/\$\{id\}/); expect(tab).toMatch(/resource-stack\/\$\{id\}/); expect(tab).toMatch(/<ActivationEditor/);
  expect(card).toMatch(/noTool = canTry && miss\?\.length > 0/);   // pas équipé : pas d'action « Récolter »
  expect(card).toMatch(/if \(canTry && !noTool\) acts\.push\(\['harvest'/); expect(card).toMatch(/Vous n'êtes pas équipé pour récolter/);
  expect(card).toMatch(/Récolte : nécessite \{sc\.harvestNeeds\}/);
});
