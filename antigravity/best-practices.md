# Checklist: Buenas Prácticas Next.js para Real Estate

## 🚀 1. Rendimiento y Carga
*   **SSG + ISR:** Usa Static Site Generation con Revalidación Incremental para las páginas de propiedades (carga instantánea, SEO perfecto).
*   **`next/image`:** Obligatorio. Formatos WebP/AVIF, tamaños definidos, y `priority` *solo* en la primera foto visible.
*   **Streaming & Suspense:** Muestra el "armazón" de la página al instante mientras el mapa o fotos pesadas cargan en segundo plano.
*   **Lazy Loading:** Retrasa la carga de mapas (Google Maps/Mapbox) y scripts de terceros (Chatbots, Analytics) hasta que sean necesarios.

## 🔍 2. SEO (Fundamental para ventas)
*   **URLs SEO-Friendly (`[slug]`):** Usa slugs descriptivos en lugar de IDs para las rutas dinámicas. Ejemplo: `/propiedad/casa-con-piscina-en-miami` en vez de `/propiedad/982`. Esto es vital para rankear en Google.
*   **Meta Tags Dinámicos:** Usa el `slug` en la `Metadata` API para generar títulos y descripciones precisas por cada casa.
*   **Open Graph:** Imágenes enriquecidas para cuando el link se comparta en WhatsApp/Redes.
*   **Schema Markup (JSON-LD):** Usa esquema de `RealEstateListing` o `Offer` para aparecer con precio en los resultados de Google.
*   **Sitemap Dinámico:** Asegura que las propiedades nuevas se indexen rápido.

## 📱 3. UI y Experiencia de Usuario (UX)
*   **Filtros en la URL:** Guarda filtros (precio, ubicación) en los parámetros de la URL (`?precio=100k`) para copiado fácil y navegación hacia atrás.
*   **Galerías Visuales:** Carruseles rápidos y táctiles. El usuario compra viendo fotos.
*   **Diseño Premium (Vibe Coding):** Interfaz limpia, tipografías modernas, colores que inspiren confianza, micro-animaciones en botones.
*   **Contacto Siempre Visible:** Formulario "Sticky" que acompaña al usuario al hacer scroll.

## 🏗️ 4. Arquitectura Next.js (App Router)
*   **Server Components (RSC):** Úsalos por defecto para traer datos directos de la base de datos (Supabase/Postgres) sin JS extra.
*   **Client Components (`'use client'`):** Resérvalos solo para interactividad (Mapas, Favoritos, Formularios).
*   **Server Actions:** Para mutaciones seguras (enviar mensajes a agentes, guardar favoritos).

## 💡 5. Features Clave (Para destacar)
*   **Favoritos Guardados:** (Local en el navegador o en BD si hace login).
*   **Comparador:** Selección de 2-3 casas para ver diferencias lado a lado.
*   **Calculadora de Hipotecas:** Interacción rápida en la misma página de la casa.
*   **Mapas Agrupados (Clustering):** Si hay muchas casas, agrupar los pines en el mapa para no colapsar la vista.
*   **Alertas:** Avisos por email de "Nuevas propiedades en zona X".

## 🛡️ 6. Seguridad
*   **Validación Estricta:** Usa `Zod` en formularios de contacto para evitar bots.
*   **Rate Limiting:** Limita peticiones a la API de búsqueda/contacto para evitar que roben tus datos (Scraping).
