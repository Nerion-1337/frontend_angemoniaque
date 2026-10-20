/** Intégrité des rangs (miroir de back/src/routes/guilds.ts) : le dernier porteur du rang Chef
 *  ne peut ni quitter la guilde ni changer de rang tant qu'un autre membre n'a pas ce rang. */
export const lastChef = g => g.me.leader && g.members.filter(m => g.ranks.find(r => r.id === m.rank_id)?.is_leader).length === 1;
const ADD = Symbol('carte ajout');
/** Liste d'affichage des rangs : la carte « Ajouter un rang » est insérée en position `addPos` (défaut : en dernier). */
export const displayRanks = (ids, addPos) => { const p = Math.max(0, Math.min(addPos ?? ids.length, ids.length));
  return [...ids.slice(0, p).map(id => ({ id })), { add: true }, ...ids.slice(p).map(id => ({ id }))]; };
/** Échange d'une ligne (rang ou carte d'ajout) dans l'affichage : renvoie les nouveaux ids de rangs
 *  (à persister via POST /guilds/reorder kind 'ranks') et la nouvelle position de la carte d'ajout (état local). */
export const moveRankRow = (ids, addPos, i, dir) => { const L = displayRanks(ids, addPos); const j = i + dir;
  if (j < 0 || j >= L.length) return { ids, addPos };
  const n = [...L]; [n[i], n[j]] = [n[j], n[i]];
  return { ids: n.filter(r => !r.add).map(r => r.id), addPos: n.findIndex(r => r.add) }; };
/** Déplace la ligne d'affichage `from` vers l'indice d'insertion `to` (drag & drop, 0..rows.length) :
 *  renvoie les ids de rangs (sans la carte d'ajout, à persister via POST /guilds/reorder kind 'ranks')
 *  et la nouvelle position de la carte d'ajout (état local). */
export const dropRankRow = (ids, addPos, from, to) => {
  const n = displayRanks(ids, addPos); const [x] = n.splice(from, 1);
  n.splice(Math.max(0, Math.min(to > from ? to - 1 : to, n.length)), 0, x);
  return { ids: n.filter(r => !r.add).map(r => r.id), addPos: n.findIndex(r => r.add) }; };
/** Ordre cible des rangs à la création d'un nouveau rang (`newId`, créé en fin de liste par l'API) :
 *  l'insère au-dessus (défaut) ou en dessous de la carte d'ajout (position d'affichage `addPos`),
 *  renvoie la liste d'ids à persister via POST /guilds/reorder (kind 'ranks') — vide de différence si l'ordre ne change pas. */
export const insertRankTarget = (ids, addPos, newId, below) => {
  const p = addPos == null ? ids.length : addPos;
  const ins = Math.max(0, Math.min(p + (below ? 1 : 0), ids.length + 1));
  const n = [...ids]; n.splice(Math.min(ins, n.length), 0, newId); return n; };
/** Droits d'écriture effectifs d'un sujet : sa `write_ranks` (NULL = hérite de la catégorie,
 *  `{}` = explicitement personne hors Chef), repli sur `write_ranks` de la catégorie si NULL. */
export const effWrite = (topic, folder) => topic.write_ranks === null ? (folder.write_ranks ?? []) : (topic.write_ranks ?? []);
/** Droit d'édition titre/description d'un SUJET (miroir de back `/guilds/topics/{id}/edit`) :
 *  auteur du sujet, détenteur de create_topics, ou porteur du droit d'écriture de la catégorie
 *  parente ; `gme` = `g.me` (leader/rank/permissions), `uid` = id du personnage courant. */
export const canEditTopic = (t, f, gme, uid) => gme.leader || t.author_id === uid || !!gme.permissions?.create_topics || (f.write_ranks ?? []).includes(gme.rank);
