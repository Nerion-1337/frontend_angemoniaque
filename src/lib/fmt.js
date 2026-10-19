/** Micro-formatage du texte du forum, rendu par innerHTML APRÈS échappement HTML (donc sûr) :
 *  `**gras**`, `*italique*`, un code `#rrggbb` isolé (affiché dans sa couleur), `\n` → <br>. */
export const fmt = t => (t ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>')
  .replace(/\*([^*\n]+)\*/g, '<i>$1</i>')
  .replace(/(^|\s)#([0-9a-fA-F]{6})(?=\s|$)/g, '$1<span style="color:#$2">#$2</span>')
  .replace(/\n/g, '<br>');
