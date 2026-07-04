import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mindstack — Consultoría estratégica, datos e inteligencia aplicada",
  description:
    "Grupo Mindstack ayuda a negocios a detectar fugas, ordenar procesos comerciales y tomar decisiones con mayor claridad.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}