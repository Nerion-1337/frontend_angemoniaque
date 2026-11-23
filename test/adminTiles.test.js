// Section admin « Cases » : corps de requête, effet horaire (miroir back) et coûts admin dans l'estimation d'énergie.
import { test, expect, afterEach } from 'vitest';
import fs from 'node:fs';
import { tileBody, hpPerHour, spellSummary } from '../src/admin/tiles.js';
import { setTileCosts, costOf, spellLine } from '../src/lib/tiles.js';
afterEach(() => setTileCosts([]));
test('tileBody : sans sort → spellId et spellMode null ; nom nettoyé, coût numérique', () => {
  expect(tileBody({ name: ' Forêt ', description: 'x', energyCost: '3', spellId: '', spellMode: 'bonus' })).toEqual({ name: 'Forêt', description: 'x', energyCost: 3, spellId: null, spellMode: null });
  expect(tileBody({ name: 'Pic', energyCost: 2, spellId: '7', spellMode: 'malus' })).toMatchObject({ spellId: 7, spellMode: 'malus' });
});
test('effet horaire : miroir de tileHpDelta (back)', () => {
  expect(hpPerHour('bonus', 5)).toBe(5); expect(hpPerHour('malus', 5)).toBe(-5); expect(hpPerHour('malus', 0)).toBe(0);
  expect(spellSummary({ spell_id: 2, spell_name: 'Givre', spell_mode: 'malus', spell_damage: 3 })).toBe('Givre (-3 PV/h)');
  expect(spellLine({ name: 'Bénédiction', hpPerHour: 4 })).toBe('Bénédiction : +4 PV / heure');
  expect(spellLine(null)).toBeNull();
});
test('coûts admin du monde courant : priorité sur le coût du terrain', () => {
  expect(costOf({ kind: 'forest', cost: 2 })).toBe(2);
  setTileCosts([{ kind: 'forest', cost: 5 }]);
  expect(costOf({ kind: 'forest', cost: 2 })).toBe(5);
  expect(costOf({ kind: 'plain', cost: 1 })).toBe(1);
});
test('index : section « Cases » branchée ; textes admin rendus comme texte', () => {
  const s = fs.readFileSync('src/admin/index.jsx', 'utf8');
  expect(s.includes("['tiles', 'Cases']")).toBe(true); expect(s.includes('<TilesTab />')).toBe(true);
  for (const f of ['src/admin/TilesTab.jsx', 'src/components/TileCard.jsx']) expect(fs.readFileSync(f, 'utf8').includes('dangerouslySetInnerHTML')).toBe(false);
});
