import type { NextConfig } from "next";

/**
 * Next.js configuration.
 * File path: /next.config.ts
 *
 * Deliberately minimal — StretchMetal is a fresh domain with no legacy
 * URLs to redirect. Image formats follow the stretch-sufit setup:
 * AVIF first (20–30% smaller than WebP for photos — direct LCP gain),
 * WebP as fallback for browsers without AVIF support.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
