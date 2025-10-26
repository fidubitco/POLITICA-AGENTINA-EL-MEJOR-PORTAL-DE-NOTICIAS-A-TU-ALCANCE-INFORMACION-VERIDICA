# Nota sobre Vercel

Este proyecto usa Express + tRPC en Node con Vite. Para Vercel (serverless) se recomienda migrar a Next.js (App Router) para soporte nativo. Alternativamente, desplegar como serverless function única no es trivial con el bundling actual.

Sugerencia: usar Railway/Render o VPS (IONOS) con Docker para soporte completo del servidor Express.
