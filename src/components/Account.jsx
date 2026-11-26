// Compte & paramètres : personnage actif, personnages du compte (changer, créer), administration, session.
import { useState } from 'react'; import { useSelector, useDispatch } from 'react-redux';
import { Lock, UserPlus, Clock, Shield, LogOut, Play, MapPin, Users, ChevronRight } from 'lucide-react';
import { api, setToken } from '../lib/api'; import { A } from '../store'; import { useData, useDo } from '../lib/hooks'; import { Panel } from './Panels';
const RACE = { human: 'Humain', angel: 'Ange', demon: 'Démon' };
export const raceName = k => RACE[k] ?? k;
export default function Account() {
  const { me, auth } = useSelector(s => s.game), d = useDispatch(), run = useDo(), [list, load] = useData('/characters'), [pseudo, setPseudo] = useState('');
  const [info, loadInfo] = useData('/characters/races'), [pick, setPick] = useState('');   // races créables pour CE compte (admin : toutes, joueur : la sienne)
  const allowed = info?.races.filter(r => r.allowed) ?? [], race = allowed.some(r => r.key === pick) ? pick : info?.locked ?? allowed.find(r => r.key === me.race)?.key ?? allowed[0]?.key ?? '';
  const max = auth?.admin ? null : allowed.find(r => r.key === race)?.max ?? null, full = !!info && !allowed.length;
  const play = c => { d(A.setMe(null)); d(A.setChar(c.id)); d(A.setPanel(null)); };
  const create = e => { e.preventDefault(); run(() => api('/characters', { pseudo: pseudo.trim(), race }), () => { setPseudo(''); load(); loadInfo(); d(A.toast('Personnage créé')); }); };
  return <Panel title="Compte & paramètres" wide>
    <section className="acc-card hero">
      <div className="avatar" aria-hidden="true">{me.pseudo.slice(0, 1).toUpperCase()}</div>
      <div className="grow"><b className="name">{me.pseudo} <Lock size={13} aria-label="pseudo définitif" /></b>
        <small>{raceName(me.race)} · {me.rank?.rank_name ?? '—'}</small>
        <small><MapPin size={12} /> Case {me.pos?.x}, {me.pos?.y}</small></div>
      <span className="pill">Actif</span>
    </section>

    <h4><Users size={15} /> Vos personnages <small>{list?.length ?? 0}{max != null ? ` / ${max}` : ''} {info?.locked ? ` · race unique : ${raceName(info.locked)}` : ''}</small></h4>
    <div className="acc-list">{list?.map(c => <div key={c.id} className={`acc-char${c.id === me.id ? ' on' : ''}`}>
      <div className="avatar sm" aria-hidden="true">{c.pseudo.slice(0, 1).toUpperCase()}</div>
      <div className="grow"><b>{c.pseudo}</b><small>Case {c.x}, {c.y}</small></div>
      {c.id === me.id ? <span className="pill">En jeu</span> : <button className="sm" onClick={() => play(c)}><Play size={13} /> Jouer</button>}</div>)}</div>
    {!full && <form className="acc-new" onSubmit={create}>
      {allowed.length > 1 && <div className="acc-races" role="radiogroup" aria-label="Race du nouveau personnage">{allowed.map(r =>
        <button type="button" role="radio" aria-checked={race === r.key} key={r.key} className={`chip race-${r.key}${race === r.key ? ' on' : ''}`} onClick={() => setPick(r.key)}>{r.name ?? raceName(r.key)}</button>)}</div>}
      <input placeholder="Pseudo du nouveau personnage (définitif)" maxLength={20} value={pseudo} onChange={e => setPseudo(e.target.value)} />
      <button className="primary" disabled={!pseudo.trim() || !race}><UserPlus size={14} /> Créer</button></form>}
    {full && <p className="note">Limite de personnages atteinte pour ce compte.</p>}

    {auth?.admin && <><h4><Shield size={15} /> Administration</h4>
      <div className="acc-card"><div className="grow"><b>Simuler l'heure suivante</b><small>Régénération, gains par heure, effets horaires.</small></div>
        <button onClick={() => run(() => api('/admin/tick', undefined, 'POST'), () => d(A.toast('+1 heure appliquée')))}><Clock size={14} /> +1 h</button></div>
      <a className="acc-card link" href="#admin"><div className="grow"><b>Espace administrateur</b><small>Joueurs, contenus du jeu, cartes.</small></div><ChevronRight size={18} /></a></>}

    <h4>Session</h4>
    <button className="danger wide" onClick={async () => { await api('/auth/logout', undefined, 'POST').catch(() => {}); setToken(null); location.reload(); }}><LogOut size={14} /> Se déconnecter</button>
  </Panel>;
}
