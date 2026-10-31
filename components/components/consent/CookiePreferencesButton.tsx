"use client";

import { OPEN_CONSENT_EVENT } from "@/lib/consent";

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className="text-gray-400 transition-colors hover:text-white"
    >
      Preferencias de cookies
    </button>
  );
}
