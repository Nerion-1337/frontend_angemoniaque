// Lot 4 : bâtiments (attaques possibles contre l'occupant, production fusionnée dans data).
import { test, expect } from 'vitest';
import { buildingBody, buildingDraft } from '../src/admin/building.js';
import { FIELDS } from '../src/admin/entityFields.js';
test('buildingBody : occupant_attack complet, production fusionnée dans data sans perdre les autres clés', () => {
  const b = buildingBody({ name: 'Tour', data: { storage: { bois: 50 }, production: { old: 9 } } }, { occupant_attack: { melee: false }, production: { bois: '3', fer: 0 } });
  expect(b.occupant_attack).toEqual({ melee: false, ranged: true, spell: true });
  expect(b.data).toEqual({ storage: { bois: 50 }, production: { bois: 3, fer: 1 } });
  expect(buildingBody({ name: 'X' }, { production: {} }).data).toEqual({});
});
test('buildingDraft isole la production ; FIELDS couvre armure, case occupable et bonus', () => {
  expect(buildingDraft({ id: 1, data: { production: { bois: 2 } } }).production).toEqual({ bois: 2 });
  for (const k of ['armor', 'occupiable', 'bonus_armor', 'bonus_see', 'bonus_range']) expect(FIELDS.building.some(f => f[0] === k)).toBe(true);
});
