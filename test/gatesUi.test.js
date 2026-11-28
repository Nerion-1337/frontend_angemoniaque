import { describe, test, expect } from 'vitest';
import { doorLines } from '../src/lib/doors';
import { rulesBody } from '../src/admin/rules';
import { structureRespawnDraft, structureRespawnBody } from '../src/admin/building';
import { fmtWait } from '../src/lib/time';
// Lot du 2026-11-28 (migration 48) : fenêtre de porte, règles générales, réapparition des structures.
describe('Portes, règles générales, réapparition des structures', () => {
  test('fenêtre de porte : ouverture, portes en face (ouvertes / détruites), Royaume des Morts', () => {
    const st = { realm: 'demon', leads_to: 'human', open: true, open_in_s: 7200, facing: [{ name: 'Porte des Dunes', open: false, placed: false }, { name: 'Seuil', open: false, placed: true }] };
    const l = doorLines(st);
    expect(l[0]).toBe('Porte du monde des Démons, vers le monde des Hommes.'); expect(l[1]).toMatch(/Activée : encore 2 h/);
    expect(l[2]).toMatch(/Fermée .*Porte des Dunes — détruite, Seuil/);
    expect(doorLines({ ...st, facing: [{ name: 'Seuil', open: true, open_in_s: 600, placed: true }] })[2]).toBe("Franchissable : Seuil (encore 10 min) ouverte de l'autre côté.");
    expect(doorLines({ realm: 'dead' })).toEqual(['Ramène chaque joueur dans son monde, toujours ouverte.']);
    expect(fmtWait(3599)).toBe('1 h');
  });
  test('règles générales : % borné, bonus entiers non nuls seulement', () => {
    expect(rulesBody({ death_loss_pct: '130', gate_bonus: { demon: { strength: '3', agility: '0' }, angel: { see: '2.7' } } }))
      .toEqual({ death_loss_pct: 100, gate_bonus: { demon: { strength: 3 }, angel: { see: 2 } } });
    expect(rulesBody({ death_loss_pct: '', gate_bonus: {} })).toEqual({ death_loss_pct: 0, gate_bonus: { demon: {}, angel: {} } });
  });
  test('réapparition d’une structure : non reconstruite par défaut, délai décimal, conditions sans référence retirées', () => {
    expect(structureRespawnDraft({})).toEqual({ respawn: false, delayH: 0, limits: [] });
    expect(structureRespawnBody({ respawn: true, delayH: '1.5', limits: [{ kind: 'item', ref: '7', max: '0' }, { kind: 'resource', ref: '', max: 2 }, { kind: 'resource', ref: 'bois', max: '3' }] }))
      .toEqual({ respawn: true, respawn_delay_h: 1.5, respawn_limits: [{ kind: 'item', ref: 7, max: 1 }, { kind: 'resource', ref: 'bois', max: 3 }] });
  });
});
