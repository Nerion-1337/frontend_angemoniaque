// Lot 1 : parchemins de fabrication (admin) et boutique par race.
import { test, expect } from 'vitest';
import { recipeDraft, recipeBody, resLabel } from '../src/admin/scrolls.js';
import { shopLabel } from '../src/admin/shop.jsx';
import { itemBody } from '../src/admin/divine.js';
test('recipeBody : nouveau parchemin nommé, entiers bornés, quantité 1 hors objets', () => {
  const f = { ...recipeDraft(), newScrollName: ' Plan ', targetKind: 'building', targetId: '4', qtyOut: 5, resources: { bois: '3', fer: 0 }, energyCost: '-2', divineEnergyCost: '4' };
  expect(recipeBody(f)).toEqual({ targetKind: 'building', targetId: 4, qtyOut: 1, resources: { bois: 3, fer: 1 }, consumeScroll: true, atCapital: false, energyCost: 0, divineEnergyCost: 4, newScrollName: 'Plan' });
});
test('recipeBody : recette existante → garde son parchemin', () => {
  const f = recipeDraft({ id: 1, scroll_item_id: 9, target_kind: 'item', target_id: 2, qty_out: 3, resources: { bois: 2 }, consume_scroll: false, at_capital: true, energy_cost: 5 });
  expect(recipeBody(f)).toMatchObject({ scrollItemId: 9, qtyOut: 3, consumeScroll: false, atCapital: true, energyCost: 5 });
  expect(resLabel([{ id: 'bois', name: 'Bois' }], 'bois')).toBe('Bois'); expect(resLabel([], 'x')).toBe('x');
});
test('boutique : libellé et corps d’objet', () => {
  const races = [{ key: 'angel', name: 'Ange' }];
  expect(shopLabel(false, [], races)).toBe('—'); expect(shopLabel(true, '[]', races)).toBe('Toutes races'); expect(shopLabel(true, ['angel'], races)).toBe('Ange');
  expect(itemBody({ name: 'X', shop: true, shop_races: ['angel'], shop_stock: '7' })).toMatchObject({ shop: true, shop_races: ['angel'], shop_stock: 7 });
  expect(itemBody({ name: 'X', shop: false, shop_races: ['angel'] })).toMatchObject({ shop: false, shop_races: [] });
});
