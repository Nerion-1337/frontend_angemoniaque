// Types de case du monde courant (section admin « Cases ») : coût d'énergie, nom, description, sort passif.
// Rempli par TileCard depuis GET /map/{id}/tile-types ; vide = constantes du terrain (t.cost).
let COSTS = {};
export const setTileCosts = list => { COSTS = Object.fromEntries((list ?? []).map(t => [t.kind, t.cost])); };
/** Coût d'un pas sur la case : valeur admin du monde courant, sinon le coût du terrain. */
export const costOf = t => COSTS[t.kind] ?? t.cost;
/** Ligne « effet continu » d'un sort passif de case (null si aucun). */
export const spellLine = s => (s ? `${s.name ?? 'Sort'} : ${s.hpPerHour > 0 ? '+' : ''}${s.hpPerHour} PV / heure` : null);
