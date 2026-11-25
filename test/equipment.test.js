// Équipement : plus d'emplacement « arc », types d'objets de l'admin = types de l'inventaire, détail des caractéristiques.
import { test, expect } from 'vitest'; import fs from 'node:fs';
import { GROUP } from '../src/lib/equipment.js';
import { ITEM_SLOTS, itemBody } from '../src/admin/divine.js';
test('chaque type d’objet proposé en admin a un emplacement d’inventaire (sauf outils / parchemins) ; plus d’arc', () => {
  for (const [k] of ITEM_SLOTS) if (!['tool', 'scroll'].includes(k)) expect(GROUP[k], k).toBeTruthy();
  expect(GROUP.bow).toBeUndefined(); expect(Object.values(GROUP).flat()).not.toContain('bow');
  expect(ITEM_SLOTS.map(([k]) => k)).not.toContain('mains');   // plus les parties du corps des monstres
});
test('inventaire : arme à deux mains → main principale seulement ; détail au survol des caractéristiques', () => {
  const src = fs.readFileSync(new URL('../src/components/SidePanel.jsx', import.meta.url), 'utf8');
  expect(src).toMatch(/selItem\.two_handed \? \['weapon_main'\]/);
  expect(src).toMatch(/<StatDetail keys=\{keys\} B=\{B\}/);
  expect(src).not.toMatch(/req\. \$\{st\.reqStrength\}/);   // plus de « req. » sous la Force : valeur finale + détail
});
test('portée d\'arme : défaut 1, pleine puissance seulement sous la portée, rien pour un non-arme', () => {
  expect(itemBody({ name: 'Épée', slot: 'weapon', reach: '' })).toMatchObject({ reach: 1, full_power_at: null });
  expect(itemBody({ name: 'Arc', slot: 'weapon', reach: 6, full_power_at: 3 })).toMatchObject({ reach: 6, full_power_at: 3 });
  expect(itemBody({ name: 'Arc', slot: 'weapon', reach: 3, full_power_at: 3 }).full_power_at).toBeNull();
  const helm = itemBody({ name: 'Casque', slot: 'head', reach: 4 }); expect(helm.reach).toBeUndefined(); expect(helm.full_power_at).toBeUndefined();
});
