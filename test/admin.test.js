import { test, expect } from 'vitest';
import adminReducer, { Ad } from '../src/store/admin.js';
import { FIELDS, jsonOr } from '../src/admin/entityFields.js';
test('slice admin : navigation de section / entité et message', () => {
  let s = { section: 'dashboard', kind: 'item', list: null, detail: null, msg: '' };
  s = adminReducer(s, Ad.setSection('monster'));
  expect(s.section).toBe('monster'); expect(s.list).toBeNull();
  s = adminReducer(s, Ad.msg('erreur'));
  expect(s.msg).toBe('erreur');
  s = adminReducer(s, Ad.setDetail({ id: 3 }));
  expect(s.detail.id).toBe(3);
});
test("descripteurs de champs : chaque type d'entité couvre les règles transverses demandées", () => {
  for (const k of ['monster', 'item', 'building']) expect(FIELDS[k]).toBeTruthy();
  expect(FIELDS.mount).toBeUndefined();   // plus de montures (migration 43)
  expect(FIELDS.item.some(f => f[0] === 'durability')).toBe(true);
  expect(FIELDS.monster.map(f => f[0])).toEqual(expect.arrayContaining(['mountable', 'resummon_delay_h', 'locomotion', 'rarity', 'size']));
  expect(FIELDS.monster.some(f => ['speed', 'carry'].includes(f[0]))).toBe(false);
  expect(FIELDS.building.some(f => f[0] === 'structure')).toBe(true);
  expect(FIELDS.rank.some(f => f[0] === 'prereq_xp')).toBe(true);
  expect(FIELDS.rank.some(f => f[0] === 'multipliers')).toBe(true);
  expect(FIELDS.race.some(f => f[0] === 'base_stats')).toBe(true);
});
test('jsonOr : JSON tolérant (défaut si vide ou invalide)', () => {
  expect(jsonOr('{"a":1}')).toEqual({ a: 1 });
  expect(jsonOr('')).toBeNull();
  expect(jsonOr('{', 42)).toBe(42);
  expect(jsonOr('pas du json', 7)).toBe(7);
  expect(jsonOr({ behavior: 'passif' }, 7)).toEqual({ behavior: 'passif' });   // valeur de l'API non retouchée : enregistrable telle quelle
});
