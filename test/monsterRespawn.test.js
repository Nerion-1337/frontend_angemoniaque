// Lot A : réapparition des monstres (fiche admin) — brouillon, corps PUT, résumé de la liste.
import { test, expect } from 'vitest';
import { respawnDraft, respawnBody, respawnSummary, MONSTER_GROUPS } from '../src/admin/monsterDetails.js';
import { FIELDS } from '../src/admin/entityFields.js';
test('corps : délai entier ≥ 0, conditions sans référence retirées, ids numériques sauf ressources', () => {
  const d = { ...respawnDraft({}), delayH: '-3', limits: [{ kind: 'item', ref: '7', max: '0' }, { kind: 'resource', ref: 'bois', max: 4 }, { kind: 'spell', ref: '', max: 1 }] };
  expect(respawnBody(d)).toEqual({ respawn: true, reincarnate_delay_h: 0, divine_family: null, respawn_limits: [{ kind: 'item', ref: 7, max: 1 }, { kind: 'resource', ref: 'bois', max: 4 }] });
});
test('résumé', () => {
  expect(respawnSummary({ respawn: false })).toBe('Non recréé après sa mort');
  expect(respawnSummary({ respawn: true, reincarnate_delay_h: 6, respawn_limits: [{}, {}] })).toBe('Réapparaît après 6 h · 2 condition(s)');
  expect(respawnSummary({ reincarnate_delay_h: 0 })).toBe('Réapparaît aussitôt');
});
test('fiche : plus de champ « Garde », chaque champ groupé existe', () => {
  const keys = FIELDS.monster.map(f => f[0]);
  expect(keys).not.toContain('guards_item');
  for (const [, ks] of MONSTER_GROUPS) for (const k of ks) expect(keys).toContain(k);
});
// Lot B : fusion monstres / montures — déplacement combinable, jamais vide.
import { toggleLoco, locoLabel } from '../src/admin/monsterDetails.js';
test('déplacement : bascule combinable, le dernier mode ne se retire pas', () => {
  expect(toggleLoco(['land'], 'air')).toEqual(['land', 'air']);
  expect(toggleLoco(['land', 'air'], 'land')).toEqual(['air']);
  expect(toggleLoco(['water'], 'water')).toEqual(['water']);
  expect(toggleLoco('', 'water')).toEqual(['land', 'water']);
  expect(locoLabel(['land', 'water'])).toBe('Terrestre + Aquatique'); expect(locoLabel(null)).toBe('Terrestre');
});
