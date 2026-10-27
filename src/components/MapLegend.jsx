import { RESOURCES, GROUPS } from '../lib/resources';
import { ZONES2, RES2_BY_ID, SIDES } from '../lib/resources2';
import './legend.css';
const hex = n => '#' + n.toString(16).padStart(6, '0');
/** Monde Anges & Démons : une ligne par ZONE de sol (même couleur que sur la carte) et ce qu'on y récolte — le sol affiché et la récolte viennent du même catalogue. */
function LegendAngDem() {
  return <details className="reslegend" open>
    <summary>Terres des Anges et des Démons</summary>
    {Object.entries(SIDES).map(([s, label]) => <section key={s}><h4>{label}</h4>
      {ZONES2.filter(z => z.side === s).map(z => <div key={z.id} className="resrow"><i style={{ background: hex(z.ground) }} />
        <div><b>{z.label}</b>{z.kind === 'volcano' && <span className="pill">brûlure 10/h</span>}<small>{z.res.map(([id, w]) => RES2_BY_ID[id].name + (w < 20 ? ' (rare)' : '')).join(' · ')}</small></div></div>)}</section>)}
    <small className="resnote">Chaque couleur de la carte est une zone : ce qui y pousse ou y affleure est ce que vous pouvez y récolter. Eau profonde : navire, monture volante ou aquatique requis.</small>
  </details>;
}
/** Légende des ressources : où trouver quoi. Les emplacements précis ne valent que pour le Monde des Hommes (carte 1) ; le monde 2 a sa légende par zones. */
export default function MapLegend({ mapId }) {
  if (mapId === 2) return <LegendAngDem />;
  const human = mapId === 1;
  return <details className="reslegend" open>
    <summary>Ressources{human ? ' du Monde des Hommes' : ' (par type de terrain)'}</summary>
    {GROUPS.map(g => <section key={g.id}><h4>{g.label} <small>({g.kind})</small></h4>
      {RESOURCES.filter(r => r.group === g.id).map(r => <div key={r.id} className="resrow"><i style={{ background: r.color }} />
        <div><b>{r.name}</b>{r.rarity !== 'commun' && <span className="pill">{r.rarity}</span>}{human ? <small>{r.where}</small> : null}</div></div>)}</section>)}
    {human && <small className="resnote">Les ressources se récoltent depuis la case : eau profonde = navire, monture volante ou aquatique requis.</small>}
  </details>;
}
