# Hakoniwa Design System

This doc records the universal design standards Hakoniwa commits to and
the conventions that flow from them. It's the reference for "does X
belong in this codebase" questions.

## Standards we follow

### WCAG 2.2 AA (accessibility)

- **Touch targets** — minimum 24×24 CSS px (AA), targets that share a
  row spaced ≥ 8 px apart. Coarse-pointer (touch) bumps to 44×44 px on
  primary actions, matching Apple HIG / Material guidelines.
- **Color contrast** — body text ≥ 4.5:1 against its surface; UI
  components and large text ≥ 3:1. The dark theme's text/surface pair
  passes; the light theme also passes (verified via the warm-cream
  tokens in `src/index.css`).
- **Focus visibility** — every interactive control shows a focus ring
  on keyboard navigation: 2 px outline in `--primary-2` with
  `outline-offset: 2px` (or `-2px` when the control is on a tinted
  background).
- **Keyboard reachability** — every interactive control responds to
  Enter / Space / Esc as appropriate. No mouse-only flows.
- **Reduced motion** — every transition, animation, or transform-based
  micro-interaction declares `@media (prefers-reduced-motion: reduce)`
  fallbacks.
- **Semantic HTML first, ARIA second** — landmarks (`header`, `nav`,
  `main`, `aside`), `<button type="button">` over `<div onClick>`,
  `aria-pressed` for toggles, `aria-current="page"` for nav tabs,
  `aria-live` for status pills.

### Mobile-first conventions

- **Container queries over viewport queries** — Edit-UI shells declare
  `container-type: inline-size`; primitives adapt to *their panel's*
  width, not the browser's. Already in place.
- **Safe-area insets** — every bottom-anchored surface
  (`BottomSheet`, future bottom nav) honours
  `env(safe-area-inset-bottom)` so iPhone's home indicator doesn't
  overlap controls.
- **Touch-action discipline** — surfaces that own gestures declare
  `touch-action: none`; others stay default so the browser still
  handles momentum scroll where it should.
- **No hover-only affordances** — every action discoverable on touch
  has a visible affordance (label, icon, sustained visibility under
  `@media (hover: none)`).
- **One-handed reach** — primary actions on mobile sit at the bottom
  of the screen (the BottomSheet, action bars), not the top.

### Visual system

- **Type scale** — Inter (body), JetBrains Mono (numerics), Space
  Grotesk (display). Imported once in `index.html`, configured via
  `--font-sans / --font-mono / --font-display` in `src/index.css`.
- **Spacing scale** — 2 / 4 / 6 / 8 / 12 / 16 / 20 / 24 / 32 px. Use
  multiples; don't introduce 3 px or 7 px gaps without a reason.
- **Radius scale** — 4 (`--radius-sm`-ish), 6 (chips), 8 (cards), 10
  (`--radius-md`), 14 (`--radius-lg`), 999 (pills). Stick to these.
- **Color tokens** — every colour reads from a `--token`, never a
  hard-coded hex. New surface? Add a token in `index.css`. The
  amber/cream + sage palette is the brand — colour deviation is
  intentional, not accidental.
- **Elevation** — `--shadow-sm / -md / -lg`. Three steps cover everything.
- **Motion vocabulary** — `cubic-bezier(0.22, 1, 0.36, 1)` for entry
  reveals, `cubic-bezier(0.34, 1.56, 0.64, 1)` for press feedback,
  140 ms for hover/focus transitions. Anything outside these wants a
  good reason.

### Information architecture

- **Progressive disclosure** — peek at default; expand on demand. The
  BottomSheet's three snap points are a vehicle for this: the user
  sees what they need first, drags up for more.
- **Direct manipulation** — selecting on the canvas, dragging to
  reorder, tapping to set. Avoid modal forms when an inline edit will do.
- **Forgiveness** — destructive actions (clear overrides, delete
  project) go through `ConfirmDialog`. Undo isn't implemented; we
  compensate with this gate.
- **Feedback every action** — autosave + sync pill on Edit/Grid;
  immediate visual reflection of edits on canvas; no silent failures.
- **Multiple paradigms as switchable layouts** — desktop Edit has four
  (Canvas / Layers / Flat / Workflow). Mobile collapses to one (the
  BottomSheet shell). Picking a paradigm should never be forced — the
  picker offers, never insists.

## Conventions that follow

### Components

- **No third-party UI library.** Hand-rolled primitives keep the
  bundle lean and the look distinctive. New primitive? Co-locate the
  CSS next to it.
- **Plain React hooks only.** `useState`, `useMemo`, `useCallback`,
  `useRef`, `useEffect`, `useLayoutEffect`, `useId`, `useContext` —
  that's the toolkit. No state libraries.
- **Portals for overlays.** Tooltips, color popovers, BottomSheet,
  EditModePicker — anything that needs to escape `overflow: hidden`
  goes through `createPortal(…, document.body)` with `position: fixed`
  positioning computed from `getBoundingClientRect()`.

### Code style

- **Comments only when the WHY is non-obvious.** Don't restate code.
  *Do* explain why the code is the way it is when a reader would
  wonder.
- **JSDoc over TypeScript** at function/component boundaries where
  types matter. The whole project is plain JS for portability.
- **One concept per file.** A subcard, a hook, a CSS sheet — each
  earns its own file when it gains structure.

## Breakpoints

| Context        | Width band  | What changes                              |
| -------------- | ----------- | ----------------------------------------- |
| Wide desktop   | ≥ 760 px    | Full layout: labels, side rails, brand title |
| Compact        | 520–759 px  | Page nav goes icon-only, project name hides, sync pill becomes a dot |
| Narrow / phone | < 520 px    | Brand title hides, theme/user shrink; Edit + Grid pages swap to canvas-fills-screen with a BottomSheet |
| Container `editui` ≤ 360 px | n/a | Sub-cards collapse to single-open accordion; workflow tabs go icon-only |
| Container `editui` ≤ 260 px | n/a | Chip / slider density tightens further |

`(pointer: coarse)` is the orthogonal media query that bumps tap
target sizes regardless of viewport — a desktop with a touch screen
gets the same treatment as a phone.

## What "fits" Hakoniwa

The brand is **warm, sophisticated, hand-built**. Maximalism would
look wrong here; so would corporate sterility. The amber+sage palette
and Space Grotesk display feel like a thoughtful workshop. Every new
piece of UI should pass: *would this look out of place in a small
artisan tool?*

Rough rules that follow:

- Sharp accents on muted surfaces, not flat fills.
- Restrained motion (140 ms is the default, not 300 ms).
- Typography carries weight; icons are decorative more than directive.
- Bold uppercase 700-weight only for sub-card titles and pickers — not
  body text.
- Light gradients over solid colours for active states; never neon.
