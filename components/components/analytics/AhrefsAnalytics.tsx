"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, type ConsentValue } from "@/lib/consent";

const AHREFS_ANALYTICS_KEY = "W79xgO0thI1jEwVOP/7SYA";

const isProductionHost =
  typeof window !== "undefined" &&
  ["www.ventanasbr.cl", "ventanasbr.cl"].includes(window.location.hostname);

export function AhrefsAnalytics() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    setConsent(readConsent());

    const handleConsent = (event: Event) => {
      setConsent((event as CustomEvent<ConsentValue>).detail);
    };

    window.addEventListener(CONSENT_EVENT, handleConsent);
    return () => window.removeEventListener(CONSENT_EVENT, handleConsent);
  }, []);

  if (!isProductionHost || consent !== "granted") return null;

  return (
    <Script
      id="ahrefs-analytics"
      src="https://analytics.ahrefs.com/analytics.js"
      strategy="afterInteractive"
      {...{ "data-key": AHREFS_ANALYTICS_KEY }}
    />
  );
}
