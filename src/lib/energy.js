import { terrain } from './terrain';
const water = k => k === 'shallow' || k === 'deep';
/** Énergie d'un trajet (8 directions) jusqu'à stopAt cases de la cible. Miroir de game/movement.ts :
 *  monture volante = 1/case ; navire / monture aquatique = 1 sur l'eau, rien sur terre ; sinon eau peu profonde = 4, eau profonde interdite. */
export function pathEnergy(from, to, { flying = false, aquatic = false, stopAt = 0 } = {}) {
  let { x, y } = from, cost = 0;
  while (x !== to.x || y !== to.y) {
    if (Math.max(Math.abs(x - to.x), Math.abs(y - to.y)) <= stopAt) break;
    x += Math.sign(to.x - x); y += Math.sign(to.y - y); const t = terrain(x, y);
    const c = flying ? 1 : aquatic ? (water(t.kind) ? 1 : Infinity) : t.kind === 'deep' ? Infinity : t.cost; if (!isFinite(c)) return Infinity; cost += c;
  } return cost;
}
export const COLORS = { plain: 0x4a7a46, forest: 0x2d5a30, mountain: 0x77777f, shallow: 0x4aa0b0, deep: 0x1b3f7a, arid: 0xc9a86a, snow: 0xe6eef7, ether: 0x3a3548, volcano: 0xd9481f };
