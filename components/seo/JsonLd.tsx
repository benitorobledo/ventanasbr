import { SERVICES, SITE_DATA } from "@/lib/constants";

const businessId = `${SITE_DATA.url}/#business`;
const websiteId = `${SITE_DATA.url}/#website`;

const areaServed = SITE_DATA.areaServed.map((name) => ({
  "@type": "City",
  name,
}));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": businessId,
      name: SITE_DATA.name,
      url: `${SITE_DATA.url}/`,
      telephone: SITE_DATA.phone,
      email: SITE_DATA.email,
      image: `${SITE_DATA.url}/images/logo-br.webp`,
      logo: `${SITE_DATA.url}/images/logo-br.webp`,
      address: {
        "@type": "PostalAddress",
        ...SITE_DATA.address,
      },
      areaServed,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: SITE_DATA.openingHours.days,
          opens: SITE_DATA.openingHours.opens,
          closes: SITE_DATA.openingHours.closes,
        },
      ],
      ...(SITE_DATA.sameAs.length > 0 ? { sameAs: SITE_DATA.sameAs } : {}),
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${SITE_DATA.url}/`,
      name: SITE_DATA.name,
      inLanguage: "es-CL",
      publisher: {
        "@id": businessId,
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
