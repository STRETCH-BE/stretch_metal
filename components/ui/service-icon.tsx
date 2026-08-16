/**
 * ServiceIcon — consistent line-art icon set for the six services.
 * File path: /components/ui/service-icon.tsx
 *
 * Hand-drawn as a single set: 24×24 viewBox, 2px stroke, hard corners
 * (square caps, miter joins — no rounding anywhere, matching the
 * identity), currentColor so they inherit text colour per surface.
 */

import type { ServiceKey } from "@/lib/i18n-routes";

type Props = {
  service: ServiceKey;
  /** Rendered size in px. Default 32. */
  size?: number;
  className?: string;
};

const PATHS: Record<ServiceKey, React.ReactNode> = {
  // Welding torch over a seam, sparks flying
  welding: (
    <>
      <path d="M14 3 L20 3 L20 9" />
      <path d="M20 3 L11 12" />
      <path d="M11 12 L8 15" />
      <path d="M3 21 L21 21" />
      <path d="M8 15 L6 13 M8 15 L10 17" />
      <path d="M5 18 L4 17 M11 18 L12 19" />
    </>
  ),
  // Focused laser beam cutting a plate
  laser: (
    <>
      <path d="M12 2 L12 8" />
      <path d="M8 5 L12 8 L16 5" />
      <path d="M12 8 L12 14" />
      <path d="M3 17 L10 17" />
      <path d="M14 17 L21 17" />
      <path d="M3 21 L21 21" />
      <path d="M12 14 L10 17 M12 14 L14 17" />
    </>
  ),
  // End mill over a machined block
  cnc: (
    <>
      <path d="M10 2 L14 2 L14 8 L10 8 Z" />
      <path d="M11 8 L11 12 M13 8 L13 12" />
      <path d="M4 16 L20 16 L20 22 L4 22 Z" />
      <path d="M4 16 L8 12 L16 12 L20 16" />
    </>
  ),
  // Spray gun coating a panel
  coating: (
    <>
      <path d="M3 6 L10 6 L10 10 L6 10 L6 14 L3 14 Z" />
      <path d="M10 7 L13 7" />
      <path d="M16 4 L16 20" />
      <path d="M16 4 L21 4 M16 12 L21 12 M16 20 L21 20" />
      <path d="M13 9 L14 9 M12 12 L13 12 M13 15 L14 15" />
    </>
  ),
  // Drawing sheet with dimension lines and a set square
  design: (
    <>
      <path d="M3 3 L21 3 L21 21 L3 21 Z" />
      <path d="M7 7 L17 7" />
      <path d="M7 7 L7 17" />
      <path d="M7 17 L13 17" />
      <path d="M11 11 L17 11 L17 13 L11 13 Z" />
    </>
  ),
  // Truss / frame structure
  structures: (
    <>
      <path d="M3 20 L21 20" />
      <path d="M4 20 L4 8 L12 4 L20 8 L20 20" />
      <path d="M4 14 L12 8 L20 14" />
      <path d="M12 8 L12 20" />
    </>
  ),
};

export function ServiceIcon({ service, size = 32, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      className={className}
    >
      {PATHS[service]}
    </svg>
  );
}
