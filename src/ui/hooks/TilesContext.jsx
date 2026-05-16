import { createContext } from 'react';

// Cross-cutting "preset tiles vs sliders" preference (Direction D).
// EditPage wraps each Edit-UI mode in <TilesContext.Provider value={tiles}>
// so any SliderRow / StyleControls / wave-config control deep inside the
// tree can opt into the tile-grid rendering by reading this context.
export const TilesContext = createContext(false);
