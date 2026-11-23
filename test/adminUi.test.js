// Refonte du back-office : toasts typés (succès / erreur), recherche locale, confirmation des suppressions.
import { test, expect } from 'vitest';
import fs from 'node:fs';
import adminReducer, { Ad } from '../src/store/admin.js';
import { matches } from '../src/admin/ui.jsx';
test('slice admin : Ad.ok = toast succès, Ad.msg = toast erreur', () => {
  let s = adminReducer(undefined, { type: '@init' });
  expect(s.tone).toBe('err');
  s = adminReducer(s, Ad.ok('Enregistré')); expect(s).toMatchObject({ msg: 'Enregistré', tone: 'ok' });
  s = adminReducer(s, Ad.msg('boom')); expect(s).toMatchObject({ msg: 'boom', tone: 'err' });
});
test('recherche locale : insensible à la casse et aux accents, vide = tout', () => {
  expect(matches('', 'x')).toBe(true);
  expect(matches('epee', 'Épée runique')).toBe(true);
  expect(matches('DRAG', null, 'dragon')).toBe(true);
  expect(matches('loup', 'Ours')).toBe(false);
});
test('suppressions : chaque panneau demande confirmation avant DELETE', () => {
  for (const f of ['Entities', 'ItemsTab', 'SpellsTab', 'Races', 'MonsterDetails']) {
    const s = fs.readFileSync(`src/admin/${f}.jsx`, 'utf8');
    expect(s.includes('confirmDel('), f).toBe(true);
  }
});
test('Objets / Sorts : « Éditer » ouvre la ligne (open reçoit la ligne, pas son id)', () => {
  for (const f of ['ItemsTab', 'SpellsTab']) {
    const s = fs.readFileSync(`src/admin/${f}.jsx`, 'utf8');
    expect(s.includes('open(r.id)'), f).toBe(false);
    expect(s.includes('open(r)'), f).toBe(true);
  }
});
