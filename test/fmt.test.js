import { test, expect } from 'vitest'; import { fmt, wrapSel } from '../src/lib/fmt';
test('échappe le HTML (pas de balise qui passe)', () => expect(fmt('<script>alert(1)</script>')).toBe('&lt;script&gt;alert(1)&lt;/script&gt;'));
test('gras et italique', () => expect(fmt('**a** puis *b*')).toBe('<b>a</b> puis <i>b</i>'));
test('couleur : un #rrggbb isolé est affiché dans sa couleur', () => expect(fmt('salut #ff0000')).toBe('salut <span style="color:#ff0000">#ff0000</span>'));
test('un # hex dans un mot reste du texte', () => expect(fmt('pas #1234567')).toContain('#1234567'));
test('retours à la ligne', () => expect(fmt('a\nb')).toBe('a<br>b'));
test('null reste vide', () => expect(fmt(null)).toBe(''));
test('wrapSel : entoure la sélection (gras)', () => expect(wrapSel('salut monde', 6, 11, '**')).toEqual({ text: 'salut **monde**', cursor: 15 }));
test('wrapSel : sélection vide = paire de balises insérée au curseur', () => expect(wrapSel('ab', 2, 2, '*')).toEqual({ text: 'ab**', cursor: 4 }));
test('wrapSel : balises asymétriques', () => expect(wrapSel('x', 0, 1, '[', ']').text).toBe('[x]'));
test('sécurité : HTML brut entouré de ** reste échappé après fmt', () => expect(fmt(wrapSel('<img src=x>', 0, 11, '**').text)).toBe('<b>&lt;img src=x&gt;</b>'));


// Marqueur texte-coloré WYSIWYG `#rrggbb:text#` (édit. riche) + rétro-compat du code isolé historique
test('texte coloré : #rrggbb:text# est rendu en span coloré', () => expect(fmt('#ff0000:bonjour#')).toBe('<span style="color:#ff0000">bonjour</span>'));
test('texte coloré : imbriqué dans le gras (marqueur coloré avant gras)', () => expect(fmt('**#ff0000:mot#**')).toBe('<b><span style="color:#ff0000">mot</span></b>'));
test('texte coloré : code historique isolé inchangé (rétro-compat)', () => expect(fmt('salut #ff0000')).toBe('salut <span style="color:#ff0000">#ff0000</span>'));
test('sécurité : HTML dans un texte coloré reste échappé', () => expect(fmt('#ff0000:<img src=x>#')).toBe('<span style="color:#ff0000">&lt;img src=x&gt;</span>'));

// ---- Marqueurs de l'éditeur (barre d'outils : [g]/[i]/[rgb:R.G.B]) ----
test('[g] : gras', () => expect(fmt('[g]Gras[/g]')).toBe('<b>Gras</b>'));
test('[i] : italique', () => expect(fmt('[i]Ital[/i]')).toBe('<i>Ital</i>'));
test('[rgb:R.G.B] : texte coloré (168.133.52)', () => expect(fmt('[rgb:168.133.52]or[/rgb]')).toBe('<span style="color:rgb(168,133,52)">or</span>'));
test('[rgb] : canaux > 255 bornés à 255', () => expect(fmt('[rgb:999.0.300]x[/rgb]')).toBe('<span style="color:rgb(255,0,255)">x</span>'));
test('marqueurs nested : [rgb] contenant [g] (et [g] contenant [i])', () => {
  expect(fmt('[rgb:1.2.3][g]A[/g][/rgb]')).toBe('<span style="color:rgb(1,2,3)"><b>A</b></span>');
  expect(fmt('[g][i]A[/i][/g]')).toBe('<b><i>A</i></b>');
});
test('sécurité : HTML brut dans un marqueur reste échappé', () => expect(fmt('[g]<img src=x onerror=alert(1)>[/g]')).toBe('<b>&lt;img src=x onerror=alert(1)&gt;</b>'));
test('barre d\'outils : wrapSel [g]…[/g] sur la sélection, rendu par fmt', () => expect(fmt(wrapSel('salut', 0, 5, '[g]', '[/g]').text)).toBe('<b>salut</b>'));
test('barre d\'outils : couleur du sélecteur #rrggbb → [rgb:R.G.B] rendu par fmt', () => {
  const n = parseInt('c8a24a', 16), rgb = `${(n >> 16) & 255}.${(n >> 8) & 255}.${n & 255}`;
  expect(fmt(wrapSel('or', 0, 2, `[rgb:${rgb}]`, '[/rgb]').text)).toBe('<span style="color:rgb(200,162,74)">or</span>');
});
test('légate : les anciens marqueurs coexistent avec les nouveaux', () => expect(fmt('[g]**a**[/g] puis *b*')).toBe('<b><b>a</b></b> puis <i>b</i>'));
