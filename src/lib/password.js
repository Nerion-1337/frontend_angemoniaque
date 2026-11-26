// Politique de mot de passe (miroir de back/src/lib/security.ts:passwordProblems ; testé dans test/password.test.js) et jauge.
const COMMON = ['password', 'motdepasse', 'azerty', 'qwerty', 'qwertz', 'abc', 'admin', 'welcome', 'bienvenue', 'soleil', 'bonjour', 'iloveyou', 'jetaime', 'dragon', 'monkey', 'football', 'letmein', 'angemoniaque', 'master', 'secret', 'princesse', 'loulou', 'chouchou'];
const SEQ = '0123456789 abcdefghijklmnopqrstuvwxyz azertyuiop qsdfghjklm wxcvbn qwertyuiop asdfghjkl zxcvbnm';
export const classes = pw => [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(r => r.test(pw)).length;
export function bits(pw) {
  const pool = (/[a-z]/.test(pw) ? 26 : 0) + (/[A-Z]/.test(pw) ? 26 : 0) + (/[0-9]/.test(pw) ? 10 : 0) + (/[^A-Za-z0-9]/.test(pw) ? 33 : 0);
  return pool ? Math.round(Math.min(pw.length, new Set(pw).size * 1.5) * Math.log2(pool)) : 0;
}
/** Critères affichés (cochés au fil de la saisie) : [libellé, respecté]. */
export function checklist(pw, email = '') {
  const low = pw.toLowerCase(), local = email.split('@')[0]?.toLowerCase() ?? '';
  let seq = false; for (let i = 0; i + 4 <= low.length; i++) if (SEQ.includes(low.slice(i, i + 4))) { seq = true; break; }
  return [['12 caractères minimum', pw.length >= 12], ['3 types : minuscules, majuscules, chiffres, symboles', classes(pw) >= 3],
    ['Aucun mot trop courant (password, azerty, admin…)', !!pw && !COMMON.some(w => w.length >= 4 && low.replace(/[^a-z]/g, '').includes(w))],
    ['Pas de suite (1234, abcd) ni 4 caractères identiques', !!pw && !seq && !/(.)\1{3,}/.test(pw)],
    ['Ne contient pas votre email', !!pw && !(local.length >= 4 && low.includes(local))]];
}
/** Accepté par le serveur : tous les critères + au moins 60 bits. */
export const passwordOk = (pw, email) => checklist(pw, email).every(c => c[1]) && bits(pw) >= 60;
const LEVELS = [['Très faible', '#e5545a'], ['Faible', '#ff8a4a'], ['Moyen', '#f0c040'], ['Fort', '#7fdc6a'], ['Excellent', '#4fd0a0']];
/** Jauge : { pct 0..100, level 0..4, label, color } ; « Fort » n'est atteint que si le mot de passe est accepté. */
export function strength(pw, email) {
  if (!pw) return { pct: 0, level: 0, label: '', color: LEVELS[0][1] };
  const b = bits(pw), ok = passwordOk(pw, email), met = checklist(pw, email).filter(c => c[1]).length;
  let level = b < 30 ? 0 : b < 45 ? 1 : 2; if (ok) level = b >= 85 ? 4 : 3; else level = Math.min(level, met >= 4 ? 2 : 1);
  const pct = Math.round(Math.min(100, ok ? 70 + Math.min(30, (b - 60) * 1.2) : Math.min(65, (b / 60) * 45 + met * 4)));
  return { pct, level, label: LEVELS[level][0], color: LEVELS[level][1] };
}
