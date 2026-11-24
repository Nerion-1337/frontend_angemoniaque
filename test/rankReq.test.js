// Lot 3 : conditions de passage de rang (admin).
import { test, expect } from 'vitest';
import { reqDraft, reqBody, reqSummary } from '../src/admin/rankReq.js';
test('désactivé → {} ; activé → entiers bornés, objets sans id retirés', () => {
  expect(reqBody(reqDraft({}))).toEqual({});
  const d = { ...reqDraft({}), on: true, items: [{ itemId: '4', qty: '0' }, { itemId: '', qty: 2 }], resources: { bois: '3' }, energyCost: '-1', mode: 'temporary', durationH: '0', consume: false };
  expect(reqBody(d)).toEqual({ items: [{ itemId: 4, qty: 1 }], resources: { bois: 3 }, energyCost: 0, mode: 'temporary', durationH: 1, consume: false });
});
test('résumé', () => {
  expect(reqSummary({ items: [{ itemId: 1, qty: 2 }], resources: { a: 1 }, energyCost: 5, mode: 'temporary', durationH: 24, consume: false })).toBe('2 objet(s) · 1 ressource(s) · ⚡5 · temporaire 24 h · non consommés');
  expect(reqSummary({})).toBe('');
});
