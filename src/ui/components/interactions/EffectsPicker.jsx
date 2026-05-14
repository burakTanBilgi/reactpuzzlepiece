import { useEffect, useRef, useState } from 'react';
import SliderRow from '../SliderRow.jsx';
import {
  TRIGGER_LABELS,
  EDGE_SCOPE_LABELS,
  makeEffectEntry,
  effectKey,
} from '../../../puzzle';

// Multi-select effect picker — used by every cascade tier card on the
// Cells and Edges panels. Renders a chip row to add/remove effects from
// the current tier, then one collapsible row per active effect with the
// configurable controls.
//
// Each active row is a <details> that collapses to a one-line summary
// (`Lift · Hover · 4px`); expand for the full editor (trigger pills,
// optional scope pills for edge effects, intensity sliders, remove).
// Newly-added entries auto-expand once so the user can configure them
// immediately.
//
// Props:
//   catalogue        — CELL_EFFECTS or EDGE_EFFECTS
//   inheritedEffects — resolved-from-lower-tiers map (read-only baseline;
//                      this tier can opt-out via `null` writes)
//   ownEffects       — this tier's own effects map (the editable layer)
//   onChange(map)    — called with the new own-effects map
//   mixed            — show 'mixed' chip + suppress active state
//
// Behaviour:
//   • One entry per effect-id per tier (MVP — multiple triggers/scopes
//     for the same effect could be supported later via separate keys).
//   • Chip click toggles ON/OFF. Removing an inherited entry writes
//     `null` at its key so the cascade drops it.
//   • Picking an effect whose `group` collides with an active one
//     auto-swaps (drops the colliding effects from this tier first).
export default function EffectsPicker({
  catalogue,
  inheritedEffects = {},
  ownEffects = {},
  onChange,
  mixed = false,
}) {
  const resolved = mergeOwnAndInherited(inheritedEffects, ownEffects);

  // Collapse to one entry per id (we only support one trigger/scope per id
  // per tier — multi-key for the same id is reserved for later).
  const entriesById = new Map();
  for (const entry of Object.values(resolved)) {
    if (entry && !entriesById.has(entry.id)) entriesById.set(entry.id, entry);
  }
  const isActive = (id) => entriesById.has(id);

  // Local state — which entries are expanded right now. Newly-added entries
  // get auto-opened on the next render via `pendingOpenRef`.
  const [openIds, setOpenIds] = useState(() => new Set());
  const pendingOpenRef = useRef(null);
  useEffect(() => {
    if (pendingOpenRef.current != null) {
      const id = pendingOpenRef.current;
      pendingOpenRef.current = null;
      setOpenIds((cur) => {
        const next = new Set(cur);
        next.add(id);
        return next;
      });
    }
  });
  const toggleOpen = (id) => {
    setOpenIds((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else                next.add(id);
      return next;
    });
  };

  // --- Mutators ---

  const removeEffectId = (id, base = ownEffects) => {
    const next = { ...base };
    for (const key of Object.keys(next)) {
      if (next[key] && next[key].id === id) delete next[key];
    }
    for (const key of Object.keys(inheritedEffects)) {
      if (inheritedEffects[key]?.id === id) next[key] = null;
    }
    return next;
  };

  const handleToggleChip = (id) => {
    if (isActive(id)) {
      onChange(removeEffectId(id));
      return;
    }
    const def = catalogue[id];
    if (!def) return;
    const newEntry = makeEffectEntry(catalogue, id);
    const newKey   = effectKey(id, newEntry.trigger, newEntry.scope);

    // Auto-swap conflicts: drop active effects sharing the same group.
    let next = { ...ownEffects };
    for (const e of entriesById.values()) {
      if (catalogue[e.id]?.group === def.group) {
        next = removeEffectId(e.id, next);
      }
    }
    next[newKey] = newEntry;
    pendingOpenRef.current = id;     // auto-expand so the user can configure
    onChange(next);
  };

  const handleChangeTrigger = (entry, newTrigger) => {
    const oldKey = effectKey(entry.id, entry.trigger, entry.scope);
    const newKey = effectKey(entry.id, newTrigger,    entry.scope);
    if (oldKey === newKey) return;
    const next = rekey(ownEffects, inheritedEffects, oldKey, newKey, { ...entry, trigger: newTrigger });
    onChange(next);
  };

  const handleChangeScope = (entry, newScope) => {
    const oldKey = effectKey(entry.id, entry.trigger, entry.scope);
    const newKey = effectKey(entry.id, entry.trigger, newScope);
    if (oldKey === newKey) return;
    const next = rekey(ownEffects, inheritedEffects, oldKey, newKey, { ...entry, scope: newScope });
    onChange(next);
  };

  const handleChangeConfig = (entry, field, value) => {
    const key = effectKey(entry.id, entry.trigger, entry.scope);
    const cfg = { ...(entry.config || {}), [field]: value };
    onChange({ ...ownEffects, [key]: { ...entry, config: cfg } });
  };

  return (
    <div className="effects-picker">
      <div className="effect-chips">
        {Object.entries(catalogue).map(([id, def]) => (
          <button
            key={id}
            type="button"
            title={def.label}
            className={`chip chip--sm ${isActive(id) && !mixed ? 'chip--active' : ''}`}
            onClick={() => handleToggleChip(id)}
          >
            {def.label}
          </button>
        ))}
        {mixed && <span className="chip chip--sm chip--mixed">mixed</span>}
      </div>

      {!mixed && [...entriesById.values()].map((entry) => {
        const def = catalogue[entry.id];
        if (!def) return null;
        const hasMultiTriggers = (def.triggers || []).length > 1;
        const hasMultiScopes   = (def.scopes   || []).length > 1;
        const hasConfig        = Object.keys(def.config || {}).length > 0;
        const hasControls      = hasMultiTriggers || hasMultiScopes || hasConfig;
        if (!hasControls) {
          // Render as a simple removable chip-row when there's nothing to tweak.
          return (
            <div key={entry.id} className="effect-active-row effect-active-row--bare">
              <span className="effect-active-row__name">{def.label}</span>
              <button type="button" className="link-btn"
                onClick={() => handleToggleChip(entry.id)}>remove</button>
            </div>
          );
        }
        const isOpen = openIds.has(entry.id);
        return (
          <details
            key={entry.id}
            className="effect-active-row"
            open={isOpen}
            onToggle={(e) => {
              const willOpen = e.currentTarget.open;
              setOpenIds((cur) => {
                const next = new Set(cur);
                if (willOpen) next.add(entry.id); else next.delete(entry.id);
                return next;
              });
            }}
          >
            <summary className="effect-active-row__summary">
              <span className="effect-active-row__name">{def.label}</span>
              <span className="effect-active-row__hint">
                {summariseEntry(entry, def)}
              </span>
              <button
                type="button"
                className="link-btn"
                onClick={(e) => { e.preventDefault(); handleToggleChip(entry.id); }}
              >remove</button>
            </summary>

            <div className="effect-active-row__body">
              {hasMultiTriggers && (
                <div className="form-row form-row--stack">
                  <label className="form-row__label">When</label>
                  <div className="effect-chips">
                    {def.triggers.map((t) => (
                      <button key={t} type="button"
                        className={`chip chip--sm ${entry.trigger === t ? 'chip--active' : ''}`}
                        onClick={() => handleChangeTrigger(entry, t)}>
                        {TRIGGER_LABELS[t] || t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {hasMultiScopes && (
                <div className="form-row form-row--stack">
                  <label className="form-row__label">Where</label>
                  <div className="effect-chips">
                    {def.scopes.map((s) => (
                      <button key={s} type="button"
                        className={`chip chip--sm ${(entry.scope || def.defaultScope) === s ? 'chip--active' : ''}`}
                        onClick={() => handleChangeScope(entry, s)}>
                        {EDGE_SCOPE_LABELS[s] || s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {Object.entries(def.config || {}).map(([field, schema]) => (
                <SliderRow
                  key={field}
                  label={schema.label}
                  min={schema.min} max={schema.max} step={schema.step}
                  value={entry.config?.[field] ?? schema.default}
                  format={(v) => `${v}${schema.unit || ''}`}
                  onChange={(v) => handleChangeConfig(entry, field, v)}
                />
              ))}
            </div>
          </details>
        );
      })}
    </div>
  );
}

function mergeOwnAndInherited(inherited, own) {
  const out = { ...inherited };
  for (const [key, entry] of Object.entries(own || {})) {
    if (entry === null) delete out[key];
    else                  out[key] = entry;
  }
  return out;
}

// Move an entry from oldKey → newKey on the own map. If oldKey was inherited
// (not present in own), write a null at oldKey so the cascade drops the
// inherited copy when the new key takes effect.
function rekey(own, inherited, oldKey, newKey, newEntry) {
  const next = { ...own };
  if (inherited[oldKey] && next[oldKey] === undefined) next[oldKey] = null;
  else delete next[oldKey];
  next[newKey] = newEntry;
  return next;
}

// Build the one-line collapsed-row summary, e.g. `Hover · Edge · 4px`.
function summariseEntry(entry, def) {
  const parts = [];
  if (def.triggers && def.triggers.length > 1) parts.push(TRIGGER_LABELS[entry.trigger] || entry.trigger);
  if (def.scopes   && def.scopes.length   > 1) parts.push(EDGE_SCOPE_LABELS[entry.scope || def.defaultScope] || entry.scope);
  for (const [field, schema] of Object.entries(def.config || {})) {
    const raw = entry.config?.[field] ?? schema.default;
    parts.push(`${raw}${schema.unit || ''}`);
  }
  return parts.join(' · ');
}
