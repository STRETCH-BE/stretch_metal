/**
 * Ticker — red marquee band of capability keywords.
 * File path: /components/sections/ticker.tsx
 *
 * Server component. The moving track is pure CSS: the `ticker` keyframes in
 * globals.css slide the track from 0 to -50%, so the content is rendered
 * twice and the loop is seamless. prefers-reduced-motion kills the
 * animation globally (globals.css), leaving a static band.
 *
 * Accessibility: the marquee is aria-hidden (moving text is unreadable to
 * AT); a visually-hidden static list carries the same items for screen
 * readers.
 *
 * This + FadeIn are the only motion in the identity. Separators are white
 * squares — the group's pixel motif, no rounded glyphs.
 */

import type { CSSProperties } from "react";

type Props = {
  items: string[];
};

/* Expanded industrial cut for the band type — the wdth axis at 125,
   matching every display context on the site. */
const trackType: CSSProperties = {
  fontVariationSettings: "'wdth' 125",
};

function Run({ items }: { items: string[] }) {
  return (
    <div className="flex items-center whitespace-nowrap">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-7 py-4 text-[clamp(30px,3.4vw,44px)] font-black uppercase leading-none tracking-[-0.02em] md:px-10">
            {item}
          </span>
          <span aria-hidden="true" className="inline-block size-[10px] bg-white" />
        </span>
      ))}
    </div>
  );
}

export function Ticker({ items }: Props) {
  return (
    <div className="section-red overflow-hidden">
      {/* Static copy for screen readers */}
      <ul className="visually-hidden">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {/* Marquee — duplicated run, -50% keyframe loop */}
      <div
        aria-hidden="true"
        className="flex w-max animate-[ticker_32s_linear_infinite]"
        style={trackType}
      >
        <Run items={items} />
        <Run items={items} />
      </div>
    </div>
  );
}
