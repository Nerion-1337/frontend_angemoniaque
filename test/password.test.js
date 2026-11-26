import { test, expect } from 'vitest';
import { createHash } from 'node:crypto';
import { checklist, strength, passwordOk, bits } from '../src/lib/password.js';
import { solve, zeroBits } from '../src/lib/pow.js';
// Jauge et politique de mot de passe (miroir du back) ; preuve de travail.
test('critères cochés au fil de la saisie ; jauge croissante ; « Fort » seulement si accepté', () => {
  expect(checklist('').every(c => !c[1])).toBe(true);
  expect(passwordOk('azertyuiop12')).toBe(false); expect(passwordOk('Lune-Brisee-2026!')).toBe(true); expect(passwordOk('Martin-Lion-77!', 'martin@x.fr')).toBe(false);
  const seq = ['L', 'Lune', 'Lune-Bri', 'Lune-Brisee', 'Lune-Brisee-2026!'].map(p => strength(p).pct);
  for (let i = 1; i < seq.length; i++) expect(seq[i]).toBeGreaterThan(seq[i - 1]);
  expect(strength('Lune-Brisee-2026!').level).toBeGreaterThanOrEqual(3); expect(strength('abcdefghijklmnopqrstu').level).toBeLessThan(3);
  expect(bits('Lune-Brisee-2026!')).toBeGreaterThanOrEqual(60);
});
test('preuve de travail : le nonce trouvé satisfait la difficulté', async () => {
  const body = Buffer.from(JSON.stringify({ s: 'abc123', b: 10, e: Date.now() + 1e5 })).toString('base64url');
  const { nonce } = await solve(`${body}.sig`, { digest: async d => createHash('sha256').update(d).digest() });
  expect(zeroBits(createHash('sha256').update(`abc123:${nonce}`).digest())).toBeGreaterThanOrEqual(10);
});
