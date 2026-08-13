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
import { CAMARA, DIRECCION, EMAIL, NOMBRE, TELEFONOS } from "@/lib/negocio";

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
  "@id": `${SITE_URL}/#autodealer`,
  name: NOMBRE,
  description:
    "Concesionaria de autos usados y 0km en Córdoba. Compraventa, financiación, permutas, consignaciones y gestoría integral. Más de 20 años en el rubro automotor.",
  url: SITE_URL,
  logo: "https://ik.imagekit.io/automotoresab/src-assets/LogoRojo.png",
  image: "https://ik.imagekit.io/automotoresab/src-assets/LogoRojo.png",
  telephone: TELEFONOS.map((t) => t.tel),
  email: EMAIL,
  foundingDate: "2003",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${DIRECCION.calle}, ${DIRECCION.barrio}`,
    addressLocality: DIRECCION.ciudad,
    addressRegion: DIRECCION.provincia,
    postalCode: DIRECCION.codigoPostal,
    addressCountry: DIRECCION.pais,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -31.4346103,
    longitude: -64.1320892,
  },
  hasMap: "http://google.com.ar/maps/?cid=11758588401791495567",
  areaServed: [
    { "@type": "City", name: "Córdoba" },
    { "@type": "City", name: "Villa Allende" },
    { "@type": "City", name: "Río Ceballos" },
    { "@type": "City", name: "Alta Gracia" },
    { "@type": "City", name: "Malagueño" },
    { "@type": "City", name: "Unquillo" },
    { "@type": "City", name: "Mendiolaza" },
    { "@type": "City", name: "Saldán" },
  ],
  memberOf: {
    "@type": "Organization",
    name: CAMARA,
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
    "https://www.guia360.com.ar/es/recorrido-virtual-360/ab-automotores",
    "https://clasificados.lavoz.com.ar/sitio/abautomotores",
    "https://gtm.com.ar/concesionario/ab-automotores-2/",
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
