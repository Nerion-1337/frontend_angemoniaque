// Portes des mondes (migration 48) : textes de la fenêtre de porte, à partir de GET /divine/door/{id}/{characterId}.
import { fmtWait } from './time';
export const REALM_FR = { human: 'Hommes', demon: 'Démons', angel: 'Anges', dead: 'Royaume des Morts' };
/** Structure (hors porte) : état d'activation en clair. */
export const activeLine = st => (st.forever ? 'Activée définitivement.' : st.active ? `Activée : encore ${fmtWait(st.open_in_s)}.` : 'Non activée.');
/** État en clair : ouverture, portes en face, ce que le joueur peut faire. */
export function doorLines(st) {
  if (!st) return [];
  if (st.realm === 'dead') return ['Ramène chaque joueur dans son monde, toujours ouverte.'];
  if (!st.realm) return ['Porte ancienne : franchissable avec ses conditions.'];
  const out = [`Porte du monde des ${REALM_FR[st.realm]}, vers le monde des ${REALM_FR[st.leads_to]}.`];
  out.push(st.forever ? "Activée définitivement (elle laisse venir l'autre monde)." : (st.open ?? st.active) ? `Activée : encore ${fmtWait(st.open_in_s)} (elle laisse venir l'autre monde).` : 'Non activée.');
  const face = st.facing ?? [], open = face.filter(f => f.open);
  out.push(open.length ? `Franchissable : ${open.map(f => `${f.name} (${f.forever ? 'définitivement' : `encore ${fmtWait(f.open_in_s)}`})`).join(', ')} ouverte${open.length > 1 ? 's' : ''} de l'autre côté.`
    : `Fermée : il faut qu'une porte de l'autre côté soit activée (${face.map(f => `${f.name}${f.placed ? '' : ' — détruite'}`).join(', ') || 'aucune'}).`);
  return out;
}
