import { test, expect } from 'vitest';
import { ago, reSubject, groupChat } from '../src/lib/chat.js';
test('ago : relatif puis date', () => {
  const now = new Date('2026-11-25T15:00:00').getTime();
  expect(ago(now - 20e3, now)).toBe("à l'instant"); expect(ago(now - 5 * 60e3, now)).toBe('il y a 5 min'); expect(ago(now - 3 * 3600e3, now)).toBe('il y a 3 h');
  expect(ago('2026-11-25T08:05:00', now)).toBe("aujourd'hui 08:05"); expect(ago('2026-11-24T14:05:00', now)).toBe('hier 14:05');
  expect(ago('2026-03-12T09:30:00', now)).toBe('12/03 09:30'); expect(ago('n/a', now)).toBe('');
});
test('reSubject : « Re : » une seule fois', () => {
  expect(reSubject('Alliance')).toBe('Re : Alliance'); expect(reSubject('Re : Alliance')).toBe('Re : Alliance'); expect(reSubject('')).toBe('Re : (sans objet)');
});
test('groupChat : ordre chronologique, messages à moi, enchaînements du même auteur', () => {
  const g = groupChat([{ pseudo: 'B', created_at: '2026-01-01T10:03:00' }, { pseudo: 'A', created_at: '2026-01-01T10:00:00' }, { pseudo: 'A', created_at: '2026-01-01T10:01:00' }, { pseudo: 'A', created_at: '2026-01-01T10:20:00' }], 'A');
  expect(g.map(m => [m.pseudo, m.mine, m.cont])).toEqual([['A', true, false], ['A', true, true], ['B', false, false], ['A', true, false]]);
});
import fs from 'node:fs';
test('garde : messagerie sans alert() (erreurs en toast) ; paramètres dans la barre d\'accès, plus dans le coin', () => {
  const c = fs.readFileSync('src/components/ChatDock.jsx', 'utf8'), app = fs.readFileSync('src/App.jsx', 'utf8');
  expect(c.includes('alert(')).toBe(false); expect(c.includes("A.setPanel(panel === 'account'")).toBe(true); expect(app.includes('acctwrap')).toBe(false);
});
