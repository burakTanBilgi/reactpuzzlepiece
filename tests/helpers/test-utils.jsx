import { render } from '@testing-library/react';
import { TilesContext } from '../../src/ui/hooks/TilesContext.jsx';

// Custom render that wraps the tree in TilesContext. Use it whenever a
// component (directly or indirectly) reads the tiles preference — e.g.
// SliderRow / StyleControls / EffectsPicker. Defaults to tiles=false to
// match the production default.
//
//   renderWithTiles(<SliderRow … />, { tiles: true })
export function renderWithTiles(ui, { tiles = false, ...rest } = {}) {
  return render(
    <TilesContext.Provider value={tiles}>{ui}</TilesContext.Provider>,
    rest
  );
}
