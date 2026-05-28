import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ventanas BR | Fábrica de Ventanas de Aluminio y PVC en Coquimbo",
  description: "Fabricación e instalación de ventanas a medida con más de 10 años de experiencia. Especialistas en termopanel y eficiencia energética.",
  keywords: "ventanas aluminio Coquimbo, ventanas PVC Chile, fábrica de ventanas, termopanel Coquimbo",
  icons: {
    icon: "/images/Favicon BR.jpg",
  }
};

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        <Script src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} strategy="beforeInteractive" />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
