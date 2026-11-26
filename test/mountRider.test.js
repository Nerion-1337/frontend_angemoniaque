import { test, expect } from 'vitest';
import * as THREE from 'three';
import { creature, mounted } from '../src/three/entities.js';
// Monture volante (design du catalogue) : seules ses ailes battent ; le cavalier, posé sur la selle, ne pivote pas avec elles.
test('cavalier sur monture volante : ne pivote pas avec les battements d’ailes, posé sur la selle', () => {
  const m = creature({ mount: true, model: 'griffon', name: 'Griffon' }), rider = new THREE.Group(), g = mounted(m, rider);
  const before = rider.position.clone();
  for (const t of [0.1, 0.4, 1.3]) g.userData.tick(t);
  expect(rider.rotation.x).toBe(0); expect(rider.rotation.y).toBe(0); expect(rider.rotation.z).toBe(0);
  expect(rider.position.equals(before)).toBe(true); expect(rider.parent).toBe(g); expect(rider.position.y).toBeCloseTo(m.userData.saddle.y - 0.36, 5); expect(m.userData.saddle.y).toBeCloseTo(0.62, 2);
  expect(m.userData.design).toBe('griffon');
});
