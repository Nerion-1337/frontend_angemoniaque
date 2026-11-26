// Sections admin Foi / Pacte, classement public : helpers purs.
import { test, expect } from 'vitest';
import { faithBody, blessingCost, tierBody, tierExample } from '../src/admin/faithPact.js';
import { forumRoute, isForumHash } from '../src/lib/forum.js';
test('faithBody : bornes, bénédictions cochées seulement', () => {
  expect(faithBody({ followersStep: '0', xpHour: '-3', goldHour: '2', prayers: '1', prayerPeriodH: '0', blessings: { strength: { on: true, max: '5', maxH: '0', cost: '7' }, see: { on: false, max: 1, maxH: 1, cost: 1 } } }))
    .toEqual({ followersStep: 1, xpHour: 0, goldHour: 2, prayers: 1, prayerPeriodH: 1, blessings: { strength: { max: 5, maxH: 1, cost: 7 } } });
});
test('coût de bénédiction proportionnel arrondi au supérieur (miroir du back)', () => {
  expect(blessingCost({ max: 5, maxH: 10, cost: 10 }, 3, 4)).toBe(3); expect(blessingCost({ max: 5, maxH: 10, cost: 10 }, 5, 10)).toBe(10);
});
test('composition : bornes, exemple arrondi au supérieur', () => {
  expect(tierBody({ name: ' Fort ', xp_hour: '5', gold_hour: '5', percent: '130', duration_h: '0', cooldown_h: '-1' })).toEqual({ name: 'Fort', xp_hour: 5, gold_hour: 5, percent: 100, duration_h: 1, cooldown_h: 0 });
  expect(tierExample({ percent: 30 })).toBe('6 pour 20'); expect(tierExample({ percent: 12 })).toBe('3 pour 20');
});
test('#classement : page publique (avec ou sans compte)', () => {
  expect(forumRoute('#classement')).toEqual({ view: 'ranking' }); expect(isForumHash('#classement')).toBe(true);
});
