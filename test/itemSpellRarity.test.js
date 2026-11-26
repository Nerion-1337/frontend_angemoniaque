// Phase 4 : onglets admin Objets & Sorts — sous-onglets par rareté, filtre par type
// d'équipement, paramètre « qui peut s'en équiper / l'apprendre » (usable_by).
import { test, expect } from 'vitest';
import fs from 'node:fs';

test('rarity.js : miroir des constantes back (5 raretés, 5 kinds : plus de « monture ») + badge vide = tout le monde', () => {
  const s = fs.readFileSync('src/admin/rarity.js', 'utf8');
  const m = fs.readFileSync('../back/src/routes/admin/common.ts', 'utf8');
  expect(s.includes("'commun', 'rare', 'epique', 'legendaire', 'divin'")).toBe(true);
  expect(m.includes("'commun', 'rare', 'epique', 'legendaire', 'divin'")).toBe(true);
  expect(s.includes("'humain', 'ange', 'demon', 'monstre', 'structure']")).toBe(true);
  expect(m.includes("'humain', 'ange', 'demon', 'monstre', 'structure']")).toBe(true);
  expect(s.includes('Tout le monde')).toBe(true);
});

test('ItemsTab : sous-onglets par rareté (Divin = objets uniques) + filtre par type + usable_by', () => {
  const s = fs.readFileSync('src/admin/ItemsTab.jsx', 'utf8');
  expect(s.includes('RARITIES')).toBe(true);
  expect(s.includes('<Divine itemId={edit}')).toBe(true);                       // Divin : même formulaire + exemplaires uniques de l'objet
  expect(s.includes('divine_family')).toBe(true);                               // famille divine (relique / arcane / artefact / libre)
  expect(s.includes("Type d'équipement")).toBe(true);
  expect(s.includes('value="none"')).toBe(true);                                 // « sans type » dans le filtre
  expect(s.includes('Détenu par')).toBe(true);
  expect(s.includes('usable_by')).toBe(true);
  expect(s.includes('/admin/content/items')).toBe(true);
});

test('SpellsTab : sous-onglets par rareté + décompte apprenants + usable_by', () => {
  const s = fs.readFileSync('src/admin/SpellsTab.jsx', 'utf8');
  expect(s.includes('RARITIES')).toBe(true);
  expect(s.includes('Appris par')).toBe(true);
  expect(s.includes('usableBy')).toBe(true);
  expect(s.includes('/admin/content/spells')).toBe(true);
});

test('index : sections « Objets » et « Sorts » (plus d’« Objets & Divins »)', () => {
  const s = fs.readFileSync('src/admin/index.jsx', 'utf8');
  expect(s.includes("['item', 'Objets']")).toBe(true);
  expect(s.includes("['spell', 'Sorts']")).toBe(true);
  expect(s.includes("Objets & Divins")).toBe(false);
  expect(s.includes('<ItemsTab />')).toBe(true);
  expect(s.includes('<SpellsTab />')).toBe(true);
});
