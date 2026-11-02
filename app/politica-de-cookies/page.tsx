import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { SITE_DATA } from "@/lib/constants";

const pageTitle = "Política de Cookies | Ventanas BR";
const pageDescription =
  "Revisa qué cookies utiliza Ventanas BR, para qué sirven Google Analytics, Google Maps y Ahrefs, y cómo aceptar, rechazar o cambiar tu consentimiento.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/politica-de-cookies",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "/politica-de-cookies",
    siteName: SITE_DATA.name,
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Ventanas BR — Ventanas de Aluminio y PVC en Coquimbo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/opengraph-image"],
  },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Política de Cookies"
      subtitle="Qué cookies utilizamos, para qué sirven y cómo puedes cambiar tu elección."
      updated="29 de octubre de 2026"
    >
      <LegalSection title="1. Qué son las cookies">
        <p>
          Las cookies son pequeños archivos que un sitio guarda en tu navegador.
          También usamos almacenamiento local del navegador para recordar tu
          decisión sobre las cookies.
        </p>
      </LegalSection>

      <LegalSection title="2. Cookies que utilizamos">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-primary">
                <th className="py-3 pr-4 font-bold">Nombre</th>
                <th className="py-3 pr-4 font-bold">Tipo</th>
                <th className="py-3 pr-4 font-bold">Finalidad</th>
                <th className="py-3 font-bold">Duración</th>
              </tr>
            </thead>
            <tbody className="align-top">
              <tr className="border-b border-gray-100">
                <td className="py-3 pr-4 font-mono text-xs">ventanasbr-cookie-consent</td>
                <td className="py-3 pr-4">Necesaria</td>
                <td className="py-3 pr-4">Guarda tu elección sobre cookies.</td>
                <td className="py-3">Hasta que borres los datos del navegador.</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 pr-4 font-mono text-xs">_GRECAPTCHA</td>
                <td className="py-3 pr-4">Necesaria</td>
                <td className="py-3 pr-4">
                  Seguridad del formulario mediante Google reCAPTCHA.
                </td>
                <td className="py-3">Hasta 6 meses.</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 pr-4 font-mono text-xs">_ga</td>
                <td className="py-3 pr-4">Analítica</td>
                <td className="py-3 pr-4">
                  Distingue usuarios para medir visitas con Google Analytics.
                </td>
                <td className="py-3">Hasta 2 años.</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 pr-4 font-mono text-xs">_ga_*</td>
                <td className="py-3 pr-4">Analítica</td>
                <td className="py-3 pr-4">
                  Mantiene el estado de la sesión de Google Analytics.
                </td>
                <td className="py-3">Hasta 2 años.</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 pr-4 font-mono text-xs">Cookies de Google Maps</td>
                <td className="py-3 pr-4">Terceros</td>
                <td className="py-3 pr-4">
                  Muestran el mapa y recuerdan preferencias. Solo se cargan al
                  abrir el mapa.
                </td>
                <td className="py-3">Según Google.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Las cookies analíticas solo se activan si seleccionas &quot;Aceptar
          analíticas&quot;. Si eliges &quot;Solo necesarias&quot;, Google
          Analytics y Ahrefs Analytics no se cargan.
        </p>
        <p>
          El mapa de Google se carga únicamente cuando presionas &quot;Ver mapa
          de ubicación&quot;. Hasta ese momento no se solicita nada a Google
          Maps.
        </p>
      </LegalSection>

      <LegalSection title="3. Analítica sin cookies">
        <p>
          Utilizamos Ahrefs Analytics para obtener métricas agregadas de tráfico.
          Según su proveedor, esta herramienta no utiliza cookies ni almacena
          identificadores personales en tu navegador.
        </p>
      </LegalSection>

      <LegalSection title="4. Cómo cambiar tu elección">
        <p>
          Puedes aceptar o rechazar las cookies analíticas desde el aviso que
          aparece al ingresar al sitio. También puedes abrir nuevamente la
          configuración desde el enlace &quot;Preferencias de cookies&quot; del
          pie de página.
        </p>
        <p>
          Además, puedes eliminar o bloquear las cookies desde la configuración
          de tu navegador. Ten en cuenta que algunas funciones del sitio podrían
          dejar de funcionar correctamente.
        </p>
      </LegalSection>

      <LegalSection title="5. Cookies de terceros">
        <p>
          Google reCAPTCHA, Google Analytics y Google Maps son servicios de
          Google. Puedes revisar sus políticas en{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary underline underline-offset-2"
          >
            policies.google.com/privacy
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="6. Más información">
        <p>
          Para conocer cómo tratamos tus datos personales, revisa la{" "}
          <Link
            href="/politica-de-privacidad"
            className="font-semibold text-primary underline underline-offset-2"
          >
            Política de Privacidad
          </Link>
          . Si tienes dudas, escríbenos a{" "}
          <a
            href="mailto:contacto@ventanasbr.cl"
            className="font-semibold text-primary underline underline-offset-2"
          >
            contacto@ventanasbr.cl
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
