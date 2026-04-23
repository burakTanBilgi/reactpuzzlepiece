import { useCallback, useMemo, useState } from 'react';
import {
  SIDES,
  changeSide,
  coversNeighbors,
  findNeighbors,
  initialFourPieces,
  maxKnobsForSide,
  sideFor,
} from './board.js';

// React hook that wraps the whole board state machine.
//
// Usage:
//   const board = usePuzzleBoard();
//   <PuzzleBoard pieces={board.pieces} selectedId={board.selectedId}
//                onSelect={board.setSelectedId} />
//   board.setSideCount('right', 3); // change the selected piece's right side
//
// Options:
//   initial:       () => Piece[]  or  Piece[]   (starting layout)
//   initialSelected: string                     (id to pre-select)
//   initialCascade:  boolean                    (default: true)
export function usePuzzleBoard({
  initial = initialFourPieces,
  initialSelected = 'tl',
  initialCascade = true,
} = {}) {
  const [pieces, setPieces] = useState(() =>
    typeof initial === 'function' ? initial() : initial
  );
  const [selectedId, setSelectedId] = useState(initialSelected);
  const [cascade, setCascade] = useState(initialCascade);

  const selected = useMemo(
    () => pieces.find((p) => p.id === selectedId) ?? null,
    [pieces, selectedId]
  );

  // Per-side metadata for the currently selected piece — handy for driving UI.
  const sideInfo = useMemo(() => {
    if (!selected) return {};
    const info = {};
    for (const side of SIDES) {
      const neighbors = findNeighbors(pieces, selected, side);
      const data = sideFor(selected, side);
      const covers = coversNeighbors(selected, side, neighbors);
      info[side] = {
        data,
        neighbors,
        maxCount: maxKnobsForSide(selected, side),
        canCascade: neighbors.length > 0 && covers,
        partial: neighbors.length > 0 && !covers,
      };
    }
    return info;
  }, [pieces, selected]);

  const setSideCount = useCallback(
    (side, newCount) => {
      if (!selectedId) return;
      setPieces((current) =>
        changeSide(current, selectedId, side, newCount, { cascade })
      );
    },
    [selectedId, cascade]
  );

  const reset = useCallback(
    (nextInitial = initial, nextSelected = initialSelected) => {
      setPieces(typeof nextInitial === 'function' ? nextInitial() : nextInitial);
      setSelectedId(nextSelected);
    },
    [initial, initialSelected]
  );

  return {
    pieces,
    setPieces,
    selectedId,
    setSelectedId,
    selected,
    cascade,
    setCascade,
    sideInfo,
    setSideCount,
    reset,
  };
}
