"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  OPEN_CONSENT_EVENT,
  readConsent,
  saveConsent,
} from "@/lib/consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!readConsent()) setVisible(true);

    const openPreferences = () => setVisible(true);
    window.addEventListener(OPEN_CONSENT_EVENT, openPreferences);

    return () => window.removeEventListener(OPEN_CONSENT_EVENT, openPreferences);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed bottom-24 left-4 right-4 z-[120] rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl md:bottom-6 md:left-6 md:right-auto md:max-w-xl"
    >
      <p className="text-sm leading-relaxed text-gray-600">
        Usamos cookies necesarias para la seguridad y el funcionamiento del
        sitio. Con tu permiso, Google Analytics y Ahrefs Analytics miden las
        visitas. Ahrefs Analytics no utiliza cookies.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => {
            saveConsent("granted");
            setVisible(false);
          }}
          className="rounded-full bg-primary px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-primary/90"
        >
          Aceptar analíticas
        </button>
        <button
          type="button"
          onClick={() => {
            saveConsent("denied");
            setVisible(false);
          }}
          className="rounded-full border border-gray-300 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-primary transition-colors hover:bg-gray-50"
        >
          Solo necesarias
        </button>
      </div>

      <p className="mt-4 text-xs text-gray-400">
        <Link
          href="/politica-de-cookies"
          className="underline underline-offset-2 hover:text-primary"
        >
          Política de cookies
        </Link>
        {" · "}
        <Link
          href="/politica-de-privacidad"
          className="underline underline-offset-2 hover:text-primary"
        >
          Política de privacidad
        </Link>
      </p>
    </div>
  );
}
