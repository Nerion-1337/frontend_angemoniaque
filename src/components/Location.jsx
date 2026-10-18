import { useSelector } from 'react-redux'; import { MapPin } from 'lucide-react'; import { terrain } from '../lib/terrain';
const WORLDS = { 1: 'Monde des Hommes', 2: 'Monde des Anges et des Démons', 3: 'Monde des Morts' }, KIND = { plain: 'Plaine', forest: 'Forêt', mountain: 'Montagne', shallow: 'Eau peu profonde', deep: 'Eau profonde' };
export default function Location() {
  const me = useSelector(s => s.game.me); if (!me) return null; const P = me.actor.pos, t = terrain(P.x, P.y);
  return <section className="glass place"><MapPin size={18} /><div><b>{WORLDS[P.map_id]}</b><small>Case {P.x}, {P.y} · {KIND[t.kind]} · Vision {me.actor.see}{me.actor.kind === 'summon' ? ' · ' + me.actor.name : ''}</small></div></section>;
}
