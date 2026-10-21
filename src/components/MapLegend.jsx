import { RESOURCES, GROUPS } from '../lib/resources';
import './legend.css';
/** Légende des ressources : où trouver quoi. Les emplacements précis ne valent que pour le Monde des Hommes (carte 1). */
export default function MapLegend({ mapId }) {
  const human = mapId === 1;
  return <details className="reslegend" open>
    <summary>Ressources{human ? ' du Monde des Hommes' : ' (par type de terrain)'}</summary>
    {GROUPS.map(g => <section key={g.id}><h4>{g.label} <small>({g.kind})</small></h4>
      {RESOURCES.filter(r => r.group === g.id).map(r => <div key={r.id} className="resrow"><i style={{ background: r.color }} />
        <div><b>{r.name}</b>{r.rarity !== 'commun' && <span className="pill">{r.rarity}</span>}{human ? <small>{r.where}</small> : null}</div></div>)}</section>)}
    {human && <small className="resnote">Les ressources se récoltent depuis la case : eau profonde = navire, monture volante ou aquatique requis.</small>}
  </details>;
}
