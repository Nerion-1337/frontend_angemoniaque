// Éléments partagés du back-office : toast auto-masqué, en-tête de panneau, état vide, confirmation.
import { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';

/** Demande confirmation avant une action destructive (suppression). */
export const confirmDel = what => window.confirm(`Supprimer ${what} ? Cette action est définitive.`);

/** Toast en bas à droite : vert (ok) ou rouge (err), masqué après 4 s (6 s pour une erreur). */
export function Toast({ msg, tone, onClose }) {
  useEffect(() => {
    if (!msg) return undefined;
    const t = setTimeout(onClose, tone === 'ok' ? 4000 : 6000);
    return () => clearTimeout(t);
  }, [msg, tone]);
  if (!msg) return null;
  const Icon = tone === 'ok' ? CheckCircle2 : AlertTriangle;
  return <div className={`toastline ${tone}`} role={tone === 'ok' ? 'status' : 'alert'}>
    <Icon size={18} /><span>{msg}</span>
    <button className="x" aria-label="Fermer" onClick={onClose}><X size={14} /></button>
  </div>;
}

/** Champ de recherche compact (filtre local d'une liste). */
export function Search({ value, onChange, placeholder = 'Rechercher…' }) {
  return <input className="search" type="search" value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} />;
}

/** Filtre insensible à la casse et aux accents sur un libellé. */
const norm = s => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
export const matches = (q, ...fields) => !q.trim() || fields.some(f => norm(f).includes(norm(q.trim())));

/** État vide d'une liste. */
export const Empty = ({ children }) => <p className="empty">{children}</p>;
