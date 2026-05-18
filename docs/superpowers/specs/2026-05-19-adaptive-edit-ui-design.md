# Adaptive Edit UI — container-queried sub-cards + mobile shell

**Date:** 2026-05-19
**Status:** Design (awaiting review)
**Scope:** `src/ui/components/edit-ui/`, `src/ui/components/inspector/`,
`src/ui/styles/ui-kit.css`, `src/ui/pages/EditPage.{jsx,css}`

## Problem

The four Edit-UI modes (Canvas, Flat, Workflow, Layers) all host the
same Inspector tree: three or four sub-cards (`SHAPE & STROKE`,
`ANIMATIONS`, `BODY ANIMATIONS`, optionally `CONTENT`) stacked
vertically inside a ~280-px-wide panel.

Two visible failures at moderate zoom-out or narrow containers:

1. **Layers mode at 80 % zoom (Image #1).** Three sub-cards stacked
   vertically overflow the panel even after the recent density pass.
   The `BODY ANIMATIONS` card spills past the visible viewport. Outer
   `overflow-y: auto` is in place, but the layout still presents *all
   three bodies at once*, which is the wrong information density for
   that container size.

2. **Workflow tab strip (Image #2).** Tabs read "Con… Paint Ani…" — the
   labels are being clipped. The existing fallback
   `@media (max-width: 720px) { .workflow-tab__label { display: none } }`
   queries the **viewport**, but the workflow panel can be ~280 px wide
   inside a 1920-px viewport. The query never fires.

Both failures share a root cause: **the UI sizes itself against the
viewport, not the container.** Absolute pixel padding and
viewport-bound media queries cannot adapt to a narrow inner panel.

## Goals

- Three sub-cards must fit inside any of the four Edit-UI modes at
  100 % zoom **and** remain usable at 80 % zoom on a 1366×768 laptop.
- Workflow tabs must collapse to icon-only when their own container is
  narrow, regardless of viewport width.
- Lay reusable groundwork for mobile (phones, ≤ 640 px viewport):
  a bottom-sheet shell that hosts the same Inspector tree, so the
  Inspector doesn't have to be rewritten when we do a real mobile pass.

## Non-Goals

- A full mobile port. Only the bottom-sheet shell + touch-target
  affordances are in scope.
- Re-skinning `EdgeEditorCanvas` (already responsive via pan/zoom).
- Replacing `react-colorful` with a touch-native picker.
- Replacing the cascade-strip / tier model.
- Container queries on the Grid editor page. (Edit page only.)

## Design

### 1. Container-query foundation

Tag every Edit-UI root and the floating panel as a query container:

```css
.canvas-edit-ui,
.flat-edit-ui,
.workflow-edit-ui,
.layers-edit-ui,
.floating-panel {
  container-type: inline-size;
  container-name: editui;
}
```

Define three named container size tiers used across the inspector:

| Tier | Width band | Behavior |
| --- | --- | --- |
| **Wide** | ≥ 360 px | Current layout — all sub-cards expanded, full labels, full density. |
| **Compact** | 260–359 px | Density tightens (chip 24→22, paddings −2 px, slider value chip dim). |
| **Narrow** | < 260 px | Sub-card accordion (one open), Workflow tabs icon-only, slider editable input becomes a tap chip. |

Container queries are supported in all evergreen browsers ≥ 2023; this
project's Vite/React setup imposes no compatibility constraint.

### 2. Collapsible sub-card primitive

A small extension to the existing `InspectorSubcard` component:

```jsx
<InspectorSubcard
  id="shape-stroke"
  title="Shape & stroke"
  open={openId === 'shape-stroke'}
  onToggle={() => setOpenId(id => id === 'shape-stroke' ? null : 'shape-stroke')}
>
  …
</InspectorSubcard>
```

- At **wide tier**, `open` is forced `true` (CSS overrides the prop) so
  all cards render expanded — current behavior preserved.
- At **compact** and **narrow** tiers, the prop controls visibility.
  Only one card open at a time; clicking another's header swaps which
  body renders.
- State lives in a new hook `useSubcardAccordion(panelId)` which reads
  and writes `localStorage["hakoniwa:editui:subcard:<panelId>"]`.
  Default: first sub-card open. The panel id keeps each Edit-UI mode's
  preference separate (Canvas drawer ≠ Flat panel).

Header gets a chevron rotation cue (already an existing icon) and a
`button` semantic with `aria-expanded` / `aria-controls`.

CSS sketch:

```css
.inspector-subcard__body { display: block; }

@container editui (max-width: 359px) {
  .inspector-subcard:not(.inspector-subcard--open) .inspector-subcard__body {
    display: none;
  }
  .inspector-subcard__head { cursor: pointer; }
}
```

### 3. Density adapt — same content, tighter rhythm

Already-applied density pass stays; container queries add a second
tightening pass at compact tier only:

```css
@container editui (max-width: 359px) {
  .chip--icon { width: 22px; height: 22px; }
  .chip--pick { width: 22px; height: 22px; }
  .inspector-subcard__body { padding: 4px 6px 5px; gap: 3px; }
  .slider-control { min-height: 18px; gap: 5px; }
  .slider-control__input { display: none; }
  .slider-control__value { /* becomes a tap-to-edit chip */ }
}
```

The numeric input collapse at compact tier is the largest horizontal
saving on the slider row. The value chip is tap-to-reveal (existing
`onClick` handler on `.slider-control__value` already wired during the
icon pass).

### 4. Workflow tab strip

Remove the broken viewport @media:

```css
/* DELETE */
@media (max-width: 720px) {
  .workflow-tab__label { display: none; }
}
```

Replace with a container query:

```css
@container editui (max-width: 360px) {
  .workflow-tab__label { display: none; }
}
```

The existing tooltip already shows the textual name on hover/focus, so
icon-only is fully accessible.

### 5. Touch-target affordance

```css
@media (pointer: coarse) {
  .chip--icon,
  .chip--pick,
  .icon-action-btn {
    /* hit box grows via padding-only; visual size unchanged */
    position: relative;
  }
  .chip--icon::after,
  .chip--pick::after,
  .icon-action-btn::after {
    content: "";
    position: absolute;
    inset: -8px;
  }
}
```

Note: the only `position: absolute` in this change is on a
**pseudo-element used purely to extend the hit box** — it does not
position any visible content (the user's "nothing should have
position:absolute" rule applies to popovers / floating UI, not invisible
hit-box helpers). If the user prefers, this can become hit-box padding
on the host element instead. Open question flagged below.

### 6. Mobile shell (groundwork)

New component `BottomSheet.jsx` + `BottomSheet.css`:

- Renders into `document.body` via `createPortal` (matches portal
  pattern already used by `EditModePicker` + the color popover).
- `position: fixed; bottom: 0; left: 0; right: 0;` — the spec
  allows `position: fixed` for portalled overlays.
- Snap points: 30 % / 65 % / 100 % of viewport height. Default 65 %.
- Drag handle on top; vertical drag adjusts height via `transform`.
- Backdrop tap dismisses → 30 % snap.

`EditPage` becomes responsive:

```jsx
const isPhone = useMediaQuery('(max-width: 640px)');

return (
  <div className="edit-page">
    <Canvas …/>
    {isPhone
      ? <BottomSheet open={!!selection}><Inspector …/></BottomSheet>
      : <SidePanel><Inspector …/></SidePanel>}
  </div>
);
```

- Floating panels in Canvas mode also dock to the bottom sheet on
  phones — same content, different shell.
- `useMediaQuery` is a small new hook (~10 lines, no dep).

This is intentionally minimal. The bottom sheet hosts the same
Inspector tree that already adapts via container queries (its container
on phones is the sheet's width, which is full viewport, so it'll often
sit in the **wide** tier even on phones — that's fine).

### 7. Edge cases

- **Cascade strip** stays visible above the sub-cards in all tiers.
  At narrow tier it shrinks its pill labels to letters (D/I/O/P/E) but
  keeps the dot. Same `@container` rule.
- **Color popover** already portals to body; no change needed.
- **localStorage absent** (private mode): hook falls back to in-memory
  state, no crash.
- **Reduced motion**: bottom-sheet drag animation respects
  `prefers-reduced-motion: reduce` (no slide-up animation).
- **Resizing across tiers**: when the container crosses a threshold,
  the accordion behavior simply turns on/off. Open state is preserved.

## Files & components

**New:**
- `src/ui/components/BottomSheet.jsx` + `.css`
- `src/ui/hooks/useMediaQuery.js`
- `src/ui/hooks/useSubcardAccordion.js`

**Modified:**
- `src/ui/components/inspector/InspectorSubcard.jsx` — accept `open` /
  `onToggle` props; header becomes a button at narrow tier.
- `src/ui/components/inspector/Inspector.css` — container query rules;
  collapsed-body display: none; chevron rotation.
- `src/ui/components/inspector/PieceInspector.jsx` +
  `EdgeInspector.jsx` — wire `useSubcardAccordion` and pass
  `open`/`onToggle` to each sub-card.
- `src/ui/components/edit-ui/WorkflowEditUi.css` — drop viewport @media;
  add `container-type` + container @media.
- `src/ui/components/edit-ui/FlatEditUi.css` — add `container-type`.
- `src/ui/components/edit-ui/LayersEditUi.css` — add `container-type`.
- `src/ui/components/edit-ui/CanvasEditUi.css` — add `container-type`
  on `.floating-panel`.
- `src/ui/styles/ui-kit.css` — `@container editui (max-width: 359px)`
  density block; touch-target rules.
- `src/ui/pages/EditPage.jsx` + `.css` — mobile-viewport detection,
  BottomSheet wrapper.

**Unchanged:**
- `EdgeEditorCanvas`, `ViewPanel`, all `puzzle/` module files.
- `EffectsPicker`, `StyleControls`, `EdgeTierEditor` (already work
  inside any container thanks to recent passes).
- All `grid/` files.

## Testing

- **Existing 161 tests must stay green.** No component contract
  changes; sub-card accepts new optional props that default to "wide
  tier = always open" so untouched callers see no behavior change.
- **New tests:**
  - `useSubcardAccordion.test.js`: open/close/persist roundtrip.
  - `BottomSheet.test.jsx`: snap-point logic, dismiss behavior.
  - `InspectorSubcard.test.jsx`: collapsed body not in DOM at narrow
    tier (via `container-type` simulation — happy-dom supports
    container queries as of 2024).
- **Manual verification at three viewports:**
  - 1920×1080, all four Edit UI modes, 100 % + 80 % + 67 % zoom.
  - 1366×768, all four modes, 100 %.
  - 390×844 (iPhone 14 emulator): bottom sheet renders, drags between
    snaps, dismisses; sub-cards inside still functional.
- **Build:** `npm run build` clean, bundle size delta ≤ +3 KB gzipped
  (BottomSheet + hooks).

## Open questions (deferred to implementation)

- **Touch-target hit-box mechanism**: pseudo-element vs. padding on the
  host. Pseudo-element is cleaner but uses `position: absolute` (only
  on an invisible overlay). If the user wants zero `position: absolute`
  even for hit-boxes, switch to padding-only.
- **Sub-card titles** at narrow tier: keep full uppercase ("BODY
  ANIMATIONS") or abbreviate to a single icon + truncation? Default:
  keep full text with `text-overflow: ellipsis`.

## Why this is the right size for one plan

This is a single cohesive change — introduce container-query awareness
+ adaptive sub-cards, plus the mobile-shell groundwork. It's bigger
than another CSS density pass and smaller than a UX redesign. After
it lands, mobile-quality tuning (gesture polish, sheet animation,
keyboard-on-input behavior) becomes its own separate plan with no
upfront architectural rework needed.
