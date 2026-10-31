export const SITE_DATA = {
  name: "Ventanas BR",
  url: "https://www.ventanasbr.cl",
  phone: "+56 9 7744 3314",
  phoneFull: "56977443314",
  email: "contacto@ventanasbr.cl",
  location: "Pan de Azúcar, Coquimbo, Chile",
  addressFull: "Los Alerces 621, La Serena, Coquimbo, Chile",
  address: {
    streetAddress: "Los Alerces 621",
    addressLocality: "Coquimbo",
    addressRegion: "Coquimbo",
    addressCountry: "CL"
  },
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "19:00"
  },
  geo: {
    latitude: -30.0156078,
    longitude: -71.2629016
  },
  mapUrl: "https://maps.app.goo.gl/iCALKW31AHLpFpCt7",
  mapEmbedUrl:
    "https://www.google.com/maps?q=-30.0156078,-71.2629016&z=17&output=embed",
  social: {
    facebook: "https://www.facebook.com/vidrio.aluminio.5454",
    instagram: "https://www.instagram.com/vidrios_y_aluminios_obras/"
  },
  sameAs: [
    "https://www.facebook.com/vidrio.aluminio.5454",
    "https://www.instagram.com/vidrios_y_aluminios_obras/",
    "https://maps.app.goo.gl/iCALKW31AHLpFpCt7"
  ],
  areaServed: ["Coquimbo", "La Serena", "Ovalle", "Vicuña"],
  colors: {
    primary: "#1B1464",
    secondary: "#ED1E79",
    accent: "#00AEEF",
    whatsapp: "#25D366"
  }
};

export const NAVIGATION = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "/#nosotros" },
  { name: "Servicios", href: "/#servicios" },
  { name: "Contacto", href: "/#contacto" }
];

export const SERVICES = [
  {
    title: "Ventanas de Aluminio",
    summary: "Durabilidad, diseño moderno y bajo mantenimiento para todo tipo de proyectos.",
    description: "Fabricamos e instalamos ventanas de aluminio de alta calidad, ideales para brindar durabilidad, diseño moderno y bajo mantenimiento. Trabajamos con espejos, shower doors, puertas de aluminio y sistemas de vidrio termopanel, garantizando aislamiento térmico y acústico. Disponibles en una variedad de colores elegantes: titanium mate, blanco, bronce y leño.",
    image: "/images/servicios/aluminio/ventana-aluminio-3.jpeg",
    icon: "AppWindow"
  },
  {
    title: "Ventanas de PVC",
    summary: "Excelente eficiencia energética y aislamiento acústico superior para tu confort.",
    description: "Las ventanas de PVC destacan por su excelente eficiencia energética, ayudando a mantener la temperatura interior del hogar y reduciendo el consumo energético. Ofrecen gran aislamiento acústico, resistencia a la humedad y larga vida útil sin necesidad de mantenimiento constante. Una opción moderna, segura y eficiente.",
    image: "/images/servicios/pvc/ventana-pvc-5.jpeg",
    icon: "Shield"
  },
  {
    title: "Obras en Generales",
    summary: "Soluciones integrales en obras menores, ampliaciones y mejoras para el hogar.",
    description: "Realizamos todo tipo de trabajos en obras menores y mejoras. Nos especializamos en: Cierres de terrazas, Instalación de ventanas y puertas, Ampliaciones, Revestimientos, Tabiquería, Techumbres y Remodelaciones completas. Entregamos soluciones adaptadas a cada necesidad con terminaciones de calidad.",
    image: "/images/servicios/aluminio/puerta-aluminio-1.jpeg",
    icon: "Layout"
  },
  {
    title: "Muebles a Medida",
    summary: "Funcionalidad y diseño personalizado para cocinas, closets y espacios de oficina.",
    description: "Diseñamos y fabricamos muebles a medida combinando funcionalidad y materiales de alta calidad. Creamos soluciones personalizadas para: Muebles de cocina, Vanitory (baños), Muebles de living, Closets y walk-in closets, Tocadores y Muebles de oficina.",
    image: "/images/servicios/muebles/WhatsApp Image 2026-04-04 at 14.20.47.jpeg",
    icon: "Wrench"
  }
];
