import { createContext, useCallback, useContext, useState } from 'react';

// Accordion scope for InspectorSubcards. Wide containers ignore the
// state (CSS keeps every body visible); narrow containers act on it via
// the `@container editui (max-width: 359px)` rules in Inspector.css.
//
// Each scope picks its own `id` so the "currently open" subcard is
// remembered per-shell (e.g. the Canvas defaults drawer remembers a
// different choice than the Flat panel). `defaultOpenId` decides which
// subcard renders open the first time a scope is visited.
const Ctx = createContext(null);

const storageKeyFor = (scopeId) =>
  scopeId ? `hakoniwa:editui:subcard:${scopeId}` : null;

export function SubcardAccordion({ id: scopeId, defaultOpenId, children }) {
  const storageKey = storageKeyFor(scopeId);
  const [stored, setStored] = useState(() => {
    if (!storageKey) return null;
    try { return localStorage.getItem(storageKey); } catch { return null; }
  });

  const openId = stored || defaultOpenId || null;

  const setOpenId = useCallback((next) => {
    setStored(next || null);
    if (!storageKey) return;
    try {
      if (next) localStorage.setItem(storageKey, next);
      else localStorage.removeItem(storageKey);
    } catch { /* ignore — private mode etc. */ }
  }, [storageKey]);

  return (
    <Ctx.Provider value={{ openId, setOpenId, defaultOpenId: defaultOpenId || null }}>
      {children}
    </Ctx.Provider>
  );
}

export function useSubcardAccordion() {
  return useContext(Ctx);
}
