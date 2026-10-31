"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, type ConsentValue } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const VALID_GA_ID = GA_ID && /^G-[A-Z0-9]+$/.test(GA_ID) ? GA_ID : null;
const isProductionHost =
  typeof window !== "undefined" &&
  ["www.ventanasbr.cl", "ventanasbr.cl"].includes(window.location.hostname);

export function GoogleAnalytics() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    setConsent(readConsent());

    const handleConsent = (event: Event) => {
      setConsent((event as CustomEvent<ConsentValue>).detail);
    };

    window.addEventListener(CONSENT_EVENT, handleConsent);
    return () => window.removeEventListener(CONSENT_EVENT, handleConsent);
  }, []);

  useEffect(() => {
    if (consent !== "denied" || typeof window.gtag !== "function") return;

    window.gtag("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });

    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      if (!name.startsWith("_ga")) return;

      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
    });
  }, [consent]);

  if (!VALID_GA_ID || consent !== "granted" || !isProductionHost) return null;

  return (
    <>
      <Script
        id="ga4-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${VALID_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
          window.gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          window.gtag('js', new Date());
          window.gtag('config', '${VALID_GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
