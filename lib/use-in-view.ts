"use client";

/**
 * useInView — small IntersectionObserver hook.
 * File path: /lib/use-in-view.ts
 *
 * Used by <FadeIn> to trigger fade-up animations when sections scroll into
 * the viewport. Lighter than pulling in Framer Motion for what is
 * fundamentally a one-shot reveal. Ported from stretch-sufit.
 *
 * Returns a ref to attach to the element and a boolean — true once the
 * element has entered the viewport at least once (the observer disconnects
 * after).
 */

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Fraction of element that must be visible. Default: 0.1 */
  threshold?: number;
  /** rootMargin string, e.g. "0px 0px -80px 0px" */
  rootMargin?: string;
};

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: Options = {}
) {
  const { threshold = 0.1, rootMargin = "0px 0px -80px 0px" } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect users who prefer reduced motion — show immediately.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}
