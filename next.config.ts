import type { NextConfig } from "next";

// Sitio institucional y evaluación: exportación estática para Cloudflare Pages.
// El almacenamiento de evaluaciones se realizará mediante API independiente.
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
