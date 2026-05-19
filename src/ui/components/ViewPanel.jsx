import { useCallback, useEffect, useRef, useState } from 'react';
import { PuzzleBoard } from '../../puzzle';

const MIN_SCALE = 0.2;
const MAX_SCALE = 5;
const ZOOM_SPEED = 0.0015;
const STEP_FACTOR = 1.25;          // +/- buttons zoom by 25 % per tap
const TAP_PAN_THRESHOLD = 6;       // px of movement before single-touch becomes a pan

// Canvas surface that hosts the PuzzleBoard with pan + zoom.
//
//   Desktop
//     - Wheel / trackpad pinch:   zoom toward the cursor
//     - Middle-drag or Ctrl+drag: pan
//     - HUD +/- buttons:          zoom toward the centre
//
//   Touch (phones / tablets)
//     - One-finger drag:          pan (after a 6 px threshold so taps still
//                                 hit child elements like puzzle pieces)
//     - Two-finger pinch:         zoom toward the pinch centroid + pan with
//                                 the centroid's translation
//
// Gestures are tracked with pointer events; a Map of active pointers lets
// pinch and pan share state cleanly. The whole surface declares
// `touch-action: none` so the browser doesn't fight us for scroll/zoom.
export default function ViewPanel({ children, ...props }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [tx, setTx]       = useState(0);
  const [ty, setTy]       = useState(0);

  // Map<pointerId, { x, y }>. Always reflects the live position of every
  // active pointer (mouse, touch, pen).
  const pointersRef = useRef(new Map());
  // Current gesture, if any. See `kind` shapes inline below.
  const gestureRef  = useRef(null);
  // Track whether a pan visibly happened (for the .is-panning cursor).
  const [panning, setPanning] = useState(false);

  // === Wheel: zoom toward the cursor ===================================
  const handleWheel = useCallback((e) => {
    // Always zoom on wheel — regular mouse wheel and trackpad pinch
    // (browsers send Ctrl+wheel for pinch on a touchpad).
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const factor = Math.exp(-e.deltaY * ZOOM_SPEED);
    setScale((prev) => {
      const next = clamp(prev * factor);
      const realFactor = next / prev;
      setTx((curTx) => cx - (cx - curTx) * realFactor);
      setTy((curTy) => cy - (cy - curTy) * realFactor);
      return next;
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // === Pointer gestures ================================================
  const onPointerDown = (e) => {
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const activeCount = pointersRef.current.size;

    // Desktop mouse: keep the existing middle / Ctrl-drag panning.
    if (e.pointerType === 'mouse') {
      const isMiddle  = e.button === 1;
      const isCtrlLeft = e.button === 0 && (e.ctrlKey || e.metaKey);
      if (!isMiddle && !isCtrlLeft) return;
      e.preventDefault();
      gestureRef.current = {
        kind: 'mouse-pan',
        pointerId: e.pointerId,
        startX: e.clientX, startY: e.clientY,
        baseTx: tx, baseTy: ty,
      };
      setPanning(true);
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* ignore */ }
      return;
    }

    // Touch / pen
    if (activeCount === 1) {
      // Start as a tap candidate — promotes to a pan only if movement
      // exceeds TAP_PAN_THRESHOLD. This lets simple taps fall through to
      // the child element (e.g. a puzzle piece) untouched.
      gestureRef.current = {
        kind: 'tap-pending',
        pointerId: e.pointerId,
        startX: e.clientX, startY: e.clientY,
        baseTx: tx, baseTy: ty,
      };
    } else if (activeCount === 2) {
      // Second finger landed — start pinch.
      const pts = [...pointersRef.current.values()];
      const cx = (pts[0].x + pts[1].x) / 2;
      const cy = (pts[0].y + pts[1].y) / 2;
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      e.preventDefault();
      gestureRef.current = {
        kind: 'pinch',
        baseDist:  dist,
        baseScale: scale,
        baseCx:    cx,
        baseCy:    cy,
        baseTx:    tx,
        baseTy:    ty,
      };
      setPanning(true);
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* ignore */ }
    }
  };

  const onPointerMove = (e) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    const g = gestureRef.current;
    if (!g) return;

    if (g.kind === 'mouse-pan' && e.pointerId === g.pointerId) {
      setTx(g.baseTx + (e.clientX - g.startX));
      setTy(g.baseTy + (e.clientY - g.startY));
      return;
    }

    if (g.kind === 'tap-pending' && e.pointerId === g.pointerId) {
      const dx = e.clientX - g.startX;
      const dy = e.clientY - g.startY;
      if (Math.hypot(dx, dy) < TAP_PAN_THRESHOLD) return;
      // Promote to a touch-pan now that the user has clearly chosen to drag.
      e.preventDefault();
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* ignore */ }
      gestureRef.current = { ...g, kind: 'touch-pan' };
      setPanning(true);
      setTx(g.baseTx + dx);
      setTy(g.baseTy + dy);
      return;
    }

    if (g.kind === 'touch-pan' && e.pointerId === g.pointerId) {
      e.preventDefault();
      setTx(g.baseTx + (e.clientX - g.startX));
      setTy(g.baseTy + (e.clientY - g.startY));
      return;
    }

    if (g.kind === 'pinch') {
      const pts = [...pointersRef.current.values()];
      if (pts.length < 2) return;
      e.preventDefault();
      const cx = (pts[0].x + pts[1].x) / 2;
      const cy = (pts[0].y + pts[1].y) / 2;
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const newScale = clamp(g.baseScale * (dist / g.baseDist));
      const realFactor = newScale / g.baseScale;
      // Translate so the pinch's base centroid still maps to the live
      // centroid in screen space. This makes the gesture feel locked to
      // the two fingers — content under the pinch stays under the pinch.
      const rect = containerRef.current.getBoundingClientRect();
      const localBaseCx = g.baseCx - rect.left;
      const localBaseCy = g.baseCy - rect.top;
      const localCx     = cx - rect.left;
      const localCy     = cy - rect.top;
      const newTx = localCx - (localBaseCx - g.baseTx) * realFactor;
      const newTy = localCy - (localBaseCy - g.baseTy) * realFactor;
      setScale(newScale);
      setTx(newTx);
      setTy(newTy);
      return;
    }
  };

  const onPointerUp = (e) => {
    pointersRef.current.delete(e.pointerId);
    const g = gestureRef.current;
    if (!g) return;

    if ((g.kind === 'mouse-pan' || g.kind === 'touch-pan') && e.pointerId === g.pointerId) {
      gestureRef.current = null;
      setPanning(false);
      try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
      return;
    }

    if (g.kind === 'tap-pending' && e.pointerId === g.pointerId) {
      // No drag occurred — let the child onClick fire naturally.
      gestureRef.current = null;
      return;
    }

    if (g.kind === 'pinch') {
      const remaining = [...pointersRef.current.entries()];
      if (remaining.length === 1) {
        // One finger left — keep panning with it from its current spot so the
        // transition doesn't snap.
        const [id, pt] = remaining[0];
        gestureRef.current = {
          kind:      'touch-pan',
          pointerId: id,
          startX:    pt.x,
          startY:    pt.y,
          baseTx:    tx,
          baseTy:    ty,
        };
      } else {
        gestureRef.current = null;
        setPanning(false);
        try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
      }
      return;
    }
  };

  const onAuxClick = (e) => {
    // Stop the browser's middle-click "open in new tab" behaviour bleeding
    // through when the user middle-drag-pans on a tile inside the canvas.
    if (e.button === 1) e.preventDefault();
  };

  // === HUD actions =====================================================
  const zoomBy = useCallback((factor) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setScale((prev) => {
      const next = clamp(prev * factor);
      const realFactor = next / prev;
      setTx((curTx) => cx - (cx - curTx) * realFactor);
      setTy((curTy) => cy - (cy - curTy) * realFactor);
      return next;
    });
  }, []);

  const resetView = () => {
    setScale(1);
    setTx(0);
    setTy(0);
  };

  return (
    <section className="view-panel">
      <div className="view-panel__hud" role="toolbar" aria-label="Canvas zoom">
        <button
          type="button"
          className="view-panel__zoom-btn"
          onClick={() => zoomBy(1 / STEP_FACTOR)}
          aria-label="Zoom out"
          title="Zoom out"
        >
          −
        </button>
        <span className="view-panel__zoom" aria-live="polite">{Math.round(scale * 100)}%</span>
        <button
          type="button"
          className="view-panel__zoom-btn"
          onClick={() => zoomBy(STEP_FACTOR)}
          aria-label="Zoom in"
          title="Zoom in"
        >
          +
        </button>
        <button type="button" className="view-panel__reset" onClick={resetView}>
          Reset
        </button>
        <span className="view-panel__hint view-panel__hint--desktop">
          Scroll to zoom · Middle-drag or Ctrl+drag to pan
        </span>
        <span className="view-panel__hint view-panel__hint--touch">
          Pinch to zoom · Drag to pan
        </span>
      </div>

      <div
        ref={containerRef}
        className={`view-panel__surface ${panning ? 'is-panning' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onAuxClick={onAuxClick}
      >
        <div
          className="view-panel__transform"
          style={{
            transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
            transformOrigin: '0 0',
          }}
        >
          {children ?? <PuzzleBoard {...props} />}
        </div>
      </div>
    </section>
  );
}

function clamp(v) {
  return Math.max(MIN_SCALE, Math.min(MAX_SCALE, v));
}
