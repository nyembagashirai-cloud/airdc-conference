"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Google tag (gtag.js) — Google Ads account */
export const GOOGLE_TAG_ID = "AW-18385775131";

/** "Page view" conversion action configured in Google Ads */
export const PAGE_VIEW_CONVERSION = "AW-18385775131/M-SjCNrM5eAcEJvUgr9E";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    /**
     * Reports a conversion, then (optionally) sends the visitor to `url`.
     * Available on every page — call it from an onClick handler, e.g.
     *   onClick={() => window.gtag_report_conversion?.()}
     */
    gtag_report_conversion?: (url?: string) => boolean;
  }
}

/**
 * Fires the page-view conversion again whenever the visitor moves to another
 * page. Next.js navigates on the client, so no new page load happens and the
 * inline snippet below would only ever fire once per visit without this.
 * The very first page is skipped here — the inline snippet already covers it.
 */
function PageViewConversionOnRouteChange() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      send_to: GOOGLE_TAG_ID,
      page_path: pathname,
    });
    window.gtag("event", "conversion", {
      send_to: PAGE_VIEW_CONVERSION,
    });
  }, [pathname]);

  return null;
}

export default function GoogleTag() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_TAG_ID}');

          // Event snippet for Page view conversion page
          gtag('event', 'conversion', {'send_to': '${PAGE_VIEW_CONVERSION}'});

          // Event snippet for click-triggered conversions.
          // Call gtag_report_conversion(url) when someone clicks a chosen
          // link or button; the visitor is sent to url once the hit is logged.
          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
              'send_to': '${PAGE_VIEW_CONVERSION}',
              'event_callback': callback
            });
            return false;
          }
          window.gtag_report_conversion = gtag_report_conversion;
        `}
      </Script>
      <PageViewConversionOnRouteChange />
    </>
  );
}
