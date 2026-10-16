import { useEffect, useState } from 'react'; import { useSelector, useDispatch } from 'react-redux'; import { api } from '../lib/api'; import { A } from '../store'; import { useRefreshMe } from './GameCanvas';
const DEFAULT = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="#333"/><circle cx="48" cy="38" r="18" fill="#888"/><rect x="20" y="62" width="56" height="30" rx="14" fill="#888"/></svg>');
const STAR = { head: [44, 2, 'Tête'], amulet: [44, 18, 'Collier'], chest: [44, 34, 'Plastron'], foot: [44, 78, 'Pieds'], weapon_main: [6, 30, 'Arme'], ring_l: [6, 48, 'Bague G'], bracelet_l: [6, 66, 'Bracelet G'],
  weapon_off: [82, 30, 'Bouclier'], ring_r: [82, 48, 'Bague D'], bracelet_r: [82, 66, 'Bracelet D'], bow: [44, 52, 'Arc/flèches'] };
function History({ id, close }) { const [h, set] = useState([]); useEffect(() => { api(`/characters/${id}/history`).then(set); }, []);
  return <div className="modal" onClick={close}><div className="scroll" onClick={e => e.stopPropagation()}><h3>📜 100 dernières actions</h3>{h.map((x, i) => <div key={i}><small>{new Date(x.created_at).toLocaleTimeString()}</small> {x.action}</div>)}</div></div>; }
function Inventory({ close }) {
  const { me } = useSelector(s => s.game), refresh = useRefreshMe(), d = useDispatch(), [inv, setInv] = useState(null), [sel, setSel] = useState(null); const load = () => api(`/inventory/${me.id}`).then(setInv); useEffect(() => { load(); }, []);
  const act = async f => { try { await f(); await load(); await refresh(); } catch (e) { d(A.toast(e.message)); } };
  const eq = s => inv?.items.find(i => i.equipped_slot === s); const bag = inv?.items.filter(i => !i.equipped_slot) ?? [];
  const click = s => act(async () => { const e = eq(s); if (e) await api('/inventory/equip', { characterId: me.id, itemId: e.id, slot: null }); else if (sel) { await api('/inventory/equip', { characterId: me.id, itemId: sel, slot: s }); setSel(null); } });
  const Sq = ({ s, label }) => <div className={'sq' + (eq(s) ? ' full' : '')} title={label} onClick={() => click(s)}>{eq(s)?.name ?? ''}</div>;
  const up = st => act(() => api(`/characters/${me.id}/upgrade/${st}`, undefined, 'POST'));
  return <div className="modal" onClick={close}><div className="inv" onClick={e => e.stopPropagation()}>
    <div className="sum">{['hp_max', 'energy_max', 'divine_energy_max', 'recovery', 'see', 'strength', 'agility'].map(k => <span key={k}>{k} <b>{me[k]}</b> <button onClick={() => up(k)}>+</button></span>)} <span>XP <b>{me.xp}</b></span> <span>{JSON.stringify(me.resources)}</span></div>
    <div className="invbody"><div><div className="star">{Object.entries(STAR).map(([s, [x, y, l]]) => <div key={s} style={{ left: x + '%', top: y + '%' }} className="slot"><Sq s={s} label={l} /></div>)}</div>
      <div className="specials">{Array.from({ length: inv?.specialSlots ?? 4 }, (_, i) => <Sq key={i} s={`special_${i + 1}`} label={`Spécial ${i + 1}`} />)}</div></div>
      <div className="bag">{Array.from({ length: 20 }, (_, i) => { const it = bag[i]; return <div key={i} className={'sq' + (it?.id === sel ? ' sel' : '')} onClick={() => it && setSel(it.id)} title={it?.slot}>{it?.name ?? ''}</div>; })}</div></div></div></div>;
}
export default function SidePanel() {
  const { me } = useSelector(s => s.game), refresh = useRefreshMe(), [modal, setModal] = useState(null); if (!me) return null;
  const pick = e => { const f = e.target.files[0]; if (!f) return; const img = new Image(); img.onload = async () => { const c = document.createElement('canvas'); c.width = c.height = 128; c.getContext('2d').drawImage(img, 0, 0, 128, 128); await api(`/characters/${me.id}/portrait`, { data: c.toDataURL('image/jpeg', .8) }); refresh(); }; img.src = URL.createObjectURL(f); };
  return <aside><img src={me.portrait ?? DEFAULT} onClick={() => setModal('inv')} /><label className="chg">changer<input type="file" accept="image/*" hidden onChange={pick} /></label>
    <div className="pseudo" onClick={() => setModal('inv')}>{me.pseudo}</div><button className="ico" title="Historique" onClick={() => setModal('hist')}>📜</button>
    {modal === 'hist' && <History id={me.id} close={() => setModal(null)} />}{modal === 'inv' && <Inventory close={() => setModal(null)} />}</aside>;
}
