import EffectsPicker from '../interactions/EffectsPicker.jsx';
import InspectorSubcard from './InspectorSubcard.jsx';
import { CELL_EFFECTS } from '../../../puzzle';

// Reusable editor for any cell-animation cascade tier (default or per-piece).
// Cell animations have no shape/stroke — only the effects map.
export default function CellTierEditor({
  title,
  accent = false,
  ownEffects = {},
  inheritedEffects = {},
  onChange,
  onReset,
}) {
  return (
    <InspectorSubcard
      title="Body animations"
      accent={accent}
      actions={onReset ? <button type="button" className="link-btn" onClick={onReset}>reset</button> : null}
    >
      <EffectsPicker
        catalogue={CELL_EFFECTS}
        ownEffects={ownEffects}
        inheritedEffects={inheritedEffects}
        onChange={onChange}
      />
    </InspectorSubcard>
  );
}
