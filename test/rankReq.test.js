// Conditions de passage de rang (admin) : deux voies indépendantes, définitive et temporaire.
import { test, expect } from 'vitest';
import { reqDraft, reqBody, reqSummary } from '../src/admin/rankReq.js';
test('voies décochées → null ; cochées → entiers bornés, objets sans id retirés ; les deux à la fois', () => {
  expect(reqBody(reqDraft({}))).toEqual({ permanent: null, temporary: null });
  const d = reqDraft({});
  d.permanent = { ...d.permanent, on: true, items: [{ itemId: '4', qty: '0' }, { itemId: '', qty: 2 }], energyCost: '-1' };
  d.temporary = { ...d.temporary, on: true, resources: { bois: '3' }, durationH: '0', consume: false };
  expect(reqBody(d)).toEqual({
    permanent: { items: [{ itemId: 4, qty: 1 }], resources: {}, energyCost: 0, consume: true },
    temporary: { items: [], resources: { bois: 3 }, energyCost: 0, consume: false, durationH: 1 } });
});
test('brouillon depuis l\'API et résumé', () => {
  const r = { permanent: { items: [{ itemId: 1, qty: 2 }], resources: { a: 1 }, energyCost: 5, consume: true }, temporary: { items: [], resources: {}, energyCost: 0, consume: false, durationH: 24 } };
  const d = reqDraft(r);
  expect([d.permanent.on, d.temporary.on, d.temporary.durationH]).toEqual([true, true, 24]);
  expect(reqSummary(r)).toBe('définitif (2 objet(s), 1 ressource(s), ⚡5, consommés) · temporaire 24 h (non consommés)');
  expect(reqSummary({})).toBe('');
});
