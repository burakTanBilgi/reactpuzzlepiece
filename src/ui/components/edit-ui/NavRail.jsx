import Icon from '../Icon.jsx';
import Tooltip from '../Tooltip.jsx';

// Slim 48-px nav rail used by Direction A. Hosts the global Edit-page
// toggles (hover/click previews, clear-overrides), the "Defaults" sheet
// trigger, and the mode picker. Pure presentational; the parent owns
// every state slot.
export default function NavRail({
  hoverFxEnabled, onToggleHover,
  clickFxEnabled, onToggleClick,
  hasOverrides,   onClearOverrides,
  defaultsOpen,   onToggleDefaults,
  modePickerSlot,
}) {
  return (
    <aside className="canvas-nav" role="toolbar" aria-label="Edit tools">
      <Tooltip label={`Hover previews: ${hoverFxEnabled ? 'on' : 'off'}`} side="right">
        <button
          type="button"
          className={`canvas-nav__btn${hoverFxEnabled ? '' : ' canvas-nav__btn--off'}`}
          onClick={onToggleHover}
          aria-pressed={hoverFxEnabled}
          aria-label={`Toggle hover previews (currently ${hoverFxEnabled ? 'on' : 'off'})`}
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M3 2 L3 11 L6 8 L8 12 L9.4 11.4 L7.4 8 L11 8 Z" fill="currentColor" />
            <path d="M2 14 Q4.5 12.5 7 14 T12.5 14" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          </svg>
        </button>
      </Tooltip>

      <Tooltip label={`Click previews: ${clickFxEnabled ? 'on' : 'off'}`} side="right">
        <button
          type="button"
          className={`canvas-nav__btn${clickFxEnabled ? '' : ' canvas-nav__btn--off'}`}
          onClick={onToggleClick}
          aria-pressed={clickFxEnabled}
          aria-label={`Toggle click previews (currently ${clickFxEnabled ? 'on' : 'off'})`}
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M3 2 L3 11 L6 8 L8 12 L9.4 11.4 L7.4 8 L11 8 Z" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
              <line x1="12.5" y1="3.5" x2="14.5" y2="1.5" />
              <line x1="13"   y1="6"   x2="15.4" y2="6" />
              <line x1="12.5" y1="8.5" x2="14.5" y2="10.5" />
            </g>
          </svg>
        </button>
      </Tooltip>

      <Tooltip label={hasOverrides ? 'Clear all overrides' : 'No overrides set'} side="right">
        <button
          type="button"
          className="canvas-nav__btn canvas-nav__btn--danger"
          onClick={onClearOverrides}
          disabled={!hasOverrides}
          aria-label="Clear all overrides"
        >
          <Icon name="reset" size={14} />
        </button>
      </Tooltip>

      <div className="canvas-nav__divider" aria-hidden="true" />

      <Tooltip label="Project defaults" side="right">
        <button
          type="button"
          className={`canvas-nav__btn${defaultsOpen ? ' canvas-nav__btn--on' : ''}`}
          onClick={onToggleDefaults}
          aria-pressed={defaultsOpen}
          aria-label="Project defaults"
        >
          <Icon name="layers" size={14} />
        </button>
      </Tooltip>

      <div className="canvas-nav__spacer" />

      <div className="canvas-nav__picker">{modePickerSlot}</div>
    </aside>
  );
}
