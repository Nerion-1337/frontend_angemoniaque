import { test, expect } from 'vitest'; import { lastChef } from '../src/lib/guild';
const R = [{ id: 1, name: 'Chef', is_leader: true }, { id: 2, name: 'Officier', is_leader: false }, { id: 3, name: 'Membre', is_leader: false }];
const g = (leader, members) => ({ me: { leader, rank: leader ? 'Chef' : 'Membre' }, ranks: R, members });
test('le seul porteur du rang Chef est le dernier Chef', () => expect(lastChef(g(true, [{ id: 1, rank_id: 1 }, { id: 2, rank_id: 3 }]))).toBe(true));
test('un second porteur du rang Chef le libère', () => expect(lastChef(g(true, [{ id: 1, rank_id: 1 }, { id: 2, rank_id: 1 }]))).toBe(false));
test('un non-Chef n\'est jamais le dernier Chef', () => expect(lastChef(g(false, [{ id: 1, rank_id: 1 }, { id: 2, rank_id: 3 }]))).toBe(false));
import { displayRanks, moveRankRow } from '../src/lib/guild';
test('affichage : la carte d’ajout est en dernier par défaut', () => expect(displayRanks([1, 2, 3])).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { add: true }]));
test('affichage : addPos insère la carte à la position demandée', () => expect(displayRanks([1, 2, 3], 1)).toEqual([{ id: 1 }, { add: true }, { id: 2 }, { id: 3 }]));
test('déplacement d’un rang : l’ordre persistable change, la carte d’ajout suit', () => expect(moveRankRow([1, 2, 3], 3, 0, 1)).toEqual({ ids: [2, 1, 3], addPos: 3 }));
test('déplacement de la carte d’ajout : l’ordre des rangs est inchangé (état local)', () => expect(moveRankRow([1, 2, 3], 3, 3, -1)).toEqual({ ids: [1, 2, 3], addPos: 2 }));
test('bords : premier en haut / dernier en bas = rien ne bouge', () => { expect(moveRankRow([1, 2], 2, 0, -1)).toEqual({ ids: [1, 2], addPos: 2 }); expect(moveRankRow([1, 2], 0, 2, 1)).toEqual({ ids: [1, 2], addPos: 0 }); });
import { dropRankRow, insertRankTarget } from '../src/lib/guild';
test('dropRankRow : glisser la 1re ligne au fond du list (carte ajout suivie)', () => expect(dropRankRow([1, 2, 3], 3, 0, 3)).toEqual({ ids: [2, 3, 1], addPos: 3 }));
test('dropRankRow : glisser la carte d’ajout en position 1 (ordre des rangs inchangé, état local)', () => expect(dropRankRow([1, 2, 3], 3, 3, 1)).toEqual({ ids: [1, 2, 3], addPos: 1 }));
test('dropRankRow : drop juste sous soi-même = non-opération', () => expect(dropRankRow([1, 2, 3], 3, 1, 2)).toEqual({ ids: [1, 2, 3], addPos: 3 }));
test('insertRankTarget : au-dessus par défaut + carte ajout en dernier = fin de liste (pas de réorganisation)', () => expect(insertRankTarget([1, 2, 3], null, 9, false)).toEqual([1, 2, 3, 9]));
test('insertRankTarget : au-dessus avec carte ajout déplacée en 2 → insertion au milieu', () => expect(insertRankTarget([1, 2, 3], 1, 9, false)).toEqual([1, 9, 2, 3]));
test('insertRankTarget : en dessous avec carte ajout en dernière position → fin de liste (la carte d’ajout s’affiche avant le nouveau rang)', () => expect(insertRankTarget([1, 2, 3], 3, 9, true)).toEqual([1, 2, 3, 9]));
test('insertRankTarget : en dessous avec carte ajout en position 2 → rang juste après la carte d’ajout', () => expect(insertRankTarget([1, 2, 3], 1, 9, true)).toEqual([1, 2, 9, 3]));
import { effWrite } from '../src/lib/guild';
test('effWrite : sujet NULL hérite de la catégorie', () => expect(effWrite({ write_ranks: null }, { write_ranks: ['Officier'] })).toEqual(['Officier']));
test('effWrite : sujet explicite [] = personne (hors Chef)', () => expect(effWrite({ write_ranks: [] }, { write_ranks: ['Officier'] })).toEqual([]));
test('effWrite : sujet explicite propre', () => expect(effWrite({ write_ranks: ['Membre'] }, { write_ranks: ['Officier'] })).toEqual(['Membre']));
import { canEditTopic } from '../src/lib/guild';
const NOBODY = { leader: false, rank: 'Membre', permissions: { create_topics: false } };
test('canEditTopic : le Chef passe toujours', () => expect(canEditTopic({ author_id: 9 }, { write_ranks: [] }, { ...NOBODY, leader: true }, 1)).toBe(true));
test('canEditTopic : l’auteur du sujet édite', () => expect(canEditTopic({ author_id: 1 }, { write_ranks: [] }, NOBODY, 1)).toBe(true));
test('canEditTopic : porteur de create_topics édite (même sujet d’un autre)', () => expect(canEditTopic({ author_id: 9 }, { write_ranks: [] }, { ...NOBODY, permissions: { create_topics: true } }, 2)).toBe(true));
test('canEditTopic : porteur du droit d’écriture de la catégorie parente', () => expect(canEditTopic({ author_id: 9 }, { write_ranks: ['Membre'] }, NOBODY, 2)).toBe(true));
test('canEditTopic : aucun des trois droits = refus', () => expect(canEditTopic({ author_id: 9 }, { write_ranks: ['Officier'] }, NOBODY, 2)).toBe(false));
test('canEditTopic : write_ranks absent = aucun droit d’écriture', () => expect(canEditTopic({ author_id: 9 }, {}, NOBODY, 2)).toBe(false));

// Garde anti-régression du crash « renderRow is not a function » : <DndList> ne prend son
// rendu de ligne QUE par la prop `renderRow` (aucun enfant-fonction) ; les 3 sites d'appel
// (rangs, catégories, sujets) doivent la passer — sinon crash au rendu.
import { readFileSync } from 'node:fs';
test('<DndList> est toujours utilisé avec la prop renderRow (3 sites, jamais d’enfants)', () => {
  const src = readFileSync(new URL('../src/components/Guild.jsx', import.meta.url), 'utf8');
  expect(src.includes('</DndList>')).toBe(false);
  expect((src.match(/renderRow=\{/g) ?? []).length).toBe(3);
});

// Garde anti-régression « impossible d’ajouter/effacer du texte » : le spread de `bind` doit
// toujours porter un onChange (un champ contrôlé sans onChange est gelé par React — c'était le
// bug de l'éditeur inline). Toute saisie de champ reste editable.
// Garde anti-régression « nouveau champ créé pour éditer » : l'édition passe par le
// composant générique InlineField (la balise d'affichage se transforme elle-même en input) ;
// l'ancienne boîte d'édition (InlineEdit / .edbox) doit rester supprimée.
test('édition inline : InlineField utilisé, InlineEdit/.edbox absents', () => {
  const src = readFileSync(new URL('../src/components/Guild.jsx', import.meta.url), 'utf8');
  expect(src).toContain('InlineField');
  expect(src).not.toContain('InlineEdit');
  expect(src).not.toContain('edbox');
});

test('bind() fournit un onChange (champ contrôlé éditable)', () => {
  const src = readFileSync(new URL('../src/components/fmtbar.jsx', import.meta.url), 'utf8');
  expect(src).toMatch(/const bind = set => \(\{[\s\S]{0,120}onChange: e => set\(e\.target\.value\)/);
});

// Éditeur riche WYSIWYG : la zone est un contentEditable (pas d'input), B/I en execCommand,
// sérialisation par rich.js ; actions ✓/✕ (titles Enregistrer/Annuler) dans la barre.
test('WYSIWYG : InlineField est un contentEditable avec execCommand + richToFmt', () => {
  const src = readFileSync(new URL('../src/components/InlineField.jsx', import.meta.url), 'utf8');
  expect(src).toContain('contentEditable');
  expect(src).not.toMatch(/<input[\s]/);
  expect(src).toContain('execCommand');
  expect(src).toContain('richToFmt');
});
test('WYSIWYG : RichBar porte les actions ✓ (Enregistrer) et ✕ (Annuler)', () => {
  const src = readFileSync(new URL('../src/components/fmtbar.jsx', import.meta.url), 'utf8');
  expect(src).toContain('title="Enregistrer"');
  expect(src).toContain('title="Annuler"');
});
