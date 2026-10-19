import { test, expect } from 'vitest'; import { fmt } from '../src/lib/fmt';
test('échappe le HTML (pas de balise qui passe)', () => expect(fmt('<script>alert(1)</script>')).toBe('&lt;script&gt;alert(1)&lt;/script&gt;'));
test('gras et italique', () => expect(fmt('**a** puis *b*')).toBe('<b>a</b> puis <i>b</i>'));
test('couleur : un #rrggbb isolé est affiché dans sa couleur', () => expect(fmt('salut #ff0000')).toBe('salut <span style="color:#ff0000">#ff0000</span>'));
test('un # hex dans un mot reste du texte', () => expect(fmt('pas #1234567')).toContain('#1234567'));
test('retours à la ligne', () => expect(fmt('a\nb')).toBe('a<br>b'));
test('null reste vide', () => expect(fmt(null)).toBe(''));
