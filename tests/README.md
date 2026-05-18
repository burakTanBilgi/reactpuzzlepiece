# tests/

Vitest + React Testing Library suite for **UI functionality** in Hakoniwa.
Landing and Docs pages are intentionally out of scope — they're brand
surfaces, not interactive editors.

## Latest run

```
Test Files  25 passed (25)
     Tests  161 passed
  Coverage  Statements: 38.7%   Branches: 33.5%
            Functions:  34.2%   Lines:     40.6%
```

## Layout

```
tests/
├── setup.js                                — testing-library globals + in-memory localStorage
├── helpers/
│   ├── fixtures.js                         — project / grid builders
│   └── test-utils.jsx                      — renderWithTiles() helper
└── unit/
    ├── grid/                               — pure data-model
    │   ├── grid.test.js                    — merge / unmerge / isRectangular
    │   ├── compile.test.js                 — edgeKey / piecesOfEdge / resolveEdge symmetry
    │   ├── compile-project.test.js         — full compileProject pipeline, outer-edge counting
    │   ├── grid-actions.test.js            — unmerge color preservation
    │   ├── edge-actions.test.js            — every tier setter + resetEdgeOverrides
    │   ├── piece-actions.test.js           — color / content / cell effects
    │   ├── import.test.js                  — parseTable / tableToProject / importTableText
    │   └── zip.test.js                     — pure ZIP encoder (file headers, EOCD, UTF-8 names)
    ├── puzzle/
    │   └── effect-attrs.test.js            — cellEffectAttrs + edgeEffectAttrs className/style derivation
    └── ui/
        ├── hooks/
        │   ├── useEditUiMode.test.jsx      — mode + tiles persistence
        │   └── useLayerTree.test.jsx       — Layers UI row derivation
        ├── inspector/
        │   ├── cascade-source.test.js      — tierHasOverride, computeTierStates, resolveEdgePropSource
        │   └── CascadeStrip.test.jsx       — pill state, applicability, callbacks
        ├── components/
        │   ├── SliderRow.test.jsx          — slider mode vs preset tiles (Direction D)
        │   ├── EditModePicker.test.jsx     — picker open/close/switch + tiles toggle
        │   ├── ConfirmDialog.test.jsx      — Esc/Enter handling + button callbacks
        │   ├── Icon.test.jsx               — glyph dispatch + a11y
        │   ├── AccordionCard.test.jsx      — open / close / badge / disabled / aria
        │   ├── EffectsPicker.test.jsx      — picker-split add / focus / remove / auto-swap
        │   ├── PieceInspector.test.jsx     — Content tab type-to-fill + guards
        │   ├── StyleControls.test.jsx      — react-colorful popover + hex input + reset
        │   ├── LayersPanel.test.jsx        — row clicks → onPickRow, section non-interactive
        │   ├── FlatEditUi.test.jsx         — scope routing (Default / Inner / Outer / Piece)
        │   └── WorkflowEditUi.test.jsx     — Connect / Paint / Animate tab switching
        └── utils/
            └── computeViewBox.test.js      — pad math + empty-pieces fallback
```

## Running

```bash
npm test            # one-shot run
npm run test:watch  # re-run on save
npm run test:coverage
```

## Coverage at a glance

| Module | Statements |
|---|---|
| `useEditUiMode` | 92 % |
| `useLayerTree` | 97 % |
| `inspector/cascade-source` | 90 % |
| `ConfirmDialog` | 100 % |
| `EditModePicker` | 92 % |
| `InspectorSubcard` | 100 % |
| `AccordionCard` | 100 % |
| `LayersPanel` | 100 % |
| `EffectsPicker` | 89 % |
| `effect-attrs` | 100 % |
| `effects-catalog` | 95 % |
| `grid` | 73 % |
| `import` | 100 % |
| `zip` | 95 % |
| `edge-actions` / `piece-actions` | 95 % |
| `compile` | 81 % |
| `StyleControls` | 95 % |
| `FlatEditUi` | 75 % |
| `WorkflowEditUi` | 65 % |
| `computeViewBox` | 100 % |

## What's covered

**Pure data model** (no React, no DOM):
- Grid model + compile end-to-end.
- Action factories (edge / piece / grid).
- CSV/TSV import.
- ZIP encoder.
- Effect-attribute derivation.

**Cascade resolution**:
- Shared-edge symmetry regression guard (resolveEdge + resolveEdgeEffects).
- Per-property source resolution.

**Hooks**: useEditUiMode, useLayerTree (with localStorage + project-shape derivation).

**Components**:
- Inspector primitives — AccordionCard, EffectsPicker, SliderRow, ConfirmDialog, Icon, StyleControls, PieceInspector (type-to-fill).
- Cascade strip pill state.
- Layers panel row click routing.
- Edit-UI shells — FlatEditUi scope routing, WorkflowEditUi tab switching.
- EditModePicker popover behaviour.

## What's NOT covered (deliberate)

- `LandingPage` / `DocsPage` — explicitly out of scope.
- `puzzle/geometry.js` — heavy SVG-path math. Would benefit from visual regression (Playwright) over unit tests.
- `puzzle/PuzzleBoard` / `PuzzlePiece` rendering — covered visually in the live app.
- Page-level integration (`EditPage`, `GridEditorPage`) — would need a heavier `useProject` storage mock; not blocking.
- `EdgeEditorCanvas` / `GridCanvas` pointer events — better suited to end-to-end testing.

## Conventions

- Files end in `.test.js` (pure logic) or `.test.jsx` (rendering).
- `setup.js` installs an **in-memory localStorage** so each test sees an empty store.
- Component tests prefer **role-based queries** (`getByRole`, `getByLabelText`) over CSS class lookups so refactoring styles doesn't break tests.
- Fixtures (`helpers/fixtures.js`) emit plain Project objects — no React hooks.
- `renderWithTiles(ui, { tiles })` wraps a component in `TilesContext.Provider` for components that consult the preset-tiles preference.

## Adding a test

1. Pure logic → `unit/{grid,puzzle,ui/hooks,ui/utils}/`.
2. Component test → `unit/ui/{components,inspector}/`, file ends in `.test.jsx`.
3. Run `npm run test:watch` while iterating.
4. Add new render wrappers in `helpers/test-utils.jsx`, not inline.
