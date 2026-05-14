import SliderRow from '../SliderRow.jsx';
import { TRIGGER_LABELS, makeEffectEntry, effectKey } from '../../../puzzle';

// Multi-select effect picker — used by every cascade tier card on both the
// Cells panel and the Edges panel. Renders a chip row to add/remove effects
// from the current tier, then one editable row per active effect with a
// trigger pill row + intensity sliders sourced from the catalogue schema.
//
// Props:
//   catalogue        — CELL_EFFECTS or EDGE_EFFECTS
//   inheritedEffects — resolved-from-lower-tiers map (read-only baseline;
//                      this tier can opt-out via `null` writes)
//   ownEffects       — this tier's own effects map (the editable layer)
//   onChange(map)    — called with the new own-effects map
//   mixed            — show 'mixed' chip + suppress active state (for
//                      multi-select editing where picks disagree)
//
// Behaviour notes:
//   • One entry per effect-id per tier (MVP simplification). Pick a chip to
//     add the effect under its default trigger; the trigger pill row on the
//     active row lets you change it afterwards.
//   • Chip click toggles ON/OFF. Removing an inherited entry writes `null`
//     at its key so the cascade drops it; removing an own entry deletes the
//     key.
//   • Picking an effect whose `group` collides with an active one auto-swaps
//     (drops the colliding effects from this tier, then adds the new one).
export default function EffectsPicker({
  catalogue,
  inheritedEffects = {},
  ownEffects = {},
  onChange,
  mixed = false,
}) {
  const resolved = mergeOwnAndInherited(inheritedEffects, ownEffects);

  // For the UI we collapse to one entry per effect-id (the first key we
  // encounter under that id). Adding / changing trigger always writes to
  // a single key per id.
  const entriesById = new Map();
  for (const entry of Object.values(resolved)) {
    if (!entry || !entriesById.has(entry.id)) {
      if (entry) entriesById.set(entry.id, entry);
    }
  }
  const isActive = (id) => entriesById.has(id);

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
    const newKey   = effectKey(id, newEntry.trigger);

    // Auto-swap conflicts: drop any active effects sharing this group.
    let next = { ...ownEffects };
    for (const e of entriesById.values()) {
      if (catalogue[e.id]?.group === def.group) {
        next = removeEffectId(e.id, next);
      }
    }
    next[newKey] = newEntry;
    onChange(next);
  };

  const handleChangeTrigger = (entry, newTrigger) => {
    const oldKey = effectKey(entry.id, entry.trigger);
    const newKey = effectKey(entry.id, newTrigger);
    if (oldKey === newKey) return;
    const next = { ...ownEffects };
    if (inheritedEffects[oldKey]) next[oldKey] = null;
    else delete next[oldKey];
    next[newKey] = { ...entry, trigger: newTrigger };
    onChange(next);
  };

  const handleChangeConfig = (entry, field, value) => {
    const key = effectKey(entry.id, entry.trigger);
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
        const hasConfig = Object.keys(def.config || {}).length > 0;
        const hasMultiTriggers = (def.triggers || []).length > 1;
        if (!hasMultiTriggers && !hasConfig) return null;
        return (
          <div key={entry.id} className="effect-active-row">
            <div className="effect-active-row__head">
              <span className="effect-active-row__name">{def.label}</span>
              <button type="button" className="link-btn"
                onClick={() => handleToggleChip(entry.id)}>remove</button>
            </div>

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
