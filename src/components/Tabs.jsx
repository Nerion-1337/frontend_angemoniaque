// Onglets des fenêtres de jeu (Hôtel de ville, Actions, Pactes, Invocations) : un seul onglet affiché ; le dernier choisi est retenu.
import { useState } from 'react';
/** Onglet retenu par fenêtre (localStorage, best effort) ; un onglet disparu (ex. Autel) retombe sur le premier. */
export function useTab(key, keys) {
  const read = () => { try { return localStorage.getItem(`tab:${key}`); } catch { return null; } };
  const [t, setT] = useState(read);
  const cur = keys.includes(t) ? t : keys[0];
  return [cur, v => { setT(v); try { localStorage.setItem(`tab:${key}`, v); } catch { /* stockage indisponible */ } }];
}
/** tabs : [[clé, libellé, Icône, badge?]] */
export function Tabs({ tabs, value, onChange, label }) {
  return <nav className="gtabs" role="tablist" aria-label={label}>{tabs.map(([k, l, I, n]) =>
    <button key={k} role="tab" aria-selected={value === k} className={value === k ? 'on' : ''} onClick={() => onChange(k)}>
      {I && <I size={15} />}<span>{l}</span>{n ? <em>{n}</em> : null}</button>)}</nav>;
}
