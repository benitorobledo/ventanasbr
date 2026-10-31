import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Política de Privacidad | Ventanas BR",
  description:
    "Información sobre el tratamiento de datos personales en el sitio web de Ventanas BR.",
  alternates: {
    canonical: "/politica-de-privacidad",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Política de Privacidad"
      subtitle="Cómo tratamos los datos personales que nos entregas a través de este sitio web."
      updated="29 de octubre de 2026"
    >
      <LegalSection title="1. Responsable del tratamiento">
        <p>
          El responsable de los datos personales es <strong>Ventanas BR</strong>,
          con domicilio en Los Alerces 621, sector Pan de Azúcar, Coquimbo,
          Chile. Para cualquier consulta puedes escribir a{" "}
          <a
            href="mailto:contacto@ventanasbr.cl"
            className="font-semibold text-primary underline underline-offset-2"
          >
            contacto@ventanasbr.cl
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Datos que recopilamos">
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Datos que envías mediante el formulario de contacto: nombre, correo
            electrónico, teléfono y mensaje.
          </li>
          <li>
            Datos técnicos asociados a la seguridad del sitio, como dirección IP
            y agente de usuario, utilizados para prevenir abuso y spam.
          </li>
          <li>
            Datos de navegación y analítica, únicamente si aceptas las cookies
            analíticas.
          </li>
          <li>
            Si abres el mapa de ubicación, Google Maps puede tratar datos
            técnicos como la dirección IP y el navegador.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Finalidad del tratamiento">
        <p>
          Utilizamos los datos para responder solicitudes de cotización,
          contactarte por el medio que indiques, mantener la seguridad del sitio
          y, cuando corresponda, medir el rendimiento de nuestras campañas y del
          contenido.
        </p>
      </LegalSection>

      <LegalSection title="4. Base de licitud">
        <p>
          El tratamiento se basa en tu consentimiento al enviar el formulario y,
          cuando corresponde, en el interés legítimo de mantener la seguridad del
          sitio y mejorar nuestros servicios.
        </p>
      </LegalSection>

      <LegalSection title="5. Conservación de los datos">
        <p>
          Conservamos los datos el tiempo necesario para atender tu solicitud y
          cumplir obligaciones legales. Los datos de analítica se conservan
          según la configuración de cada herramienta y el consentimiento
          otorgado.
        </p>
      </LegalSection>

      <LegalSection title="6. Destinatarios y encargados">
        <p>
          Para operar el sitio utilizamos proveedores que pueden tratar datos
          por cuenta nuestra:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Vercel, como proveedor de alojamiento.</li>
          <li>Resend, para el envío de correos electrónicos.</li>
          <li>
            Google, para reCAPTCHA, Google Maps y, si aceptas, Google Analytics.
          </li>
          <li>
            Ahrefs, para analítica sin cookies.
          </li>
        </ul>
        <p>
          Algunos de estos proveedores pueden almacenar datos fuera de Chile.
          Procuramos que cuenten con medidas contractuales y técnicas adecuadas
          de protección.
        </p>
      </LegalSection>

      <LegalSection title="7. Tus derechos">
        <p>
          Puedes solicitar acceso, rectificación, cancelación, oposición o
          portabilidad de tus datos, así como revocar tu consentimiento,
          escribiendo a{" "}
          <a
            href="mailto:contacto@ventanasbr.cl"
            className="font-semibold text-primary underline underline-offset-2"
          >
            contacto@ventanasbr.cl
          </a>
          . Responderemos en los plazos que establece la normativa aplicable.
        </p>
      </LegalSection>

      <LegalSection title="8. Seguridad">
        <p>
          Aplicamos medidas como HTTPS, validación de formularios, reCAPTCHA,
          límites de solicitudes y controles de acceso. Ningún sistema es
          completamente infalible, pero trabajamos para reducir riesgos.
        </p>
      </LegalSection>

      <LegalSection title="9. Cookies">
        <p>
          El uso de cookies se detalla en la{" "}
          <Link
            href="/politica-de-cookies"
            className="font-semibold text-primary underline underline-offset-2"
          >
            Política de Cookies
          </Link>
          . Puedes cambiar tu elección en cualquier momento desde el enlace
          &quot;Preferencias de cookies&quot; del pie de página.
        </p>
      </LegalSection>

      <LegalSection title="10. Legislación aplicable">
        <p>
          Esta política se rige por la Ley N° 19.628 sobre Protección de la Vida
          Privada y por la Ley N° 21.719, que modifica la materia y entra en
          vigor en diciembre de 2026.
        </p>
      </LegalSection>

      <LegalSection title="11. Cambios en esta política">
        <p>
          Podemos actualizar esta política para reflejar cambios en el sitio o
          en la normativa. La fecha de la última actualización aparece al inicio
          de este documento.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
