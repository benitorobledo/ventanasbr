# 🛠 Instrucciones de Desarrollo - Ventanas BR

## Estándares de Código
- **Framework:** Next.js 14 (App Router).
- **Lenguaje:** TypeScript estricto (sin uso de `any`).
- **Estilos:** Tailwind CSS con metodología Utility-First.
- **Componentes:** Functional Components con desestructuración de props e interfaces claras.
- **Animaciones:** Framer Motion para entradas suaves (fade-in, slide-up).

## Reglas de Oro (Hard Rules)
1. **Imágenes:** Prohibido usar `<img>`. Usar exclusivamente `next/image`. Las imágenes del Hero deben llevar la propiedad `priority`.
2. **Iconos:** Utilizar `lucide-react` para iconos consistentes.
3. **Formularios:** Validación estricta con `Zod` + `react-hook-form`.
4. **Interactividad:** El Header debe cambiar de estilo (añadir sombra/background) al hacer scroll.
5. **Accesibilidad:** Todo botón debe tener `aria-label` y las imágenes `alt` descriptivos.
6. **Rendimiento:** Optimizar fuentes con `next/font/google`.

## Workflow de Entrega
1. Configuración de Base (Configuraciones, tipos y constantes).
2. Estructura Global (Layout, Header, Footer).
3. Componentes UI Atómicos (Button, Input, Card).
4. Secciones de la Landing Page.
5. Lógica de API y Formulario.