import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './BottomSheet.css';

// Mobile bottom-sheet shell. Portalled to <body> so it sits above
// everything, with three snap points (collapsed / default / expanded)
// the user can drag the grip between. The sheet is its own
// `container-name: editui` so the same subcards that adapt inside the
// side rail keep adapting inside the sheet.
//
// Props:
//   open        — controls visibility
//   onClose     — invoked when the backdrop or Esc dismisses the sheet
//   title       — accessible label for the dialog
//   modal       — when true, render a tap-to-dismiss backdrop + Esc handler.
//                 When false (default), the sheet is a persistent surface;
//                 the area of the viewport above it stays interactive.
//   defaultSnap — which snap to mount at: 'collapsed' | 'default' | 'expanded'.
//                 Persistent sheets typically want 'collapsed' so the
//                 canvas behind stays visible until the user reaches for
//                 controls.
//   children    — body content (rendered inside an overflow-y: auto pane)
const SNAP_HEIGHTS   = { collapsed: '30vh', default: '65vh', expanded: '96vh' };
const SNAP_FRACTIONS = { collapsed: 0.30,   default: 0.65,   expanded: 0.96   };
const SNAPS = ['collapsed', 'default', 'expanded'];
const DRAG_THRESHOLD_PX = 6;

export default function BottomSheet({
  open,
  onClose,
  title,
  children,
  modal = false,
  defaultSnap = 'default',
}) {
  const [snap, setSnap] = useState(defaultSnap);
  const dragRef = useRef({ active: false, moved: false, startY: 0, startSnap: defaultSnap });

  useEffect(() => {
    if (!open || !modal) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, modal, onClose]);

  if (!open) return null;

  const onPointerDown = (e) => {
    dragRef.current = {
      active: true,
      moved: false,
      startY: e.clientY,
      startSnap: snap,
    };
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* ignore */ }
  };

  const onPointerMove = (e) => {
    if (!dragRef.current.active) return;
    const viewH = window.innerHeight || 1;
    const dy = e.clientY - dragRef.current.startY;
    if (!dragRef.current.moved && Math.abs(dy) < DRAG_THRESHOLD_PX) return;
    dragRef.current.moved = true;
    const startFrac = SNAP_FRACTIONS[dragRef.current.startSnap];
    const projected = startFrac - (dy / viewH);
    let nearest = SNAPS[0];
    let best = Infinity;
    for (const id of SNAPS) {
      const d = Math.abs(SNAP_FRACTIONS[id] - projected);
      if (d < best) { best = d; nearest = id; }
    }
    if (nearest !== snap) setSnap(nearest);
  };

  const onPointerUp = (e) => {
    const wasDrag = dragRef.current.moved;
    dragRef.current.active = false;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
    if (wasDrag) return;
    // Tap on the handle → cycle to the next snap point. Lets one-handed
    // phone users get to the full-height working mode without dragging.
    const i = SNAPS.indexOf(snap);
    setSnap(SNAPS[(i + 1) % SNAPS.length]);
  };

  return createPortal(
    <div className={`bottom-sheet-root${modal ? ' bottom-sheet-root--modal' : ''}`} role="presentation">
      {modal && (
        <button
          type="button"
          className="bottom-sheet__backdrop"
          aria-label="Close panel"
          onClick={() => onClose?.()}
        />
      )}
      <aside
        className={`bottom-sheet bottom-sheet--${snap}`}
        style={{ height: SNAP_HEIGHTS[snap] }}
        role="dialog"
        aria-modal="false"
        aria-label={title || 'Selection editor'}
      >
        <button
          type="button"
          className="bottom-sheet__handle"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          aria-label="Resize panel (tap to cycle, drag to set)"
          title="Tap to cycle · drag to set"
        >
          <span className="bottom-sheet__grip" aria-hidden="true" />
        </button>
        <div className="bottom-sheet__body">{children}</div>
      </aside>
    </div>,
    document.body
  );
}
