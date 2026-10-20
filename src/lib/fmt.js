/** Micro-formatage du texte du forum, rendu par innerHTML APRÈS échappement HTML (donc sûr).
 *  Marqueurs du nouvel éditeur (insertion par la barre d'outils) :
 *    [g]…[/g]            gras
 *    [i]…[/i]            italique
 *    [rgb:R.G.B]…[/rgb]  texte coloré (canal par canal, 0-255, au-delà : 255)
 *  Les anciens marqueurs restent interprétés (contenus existants) :
 *    `**gras**`, `*italique*`, `#rrggbb:text#` (texte coloré, époque WYSIWYG),
 *    un code `#rrggbb` isolé (affiché dans sa couleur — sémantique historique), `\n` → <br>.
 *  L'ordre des règles compte : les marqueurs de balises `[g]/[i]/[rgb]` d'abord (le contenu
 *  capturé passe ensuite dans les règles suivantes, les marqueurs se nichent les uns dans les
 *  autres) ; le code isolé historique reste inchangé (rétro-compatible). */
export const fmt = t => (t ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/\[g\]([\s\S]*?)\[\/g\]/g, '<b>$1</b>')
  .replace(/\[i\]([\s\S]*?)\[\/i\]/g, '<i>$1</i>')
  .replace(/\[rgb:(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]([\s\S]*?)\[\/rgb\]/g, (m, r, g, b, txt) =>
    `<span style="color:rgb(${[r, g, b].map(n => Math.min(255, +n)).join(',')})">${txt}</span>`)
  .replace(/#([0-9a-fA-F]{6}):([^#\n]*)#/g, '<span style="color:#$1">$2</span>')
  .replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>')
  .replace(/\*([^*\n]+)\*/g, '<i>$1</i>')
  .replace(/(^|\s)#([0-9a-fA-F]{6})(?=\s|$)/g, '$1<span style="color:#$2">#$2</span>')
  .replace(/\n/g, '<br>');
/** Entoure la sélection [s,e] de `value` avec `before`/`after` (défaut identique) : la barre
 *  d'outils n'insère QUE des balises texte supportées par `fmt` ([g]/[i]/[rgb:R.G.B]), jamais
 *  de HTML. Sélection vide → la paire de balises est insérée telle quelle. Retourne
 *  { text, cursor } (cursor = position de fin d'insertion, pour repositionner le curseur après
 *  le setState). */
export const wrapSel = (value, s, e, before, after = before) => {
  const sel = value.slice(s, e), text = value.slice(0, s) + before + sel + after + value.slice(e);
  return { text, cursor: s + before.length + sel.length + after.length }; };
