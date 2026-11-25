// Niveaux verticaux : chaque case est une colonne de cubes. Niveau 0 = sol par défaut ; eau peu profonde −1 (−2 au bord de l'eau
// profonde) ; eau profonde −4 ; massifs (montagne, glace, éther, volcan) de +1 au bord à +5 au cœur ; les arbres occupent +1 à +3 ;
// le ciel est à +8 (créatures volantes). Affichage seulement : le serveur ne connaît pas encore les niveaux.
import { terrain } from './terrain';
export const LEVEL_H = 0.5, SKY = 8, WATER_Y = -0.12, FLY_Y = SKY * LEVEL_H;
const ROCK = new Set(['mountain', 'snow', 'ether', 'volcano']);
const memo = new Map();
/** Un voisin à distance de Chebyshev exactement r vérifie f(kind) ? */
const ring = (x, y, m, r, f) => { for (let i = -r; i <= r; i++) for (const [dx, dy] of [[i, -r], [i, r], [-r, i], [r, i]]) if (f(terrain(x + dx, y + dy, m).kind)) return true; return false; };
/** Niveau du sommet de la colonne de la case (entier, −4 à +5). */
export function levelAt(x, y, m) {
  const k = `${m}:${x},${y}`; let v = memo.get(k); if (v !== undefined) return v;
  const t = terrain(x, y, m);
  if (t.kind === 'deep') v = -4;
  else if (t.kind === 'shallow') v = ring(x, y, m, 1, kd => kd === 'deep') ? -2 : -1;
  else if (ROCK.has(t.kind)) { v = 5; if (t.flat) v = 1; else for (let r = 1; r <= 4; r++) if (ring(x, y, m, r, kd => !ROCK.has(kd))) { v = r; break; } }
  else v = 0;
  if (memo.size > 300000) memo.clear(); memo.set(k, v); return v;
}
/** Hauteur (unités de scène) du dessus de la colonne ; position d'une entité au sol (à la surface sur l'eau). */
export const topY = (x, y, m) => levelAt(x, y, m) * LEVEL_H;
export const standY = (x, y, m) => Math.max(topY(x, y, m), WATER_Y);
export const levelLabel = l => (l > 0 ? `+${l}` : `${l}`);
