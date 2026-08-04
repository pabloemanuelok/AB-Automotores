import type { Metadata } from "next";
import "./globals.css";
import { Titillium_Web } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import { UserProvider } from "@/Context/contextUser";
import FloatingWhatsApp from "@/Components/FloatingWsp/FloatingWsp";
import PageviewTracker from "@/Components/PageviewTracker/PageviewTracker";
import { SITE_URL } from "@/lib/seo";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const description =
  "Concesionaria de autos usados en Argentina. Encontrá tu próximo auto en AB Automotores.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AB Automotores",
    template: "%s | AB Automotores",
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "AB Automotores",
    url: SITE_URL,
    title: "AB Automotores",
    description,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "Yd1UBzKAw9uI1TwNli-SL61tUJpgk_sNYf8ZyZWmCm0",
  },
};

const dealerSchema = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "AB Automotores",
  url: SITE_URL,
  logo: "https://ik.imagekit.io/automotoresab/src-assets/LogoRojo.png",
  image: "https://ik.imagekit.io/automotoresab/src-assets/LogoRojo.png",
  telephone: ["+543516129221", "+543515088602"],
  email: "abautomotores@hotmail.com",
  foundingDate: "2003",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Avenida Amadeo Sabattini 4260, Empalme",
    addressLocality: "Córdoba",
    postalCode: "X5006KQT",
    addressCountry: "AR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -31.4346103,
    longitude: -64.1320892,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "15:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/automotoresab/?hl=es",
    "https://www.facebook.com/profile.php?id=100001582968005",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR">
      <body className={`${titillium.className} flex flex-col min-h-screen antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dealerSchema) }}
        />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
        <UserProvider>
          <PageviewTracker />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <FloatingWhatsApp />
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
