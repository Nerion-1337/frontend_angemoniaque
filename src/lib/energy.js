import { terrain } from './terrain';
/** Énergie d'un trajet en ligne (8 directions) jusqu'à stopAt cases de la cible ; Infinity si lac (sauf vol). Miroir de game/movement.ts */
export function pathEnergy(from, to, { flying = false, stopAt = 0 } = {}) {
  let { x, y } = from, cost = 0;
  while (x !== to.x || y !== to.y) {
    if (Math.max(Math.abs(x - to.x), Math.abs(y - to.y)) <= stopAt) break;
    x += Math.sign(to.x - x); y += Math.sign(to.y - y);
    const t = terrain(x, y); if (t.cost >= 99 && !flying) return Infinity; cost += flying ? 1 : t.cost;
  } return cost;
}
export const COLORS = { plain: 0x4a7a46, forest: 0x2d5a30, mountain: 0x77777f, lake: 0x2f5f9f };
