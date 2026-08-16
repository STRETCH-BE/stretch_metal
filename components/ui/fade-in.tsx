"use client";

/**
 * FadeIn — wrapper that fades and translates a child up on scroll.
 * File path: /components/ui/fade-in.tsx
 *
 * Ported from stretch-sufit. Pure CSS transition driven by the useInView
 * hook (which short-circuits for prefers-reduced-motion). The `delay`
 * prop lets sibling reveals stagger. This is the ONLY motion primitive in
 * the identity besides the ticker marquee — nothing else moves.
 *
 * Usage:
 *   <FadeIn delay={120}><Card /></FadeIn>
 */

import type { ReactNode, ElementType, CSSProperties } from "react";
import { useInView } from "@/lib/use-in-view";

type Props = {
  children: ReactNode;
  /** Delay in ms before animation starts after entering viewport */
  delay?: number;
  /** Element tag to render — defaults to div. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

export function FadeIn({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  style,
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 800ms ease, transform 800ms ease",
        transitionDelay: `${delay}ms`,
        willChange: inView ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
