"use client";

/**
 * Cookie consent context.
 * File path: /components/analytics/consent-provider.tsx
 *
 * Stores consent in localStorage (key "sm_consent") and exposes it to the
 * analytics components. Categories follow the EU/RODO model: necessary is
 * always on, analytics + marketing are strictly opt-in.
 *
 * Three effective states per category:
 *   unset   — no stored decision yet (hasInteracted === false, banner shows,
 *             everything stays denied)
 *   granted — category true after accept()
 *   denied  — category false after reject() (or a partial accept)
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type ConsentCategories = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

type ConsentState = {
  consent: ConsentCategories;
  hasInteracted: boolean;
  accept: (categories?: Partial<ConsentCategories>) => void;
  reject: () => void;
};

const STORAGE_KEY = "sm_consent";

const defaultState: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const ConsentContext = createContext<ConsentState | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentCategories>(defaultState);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setConsent({ ...defaultState, ...parsed });
        setHasInteracted(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((next: ConsentCategories) => {
    setConsent(next);
    setHasInteracted(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const accept = useCallback(
    (categories?: Partial<ConsentCategories>) => {
      persist({
        necessary: true,
        analytics: categories?.analytics ?? true,
        marketing: categories?.marketing ?? true,
      });
    },
    [persist]
  );

  const reject = useCallback(() => {
    persist({ necessary: true, analytics: false, marketing: false });
  }, [persist]);

  return (
    <ConsentContext.Provider value={{ consent, hasInteracted, accept, reject }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    // Safe fallback outside the provider: everything denied, no banner —
    // an unmounted provider must never accidentally enable tracking.
    return {
      consent: defaultState,
      hasInteracted: true,
      accept: () => {},
      reject: () => {},
    };
  }
  return ctx;
}
