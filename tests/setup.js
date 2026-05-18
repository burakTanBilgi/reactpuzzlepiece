// Vitest setup file. Loaded once per worker before any test file.
//
//   - extends `expect` with @testing-library/jest-dom matchers
//     (.toBeInTheDocument, .toHaveTextContent, .toBeVisible, …)
//   - installs an in-memory localStorage so persistence tests don't
//     depend on happy-dom's stability between tests, and so each test
//     starts from a known empty state
//   - cleans up the React testing tree between tests
import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';

function makeMemoryStorage() {
  const store = new Map();
  return {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => { store.set(k, String(v)); },
    removeItem: (k) => { store.delete(k); },
    clear: () => { store.clear(); },
    key: (i) => Array.from(store.keys())[i] ?? null,
    get length() { return store.size; },
  };
}

beforeEach(() => {
  const storage = makeMemoryStorage();
  Object.defineProperty(globalThis, 'localStorage', {
    value: storage,
    writable: true,
    configurable: true,
  });
  if (typeof window !== 'undefined') {
    Object.defineProperty(window, 'localStorage', {
      value: storage,
      writable: true,
      configurable: true,
    });
  }
});

afterEach(() => {
  cleanup();
});
