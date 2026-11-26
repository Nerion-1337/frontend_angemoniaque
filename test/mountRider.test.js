import { test, expect } from 'vitest';
import * as THREE from 'three';
import { mountModel } from '../src/three/entities.js';
// Monture volante : seules les ailes battent ; le cavalier (ajouté ensuite comme enfant) ne pivote pas avec elles.
test('monture volante : le battement d’ailes ne fait pas pivoter le cavalier', () => {
  const m = mountModel(true), rider = new THREE.Group(); m.add(rider);
  for (const t of [0.1, 0.4, 1.3]) m.userData.tick(t);
  expect(rider.rotation.z).toBe(0); expect(rider.rotation.x).toBe(0); expect(rider.rotation.y).toBe(0);
  expect(m.userData.wings).toHaveLength(2); expect(m.userData.wings[0].rotation.z).not.toBe(0.25);
});
