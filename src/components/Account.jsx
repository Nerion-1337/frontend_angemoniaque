import { useState } from 'react'; import { useSelector, useDispatch } from 'react-redux'; import { Lock, UserPlus, Clock, Shield, LogOut } from 'lucide-react'; import { api, setToken } from '../lib/api'; import { A } from '../store'; import { useData, useDo } from '../lib/hooks'; import { Panel } from './Panels';
export default function Account() {
  const { me, auth } = useSelector(s => s.game), d = useDispatch(), run = useDo(), [list, load] = useData('/characters'), [pseudo, setPseudo] = useState(''); const race = list?.[0]?.race ?? me.race;
  return <Panel title="Compte & paramètres" wide><h4>Personnages du compte ({list?.length ?? 0}/3) <span className="pill">Race unique : {race}</span></h4>
    <div className="item"><small>Personnage actif (pseudo non modifiable)</small><div><b>{me.pseudo}</b> <Lock size={13} /> · {me.rank.rank_name}</div></div>
    {list?.map(c => <button key={c.id} className={'row2 sel' + (c.id === me.id ? ' on' : '')} onClick={() => { d(A.setMe(null)); d(A.setChar(c.id)); d(A.setPanel(null)); }}><span>{c.pseudo}</span><small>({c.x},{c.y})</small></button>)}
    {(list?.length ?? 0) < 3 && <div className="row"><input placeholder="Pseudo du nouveau héros…" value={pseudo} onChange={e => setPseudo(e.target.value)} /><button className="primary" onClick={() => run(() => api('/characters', { pseudo, race }), () => { setPseudo(''); load(); })}><UserPlus size={14} /> Créer</button></div>}
    {auth?.admin && <><h4>Administration</h4><div className="item row2"><div><b>Simuler la mise à jour horaire (+1 h)</b><br /><small>Régénère Vie et Énergie du héros, de sa monture et des invocations ; +XP/h et +Or/h.</small></div><button onClick={() => run(() => api('/admin/tick', undefined, 'POST'), () => d(A.toast('+1 heure appliquée')))}><Clock size={14} /> +1 h</button></div>
      <a className="item row2" href="#admin"><span><b>Espace administrateur</b><br /><small>Joueurs, blocage, téléportation, création d'objets/boss.</small></span><Shield size={18} /></a></>}
    <button className="danger wide" onClick={() => { setToken(null); location.reload(); }}><LogOut size={14} /> Déconnexion</button></Panel>;
}
