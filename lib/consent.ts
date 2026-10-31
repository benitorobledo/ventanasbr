export const CONSENT_STORAGE_KEY = "ventanasbr-cookie-consent";
export const CONSENT_EVENT = "ventanasbr:consent-change";
export const OPEN_CONSENT_EVENT = "ventanasbr:consent-open";

export type ConsentValue = "granted" | "denied";

export function readConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;

  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

export function saveConsent(value: ConsentValue): void {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}
