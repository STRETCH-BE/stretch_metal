/**
 * Dynamic robots.txt.
 * File path: /app/robots.ts
 *
 * Explicitly allows AI crawlers — GPTBot, ClaudeBot, PerplexityBot,
 * Google-Extended, plus traditional engines. This is core to the
 * GEO/AEO strategy: AI engines won't cite your content if they can't
 * read it — and a purchasing manager asking an assistant "metal
 * fabrication near Częstochowa" is exactly the buyer we want.
 */

import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Traditional search engines
      { userAgent: "*", allow: "/" },

      // AI crawlers — explicitly opted in
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "MistralAI-User", allow: "/" },
      { userAgent: "DuckAssistBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "Diffbot", allow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
