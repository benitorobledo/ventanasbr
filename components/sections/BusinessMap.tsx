"use client";

import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { SITE_DATA } from "@/lib/constants";

export function BusinessMap() {
  const [mapVisible, setMapVisible] = useState(false);

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-sm">
      {mapVisible ? (
        <iframe
          title="Ubicación de Ventanas BR en Coquimbo"
          src={SITE_DATA.mapEmbedUrl}
          className="h-72 w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setMapVisible(true)}
          className="group flex h-72 w-full flex-col items-center justify-center gap-3 bg-primary px-6 text-center text-white transition-colors hover:bg-primary/95"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-accent transition-transform group-hover:scale-110">
            <MapPin size={28} />
          </span>
          <span className="text-sm font-black uppercase tracking-widest">
            Ver mapa de ubicación
          </span>
          <span className="text-xs text-white/70">{SITE_DATA.addressFull}</span>
        </button>
      )}

      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <MapPin size={18} className="mt-0.5 shrink-0 text-accent" />
          <span>{SITE_DATA.addressFull}</span>
        </div>
        <a
          href={SITE_DATA.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-primary"
        >
          Cómo llegar
          <Navigation size={14} />
        </a>
      </div>

      <p className="px-5 pb-5 text-xs text-gray-400">
        Al abrir el mapa se cargan servicios de Google.
      </p>
    </div>
  );
}
