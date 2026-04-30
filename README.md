# 🏗️ Ventanas BR - Next.js High-Performance Landing Page

Este proyecto es una reconstrucción moderna, rápida y escalable del sitio web oficial de **Ventanas BR** (Coquimbo, Chile). Se migró de una arquitectura WordPress a **Next.js 14 con App Router** para garantizar un rendimiento superior, SEO optimizado y una experiencia de usuario fluida.

## 🚀 Stack Técnico

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion
- **Formularios:** React Hook Form + Zod
- **Despliegue:** Vercel (Edge Functions)
- **Optimización:** Next/Image & Next/Font (Inter)

## 🎯 Características Principales

- **Single Page Application (SPA):** Navegación fluida con scroll suave entre secciones.
- **Mobile First:** Diseño 100% responsivo optimizado para dispositivos móviles.
- **SEO Local:** Configuración de metadatos avanzada para posicionamiento en la Región de Coquimbo.
- **Conversión:** Botón flotante de WhatsApp y formulario de contacto con validación en tiempo real.
- **Rendimiento:** Puntuaciones >90 en Lighthouse en Performance, Accesibilidad y SEO.

## 📁 Estructura del Proyecto

```text
├── app/                  # Rutas y API (App Router)
├── components/           # Componentes modulares
│   ├── layout/           # Header, Footer, WhatsAppButton
│   ├── sections/         # Hero, About, Services, Contact, etc.
│   └── ui/               # Componentes atómicos (Botones, Cards)
├── lib/                  # Configuración, constantes y validaciones
├── public/               # Assets estáticos (Imágenes WebP)
└── tailwind.config.ts    # Configuración de marca (Colores oficiales)