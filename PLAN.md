# PLAN.md — Puzzle Piece Designer Roadmap

## Vision

Transform this playground into a full-featured web design tool where users can:
- 🎨 **Design layouts** visually with customizable puzzle-piece connectors
- 📊 **Import from Excel** (merged cells become merged pieces)
- 🖼️ **Add content** (text, images) to each piece
- 🎭 **Change connector styles** (puzzle, wave, straight, zigzag, etc.)
- 📤 **Export** as JSON, SVG, or React components
- 📱 **Mobile-ready** (future phase)

---

## Phase 1 — Documentation
**Status**: ✅ **In Progress**

Create foundational documentation so contributors understand the codebase and roadmap.

- [ ] Write `CLAUDE.md` with architecture, data model, conventions
- [ ] Write `PLAN.md` (this file) with feature timeline
- [ ] Update `README.md` with links to both

**Why**: Clear docs prevent duplicate work and guide implementation decisions.

---

## Phase 2 — Effect / Connector System
**Status**: ⏳ **Pending**

**Goal**: Make the connector style (currently hard-coded as puzzle piece arcs) swappable.

**What changes**:
- Create `src/puzzle/effects/` folder with effect modules:
  - `puzzleEffect.js` — arcs (current behavior, extracted)
  - `waveEffect.js` — sine-wave connectors
  - `straightEffect.js` — straight edges (flat connection)
  - `zigzagEffect.js` — zigzag (optional, future)
- Refactor `geometry.js` to call the active effect's path builder
- Add `effect` field to board state in `usePuzzleBoard.js`
- UI control: effect picker dropdown in toolbar

**Files**:
- Modified: `src/puzzle/geometry.js`, `src/puzzle/usePuzzleBoard.js`, `src/App.jsx`
- New: `src/puzzle/effects/puzzleEffect.js`, `waveEffect.js`, `straightEffect.js`

**Verification**:
- Switching effects rerenders with new connector style
- Puzzle effect looks identical to current board
- All knob interactions still work

---

## Phase 3 — Piece Content (Text + Images)
**Status**: ⏳ **Pending**

**Goal**: Let users add rich content (text or images) that clips to piece shape.

**What changes**:
- Extend piece data model: `content?: { type: 'text' | 'image'; value: string; style?: object }`
- `PuzzleBoard.jsx`: render `<defs>` with `<clipPath>` for each piece
- `PuzzlePiece.jsx`: render image or text inside clipPath
- Sidebar panel: content editor (text input, image file picker)

**Files**:
- Modified: `src/puzzle/PuzzleBoard.jsx`, `src/puzzle/PuzzlePiece.jsx`, `src/App.jsx`, `src/puzzle/board.js`
- New: `src/components/ContentEditor.jsx` (optional, UI component)

**Verification**:
- Select piece, add text → text appears clipped to shape
- Upload image → image appears clipped to shape
- Content persists through board edits

---

## Phase 4 — UI/UX Redesign
**Status**: ⏳ **Pending**

**Goal**: Polish the interface with a professional design tool layout.

**What changes**:
- **Top toolbar**: logo, effect picker, zoom controls, import/export buttons
- **Left sidebar**: piece layer list / tree (clickable to select)
- **Right sidebar**: selected piece properties (content editor, knob config, label, color fill)
- **Canvas background**: subtle grid or dot pattern
- **Piece colors**: add `fill` field to piece model; per-piece color or gradient
- **Transitions**: smooth hover/select via CSS on SVG elements
- **Theme toggle**: dark / light mode switch

**Files**:
- Major rewrite: `src/App.jsx`, `src/App.css`
- Modified: `src/puzzle/PuzzleBoard.css`, `src/puzzle/PuzzlePiece.jsx`
- New: `src/components/Toolbar.jsx`, `src/components/Sidebar.jsx`, `src/components/LayerList.jsx`

**Verification**:
- UI is intuitive and polished
- Piece selection, content editing, effect switching all work seamlessly
- Light and dark themes both render correctly

---

## Phase 5 — Excel Import
**Status**: ⏳ **Pending**

**Goal**: Parse `.xlsx` files and generate a board where merged cells become merged pieces.

**What changes**:
- Add `xlsx` (SheetJS) to `package.json`
- Create `src/utils/excelImport.js`:
  - `parseExcelToBoard(file, cellSize = 120) → Piece[]`
  - Read workbook via `XLSX.read()`
  - Iterate `!merges` array → one piece per merge region
  - Unmerged cells → one piece per cell
  - Map row/col to x/y coordinates
  - Generate interlocking tabs/sockets between adjacent pieces
  - Cell text → `piece.label` or `piece.content.value`
- UI: "Import Excel" button in toolbar → file picker → `parseExcelToBoard(file)` → `setPieces(newPieces)`

**Files**:
- New: `src/utils/excelImport.js`
- Modified: `package.json`, `src/App.jsx`

**Verification**:
- Upload `.xlsx` with merged cells
- Board renders with correct piece layout + text content
- Pieces have interlocking tabs/sockets

---

## Phase 6 — Export System
**Status**: ⏳ **Pending**

Three export formats: JSON (bidirectional), SVG, React component.

### 6a — JSON Export/Import (Bidirectional)
- `exportBoardToJSON(pieces, effect) → string` — serialize full state
- `importBoardFromJSON(json) → { pieces, effect }` — deserialize + validate
- UI buttons: "Download JSON", "Upload JSON"

**Files**:
- New: `src/utils/exportJSON.js`, `src/utils/importJSON.js`
- Modified: `src/App.jsx`

### 6b — SVG Export
- Serialize the `<svg>` DOM (including `<defs>` clipPaths, embedded images)
- Download as `.svg` file
- Uses `XMLSerializer` or manual string building from state

**Files**:
- New: `src/utils/exportSVG.js`
- Modified: `src/App.jsx`

### 6c — React Component Export
- `exportBoardToReact(pieces, effect) → string` — generate `.jsx` source
- Output is a self-contained component ready to paste into any React 18+ project
- Download as `PuzzleLayout.jsx`

**Files**:
- New: `src/utils/exportReact.js`
- Modified: `src/App.jsx`, `src/puzzle/index.js`

**Verification**:
- Each export downloads a valid file
- JSON re-import restores board state exactly
- SVG opens in browser / Figma / Illustrator
- React export can be pasted into fresh Vite project and renders identically

---

## Phase 7 — Mobile Readiness (Future)
**Status**: ⏳ **Not Started**

Lower priority; implement after all other features ship.

- Replace mouse events with Pointer Events API (mouse + touch)
- Pinch-to-zoom on canvas
- Responsive layout: sidebar collapses to bottom sheet on small screens
- Test on iOS Safari, Android Chrome

**Files**:
- Modified: `src/puzzle/PuzzleBoard.jsx`, `src/App.jsx`, `src/App.css`

---

## Dependencies to Add

| Package | Purpose | Phase |
|---|---|---|
| `xlsx` | Parse Excel files | 5 |

No other new runtime dependencies. SVG export uses native browser APIs.

---

## Git Workflow

Each phase is a separate feature branch (or squashed commit if trivial):
```bash
git checkout -b phase-2-effects
# ... work ...
git add .
git commit -m "Phase 2: effect/connector system"
git push
# Create PR for review
```

---

## Success Criteria

- ✅ Designs can be imported from Excel (Phase 5)
- ✅ All designs are exportable as JSON (Phase 6a)
- ✅ Designs can be exported as SVG files (Phase 6b)
- ✅ Designs can be exported as React components (Phase 6c)
- ✅ Pieces/cells support text and image content (Phase 3)
- ✅ Connector effects are switchable globally (Phase 2)
- ✅ UI is polished and intuitive (Phase 4)
- ✅ No regressions in existing board mechanics
