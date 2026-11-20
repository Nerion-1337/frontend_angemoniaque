import { test, expect } from 'vitest';
/**
 * Détails de monstre (Étape 2 phase 3) : aides pures du panneau (monsterDetails.js) +
 * gardes de régression source (contrat useEffect de bloc, DOM nesting thead/tbody).
 */
import { SLOTS, SLOT_LABEL, pickFilter, spellLabel, equipLabel, auraLabel, capsToMaxCaps, placeBody, respawnIn } from '../src/admin/monsterDetails.js';

test('SLOTS : les 7 slots du dossier (contrat CHECK de la migration 12)', () => {
  expect(SLOTS).toEqual(['mains', 'tete', 'torse', 'pieds', 'collier', 'bracelet', 'bague']);
  for (const s of SLOTS) expect(SLOT_LABEL[s], s).toBeTruthy();
});

test('pickFilter : recherche insensible à la casse sur le libellé', () => {
  const cats = [{ id: 1, name: 'Trait de Lumière' }, { id: 2, name: 'Fureur Céleste' }];
  expect(pickFilter(cats, '', s => s.name)).toHaveLength(2);
  expect(pickFilter(cats, 'lumiere', s => s.name)).toEqual([]);
  expect(pickFilter(cats, 'lumière', s => s.name)).toHaveLength(1);
  expect(pickFilter(cats, 'xxyyz', s => s.name)).toEqual([]);
  expect(pickFilter(cats, 'FUREUR', s => s.name)).toHaveLength(1);
});

test('spellLabel / equipLabel / auraLabel : libellés lisibles (slots, cible, périmètre)', () => {
  expect(spellLabel({ id: 3, name: 'Trait de Lumière', kind: 'attack', energy_cost: 12 })).toContain('Trait de Lumière (n°3)');
  expect(equipLabel({ item_id: 7, item_name: 'Épée', slot: 'mains' })).toBe('Épée — Mains');
  expect(equipLabel({ item_id: 7, item_name: 'Épée', slot: 'autre' })).toBe('Épée — autre');   // slot inconnu : brut
  expect(auraLabel({ spell_name: 'Fureur', target: 'ally', radius: 5 })).toContain('alliés');
  expect(auraLabel({ spell_name: 'Fureur', target: 'enemy', radius: 3 })).toContain('ennemis');
  expect(auraLabel({ spell_name: 'Fureur', target: 'enemy', radius: 3 })).toContain('rayon 3');
});

test('capsToMaxCaps : plafonds entity_caps → max dans le jeu / par joueur', () => {
  expect(capsToMaxCaps([{ scope: 'global', value: 4 }, { scope: 'per_player', value: 2 }])).toEqual({ inGame: 4, perPlayer: 2 });
  expect(capsToMaxCaps(null)).toEqual({ inGame: '', perPlayer: '' });
});

test('placeBody : conversion numérique, champs vides → undefined, cases cochées → booléens', () => {
  const b = placeBody({ monsterId: '3', mapId: '1', x: '40', y: '50', gold: '', items: true, resources: false, divine: true, reincarnateH: '' });
  expect(b).toEqual({ monsterId: 3, mapId: 1, x: 40, y: 50, gold: undefined, items: true, resources: false, divine: true, reincarnateH: undefined });
});

test('respawnIn : échéance lisible / monstre mort / aucune attente', () => {
  expect(respawnIn({ hp_current: 10 })).toBe(null);
  expect(respawnIn({ hp_current: 0 })).toBe('mort');
  expect(respawnIn({ hp_current: 0, respawn_due_at: new Date(Date.now() + 2 * 3600e3).toISOString() })).toBe('réincarne dans ~2 h');
});

test('gardiens source : le panneau MonsterDetails respecte le contrat useEffect de bloc et le nesting thead/tbody', async () => {
  const src = await (await import('../src/admin/MonsterDetails.jsx?raw')).default;
  expect(src).toMatch(/useEffect\(\(\) => \{ load\(\); \}, \[\]\)/);
  expect(src).not.toMatch(/useEffect\(\s*load\s*,/);
  for (const t of src.split('<table>').slice(1)) {
    const body = t.split('</table>')[0];
    expect(body, 'entêtes dans <thead>').toMatch(/<thead>[\s\S]*?<\/thead>/);
    expect(body, 'lignes dans <tbody>').toMatch(/<tbody>[\s\S]*?<\/tbody>/);
  }
});
