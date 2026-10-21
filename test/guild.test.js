import { test, expect } from 'vitest'; import { lastChef } from '../src/lib/guild';
const R = [{ id: 1, name: 'Chef', is_leader: true }, { id: 2, name: 'Officier', is_leader: false }, { id: 3, name: 'Membre', is_leader: false }];
const g = (leader, members) => ({ me: { leader, rank: leader ? 'Chef' : 'Membre' }, ranks: R, members });
test('le seul porteur du rang Chef est le dernier Chef', () => expect(lastChef(g(true, [{ id: 1, rank_id: 1 }, { id: 2, rank_id: 3 }]))).toBe(true));
test('un second porteur du rang Chef le libère', () => expect(lastChef(g(true, [{ id: 1, rank_id: 1 }, { id: 2, rank_id: 1 }]))).toBe(false));
test('un non-Chef n\'est jamais le dernier Chef', () => expect(lastChef(g(false, [{ id: 1, rank_id: 1 }, { id: 2, rank_id: 3 }]))).toBe(false));
import { displayRanks, moveRankRow, dropRankRow, insertRankTarget, effWrite } from '../src/lib/guild';
test('affichage : la carte d’ajout est en dernier par défaut', () => expect(displayRanks([1, 2, 3])).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { add: true }]));
test('affichage : addPos insère la carte à la position demandée', () => expect(displayRanks([1, 2, 3], 1)).toEqual([{ id: 1 }, { add: true }, { id: 2 }, { id: 3 }]));
test('déplacement d’un rang : l’ordre persistable change, la carte d’ajout suit', () => expect(moveRankRow([1, 2, 3], 3, 0, 1)).toEqual({ ids: [2, 1, 3], addPos: 3 }));
test('dropRankRow : glissade vers le bas (décalage de la ligne retirée)', () => {
  // Affichage [1,2,3,ADD] : l’item 1 est déposé devant l’item 3 → [2,1,3], la carte reste en fin
  expect(dropRankRow([1, 2, 3], 3, 0, 2)).toEqual({ ids: [2, 1, 3], addPos: 3 });
});
test('dropRankRow : la carte d’ajout suit la ligne déposée', () => {
  // Affichage [1,ADD,2,3] : l’item 1 va devant l’item 2 (ligne 2) → la carte repoussée arrive en tête
  expect(dropRankRow([1, 2, 3], 1, 0, 2)).toEqual({ ids: [1, 2, 3], addPos: 0 });
});
test('insertRankTarget : insertion au-dessus (défaut) ou en dessous de la carte d’ajout', () => {
  expect(insertRankTarget([1, 2], 1, 9, false)).toEqual([1, 9, 2]);
  expect(insertRankTarget([1, 2], 1, 9, true)).toEqual([1, 2, 9]);
  expect(insertRankTarget([1, 2], null, 9, false)).toEqual([1, 2, 9]); // carte non mémorisée → fin de liste
});
test('effWrite : write_ranks NULL du sujet = hérite de la catégorie, explicite = lui-même', () => {
  const folder = { write_ranks: ['Officier'] };
  expect(effWrite({ write_ranks: null }, folder)).toEqual(['Officier']);
  expect(effWrite({ write_ranks: [] }, folder)).toEqual([]);
  expect(effWrite({ write_ranks: ['Membre'] }, folder)).toEqual(['Membre']);
  expect(effWrite({ write_ranks: null }, { write_ranks: null })).toEqual([]); // catégorie NULL aussi → personne (hors Chef)
});
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
// Garde anti-régression « les balises d'affichage remplacées par des CHAMPS PRÉ-REMPLIS » :
// le crayon fait apparaître des FmtField (input/textarea, barre d'outils au-dessus) dans la
// même rangée — l'éditeur WYSIWYG contentEditable (InlineField) et l'ancienne boîte
// (InlineEdit / .edbox) restent supprimés.
test('édition : FmtField pré-rempli dans la ligne, WYSIWYG absent', () => {
  const src = readFileSync(new URL('../src/components/Guild.jsx', import.meta.url), 'utf8');
  expect(src).toContain('FmtField');
  expect(src).not.toContain('contentEditable');
  expect(src).not.toContain('InlineField');
  expect(src).not.toContain('InlineEdit');
  expect(src).not.toContain('edbox');
});

test('bind() fournit un onChange (champ contrôlé éditable)', () => {
  const src = readFileSync(new URL('../src/components/fmtbar.jsx', import.meta.url), 'utf8');
  expect(src).toContain('onChange: e => (s ?? set)(e.target.value)');
});

// Barre d'outils : insertion des balises texte [g]/[i]/[rgb:R.G.B] (aucun HTML brut, aucun
// execCommand) ; le rendu passe par fmt.js (échappement d'abord).
test('la barre insère [g]/[i]/[rgb] et ne connaît plus execCommand', () => {
  const src = readFileSync(new URL('../src/components/fmtbar.jsx', import.meta.url), 'utf8');
  expect(src).toContain("'[g]'");
  expect(src).toContain("'[i]'");
  expect(src).toContain('[rgb:${rgbOf(h)}]');
  expect(src).not.toContain('execCommand');
  expect(src).not.toContain('contentEditable');
});

// Suppression (cascade) et transfert de sujet : les routes back sont appelées par le front et
// chaque action dangereuse passe par l'écran de confirmation Confirm.
test('suppression / transfert : routes back + écran de confirmation', () => {
  const src = readFileSync(new URL('../src/components/Guild.jsx', import.meta.url), 'utf8');
  expect(src).toContain('/delete');
  expect(src).toContain('/move');
  expect(src).toContain('<Confirm');
});
test('Confirm.jsx : écran contrôlé (clic extérieur = annuler)', () => {
  const src = readFileSync(new URL('../src/components/Confirm.jsx', import.meta.url), 'utf8');
  expect(src).toContain('onOk');
  expect(src).toContain('onCancel');
  expect(src).toContain('onClick={onCancel}');
});

// Annulation : le bouton texte « Annuler » en bas est retiré ; une croix (Close) est
// empilée juste au-dessus du crayon pour abandonner le brouillon en cours.
test('cartes forum : clic/hover toute la carte, croix sans xbtn, Chef sans option, liste centrée', () => {
  const src = readFileSync(new URL('../src/components/Guild.jsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  expect(src).not.toContain('edrow2');
  expect(src).toContain('vstack');
  // Croix d'annulation SANS classe xbtn (même dimension que les autres boutons) — la classe ne doit pas revenir
  expect(src).not.toContain('className="xbtn"');
  expect(css).not.toContain('.row .xbtn');
  // Clic étendu à toute la carte (boutons/entrées exclus + garde justDrag) ; le titre n'est plus un <button>
  expect(src).toContain("closest('button,select,input,textarea,label,a')");
  expect(src).toContain('<div className="selitem">');
  expect(css).toContain('.fcard:hover{');
  // Le Chef (is_leader) n'offre aucune option (modales de création + matrice d'édition)
  expect(src.split('!r.is_leader').length - 1).toBeGreaterThanOrEqual(5);
});

// ---- Onglets guilde : liste (centrée, invitations en tête, postulants en puces, membres 2/ligne)
//      présentation (centrée, logo en tête), rang par défaut au-dessus des rangs, rang de jeu ----
test('liste de guilde : invitations en tête, puces de postulants, membres 2 par ligne + rang de jeu', () => {
  const src = readFileSync(new URL('../src/components/Guild.jsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  expect(src).toContain('className="form members"');
  // Invitations AVANT postulants, postulants AVANT membres
  expect(src).toMatch(/Inviter un joueur[\s\S]{0,900}?Postulants en attente[\s\S]{0,1500}?Membres \(/);
  expect(src).toContain('achips'); expect(src).toContain('achip');
  expect(src).toContain('<div className="mgrid">');
  expect(src).toContain('m.game_rank');
  expect(css).toContain('.achip{flex:1 1 220px');
  expect(css).toContain('.mgrid{display:grid;grid-template-columns:1fr 1fr');
  expect(css).toContain('.member .minfo{display:flex;align-items:center;justify-content:center;gap:12px');
  expect(css).not.toContain('.fcol');
  // Vue liste des sujets : titre + .fsep (centrée, enfant directe de .fview) et AUCUNE description
  expect(src).toMatch(/Retour aux catégories[\s\S]{0,1100}?<div className="fsep">/);
  expect(src).not.toMatch(/Retour aux catégories[\s\S]{0,400}?fdesc/);
  // .fsep par défaut NON centrée (cartes .item.fcard : 25 % depuis la gauche), centrée uniquement en .fview > .fsep
  expect(css).toContain('.fsep{width:25%;height:0;margin:4px 0 8px');
  expect(css).toContain('.fview > .fsep{margin-left:auto;margin-right:auto}');
});
test('présentation : colonne centrée, emblème en tête ; rang par défaut au-dessus de la liste des rangs', () => {
  const src = readFileSync(new URL('../src/components/Guild.jsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  expect(src).toContain('className="form pres"');
  expect(src).toMatch(/className="form pres">[\s\S]{0,250}?<div className="emblem">[\s\S]{0,500}?Mantra de la guilde/);
  expect(css).toContain('.pres{text-align:center}');
  // Gestion : le bloc drank est le PREMIER enfant du conteneur ranks (au-dessus du DndList)
  const iD = src.indexOf('className="item drank"'), iL = src.indexOf('<DndList', iD);
  expect(iD).toBeGreaterThan(-1); expect(iL - iD).toBeLessThan(1500);
});

// ---- Pagination commune + restructuration des messages (catégories/sujets/messages + listes) ----
test('pagination commune (PageNav « ‹ [page] /total › ») appliquée aux 5 listes', () => {
  const src = readFileSync(new URL('../src/components/Guild.jsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const fmtSrc = readFileSync(new URL('../src/components/fmtbar.jsx', import.meta.url), 'utf8');
  expect(src).toContain('function PageNav');
  // Flèches icones seules (ChevronLeft/Right) + input modifiable + /total
  expect(src).toContain('<ChevronLeft size={16} />'); expect(src).toContain('<ChevronRight size={16} />');
  expect(src).toContain('className="ppage"'); expect(src).toContain('/ ${pages}');
  // .ptotal : texte doublé (1.6rem) et espace entre « / » et le total
  expect(css).toContain('.ptotal{color:var(--mute);font-size:1.6rem');
  // Appliquée aux 5 listes : catégories, sujets, messages, postulants, membres
  expect(src.split('<PageNav').length - 1).toBeGreaterThanOrEqual(5);
  expect(src).toContain('fRowsP'); expect(src).toContain('tRowsP'); expect(src).toContain('postsP');
  expect(src).toContain('applicantsP'); expect(src).toContain('membersP');
  // La carte d'ajout .radd est présente à CHAQUE page (dernière ligne, non draggée dnd={null}) ;
  // les indices locaux (startF/startT) sont traduits en globaux ; opération sur l'ordre complet (addPos = ids.length)
  expect(src).toContain('[...fRealP.map(id => ({ id })), { add: true }]');
  expect(src).toContain('dropRankRow(fIds, fIds.length, startF + a, startF + Math.min(b, fRealP.length))');
  expect(src).toContain('moveRankRow(fIds, fIds.length, startF + a, d)');
  expect(src).toContain('dnd={null}'); expect(src).toContain('...(dnd ? dnd.rowProps(i) : {})'); expect(src).toContain('dnd?.justDrag.current');
  expect(src).not.toContain('setFAdd'); expect(src).not.toContain('setTAdd');
  // Une seule page → pas de pagination affichée
  expect(src).toContain('if (pages <= 1) return null;');
  // .pmsg occupe l'espace restant de .post (corps à 100 %)
  expect(css).toContain('.post .postbody{width:100%;'); expect(css).toContain('.pmsg{flex:1;min-width:0');
  // 8 éléments/page (catégories + sujets), 20 messages/page, listes à 10
  expect(src).toContain('const PFOLDER = 8'); expect(src).toContain('const PMSG = 20'); expect(src).toContain('const PAGE = 10');
  expect(src).toContain('onPage={setPgF} size={PFOLDER}'); expect(src).toContain('onPage={setPgP} size={PMSG}');
  // Totaux = items RÉELS (carte d'ajout non comptée) ; aucun identifiant mort (fRows/tRows supprimés)
  expect(src).toContain('total={fIds.length}'); expect(src).toContain('total={tIds.length}');
  expect(src).not.toMatch(/\bfRows\b/); expect(src).not.toMatch(/\btRows\b/);
  expect(src).toContain('useEffect(() => setPgT(1), [fid])'); expect(src).toContain('useEffect(() => setPgP(1), [tid])');
  expect(css).toContain('.pagenav{display:flex');
  // .post pleine largeur (comme les .item.fcard) ; textarea de réponse 80 % centré + bouton dessous
  expect(css).not.toContain('.post{display:flex;flex-direction:row;align-items:stretch;gap:10px;text-align:left;max-width');
  // .post à pleine largeur comme .item.fcard : width:100% (jamais de « margin:0 auto » — en flex-column ça rétrécit à la largeur de contenu)
  expect(css).toContain('text-align:left;width:100%;padding:10px 12px;border-radius:12px}');
  expect(css).not.toContain('margin:0 auto;padding:10px 12px');
  expect(src).toContain('className="rtext"'); expect(css).toContain('.rtext{width:80%'); expect(css).toContain('.rrow{display:flex;justify-content:center;gap:8px');
  // Vue sujet : plus de .fsep/.fdesc en mode lecture après .fhead2 (cartes .fcard conservées)
  expect(src).not.toContain('<small className="fdesc" dangerouslySetInnerHTML={{ __html: fmt(topic.description) }} />');
  // En-tête liste des sujets : crayon btnlike « Éditer » à côté du titre de catégorie (comme la vue sujet)
  expect(src).toContain("pencil('f', folder.id, folder)");
  expect(src).toContain("title={ed?.id === folder.id ? 'Sauvegarder les modifications' : 'Éditer (titre, description, droits)'}");
  // Vue sujet : la séparation .fsep (centrée) est remise après .fhead2, .fdesc reste absente
  expect(src).toContain('<div className="fsep">-----</div>\n      {ed?.id === topic.id && TopicEditBlock()}');
  // Édition complète de la catégorie depuis l'en-tête liste sujets (titre + description + droits)
  expect(src).toContain('{ed?.id === folder.id && <FmtBar onFmt={fmEd.fmt} onColor={fmEd.color} />}');
  expect(src).toContain('{ed?.id === folder.id && <><FmtField fm={fmEd} bar={false} value={draft.desc}');
  // Réponse : composant réutilisable PrevToggle (fmtbar.jsx, partagé avec FmtField) —
  // pvbtn « Aperçu du rendu formaté » à DROITE du .rtext, aperçu IN PLACE (même slot,
  // pas de nouvelle balise), FPrev statique retiré
  expect(src).toContain('<PrevToggle'); expect(fmtSrc).toContain('export function PrevToggle');
  expect(fmtSrc).toContain('className="pvbtn"'); expect(fmtSrc).toContain('Aperçu du rendu formaté');
  expect(src).toContain('setPv'); expect(src).not.toContain('<FPrev text={reply} />');
  expect(fmtSrc).toContain('<PrevToggle'); // FmtField utilise le même composant
  expect(css).toContain('.pvbtn{'); expect(css).toContain('.replywrap .fmtf-body{max-width:none');
  // FmtBar de la réponse inactif pendant l'aperçu (reprise du comportement FmtField)
  expect(src).toContain('<FmtBar onFmt={fmRep.fmt} onColor={fmRep.color} disabled={pv} />');
  expect(css).toContain('.replywrap .fmtprev{min-height');
});
test('messages : div auteur à gauche + div message à droite, date bas-droite, fond alterné', () => {
  const src = readFileSync(new URL('../src/components/Guild.jsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  expect(src).toContain('<div className="pmsg">');
  expect(css).toContain('.post{display:flex;flex-direction:row');
  expect(css).toContain('.post:nth-child(odd){background:rgba(255,255,255,.05)');
  expect(css).toContain('.post:nth-child(even){background:rgba(240,210,138,.07)');
  expect(css).toContain('.ptime{position:absolute;right:10px;bottom:5px');
});

// Régression « la sauvegarde échoue » : le schéma back attend `name` pour une catégorie et
// `title` pour un sujet — zod supprime tout autre champ (le COALESCE garde alors l'ancienne
// valeur sur un 200 muet). Les deux noms de champ doivent être présents dans saveAll.
test('sauvegarde : `name` (catégorie) et `title` (sujet) envoyés à la route correspondante', () => {
  const src = readFileSync(new URL('../src/components/Guild.jsx', import.meta.url), 'utf8');
  expect(src).toContain('{ name: draft.title.trim() }');
  expect(src).toContain('{ title: draft.title.trim() }');
});

// Un seul groupe d'icônes par bloc édité (partagé entre ses champs via `fm`) + bascule
// édition/aperçu DANS LE MÊME ESPACE (plus de div d'aperçu distincte).
test('groupe d' + 'icônes : un seul par bloc édité + bascule aperçu dans le même espace', () => {
  const f = readFileSync(new URL('../src/components/fmtbar.jsx', import.meta.url), 'utf8');
  expect(f).toContain('pvbtn');
  expect(f).toContain('fmtprev');
  expect(f).toContain('disabled');
  const src = readFileSync(new URL('../src/components/Guild.jsx', import.meta.url), 'utf8');
  expect(src).toContain('fmEd');
  expect((src.match(/bar=\{false\}/g) ?? []).length).toBeGreaterThanOrEqual(3);
});

// ---- Mise en page flottante des cartes forum (catégories + sujets) ----
// .item.fcard = position:relative ; actions .row absolues haut-droite (top:5px/right:10px,
// scale réduit) ; .ord (flèches) absolu centré verticalement (top:50%, translateY(-50%) —
// logique du bloc d'ajout) ; <small> absolu bas-droite ; .row2.sel sans fond/bordure et
// titre centré ; .fsep = vraie ligne (border-bottom 2px, var(--plus-line) = bordure du
// bouton « + »).
test('cartes forum : positionnement flottant scoppé à .fcard (CSS)', () => {
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  expect(css).toContain('.fcard{position:relative}');
  expect(css).toContain('.fcard .row{position:absolute;top:5px;right:50px;z-index:2;gap:0}');
  expect(css).toContain('transform:scale(.8)');
  expect(css).toContain('.fcard .ord{position:absolute;top:50%;right:10px;transform:translateY(-50%)');
  expect(css).toContain('.fcard .selitem small{position:absolute;bottom:5px;right:50px');
  expect(css).toContain('.fcard .row2.sel{background:transparent;border:none');
  // Titre à DROITE (plus centré) et ×1.5 ; description ×1.25 ; .fsep à 25 % depuis la gauche
  expect(css).toContain('.fcard .selitem{justify-content:flex-start}');
  expect(css).toContain('.fcard .selitem b{font-size:1.5rem}');
  // Croix d'annulation : à GAUCHE du crayon, sans gap (plus de pile verticale)
  expect(css).toContain('.vstack{display:inline-flex;flex-direction:row;align-items:center;gap:0}');
  expect(css).toContain('.fdesc{font-size:1.125rem');
  expect(css).toContain('.fsep{width:25%;height:0;')
  expect(css).toContain('--plus-line:var(--halo)');
  expect(css).toContain('border-bottom:2px solid var(--plus-line)');
  expect(css).toContain('.radd .plus{width:58px;height:58px;padding:0;border:2px solid var(--plus-line)');
  // Les tirets « ----- » sont masqués dans la règle .fsep
  const fsep = css.slice(css.indexOf('.fsep{'), css.indexOf('.fsep{') + 400);
  expect(fsep).toContain('font-size:0');
  expect(fsep).toContain('color:transparent');
});
test('cartes forum : les flèches d' + 'ordre sont hors du conteneur .row (JSX)', () => {
  const src = readFileSync(new URL('../src/components/Guild.jsx', import.meta.url), 'utf8');
  // Le .row des lignes forum ne contient plus d'Arrows (ceux de rangs .rcard restent dans leur .row)
  expect(src).not.toMatch(/className="row">[\s\S]{0,600}?<Arrows i=\{i\} len=\{fRows/);
  expect(src).not.toMatch(/className="row">[\s\S]{0,600}?<Arrows i=\{i\} len=\{tRows/);
  expect(src).toContain('<Arrows i={i} len={fRowsP.length}');
  expect(src).toContain('<Arrows i={i} len={tRowsP.length}');
});
