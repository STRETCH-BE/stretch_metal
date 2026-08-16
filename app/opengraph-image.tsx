/**
 * Default OpenGraph image — /opengraph-image (1200×630 PNG).
 * File path: /app/opengraph-image.tsx
 *
 * Generated at build time via Next.js ImageResponse. Referenced by
 * siteConfig.ogImage, so every page's share card falls back to this until
 * a photo-based static asset replaces it (see site-config note).
 *
 * Design mirrors the site: token black #0a0a0a ground, a hard red vertical
 * bar on the left (red is a signal, not decoration), STRETCHMETAL wordmark
 * white 900, meta lines in on-dark-muted #a8a49d over a #262626 hairline.
 *
 * Font is system-ui — ImageResponse's built-in default. Do NOT try to load
 * the Archivo variable .woff2 here: satori only accepts static-weight
 * ttf/otf/woff, variable fonts are unsupported. Node runtime (default).
 */

import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = siteConfig.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
        }}
      >
        {/* Signature red bar — hard edge, full height */}
        <div style={{ width: 28, height: "100%", background: "#e00000" }} />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 96px",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 10,
              color: "#e00000",
              marginBottom: 28,
            }}
          >
            MIG/MAG · TIG · LASER · CNC · RAL
          </div>

          {/* Wordmark */}
          <div
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: 116,
              fontWeight: 900,
              letterSpacing: 2,
              lineHeight: 1,
              color: "#ffffff",
            }}
          >
            {siteConfig.displayName}
          </div>

          {/* Hairline rule */}
          <div
            style={{
              width: 760,
              height: 2,
              background: "#262626",
              marginTop: 44,
              marginBottom: 36,
            }}
          />

          {/* Tagline + location */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "system-ui, sans-serif",
              color: "#a8a49d",
            }}
          >
            <div style={{ fontSize: 34, fontWeight: 600 }}>
              {siteConfig.tagline}
            </div>
            <div style={{ fontSize: 28, fontWeight: 400, marginTop: 14 }}>
              {`Częstochowa, Poland — ${siteConfig.parent}`}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
