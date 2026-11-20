import { test, expect } from 'vitest';
import { SLOTS, slotAllowed, pickFilter, spellLabel, capLabel, equipLabel, capsToMaxCaps, placeBody, linkedLabel, respawnIn } from '../src/admin/monsterDetails.js';
const fs = await import('node:fs');

test('SLOTS : les 7 parties du corps (contrat CHECK des migrations 12/13, style personnage)', () => {
  expect(SLOTS).toEqual(['mains', 'tete', 'torse', 'pieds', 'collier', 'bracelet', 'bague']);
});
test('slotAllowed : liste vide = aucune restriction ; sinon le slot doit y figurer', () => {
  expect(slotAllowed([], 'mains')).toBe(true);
  expect(slotAllowed(null, 'mains')).toBe(true);
  expect(slotAllowed(['mains', 'tete'], 'tete')).toBe(true);
  expect(slotAllowed(['mains', 'tete'], 'bague')).toBe(false);
});
test('pickFilter : recherche insensible à la casse (catalogues avec menu déroulant)', () => {
  const spells = [{ id: 1, name: 'Brûler' }, { id: 2, name: 'Foudre' }];
  expect(pickFilter(spells, '', s => s.name)).toHaveLength(2);
  expect(pickFilter(spells, 'br', s => s.name)).toHaveLength(1);
  expect(pickFilter(spells, 'FOUD', s => s.name)).toHaveLength(1);
});
test('spellLabel + capLabel : actives / passives (cible + périmètre, en continu)', () => {
  expect(spellLabel({ id: 7, name: 'Foudre', energy_cost: 3 })).toBe('Foudre (n°7) · 3 énergie');
  expect(capLabel({ spell_id: 7, name: 'Foudre', mode: 'active', kind: 'combat' })).toBe('Foudre (n°7) · combat');
  expect(capLabel({ spell_id: 7, name: 'Foudre', mode: 'passive', target: 'enemy', radius: 3 }))
    .toBe('Foudre (n°7) · CONTINU (ennemis) · rayon 3');
  expect(capLabel({ spell_id: 7, name: 'Foudre', mode: 'passive', target: 'ally', radius: 5 }))
    .toContain('alliés');
});
test('equipLabel : objet du catalogue + partie du corps', () => {
  expect(equipLabel({ item_name: 'Épée brisée', slot: 'mains' })).toBe('Épée brisée — Mains');
  expect(equipLabel({ item_id: 9 })).toBe('objet n°9');
});
test('capsToMaxCaps : plafonds (entity_caps) → inGame / perPlayer', () => {
  expect(capsToMaxCaps([])).toEqual({ inGame: '', perPlayer: '' });
  expect(capsToMaxCaps([{ scope: 'global', value: 5 }, { scope: 'per_player', value: 2 }]))
    .toEqual({ inGame: 5, perPlayer: 2 });
});
test('placeBody : conversions numériques + options par défaut', () => {
  const b = placeBody({ monsterId: '5', mapId: '2', x: '12', y: '8', gold: '50', items: true, resources: false, divine: '', reincarnateH: '' });
  expect(b).toEqual({ monsterId: 5, mapId: 2, x: 12, y: 8, gold: 50, items: true, resources: false, divine: false });
  expect(b.reincarnateH).toBeUndefined();
});
test('linkedLabel : lié à un personnage ou natif', () => {
  expect(linkedLabel({ linked: false })).toBe('natif');
  expect(linkedLabel({ linked: true, linked_pseudo: 'Alba' })).toBe('lié à Alba');
  expect(linkedLabel({ linked: true })).toContain('un personnage');
});
test('respawnIn : mort / échéance / null', () => {
  expect(respawnIn({ hp_current: 0 })).toBe('mort');
  expect(respawnIn({ hp_current: 5, respawn_due_at: new Date(Date.now() + 3 * 3600e3).toISOString() })).toBe('réincarne dans ~3 h');
  expect(respawnIn({ hp_current: 5 })).toBeNull();
});
// ── Garde-fous source ──
test('guardes : useEffect en corps de bloc + thead/tbody dans MonsterDetails (pas de crash ni de warning DOM)', () => {
  const s = fs.readFileSync('src/admin/MonsterDetails.jsx', 'utf8');
  expect(s.includes('useEffect(() => { load(); }, [])')).toBe(true);
  expect(s.includes('useEffect(load')).toBe(false);
  const tables = (s.match(/<table>/g) || []).length, heads = (s.match(/<thead>/g) || []).length, bodies = (s.match(/<tbody>/g) || []).length;
  expect(heads).toBe(tables); expect(bodies).toBe(tables);
});
test('guardes : MiniMap dessine le terrain depuis lib/terrain et renvoie les cases au clic', () => {
  const s = fs.readFileSync('src/admin/MiniMap.jsx', 'utf8');
  expect(s.includes("import { terrain } from '../lib/terrain'")).toBe(true);
  expect(s.includes('onPick(x, y)')).toBe(true);
});
