// Classement des joueurs (rang puis XP) : public (#classement, avec ou sans compte) et en jeu (barre d'accès). Fiche joueur
// réutilisée par les demandes de pacte et de foi : pseudo, rang, race, guilde.
import { useEffect, useState } from 'react'; import { Trophy } from 'lucide-react';
import { api } from '../lib/api'; import { pager } from '../lib/forum.js';
export const RACE_NAME = { human: 'Humain', angel: 'Ange', demon: 'Démon', nephilim: 'Néphilim' };
/** Pseudo · rang · race · guilde (même informations que le classement). */
export const raceOf = p => p.race_name ?? RACE_NAME[p.race] ?? p.race;
export const PlayerCard = ({ p }) => <span className="pcard"><b>{p.pseudo}</b><small>{p.rank_name ?? '—'} · {raceOf(p)}{p.guild ? ` · ${p.guild}` : ''}</small></span>;

export const portraitUrl = pseudo => `/api/ranking/portrait/${encodeURIComponent(pseudo)}`;
/** Miniature de l'avatar (clic = agrandir) ; sans avatar : initiale sur la couleur de la race. */
const Avatar = ({ r, onZoom }) => r.has_portrait
  ? <button type="button" className="rk-av" title="Agrandir l'avatar" onClick={() => onZoom(r)}><img alt="" loading="lazy" src={portraitUrl(r.pseudo)} /></button>
  : <span className="rk-av none" aria-hidden="true">{r.pseudo.slice(0, 1).toUpperCase()}</span>;
export function RankingTable({ me }) {
  const [page, setPage] = useState(null), [data, setData] = useState(null), [err, setErr] = useState(''), [zoom, setZoom] = useState(null);
  useEffect(() => {   // première ouverture en jeu : la page du joueur ; ensuite la page demandée
    const q = page ? `page=${page}` : me ? `around=${encodeURIComponent(me)}` : 'page=1';
    api(`/ranking?size=25&${q}`).then(d => { setData(d); setErr(''); }).catch(e => setErr(e.message));
  }, [page, me]);
  if (err) return <p className="err">{err}</p>;
  if (!data) return <p className="fo-muted">Chargement du classement…</p>;
  return <div className="ranking">
    <p className="fo-muted">{data.total} joueurs, classés par rang puis par expérience.{data.position ? ` Vous êtes ${data.position}ᵉ.` : ''}</p>
    <div className="tablewrap"><table><thead><tr><th>#</th><th>Pseudo</th><th>Rang</th><th>Race</th><th>Guilde</th></tr></thead>
      <tbody>{data.rows.map(r => <tr key={r.pos} className={`race-${r.race}${r.pseudo === me ? ' me' : ''}`}><td>{r.pos}</td>
        <td><span className="rk-who"><Avatar r={r} onZoom={setZoom} /><b className="rk-name">{r.pseudo}</b></span></td><td>{r.rank_name}</td>
        <td><span className="rk-race"><i aria-hidden="true" />{raceOf(r)}</span></td><td>{r.guild ?? '—'}</td></tr>)}</tbody></table></div>
    {zoom && <div className="rk-zoom" role="dialog" aria-label={`Avatar de ${zoom.pseudo}`} onClick={() => setZoom(null)}>
      <figure className={`race-${zoom.race}`} onClick={e => e.stopPropagation()}><img alt={`Avatar de ${zoom.pseudo}`} src={portraitUrl(zoom.pseudo)} />
        <figcaption><b>{zoom.pseudo}</b> · {zoom.rank_name} · {raceOf(zoom)}</figcaption><button className="x" aria-label="Fermer" onClick={() => setZoom(null)}>×</button></figure></div>}
    {data.pages > 1 && <nav className="fo-pages" aria-label="Pages du classement">{pager(data.page, data.pages).map((p, i) => p === '…' ? <span key={i}>…</span>
      : <button key={i} className={p === data.page ? 'on' : ''} aria-current={p === data.page ? 'page' : undefined} onClick={() => setPage(p)}>{p}</button>)}</nav>}
  </div>;
}
export const RankingTitle = () => <h2 className="fo-h"><Trophy size={18} /> Classement</h2>;
