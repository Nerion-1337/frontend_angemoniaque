import { createSlice } from '@reduxjs/toolkit';
/** État de l'espace administrateur : section active, entité en cours, message de statut. */
const admin = createSlice({
  name: 'admin',
  initialState: { section: 'dashboard', kind: 'item', list: null, detail: null, msg: '' },
  reducers: {
    setSection: (s, { payload }) => { s.section = payload; s.list = null; s.detail = null; },
    setKind: (s, { payload }) => { s.kind = payload; s.list = null; s.detail = null; },
    setList: (s, { payload }) => { s.list = payload; },
    setDetail: (s, { payload }) => { s.detail = payload; },
    msg: (s, { payload }) => { s.msg = payload; }
  }
});
export const Ad = admin.actions;
export default admin.reducer;
