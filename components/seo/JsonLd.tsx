import { SERVICES, SITE_DATA } from "@/lib/constants";
import { SITE_DESCRIPTION } from "@/lib/seo";

const organizationId = `${SITE_DATA.url}/#organization`;
const businessId = `${SITE_DATA.url}/#localbusiness`;
const websiteId = `${SITE_DATA.url}/#website`;

const areaServed = SITE_DATA.areaServed.map((name) => ({
  "@type": "City",
  name,
}));

const postalAddress = {
  "@type": "PostalAddress",
  ...SITE_DATA.address,
};

const contactPoint = {
  "@type": "ContactPoint",
  telephone: SITE_DATA.phone,
  email: SITE_DATA.email,
  contactType: "customer service",
  areaServed: "CL",
  availableLanguage: ["es-CL", "es"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: SITE_DATA.name,
      alternateName: "Ventanas Benito Robledo",
      url: `${SITE_DATA.url}/`,
      description: SITE_DESCRIPTION,
      logo: `${SITE_DATA.url}/images/logo-br.png`,
      image: `${SITE_DATA.url}/images/logo-br.png`,
      telephone: SITE_DATA.phone,
      email: SITE_DATA.email,
      address: postalAddress,
      areaServed,
      contactPoint: [contactPoint],
      ...(SITE_DATA.sameAs.length > 0 ? { sameAs: SITE_DATA.sameAs } : {}),
    },
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": businessId,
      name: SITE_DATA.name,
      alternateName: "Ventanas Benito Robledo",
      url: `${SITE_DATA.url}/`,
      telephone: SITE_DATA.phone,
      email: SITE_DATA.email,
      image: `${SITE_DATA.url}/images/logo-br.png`,
      logo: `${SITE_DATA.url}/images/logo-br.png`,
      address: postalAddress,
      geo: {
        "@type": "GeoCoordinates",
        latitude: SITE_DATA.geo.latitude,
        longitude: SITE_DATA.geo.longitude,
      },
      hasMap: SITE_DATA.mapUrl,
      areaServed,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: SITE_DATA.openingHours.days,
          opens: SITE_DATA.openingHours.opens,
          closes: SITE_DATA.openingHours.closes,
        },
      ],
      contactPoint: [contactPoint],
      parentOrganization: {
        "@id": organizationId,
      },
      ...(SITE_DATA.sameAs.length > 0 ? { sameAs: SITE_DATA.sameAs } : {}),
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${SITE_DATA.url}/`,
      name: SITE_DATA.name,
      inLanguage: "es-CL",
      publisher: {
        "@id": organizationId,
      },
    },
    ...SERVICES.map((service) => ({
      "@type": "Service",
      name: service.title,
      description: service.summary,
      serviceType: service.title,
      provider: {
        "@id": businessId,
      },
      areaServed,
      url: `${SITE_DATA.url}/#servicios`,
    })),
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
