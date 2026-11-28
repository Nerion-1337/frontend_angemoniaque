import { describe, test, expect } from 'vitest';
import { isTypeRow, changedOnly, buildingBody, buildingDraft } from '../src/admin/building';
// Lot du 2026-11-28 (3, migration 50) : types de structures / structures posées, réglages du coffre de la capitale.
describe('Types de structures, coffre', () => {
  test('liste « Types » : types et modèles sans position ; le reste est « Sur les cartes »', () => {
    expect([{ is_type: true }, { map_id: null }, { map_id: 1, type_id: 2 }, { map_id: null, home: { map: 1 } }, { map_id: null, type_id: 3 }].map(isTypeRow)).toEqual([true, true, false, false, false]);
  });
  test('structure posée : seules les valeurs modifiées partent (le reste suit le type)', () => {
    expect(changedOnly({ armor: 5, structure: 300, name: 'A', data: { race: 'human' }, kind: 'capital', model: null }, { armor: 5, structure: '200', name: 'A', data: { race: 'human' }, kind: 'capital', model: null }))
      .toEqual({ structure: 300 });
  });
  test('capitale : or par emplacement et coût (0 permis), race ; vides retirés', () => {
    const det = { kind: 'capital', data: { race: 'human', chestStart: 10 } }, dr = buildingDraft(det);
    expect(dr).toMatchObject({ race: 'human', goldPerSlot: '', slotCost: '' });
    expect(buildingBody({}, { ...dr, goldPerSlot: '1000', slotCost: '0' }).data).toEqual({ race: 'human', chestStart: 10, goldPerSlot: 1000, slotCost: 0 });
    expect(buildingBody({}, { ...dr, race: '' }).data).toEqual({ chestStart: 10 });
  });
});
