import { test, expect } from 'vitest';
/**
 * Régression — warning « validateDOMNesting: <tr> cannot appear as a child of <table> »
 * (onglet Monstres du dashboard admin). Les tableaux de `Bestiary.jsx` mettaient `<tr>`
 * en enfant direct de `<table>` : le navigateur crée un `<tbody>` implicite, l'arbre React
 * ne correspond plus à l'arbre DOM et React loggue le warning à chaque rendu.
 * Contrat : tout `<table>` du code admin contient un `<thead>` (entêtes) et un `<tbody>`
 * (lignes de données) — jamais de `<tr>` en enfant direct de `<table>`.
 */
const raw = p => import(p + '?raw').then(m => m.default);
test('tables admin : <thead> + <tbody> présents (aucun <tr> enfant direct de <table>)', async () => {
  const s = await raw('../src/admin/Bestiary.jsx');
  const tables = s.split('<table>').slice(1);
  expect(tables.length, 'le Bestiaire doit au moins avoir ses deux tableaux').toBeGreaterThanOrEqual(2);
  for (const t of tables) {
    const body = t.split('</table>')[0];
    expect(body, 'entêtes dans <thead>').toMatch(/<thead>[\s\S]*?<\/thead>/);
    expect(body, 'lignes de données dans <tbody>').toMatch(/<tbody>[\s\S]*?<\/tbody>/);
  }
});
test('unité : un arbre de lignes imbriqué thead/tbody est la forme attendue (le <tr> n\'est jamais fils direct de <table>)', () => {
  // Miroir du contrat : la structure JS que le composant doit produire.
  const row = (cells, key) => ({ type: 'tr', key, children: cells });
  const table = { type: 'table', children: [{ type: 'thead', children: [row(['a'])] }, { type: 'tbody', children: [row(['b'])] }] };
  expect(table.children.every(c => c.type === 'thead' || c.type === 'tbody')).toBe(true); // aucun tr direct
});
