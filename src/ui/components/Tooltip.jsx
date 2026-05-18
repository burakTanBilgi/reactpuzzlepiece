import { cloneElement, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// Lightweight delayed-reveal tooltip. Wraps a single interactive child
// (button / icon) and shows a small floating label on hover or focus.
// The label is portalled to document.body so it escapes ancestor
// `overflow: hidden` clipping (canvas viewport, picker columns, etc.).
//
// Props:
//   label    — string shown in the tooltip (and as the child's title for SR fallback)
//   delay    — ms before reveal (default 350)
//   side     — 'top' (default) | 'bottom' | 'left' | 'right'; auto-flips if cramped
//   disabled — skip the tooltip entirely
//   children — single React element
export default function Tooltip({
  label,
  delay = 350,
  side = 'top',
  disabled = false,
  children,
}) {
  const id = useId();
  const triggerRef = useRef(null);
  const timerRef = useRef(0);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  if (!label || disabled || !children) return children ?? null;

  const place = () => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const margin = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let s = side;
    if (s === 'top' && r.top < 32)       s = 'bottom';
    if (s === 'bottom' && r.bottom > vh - 32) s = 'top';
    if (s === 'left' && r.left < 80)     s = 'right';
    if (s === 'right' && r.right > vw - 80) s = 'left';

    let top = 0, left = 0;
    if (s === 'top')    { top = r.top - margin;    left = r.left + r.width / 2; }
    if (s === 'bottom') { top = r.bottom + margin; left = r.left + r.width / 2; }
    if (s === 'left')   { top = r.top + r.height / 2; left = r.left - margin; }
    if (s === 'right')  { top = r.top + r.height / 2; left = r.right + margin; }

    setPos({ top, left, side: s });
  };

  const show = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      place();
      setOpen(true);
    }, delay);
  };

  const hide = () => {
    clearTimeout(timerRef.current);
    setOpen(false);
  };

  // Strip any `title` attribute on the wrapped child so the browser's
  // native (unstyleable) tooltip doesn't fire on top of our custom one.
  // Callers should set their own aria-label on icon-only triggers; we
  // don't auto-inject one so buttons with visible text keep that text
  // as their accessible name.
  const trigger = cloneElement(children, {
    ref: (node) => {
      triggerRef.current = node;
      const ref = children.ref;
      if (typeof ref === 'function') ref(node);
      else if (ref && typeof ref === 'object') ref.current = node;
    },
    'aria-describedby': open ? id : children.props['aria-describedby'],
    onMouseEnter: (e) => { children.props.onMouseEnter?.(e); show(); },
    onMouseLeave: (e) => { children.props.onMouseLeave?.(e); hide(); },
    onFocus:      (e) => { children.props.onFocus?.(e);      show(); },
    onBlur:       (e) => { children.props.onBlur?.(e);       hide(); },
    onClick:      (e) => { hide(); children.props.onClick?.(e); },
    title: undefined,
  });

  return (
    <>
      {trigger}
      {open && pos && createPortal(
        <span
          id={id}
          role="tooltip"
          className={`tip tip--${pos.side}`}
          style={{ top: pos.top, left: pos.left }}
        >
          {label}
        </span>,
        document.body,
      )}
    </>
  );
}
