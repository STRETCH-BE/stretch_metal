/**
 * Apple touch icon — /apple-icon (180×180 PNG).
 * File path: /app/apple-icon.tsx
 *
 * Generates a 180×180 PNG via Next.js ImageResponse at build time.
 * iOS Safari uses it for home-screen bookmarks and share previews; it also
 * doubles as the Organization `logo` in /lib/schema.ts (≥112px, as Google
 * requires) until a real logo asset exists.
 *
 * Design: hard red square (token red #e00000, zero border radius — iOS
 * applies its own mask; we do NOT pre-round, the design system bans it),
 * white "SM" at weight 900. Same language as /app/icon.tsx.
 */

import { ImageResponse } from "next/og";

// Node runtime (default) — lets Next statically generate the icon at build time.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
            fontSize: 80,
            color: "#ffffff",
            letterSpacing: -3,
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
