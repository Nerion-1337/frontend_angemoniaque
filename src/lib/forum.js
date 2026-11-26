// Annonces, forum public et pages légales : helpers purs (testés dans test/forum.test.js).
/** Route d'après le hash : #histoire · #forum · #forum/c/ID[/page] · #forum/t/ID[/page] · #forum/mod · #legal[/clé]. */
export function forumRoute(hash) {
  const h = String(hash ?? '').replace(/^#/, ''), [root, a, b, c] = h.split('/');
  if (root === 'legal') return { view: 'legal', key: a || 'cgu' };
  if (root === 'histoire') return { view: 'story' };
  if (root !== 'forum') return null;
  const n = v => Math.max(1, Math.trunc(Number(v)) || 1);
  if (a === 'c' && Number(b) > 0) return { view: 'category', id: Number(b), page: n(c) };
  if (a === 't' && Number(b) > 0) return { view: 'topic', id: Number(b), page: n(c) };
  if (a === 'mod') return { view: 'mod' };
  return { view: 'home' };
}
export const isForumHash = hash => forumRoute(hash) != null;
const RACE = { human: 'Hommes', demon: 'Démons', angel: 'Anges', nephilim: 'Néphilims' };
/** Badges d'accès d'une catégorie : [texte, ton] (ton : open | lock | staff). */
export function accessBadges(k) {
  const out = [];
  out.push(k.read_access === 'public' ? ['Lecture publique', 'open'] : k.read_access === 'members' ? ['Membres', 'lock'] : ['Équipe', 'staff']);
  if (k.post_access === 'staff') out.push(['Publié par l\'équipe', 'staff']);
  if (k.races?.length) out.push([k.races.map(r => RACE[r] ?? r).join(', '), 'lock']);
  if (k.min_rank > 1) out.push([`Rang ${k.min_rank}+`, 'lock']);
  if (k.locked) out.push(['Verrouillée', 'lock']);
  if (k.hidden) out.push(['Masquée', 'staff']);
  return out;
}
/** « à l'instant », « il y a 5 min », « il y a 3 h », sinon la date (jj/mm/aaaa hh:mm). */
export function ago(iso, now = Date.now()) {
  const t = new Date(iso).getTime(); if (!Number.isFinite(t)) return '';
  const s = Math.max(0, Math.round((now - t) / 1000));
  if (s < 60) return 'à l\'instant'; if (s < 3600) return `il y a ${Math.floor(s / 60)} min`; if (s < 86400) return `il y a ${Math.floor(s / 3600)} h`;
  const d = new Date(t), p = v => String(v).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
}
export const ROLE_LABEL = { admin: 'Administration', mod: 'Modération' };
/** Pages numérotées autour de la page courante : [1, '…', 4, 5, 6, '…', 12]. */
export function pager(page, pages) {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const set = new Set([1, pages, page - 1, page, page + 1].filter(p => p >= 1 && p <= pages)), out = [];
  [...set].sort((a, b) => a - b).forEach((p, i, arr) => { if (i && p - arr[i - 1] > 1) out.push('…'); out.push(p); });
  return out;
}
/** Jeton ou erreur renvoyés par le retour de connexion Google (#google-token=… / #google-error=…). */
export function googleReturn(hash) {
  const m = /^#google-(token|error)=(.*)$/.exec(String(hash ?? '')); if (!m) return null;
  const v = decodeURIComponent(m[2]); return m[1] === 'token' ? { token: v } : { error: v };
}
