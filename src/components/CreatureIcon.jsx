// Médaillon d'une créature (monstre, invocation, monture) : glyphe de lib/creatureIcons en fond, initiales du nom par-dessus ;
// teinte selon le milieu (air / terre / eau).
import { Cat, Dog, Skull, Ghost, Bug, TreePine, Mountain, Turtle, Fish, Rabbit, Snail, Worm, Flame, Snowflake, PawPrint } from 'lucide-react';
const L = { Cat, Dog, Skull, Ghost, Bug, TreePine, Mountain, Turtle, Fish, Rabbit, Snail, Worm, Flame, Snowflake, PawPrint };
import { ICON, initials, iconKey } from '../lib/creatureIcons.js'; import { designFor, habitatOf } from '../lib/creatureCatalog.js';
export function Glyph({ k, size = 24 }) {
  const ic = ICON[k] ?? ICON.paw;
  if (ic.lucide) { const C = L[ic.lucide] ?? L.PawPrint; return <C size={size} strokeWidth={1.7} />; }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ic.d.map((d, i) => <path key={i} d={d} />)}</svg>;
}
/** `c` = { name, icon, model, locomotion, flying } ; `size` en px. */
export default function CreatureIcon({ c, size = 30, title }) {
  const D = designFor({ model: c?.model, name: c?.name, loco: c?.locomotion, flying: c?.flying }), hab = D?.hab ?? habitatOf(c?.locomotion, c?.flying), k = iconKey(c?.icon, D, hab);
  return <span className={`cicon hab-${hab}`} style={{ '--s': `${size}px` }} title={title ?? c?.name} aria-label={c?.name}>
    <span className="cicon-g"><Glyph k={k} size={Math.round(size * 0.78)} /></span><b>{initials(c?.name)}</b></span>;
}
