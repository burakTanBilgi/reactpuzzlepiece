import { useCallback, useEffect, useRef, useState } from 'react';
import { PuzzleBoard } from '../../puzzle';

const MIN_SCALE = 0.2;
const MAX_SCALE = 5;
const ZOOM_SPEED = 0.0015;

// Canvas surface that hosts the PuzzleBoard with pan + zoom.
//   - Ctrl/Cmd + wheel: zoom centered on cursor
//   - Middle mouse button drag: pan
//   - Spacebar + drag (also): pan (future-friendly)
export default function ViewPanel(props) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const panState = useRef({ active: false, startX: 0, startY: 0, baseTx: 0, baseTy: 0 });

  const handleWheel = useCallback(
    (e) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      const rect = containerRef.current.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const factor = Math.exp(-e.deltaY * ZOOM_SPEED);
      setScale((prev) => {
        const next = Math.max(MIN_SCALE, Math.min(MAX_SCALE, prev * factor));
        const realFactor = next / prev;
        // Keep the cursor's world point fixed under the zoom.
        setTx((curTx) => cx - (cx - curTx) * realFactor);
        setTy((curTy) => cy - (cy - curTy) * realFactor);
        return next;
      });
    },
    []
  );

  // useEffect for wheel listener so we can use { passive: false }
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const onPointerDown = (e) => {
    const isMiddle = e.button === 1;
    const isCtrlLeft = e.button === 0 && (e.ctrlKey || e.metaKey);
    if (!isMiddle && !isCtrlLeft) return;
    e.preventDefault();
    panState.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      baseTx: tx,
      baseTy: ty,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!panState.current.active) return;
    const { startX, startY, baseTx, baseTy } = panState.current;
    setTx(baseTx + (e.clientX - startX));
    setTy(baseTy + (e.clientY - startY));
  };

  const onPointerUp = (e) => {
    if (panState.current.active && (e.button === 1 || e.button === 0)) {
      panState.current.active = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore — capture may have been released already.
      }
    }
  };

  const onAuxClick = (e) => {
    // Stop the browser's middle-click "open in new tab" behavior bleeding.
    if (e.button === 1) e.preventDefault();
  };

  const resetView = () => {
    setScale(1);
    setTx(0);
    setTy(0);
  };

  return (
    <section className="view-panel">
      <div className="view-panel__hud">
        <span className="view-panel__zoom">{Math.round(scale * 100)}%</span>
        <button type="button" className="view-panel__reset" onClick={resetView} title="Reset view">
          Reset View
        </button>
        <span className="view-panel__hint">Ctrl+Scroll to zoom · Middle-drag or Ctrl+Drag to pan</span>
      </div>

      <div
        ref={containerRef}
        className={`view-panel__surface ${panState.current.active ? 'is-panning' : ''}`}
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
          <PuzzleBoard {...props} />
        </div>
      </div>
    </section>
  );
}
