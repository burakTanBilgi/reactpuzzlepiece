import { piecesOfEdge } from '../../../grid/compile.js';

// Per-tier cascade introspection for the Inspector. The data model already
// resolves cascades at render time (compile.js); these helpers tell the UI
// where in the chain a value lives so the CascadeStrip and SourcePill can
// surface it.

// Stroke-style property keys that ride inside `config`. Used to detect
// whether a tier entry carries any stroke override at all.
const STYLE_PROPS = ['color', 'opacity', 'strokeWidth', 'frequency', 'amplitude', 'inverted'];

// True when a tier entry has any meaningful data (effect choice, any style
// prop, or any animation in `effects`). Empty/missing tier entries are
// treated as "inherits."
export function tierHasOverride(entry) {
  if (!entry) return false;
  if (entry.effect != null) return true;
  const cfg = entry.config;
  if (cfg) {
    for (const k of STYLE_PROPS) {
      if (cfg[k] != null) return true;
    }
  }
  const fx = entry.effects;
  if (fx && Object.keys(fx).length > 0) return true;
  return false;
}

// Compute applicability + override state per tier for the current selection.
// Drives the CascadeStrip pills.
//
//   selection:
//     { type: 'none' }
//     { type: 'edge',  pairKeys: string[] }
//     { type: 'piece', pieceId: string, hasInner: bool, hasOuter: bool }
//
//   returns:
//     {
//       default: { applicable, hasOverride },
//       inner:   { applicable, hasOverride },
//       outer:   { applicable, hasOverride },
//       piece:   { applicable, hasOverride },
//       edge:    { applicable, hasOverride },
//     }
export function computeTierStates(edges, selection) {
  const states = {
    default: { applicable: true,  hasOverride: tierHasOverride(edges?.default) },
    inner:   { applicable: false, hasOverride: false },
    outer:   { applicable: false, hasOverride: false },
    piece:   { applicable: false, hasOverride: false },
    edge:    { applicable: false, hasOverride: false },
  };

  if (!selection || selection.type === 'none') {
    states.inner = { applicable: true, hasOverride: tierHasOverride(edges?.inner) };
    states.outer = { applicable: true, hasOverride: tierHasOverride(edges?.outer) };
    return states;
  }

  if (selection.type === 'edge') {
    const pairKeys = selection.pairKeys || [];
    const hasInner = pairKeys.some((pk) => !pk.includes('||outer-'));
    const hasOuter = pairKeys.some((pk) =>  pk.includes('||outer-'));
    if (hasInner) states.inner = { applicable: true, hasOverride: tierHasOverride(edges?.inner) };
    if (hasOuter) states.outer = { applicable: true, hasOverride: tierHasOverride(edges?.outer) };

    const pieceIds = new Set();
    for (const pk of pairKeys) for (const pid of piecesOfEdge(pk)) pieceIds.add(pid);
    let pieceHas = false;
    for (const pid of pieceIds) {
      if (tierHasOverride(edges?.byPiece?.[pid])) { pieceHas = true; break; }
    }
    states.piece = { applicable: pieceIds.size > 0, hasOverride: pieceHas };

    const edgeHas = pairKeys.some((pk) => tierHasOverride(edges?.byEdge?.[pk]));
    states.edge = { applicable: true, hasOverride: edgeHas };
    return states;
  }

  if (selection.type === 'piece') {
    if (selection.hasInner) states.inner = { applicable: true, hasOverride: tierHasOverride(edges?.inner) };
    if (selection.hasOuter) states.outer = { applicable: true, hasOverride: tierHasOverride(edges?.outer) };
    states.piece = { applicable: true, hasOverride: tierHasOverride(edges?.byPiece?.[selection.pieceId]) };
    return states;
  }

  return states;
}

// Walk the cascade top-down for a single property of an edge and return the
// tier that holds the resolved value.
//
//   prop: 'effect' | 'color' | 'opacity' | 'strokeWidth' | 'frequency' | 'amplitude' | 'inverted'
//   returns: { tier: 'edge'|'piece'|'layer'|'default'|'none', pieceId?, kind? }
export function resolveEdgePropSource(edges, pairKey, prop) {
  if (hasProp(edges?.byEdge?.[pairKey], prop)) return { tier: 'edge' };
  for (const pid of piecesOfEdge(pairKey)) {
    if (hasProp(edges?.byPiece?.[pid], prop)) return { tier: 'piece', pieceId: pid };
  }
  const isOuter = pairKey.includes('||outer-');
  const kind = isOuter ? 'outer' : 'inner';
  if (hasProp(edges?.[kind], prop)) return { tier: 'layer', kind };
  if (hasProp(edges?.default, prop)) return { tier: 'default' };
  return { tier: 'none' };
}

function hasProp(entry, prop) {
  if (!entry) return false;
  if (prop === 'effect') return entry.effect != null;
  return entry.config?.[prop] != null;
}

// Friendly label for a tier returned by resolveEdgePropSource / a strip pill.
export function tierLabel(tier, kind) {
  if (tier === 'edge')    return 'Edge';
  if (tier === 'piece')   return 'Piece';
  if (tier === 'layer')   return kind === 'outer' ? 'Outer' : 'Inner';
  if (tier === 'default') return 'Default';
  return '—';
}
