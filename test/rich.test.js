import { test, expect } from 'vitest'; import { toHex, richNodesToFmt } from '../src/lib/rich';
const T = v => ({ t: 'text', v });
const E = (tag, style, children) => ({ t: 'el', tag, style, children });
test('texte seul', () => expect(richNodesToFmt([T('bonjour')])).toBe('bonjour'));
test('gras', () => expect(richNodesToFmt([E('B', '', [T('mot')])])).toBe('**mot**'));
test('italique (EM accepté)', () => expect(richNodesToFmt([E('em', '', [T('mot')])])).toBe('*mot*'));
test('span coloré hex (normalisé minuscule)', () => expect(richNodesToFmt([E('SPAN', 'color:#FF0000', [T('mot')])])).toBe('#ff0000:mot#'));
test('span coloré rgb → hex', () => expect(richNodesToFmt([E('SPAN', 'color: rgb(0, 128, 255)', [T('mot')])])).toBe('#0080ff:mot#'));
test('gras > coloré : marqueurs nichés', () => expect(richNodesToFmt([E('B', '', [E('SPAN', 'color:#ff0000', [T('mot')])])])).toBe('**#ff0000:mot#**'));
test('coloré > gras : l\'inverse aussi', () => expect(richNodesToFmt([E('SPAN', 'color:#ff0000', [E('b', '', [T('mot')])])])).toBe('#ff0000:**mot**#'));
test('spans sans couleur : contenu seul, pas de attribut', () => expect(richNodesToFmt([E('SPAN', 'text-decoration:underline', [T('mot')])])).toBe('mot'));
test('balises interdites réduites à leur texte (img, script, a, attributs)', () => {
  const tree = [E('DIV', '', [E('IMG', 'src=x', []), T(' '), E('A', 'href=http://evil onmouseover=x', [T('lien')])])];
  expect(richNodesToFmt(tree)).toBe('lien');
});
test('multiligne : DIV/P et BR deviennent des sauts de ligne (fin nettoyée)', () => {
  expect(richNodesToFmt([E('DIV', '', [T('a')]), E('DIV', '', [T('b')]), { t: 'br' }], { multiline: true })).toBe('a\nb');
  expect(richNodesToFmt([T('a'), { t: 'br' }, T('b')], { multiline: true })).toBe('a\nb');
});
test('monoligne : les sauts de ligne deviennent des espaces', () => expect(richNodesToFmt([T('a'), { t: 'br' }, T('b')])).toBe('a b'));
test('wrapper vide : aucune balise produite', () => expect(richNodesToFmt([E('B', '', [])])).toBe(''));
test('toHex : rgb et hex', () => { expect(toHex('rgb(255,0,0)')).toBe('#ff0000'); expect(toHex('#FF0000')).toBe('#ff0000'); expect(toHex('#ABCDEF')).toBe('#abcdef'); });
