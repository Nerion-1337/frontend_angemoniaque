// Lot E : conditions d'activation d'un bâtiment (admin) — brouillon, corps, résumé.
import { test, expect } from 'vitest';
import { groupDraft, activationBody, activationSummary, buildingDraft, buildingBody } from '../src/admin/building.js';
test('corps : entiers bornés, objets sans id retirés, divin et sort facultatifs', () => {
  const g = { ...groupDraft(), items: [{ itemId: '5', qty: '0' }, { itemId: '', qty: 2 }], divineOn: true, divineFamily: '', divineCount: '3', spellId: '9', resources: { bois: '2' }, gold: '-4', minRank: '2', ranks: ['7'], consume: 1 };
  expect(activationBody([g, groupDraft()])).toEqual({ groups: [
    { items: [{ itemId: 5, qty: 1 }], divine: { family: null, count: 3 }, spellId: 9, resources: { bois: 2 }, gold: 0, minRank: 2, ranks: [7], consume: true },
    { items: [], divine: null, spellId: null, resources: {}, gold: 0, minRank: 0, ranks: [], consume: false }] });
});
test('fiche → brouillon → corps : options relues et renvoyées ; résumé', () => {
  const det = { id: 1, data: {}, activation: { groups: [{ divine: { family: 'relique', count: 3 } }, { minRank: 5, spellId: 2, consume: true }] } };
  const d = buildingDraft(det);
  expect(d.activationGroups).toHaveLength(2);
  expect(buildingBody({}, d).activation.groups[1]).toMatchObject({ minRank: 5, spellId: 2, consume: true });
  expect(activationSummary(det.activation)).toBe('option 1 : 3 objet(s) divin(s) relique — ou — option 2 : sort connu, rang ≥ 5 (consommés)');
  expect(activationSummary({ groups: [{}] })).toBe('sans condition');
});
