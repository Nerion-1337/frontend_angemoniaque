import { test, expect } from 'vitest'; import { lastChef } from '../src/lib/guild';
const R = [{ id: 1, name: 'Chef', is_leader: true }, { id: 2, name: 'Officier', is_leader: false }, { id: 3, name: 'Membre', is_leader: false }];
const g = (leader, members) => ({ me: { leader, rank: leader ? 'Chef' : 'Membre' }, ranks: R, members });
test('le seul porteur du rang Chef est le dernier Chef', () => expect(lastChef(g(true, [{ id: 1, rank_id: 1 }, { id: 2, rank_id: 3 }]))).toBe(true));
test('un second porteur du rang Chef le libère', () => expect(lastChef(g(true, [{ id: 1, rank_id: 1 }, { id: 2, rank_id: 1 }]))).toBe(false));
test('un non-Chef n\'est jamais le dernier Chef', () => expect(lastChef(g(false, [{ id: 1, rank_id: 1 }, { id: 2, rank_id: 3 }]))).toBe(false));
