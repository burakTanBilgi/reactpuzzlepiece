import { useState } from 'react';
import { PuzzleBoard, SIDES, usePuzzleBoard } from './puzzle';
import BigLogo from '/BigLogo.svg';
import SmallLogo from '/SmallLogo.svg';
import './App.css';

export default function App() {
  const {
    pieces,
    selected,
    selectedId,
    setSelectedId,
    cascade,
    setCascade,
    sideInfo,
    setSideCount,
    reset,
  } = usePuzzleBoard();

  const [bigLogoHovered, setBigLogoHovered] = useState(false);
  const [smallLogoHovered, setSmallLogoHovered] = useState(false);

  return (
    <main className="stage">
      <header className="stage__head">
        <div
          className={`logo-big ${smallLogoHovered ? 'luminate' : ''}`}
          onMouseEnter={() => setBigLogoHovered(true)}
          onMouseLeave={() => setBigLogoHovered(false)}
        >
          <img src={BigLogo} alt="Big Logo" />
        </div>
        <p className="stage__eyebrow">Prototype</p>
        <h1 className="stage__title">Puzzle Piece Playground</h1>
        <p className="stage__subtitle">
          Click a piece, tweak its sides. Toggle splitting to grow clusters or
          to keep counts in sync.
        </p>
        <div
          className={`logo-small ${bigLogoHovered ? 'luminate' : ''}`}
          onMouseEnter={() => setSmallLogoHovered(true)}
          onMouseLeave={() => setSmallLogoHovered(false)}
        >
          <img src={SmallLogo} alt="Small Logo" />
        </div>
      </header>

      <div className="stage__layout">
        <aside className="controls">
          <section className="controls__section">
            <h2 className="controls__title">Selected</h2>
            {selected ? (
              <div className="controls__selected">
                <span className="controls__selected-label">{selected.label}</span>
                <span className="controls__selected-meta">
                  {Math.round(selected.w)} × {Math.round(selected.h)}
                </span>
              </div>
            ) : (
              <p className="controls__hint">Click a piece to select it.</p>
            )}

            <label className="controls__toggle">
              <input
                type="checkbox"
                checked={cascade}
                onChange={(e) => setCascade(e.target.checked)}
              />
              <span>Split neighbor(s)</span>
            </label>
          </section>

          {selected && (
            <section className="controls__section">
              <h2 className="controls__title">Sides</h2>
              {SIDES.map((side) => {
                const info = sideInfo[side];
                if (!info) return null;
                const { data, neighbors, maxCount, canCascade, partial } = info;
                const typeLabel = data.type === 'flat' ? 'flat' : data.type;
                let kind;
                if (neighbors.length === 0) kind = 'outer';
                else if (partial) kind = 'partial edge';
                else kind = `${neighbors.length} neighbor${neighbors.length > 1 ? 's' : ''}`;
                const willSplit = cascade && canCascade;
                return (
                  <div key={side} className="controls__field">
                    <div className="controls__label">
                      <span className="controls__label-side">
                        {side[0].toUpperCase() + side.slice(1)}
                      </span>
                      <span className="controls__label-meta">
                        {typeLabel} · {kind}
                      </span>
                    </div>
                    <div className="controls__row">
                      <input
                        type="range"
                        min={0}
                        max={maxCount}
                        value={data.count}
                        onChange={(e) => setSideCount(side, Number(e.target.value))}
                      />
                      <output className="controls__value">{data.count}</output>
                    </div>
                    {partial && cascade && (
                      <p className="controls__warn">
                        Can't split — this piece only covers part of the shared edge.
                      </p>
                    )}
                    {!partial && willSplit && neighbors.length > 0 && (
                      <p className="controls__note">
                        Changing this count will split the neighbor.
                      </p>
                    )}
                  </div>
                );
              })}
            </section>
          )}

          <section className="controls__section controls__section--foot">
            <button type="button" className="controls__reset" onClick={() => reset()}>
              Reset board
            </button>
            <p className="controls__hint">
              With <em>Split neighbor(s)</em> on, changing a side rebuilds the
              piece across it into that many sub‑pieces. Off, the count just
              updates in place. Pieces can only split neighbors across edges
              they fully cover.
            </p>
          </section>
        </aside>

        <div className="board-wrap">
          <PuzzleBoard
            pieces={pieces}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
      </div>
    </main>
  );
}
