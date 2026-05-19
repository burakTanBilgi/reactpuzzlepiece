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
//   open      — controls visibility
//   onClose   — invoked when the backdrop or Esc dismisses the sheet
//   title     — accessible label for the dialog
//   modal     — when true, render a tap-to-dismiss backdrop + Esc handler.
//               When false (default), the sheet is a persistent surface;
//               the area of the viewport above it stays interactive.
//   children  — body content (rendered inside an overflow-y: auto pane)
const SNAP_HEIGHTS = { collapsed: '30vh', default: '65vh', expanded: '96vh' };
const SNAP_FRACTIONS = { collapsed: 0.30, default: 0.65, expanded: 0.96 };
const SNAPS = ['collapsed', 'default', 'expanded'];

export default function BottomSheet({ open, onClose, title, children, modal = false }) {
  const [snap, setSnap] = useState('default');
  const dragRef = useRef({ active: false, startY: 0, startSnap: 'default' });

  useEffect(() => {
    if (!open || !modal) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, modal, onClose]);

  if (!open) return null;

  const onPointerDown = (e) => {
    dragRef.current = { active: true, startY: e.clientY, startSnap: snap };
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* ignore */ }
  };

  const onPointerMove = (e) => {
    if (!dragRef.current.active) return;
    const viewH = window.innerHeight || 1;
    const startFrac = SNAP_FRACTIONS[dragRef.current.startSnap];
    const dy = e.clientY - dragRef.current.startY;
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
    dragRef.current.active = false;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
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
        className="bottom-sheet"
        style={{ height: SNAP_HEIGHTS[snap] }}
        role="dialog"
        aria-modal="false"
        aria-label={title || 'Selection editor'}
      >
        <div
          className="bottom-sheet__handle"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          aria-hidden="true"
        >
          <div className="bottom-sheet__grip" />
        </div>
        <div className="bottom-sheet__body">{children}</div>
      </aside>
    </div>,
    document.body
  );
}
