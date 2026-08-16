/**
 * Web app manifest — /manifest.webmanifest
 * File path: /app/manifest.ts
 *
 * Gives the site a proper identity for Android home-screen installs,
 * Chrome's install prompt, and some crawlers that read manifest metadata.
 * Colors match the design system: #0a0a0a is the token `black` — the site
 * chrome (nav, hero, footer) lives on that surface.
 */

import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — obróbka metali`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "browser",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
