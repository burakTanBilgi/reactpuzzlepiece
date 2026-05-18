import { useEffect } from 'react';
import Icon from './Icon.jsx';

// In-app confirmation modal — replaces the native `window.confirm()` so
// destructive actions get the project's amber/dark aesthetic and global
// keyboard handling (Esc cancels, Enter confirms).
//
// Reuses the shared `.modal-backdrop` / `.modal*` chrome from ui-kit.css
// plus the new `.modal--narrow` / `.modal__foot--right` variants.
export default function ConfirmDialog({
  title,
  body,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  onCancel,
  onConfirm,
}) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCancel();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        onConfirm();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCancel, onConfirm]);

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        className="modal modal--narrow"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal__head">
          <h2 id="confirm-dialog-title" className="modal__title">{title}</h2>
          <button
            type="button"
            className="modal__close"
            onClick={onCancel}
            aria-label="Close"
          >
            <Icon name="close" size={14} />
          </button>
        </header>
        <div className="modal__body">{body}</div>
        <footer className="modal__foot modal__foot--right">
          <button
            type="button"
            className="action-btn action-btn--ghost"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`action-btn ${danger ? 'action-btn--danger' : 'action-btn--primary'}`}
            onClick={onConfirm}
            autoFocus
          >
            {confirmLabel}
          </button>
        </footer>
      </div>
    </div>
  );
}
