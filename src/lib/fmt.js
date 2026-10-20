/** Micro-formatage du texte du forum, rendu par innerHTML APRÈS échappement HTML (donc sûr) :
 *  `**gras**`, `*italique*`, un code `#rrggbb` isolé (affiché dans sa couleur), `\n` → <br>. */
export const fmt = t => (t ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>')
  .replace(/\*([^*\n]+)\*/g, '<i>$1</i>')
  .replace(/(^|\s)#([0-9a-fA-F]{6})(?=\s|$)/g, '$1<span style="color:#$2">#$2</span>')
  .replace(/\n/g, '<br>');
/** Entoure la sélection [s,e] de `value` avec `before`/`after` (défaut identique) : la barre
 *  d'outils n'insère QUE des balises texte supportées par `fmt`, jamais de HTML.
 *  Sélection vide → la paire de balises est insérée telle quelle. Retourne { text, cursor }
 *  (cursor = position de fin d'insertion, pour repositionner le curseur après le setState). */
export const wrapSel = (value, s, e, before, after = before) => {
  const sel = value.slice(s, e), text = value.slice(0, s) + before + sel + after + value.slice(e);
  return { text, cursor: s + before.length + sel.length + after.length }; };
/** Couleur : insère le code `#rrggbb` à la suite de la sélection. Garantit TOUJOURS un espace
 *  ASCII AVANT le code (c'est ce dont `fmt` a besoin pour le colorer dans l'aperçu) ; si le
 *  curseur est juste après un code existant → le REMPLACE (changement de couleur) ; clic
 *  idempotent sur le même code = aucun changement. */
export const colorSel = (value, s, e, hex) => {
  if (s === e && /#[0-9a-fA-F]{6}$/.test(value.slice(0, s))) {
    const start = s - 7;
    return { text: value.slice(0, start) + hex + value.slice(s), cursor: start + hex.length };
  }
  const sel = value.slice(s, e);
  const last = sel ? sel.slice(-1) : value[s - 1];
  const pre = last !== undefined && !/\s/.test(last) ? ' ' : '';
  const text = value.slice(0, s) + sel + pre + hex + value.slice(e);
  return { text, cursor: s + sel.length + pre.length + hex.length };
};
