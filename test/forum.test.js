import { test, expect } from 'vitest';
import { forumRoute, isForumHash, accessBadges, ago, pager, googleReturn } from '../src/lib/forum.js';
// Forum public : routes par hash, badges d'accès, dates relatives, pagination, retour de la connexion Google.
test('routes du forum et des pages légales', () => {
  expect(forumRoute('#forum')).toEqual({ view: 'home' }); expect(forumRoute('#forum/c/3')).toEqual({ view: 'category', id: 3, page: 1 });
  expect(forumRoute('#forum/t/9/2')).toEqual({ view: 'topic', id: 9, page: 2 }); expect(forumRoute('#forum/mod')).toEqual({ view: 'mod' });
  expect(forumRoute('#legal')).toEqual({ view: 'legal', key: 'cgu' }); expect(forumRoute('#histoire')).toEqual({ view: 'story' }); expect(forumRoute('#legal/privacy')).toEqual({ view: 'legal', key: 'privacy' });
  expect(isForumHash('#admin')).toBe(false); expect(isForumHash('')).toBe(false); expect(isForumHash('#forum/t/x')).toBe(true);
});
test('badges d’accès d’une catégorie', () => {
  expect(accessBadges({ read_access: 'public', post_access: 'staff', races: [], min_rank: 1 }).map(b => b[0])).toEqual(['Lecture publique', 'Publié par l\'équipe']);
  expect(accessBadges({ read_access: 'members', post_access: 'members', races: ['demon', 'angel'], min_rank: 3, locked: true, hidden: true }).map(b => b[0]))
    .toEqual(['Membres', 'Démons, Anges', 'Rang 3+', 'Verrouillée', 'Masquée']);
});
test('dates relatives, pagination, retour Google', () => {
  const now = Date.parse('2026-11-26T12:00:00Z');
  expect(ago('2026-11-26T11:59:30Z', now)).toBe('à l\'instant'); expect(ago('2026-11-26T11:55:00Z', now)).toBe('il y a 5 min'); expect(ago('2026-11-26T09:00:00Z', now)).toBe('il y a 3 h');
  expect(ago('2026-11-20T09:00:00Z', now)).toMatch(/^20\/11\/2026 /);
  expect(pager(1, 3)).toEqual([1, 2, 3]); expect(pager(6, 12)).toEqual([1, '…', 5, 6, 7, '…', 12]); expect(pager(1, 12)).toEqual([1, 2, '…', 12]);
  expect(googleReturn('#google-token=abc.def')).toEqual({ token: 'abc.def' }); expect(googleReturn('#google-error=Session%20expir%C3%A9e')).toEqual({ error: 'Session expirée' });
  expect(googleReturn('#forum')).toBeNull();
});
