/**
 * Favicon — /icon (32×32 PNG).
 * File path: /app/icon.tsx
 *
 * Generated at build time via Next.js ImageResponse, same design language
 * as /app/apple-icon.tsx: hard red square (token red #e00000, zero border
 * radius — the design system bans rounding), white "SM" at weight 900.
 * Google shows this favicon next to search results, so shipping one
 * improves SERP appearance and brand recognition.
 */

import { ImageResponse } from "next/og";

// Node runtime (default) — lets Next statically generate the icon at build time.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#e00000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            fontWeight: 900,
            fontSize: 15,
            color: "#ffffff",
            letterSpacing: -0.5,
            lineHeight: 1,
          }}
        >
          SM
        </div>
      </div>
    ),
    { ...size }
  );
}
