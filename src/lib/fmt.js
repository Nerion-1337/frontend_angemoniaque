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
/** Couleur : insère le code `#rrggbb` à la suite de la sélection (fmt.js l'affiche dans sa
 *  couleur) ; sélection vide → insertion du simple code à la position du curseur. */
export const colorSel = (value, s, e, hex) => {
  const sel = value.slice(s, e), glue = sel ? ' ' : '', code = sel ? `${glue}${hex}` : hex;
  return { text: value.slice(0, s) + sel + code + value.slice(e), cursor: s + sel.length + code.length }; };
