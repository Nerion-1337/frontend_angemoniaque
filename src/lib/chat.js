// Helpers purs de la messagerie du jeu (testés dans test/chat.test.js).
export const CHANNELS = [['vision', 'Vision', '#4aa3ff', 'Joueurs dans votre champ de vision · messages effacés après 12 h'],
  ['guild', 'Guilde', '#4cd07d', 'Membres de votre guilde · 100 derniers messages'], ['mail', 'Courrier', '#e6c27a', 'Messages privés entre personnages']];
/** « à l'instant », « il y a 5 min », « il y a 3 h », « hier 14:05 », « 12/03 09:30 » */
export const ago = (d, now = Date.now()) => {
  const t = new Date(d).getTime(); if (!Number.isFinite(t)) return '';
  const s = Math.max(0, (now - t) / 1000);
  if (s < 60) return "à l'instant"; if (s < 3600) return `il y a ${Math.floor(s / 60)} min`; if (s < 6 * 3600) return `il y a ${Math.floor(s / 3600)} h`;
  const dt = new Date(t), hm = `${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`;
  const y = new Date(now); y.setHours(0, 0, 0, 0);
  if (t >= y.getTime()) return `aujourd'hui ${hm}`; if (t >= y.getTime() - 864e5) return `hier ${hm}`;
  return `${String(dt.getDate()).padStart(2, '0')}/${String(dt.getMonth() + 1).padStart(2, '0')} ${hm}`;
};
/** Objet d'une réponse : « Re : » une seule fois. */
export const reSubject = s => (/^re\s?:/i.test(s ?? '') ? s : `Re : ${s || '(sans objet)'}`);
/** Messages de discussion dans l'ordre chronologique, regroupés quand le même auteur enchaîne (moins de 5 min). */
export const groupChat = (msgs, me) => [...(msgs ?? [])].sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((m, i, a) => {
  const p = a[i - 1]; return { ...m, mine: m.pseudo === me, cont: !!p && p.pseudo === m.pseudo && new Date(m.created_at) - new Date(p.created_at) < 3e5 };
});
