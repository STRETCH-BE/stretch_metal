"use client";

/**
 * Meta (Facebook/Instagram) Pixel.
 * File path: /components/analytics/meta-pixel.tsx
 *
 * Gated on MARKETING consent (not analytics) because it's an advertising
 * tool. Loads only when NEXT_PUBLIC_META_PIXEL_ID and consent are both
 * present — otherwise renders null. Conversion events are mapped in
 * lib/analytics.ts (rfq_submitted/cta_click/contact_form_submit → Lead,
 * phone_click → Contact).
 */

import Script from "next/script";
import { useConsent } from "./consent-provider";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function MetaPixel() {
  const { consent } = useConsent();
  if (!PIXEL_ID || !consent.marketing) return null;

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
