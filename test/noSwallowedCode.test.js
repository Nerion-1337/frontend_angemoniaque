// Garde-fou : un commentaire « // » suivi de code sur la même ligne (ex. « …;   // note const x = … ») avale ce code.
// Le cas s'est produit deux fois (scene.js, TileCard.jsx) et faisait planter le jeu sans erreur de compilation.
import { test, expect } from 'vitest'; import fs from 'node:fs'; import path from 'node:path';
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : /\.(jsx?|tsx?)$/.test(e.name) ? [path.join(d, e.name)] : []);
test('aucun code JS après un commentaire // sur la même ligne', () => {
  const bad = [];
  for (const f of walk(new URL('../src', import.meta.url).pathname)) fs.readFileSync(f, 'utf8').split('\n').forEach((l, i) => {
    const m = l.match(/;\s+\/\/ (.*)$/); if (m && /(\b(const|let|var|if|return|await|useEffect)\b[^,]*[=(]|\bset[A-Z]\w*\()/.test(m[1])) bad.push(`${path.basename(f)}:${i + 1}`);
  });
  expect(bad).toEqual([]);
});
