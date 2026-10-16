import { configureStore, createSlice } from '@reduxjs/toolkit';
const game = createSlice({ name: 'game', initialState: { auth: null, charId: null, me: null, entities: [], panel: null, hover: null, selected: null, toast: null },
  reducers: { setAuth: (s, { payload }) => { s.auth = payload; }, setChar: (s, { payload }) => { s.charId = payload; }, setMe: (s, { payload }) => { s.me = payload; }, setEntities: (s, { payload }) => { s.entities = payload; },
    setPanel: (s, { payload }) => { s.panel = s.panel === payload ? null : payload; }, setHover: (s, { payload }) => { s.hover = payload; }, setSelected: (s, { payload }) => { s.selected = payload; }, toast: (s, { payload }) => { s.toast = payload; } } });
export const A = game.actions; export const store = configureStore({ reducer: { game: game.reducer } });
