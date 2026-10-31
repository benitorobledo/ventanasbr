import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { AhrefsAnalytics } from "@/components/analytics/AhrefsAnalytics";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_DATA } from "@/lib/constants";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

const isProduction =
  process.env.VERCEL_ENV !== undefined
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";

const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_DATA.url),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords:
    "ventanas aluminio Coquimbo, ventanas PVC Chile, fábrica de ventanas, termopanel Coquimbo",
  applicationName: SITE_DATA.name,
  authors: [{ name: SITE_DATA.name }],
  creator: SITE_DATA.name,
  publisher: SITE_DATA.name,
  icons: {
    icon: "/images/Favicon BR.jpg",
  },
  robots: isProduction
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : {
        index: false,
        follow: false,
      },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: SITE_DATA.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL">
      <body className={inter.className}>
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
            window.gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied'
            });
          `}
        </Script>
        <Header />
        <Script
          src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="beforeInteractive"
        />
        <JsonLd />
        {children}
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
        <AhrefsAnalytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
