/** Sérialisation et commandes de l'éditeur riche (WYSIWYG, contentEditable) du forum.
 *  Le stockage reste le format texte `fmt` (marqueurs `**gras**`, `*italique*`,
 *  `#rrggbb:text#` texte coloré, `#rrggbb` code historique, `\n`) ; ce module fait la
 *  navette DOM ↔ marqueurs avec une liste blanche stricte : seul <b>/<i> et
 *  <span style="color:#hex"> (ou rgb) passent — tout autre HTML (balises,
 *  attributs, gestionnaires) est réduit à son texte. Le rendu d'affichage
 *  reste EXCLUSIVEMENT `fmt()` (échappement d'abord) — jamais de HTML brut. */
/** `rgb(r,g,b)` → `#rrggbb` (le sélecteur de couleur natif peut produire des rgb). */
export const toHex = c => {
  const m = /rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})/i.exec(c);
  if (!m) return c.toLowerCase();
  return '#' + [m[1], m[2], m[3]].map(x => (+x).toString(16).padStart(2, '0')).join('');
};
/** Arborescence nœuds purs (pas de DOM) : [{ t:'text', v } | { t:'br' } |
 *  { t:'el', tag, style, children }] → chaine de marqueurs `fmt` (tests unitaires). */
export const richNodesToFmt = (nodes, opts = {}) => {
  const ser = list => {
    let out = '';
    for (const n of list ?? []) {
      if (n.t === 'text') out += n.v;
      else if (n.t === 'br') out += '\n';
      else if (n.t === 'el') {
        const inner = ser(n.children), tag = (n.tag || '').toUpperCase();
        if (tag === 'B' || tag === 'STRONG') out += inner.trim() ? `**${inner}**` : '';
        else if (tag === 'I' || tag === 'EM') out += inner.trim() ? `*${inner}*` : '';
        else if (tag === 'SPAN') {
          const m = /color:\s*(#[0-9a-fA-F]{6}|rgba?\([^)]+\))/i.exec(n.style || '');
          if (m) out += inner.trim() ? `#${toHex(m[1]).replace(/^#/, '')}:${inner}#` : '';
          else out += inner; // span inconnu → contenu seul (strict)
        }
        else if (tag === 'DIV' || tag === 'P') out += inner ? `${inner}\n` : '';
        else out += inner; // toute autre balise → texte uniquement (pas de passage d'attribut)
      }
    }
    return out;
  };
  let s = ser(nodes);
  if (!opts.multiline) s = s.replace(/\n+/g, ' ').trim(); // champ monoligne : pas de saut de ligne
  return s.replace(/\n+$/g, '');
};
/** DOM contentEditable → arborescence nœuds (glue navigateur, non testable sous node). */
const domTree = el => {
  const walk = n => {
    const out = [];
    n.childNodes.forEach(ch => {
      if (ch.nodeType === 3) out.push({ t: 'text', v: ch.nodeValue });
      else if (ch.nodeType === 1) {
        if (ch.tagName === 'BR') out.push({ t: 'br' });
        else out.push({ t: 'el', tag: ch.tagName, style: ch.getAttribute?.('style') || '', children: walk(ch) });
      }
    });
    return out;
  };
  return walk(el);
};
/** Édition → texte de stockage : `richToFmt(el)` (monoligne par défaut ;
 *  `{ multiline: true }` pour les descriptions) → passe par `onSave` dans InlineField. */
export const richToFmt = (el, opts = {}) => richNodesToFmt(domTree(el), opts);
/** Couleur « comme dans Word » : applique la couleur au SEUL contenu sélectionné du
 *  contentEditable (pas de code `#hex` visible nulle part) :
 *  - sélection à l'intérieur d'un seul span coloré → même couleur : DÉFAIT, sinon CHANGE la couleur ;
 *  - sinon → enveloppe la sélection dans un <span style="color:hex"> (Range API), en retirant
 *    d'abord les spans colorés internes (une seule couleur par zone → la sérialisation reste
 *    saine, sans marqueurs imbriqués) ;
 *  - sélection vide → insère un espace coloré (le clavier qui suit est coloré). */
export const applyColorToSelection = (el, hex) => {
  el.focus();
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || !sel.anchorNode) return;
  const range = sel.getRangeAt(0);
  const colorSpanOf = n => { let c = n.nodeType === 3 ? n.parentElement : n;
    while (c && c !== el) {
      if (c.tagName === 'SPAN' && /color:/i.test(c.getAttribute('style') || '')) return c;
      c = c.parentElement;
    }
    return null; };
  const span = colorSpanOf(range.startContainer);
  if (span && span.contains(range.endContainer)) {
    const same = toHex(span.style.color || '') === hex.toLowerCase();
    if (same) span.replaceWith(...span.childNodes);      // décocher : retire le span
    else span.setAttribute('style', `color:${hex}`);       // changer de couleur sur place
    el.dispatchEvent(new Event('input', { bubbles: true }));
    return;
  }
  if (range.collapsed) {                                    // sélection vide : espace coloré
    document.execCommand('insertHTML', false, `<span style="color:${hex}"> </span>`);
    return;
  }
  const frag = range.extractContents();                      // wrapper total, couleur unique
  frag.querySelectorAll('span[style*="color"]').forEach(s => s.replaceWith(...s.childNodes));
  const s = document.createElement('span');
  s.setAttribute('style', `color:${hex}`);
  s.appendChild(frag);
  range.insertNode(s);
  const r2 = document.createRange();
  r2.selectNodeContents(s);
  sel.removeAllRanges();
  sel.addRange(r2);
};
