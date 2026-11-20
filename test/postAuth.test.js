import { test, expect } from 'vitest';
import { A, store } from '../src/store/index.js';
// api.js lit `localStorage` au chargement du module : on le stube AVANT de charger postAuth.
const backing = new Map();
globalThis.localStorage = { getItem: k => backing.get(k) ?? null, setItem: (k, v) => { backing.set(k, String(v)); }, removeItem: k => { backing.delete(k); } };
const { postAuth } = await import('../src/lib/postAuth.js');
test('connexion admin : token stocké, état auth (admin+role), et navigation vers l’interface admin (#admin)', () => {
  const p = postAuth({ token: 'tok-admin', admin: true, role: 'admin' }, 'admin@ange.local');
  expect(backing.get('token')).toBe('tok-admin');
  expect(p.hash).toBe('#admin');
  store.dispatch(A.setAuth(p.auth));
  expect(store.getState().game.auth).toEqual({ admin: true, role: 'admin', email: 'admin@ange.local' });
});
test('connexion joueur : pas de redirection (#admin), sélection de personnage', () => {
  const p = postAuth({ token: 'tok-player', admin: false, role: 'player' }, 'joueur@ange.local');
  expect(p.hash).toBeNull();
  store.dispatch(A.setAuth(p.auth));
  expect(store.getState().game.auth).toEqual({ admin: false, role: 'player', email: 'joueur@ange.local' });
});
test('inscription admin (ADMIN_EMAIL) : elle mène aussi à l’interface admin', () => {
  const p = postAuth({ token: 'tok-reg', admin: true, role: 'admin' }, 'admin-test@ange.local');
  expect(p.hash).toBe('#admin');
  expect(backing.get('token')).toBe('tok-reg');
});
