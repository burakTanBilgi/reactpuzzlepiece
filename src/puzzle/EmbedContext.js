import { createContext } from 'react';

// Renderer escape-hatch for richer piece content. The host app supplies
// a function `(content, piece) => ReactNode | null` via this context;
// PuzzlePiece looks it up when content.type isn't one of the built-in
// kinds (text/image) and falls back to a small SVG placeholder when no
// renderer is present (single-file exports, headless tests, the ZIP
// module). Lives inside the puzzle/ folder so the renderer remains
// self-contained — the module still has zero outside imports.
export const EmbedContext = createContext(null);
