# 🏗 Arquitectura del Proyecto

El proyecto sigue una estructura modular para facilitar el mantenimiento y despliegue en Vercel.

## Directorios
- `app/`: Rutas, layouts y API routes.
- `components/layout/`: Elementos globales (Header, Footer, Navbar).
- `components/sections/`: Secciones específicas de la landing (Hero, About, Services, etc.).
- `components/ui/`: Componentes reutilizables de bajo nivel (Buttons, Badges, Cards).
- `lib/`: Funciones de utilidad, constantes globales y validaciones Zod.
- `public/images/`: Assets optimizados en formato .webp.

## Archivos Críticos
- `lib/constants.ts`: Única fuente de verdad para textos, enlaces de navegación y datos de servicios.
- `tailwind.config.ts`: Configuración de la paleta de colores oficial (#1E3A5F, #2E86C1).
- `vercel.json`: Cabeceras de seguridad y optimización para el despliegue.

## Relaciones de Componentes
- `page.tsx` importa componentes de `components/sections/`.
- `components/sections/` utiliza componentes de `components/ui/`.