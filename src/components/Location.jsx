import { useSelector } from 'react-redux'; import { MapPin } from 'lucide-react'; import { terrain } from '../lib/terrain';
import { WORLDS } from '../lib/worlds.js';
const KIND = { plain: 'Plaine', forest: 'Forêt', mountain: 'Montagne', shallow: 'Eau peu profonde', deep: 'Eau profonde', arid: 'Terre aride', snow: 'Pics glacés', ether: 'Pics d’éther', volcano: 'Volcan' };
export default function Location() {
  const me = useSelector(s => s.game.me); if (!me) return null; const P = me.actor.pos, t = terrain(P.x, P.y);
  return <section className="glass place"><MapPin size={18} /><div><b>{WORLDS[P.map_id]}</b><small>Case {P.x}, {P.y} · {t.zone ?? KIND[t.kind]} · Vision {me.actor.see}{me.actor.kind === 'summon' ? ' · ' + me.actor.name : ''}</small></div></section>;
}
