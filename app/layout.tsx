import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mindstack | Firma de inteligencia empresarial",
  description:
    "Mindstack ayuda a organizaciones a comprender su desempeño y mejorar sus operaciones mediante diagnóstico empresarial, análisis de datos, automatización y tecnología aplicada.",
  openGraph: {
    title: "Mindstack | Firma de inteligencia empresarial",
    description: "Investigación, análisis de datos y tecnología aplicada a retos empresariales.",
    type: "website",
    locale: "es_MX",
    siteName: "Mindstack",
  },
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