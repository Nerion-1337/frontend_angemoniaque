/** Délai lisible (secondes → « 1 h 05 » / « 12 min ») : minutes arrondies au total (jamais « 47 h 60 »). */
export const fmtWait = s => { const t = Math.ceil(s / 60), h = Math.floor(t / 60), m = t % 60; return h ? `${h} h${m ? ` ${String(m).padStart(2, '0')}` : ''}` : `${Math.max(1, m)} min`; };
