import { test, expect } from 'vitest';
import { CREATURES, CREATURE, designFor, habitatOf } from '../src/lib/creatureCatalog.js';
import { ICONS, ICON, initials, iconKey } from '../src/lib/creatureIcons.js';
import { buildCreature } from '../src/three/creatures.js';
// Catalogue de designs (30 aériens, 40 terrestres, 15 aquatiques), icônes et choix automatique ; chaque design se construit et s'anime.
test('catalogue : 30 aériens, 40 terrestres, 15 aquatiques, clés uniques, icônes existantes', () => {
  const n = h => CREATURES.filter(c => c.hab === h).length;
  expect([n('air'), n('land'), n('water')]).toEqual([30, 40, 15]);
  expect(new Set(CREATURES.map(c => c.key)).size).toBe(CREATURES.length);
  for (const c of CREATURES) expect(ICON[c.icon], `${c.key} → icône ${c.icon}`).toBeTruthy();
  expect(new Set(ICONS.map(i => i.key)).size).toBe(ICONS.length);
});
test('chaque design se construit, a une hauteur, une selle, et s’anime sans erreur', () => {
  for (const D of CREATURES) { const g = buildCreature(D); expect(g.userData.height, D.key).toBeGreaterThan(0.2); expect(g.userData.saddle, D.key).toBeTruthy(); expect(() => g.userData.tick?.(1.7), D.key).not.toThrow(); }
});
test('design automatique : choisi > nom reconnu > tiré dans le milieu ; icône et initiales', () => {
  expect(designFor({ model: 'kraken', name: 'Bob' }).key).toBe('kraken');
  expect(designFor({ name: 'Balrog' }).key).toBe('balrog'); expect(designFor({ name: 'Griffon royal' }).key).toBe('griffon');
  expect(designFor({ name: 'Bestiole', loco: ['water'] }).hab).toBe('water'); expect(designFor({ name: 'Bestiole', flying: true }).hab).toBe('air');
  expect(designFor({ name: 'Bestiole', loco: ['land', 'water'] }).hab).toBe('land'); expect(habitatOf(['air', 'land'])).toBe('air');
  expect(designFor({ name: 'Bestiole', loco: ['land'] })).toBe(designFor({ name: 'Bestiole', loco: ['land'] }));   // stable
  expect(designFor({ model: 'inconnu', name: 'Kraken des abysses' }).key).toBe('kraken');
  expect(initials('Griffon royal')).toBe('GR'); expect(initials('Balrog')).toBe('BA'); expect(initials('Le Kraken des abysses')).toBe('KA'); expect(initials('')).toBe('?');
  expect(iconKey('wolf', CREATURE.balrog, 'land')).toBe('wolf'); expect(iconKey(null, CREATURE.balrog, 'land')).toBe('demon'); expect(iconKey('nope', null, 'water')).toBe('fish');
});
