import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useEditUiMode } from '../../../../src/ui/hooks/useEditUiMode.js';

describe('useEditUiMode', () => {
  it('defaults to canvas when localStorage is empty', () => {
    const { result } = renderHook(() => useEditUiMode());
    expect(result.current.mode).toBe('canvas');
    expect(result.current.tiles).toBe(false);
  });

  it('hydrates from localStorage when a valid mode + tiles flag were saved', () => {
    localStorage.setItem('hakoniwa:editUiMode', 'layers');
    localStorage.setItem('hakoniwa:editUiTiles', '1');
    const { result } = renderHook(() => useEditUiMode());
    expect(result.current.mode).toBe('layers');
    expect(result.current.tiles).toBe(true);
  });

  it('falls back to canvas when the saved mode is not in the allow-list', () => {
    localStorage.setItem('hakoniwa:editUiMode', 'evil-mode-id');
    const { result } = renderHook(() => useEditUiMode());
    expect(result.current.mode).toBe('canvas');
  });

  it('writes both keys back to localStorage when the setters are called', () => {
    const { result } = renderHook(() => useEditUiMode());
    act(() => { result.current.setMode('flat'); });
    act(() => { result.current.setTiles(true); });
    expect(localStorage.getItem('hakoniwa:editUiMode')).toBe('flat');
    expect(localStorage.getItem('hakoniwa:editUiTiles')).toBe('1');
  });

  it('rejects invalid modes via setMode (state stays unchanged)', () => {
    const { result } = renderHook(() => useEditUiMode());
    const before = result.current.mode;
    act(() => { result.current.setMode('not-a-real-mode'); });
    expect(result.current.mode).toBe(before);
  });
});
