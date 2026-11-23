import { createSlice } from '@reduxjs/toolkit';
/** État de l'espace administrateur : section active, entité en cours, message de statut (tone : 'err' | 'ok'). */
const admin = createSlice({
  name: 'admin',
  initialState: { section: 'dashboard', kind: 'item', list: null, detail: null, msg: '', tone: 'err' },
  reducers: {
    setSection: (s, { payload }) => { s.section = payload; s.list = null; s.detail = null; },
    setKind: (s, { payload }) => { s.kind = payload; s.list = null; s.detail = null; },
    setList: (s, { payload }) => { s.list = payload; },
    setDetail: (s, { payload }) => { s.detail = payload; },
    /** Message d'erreur / d'avertissement (ou '' pour effacer). */
    msg: (s, { payload }) => { s.msg = payload; s.tone = 'err'; },
    /** Message de succès (toast vert). */
    ok: (s, { payload }) => { s.msg = payload; s.tone = 'ok'; }
  }
});
export const Ad = admin.actions;
export default admin.reducer;
