import { describe, test, expect } from 'vitest';
import { activationsBody, elementDraft } from '../src/admin/building';
import { passes, shopEntries, NO_FILTER } from '../src/lib/shopFilter';
import { peaceAt, peaceBlock, harmfulFx } from '../src/lib/peace';
import { activeLine, doorLines } from '../src/lib/doors';
// Lot du 2026-11-28 (suite) : éléments d'activation, filtres de l'Hôtel de ville, zones de paix grisées.
describe('Activation des structures, filtres, zones de paix', () => {
  test('éléments : or toujours payé, sort jamais consommé, définitif = null, références vides retirées', () => {
    expect(elementDraft(null)).toMatchObject({ kind: 'gold', forever: false, consume: true });
    expect(activationsBody([
      { kind: 'gold', ref: '', qty: '10', hours: '2', forever: false, consume: false },
      { kind: 'item', ref: '7', qty: '0', hours: '0', forever: false, consume: false },
      { kind: 'spell', ref: 3, qty: 5, hours: 1, forever: true, consume: true },
      { kind: 'xp', ref: '', qty: 500, hours: 1, forever: false, consume: false },
      { kind: 'divine', ref: '', qty: 1, hours: 1 },
    ])).toEqual([
      { kind: 'gold', ref: null, qty: 10, hours: 2, consume: true },
      { kind: 'item', ref: 7, qty: 1, hours: 0.1, consume: false },
      { kind: 'spell', ref: 3, qty: 1, hours: null, consume: false },
      { kind: 'xp', ref: null, qty: 500, hours: 1, consume: false },
    ]);
  });
  test('filtres : catégorie et rareté (absente = commun) ; boutique triée par prix, sorts compris', () => {
    const sword = { cat: 'objet', rarity: 'rare' }, res = { cat: 'ressource' };
    expect(passes(sword, NO_FILTER)).toBe(true); expect(passes(sword, { cat: 'sort', rar: 'all' })).toBe(false);
    expect(passes(sword, { cat: 'all', rar: 'rare' })).toBe(true); expect(passes(res, { cat: 'ressource', rar: 'commun' })).toBe(true); expect(passes(res, { cat: 'all', rar: 'rare' })).toBe(false);
    expect(shopEntries({ items: [{ id: 1, name: 'B', price: 20 }], spells: [{ id: 1, name: 'A', price: 5 }] }).map(e => `${e.type}${e.id}`)).toEqual(['spell1', 'item1']);
  });
  test('zones de paix : attaquant ou cible dedans → raison ; la structure elle-même hors de sa zone ; sorts offensifs', () => {
    const z = [{ id: 9, name: 'Tour', x: 10, y: 10, r: 2 }];
    expect(peaceAt(z, 12, 12)?.name).toBe('Tour'); expect(peaceAt(z, 13, 10)).toBeNull(); expect(peaceAt(z, 10, 10, 9)).toBeNull();
    expect(peaceBlock(z, { x: 20, y: 20 }, { x: 11, y: 10 })).toBe('Attaque annulée : la cible est dans la zone de non-combat de Tour');
    expect(peaceBlock(z, { x: 13, y: 10 }, { x: 10, y: 10 }, 9)).toBeNull(); expect(peaceBlock(z, { x: 11, y: 11 }, { x: 30, y: 30 })).toBe('Attaque annulée : vous êtes dans la zone de non-combat de Tour');
    expect([harmfulFx({ kind: 'attack' }), harmfulFx({ effects: { damage: 5 } }), harmfulFx({ effects: { dot: { dmg: 1 } } }), harmfulFx({ kind: 'buff', effects: { heal: 4 } })]).toEqual([true, true, true, false]);
  });
  test('état d’activation lisible, porte activée définitivement', () => {
    expect(activeLine({ forever: true })).toBe('Activée définitivement.'); expect(activeLine({ active: true, open_in_s: 3600 })).toBe('Activée : encore 1 h.'); expect(activeLine({})).toBe('Non activée.');
    expect(doorLines({ realm: 'human', leads_to: 'angel', forever: true, facing: [{ name: 'Arche', open: true, forever: true, placed: true }] }).slice(1)).toEqual(["Activée définitivement (elle laisse venir l'autre monde).", "Franchissable : Arche (définitivement) ouverte de l'autre côté."]);
  });
});
