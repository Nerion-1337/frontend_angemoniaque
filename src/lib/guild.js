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
