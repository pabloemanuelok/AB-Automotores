import dynamic from "next/dynamic";
import React from "react";
import type { Metadata } from "next";
import CtaBanner from "@/Components/CtaBanner/CtaBanner";
import Section3 from "@/Components/Section3/Section3";
import Faq from "@/Components/Faq/Faq";
import { faqPageSchema, homeFaqs } from "@/lib/faq";
import { SITE_URL } from "@/lib/seo";

const title = "Concesionaria de autos usados en Córdoba | AB Automotores";

export const metadata: Metadata = {
  // absolute: el layout aplica el template "%s | AB Automotores" y duplicaria la marca.
  title: { absolute: title },
  description:
    "Concesionaria de autos usados y 0km en Córdoba, sobre Av. Amadeo Sabattini 4260. Entrega inmediata, financiación hasta el 100%, permutas y consignaciones. Más de 20 años en el rubro.",
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description:
      "Autos usados y 0km seleccionados en Córdoba. Financiación, permutas, consignaciones y gestoría. Entrega inmediata.",
    url: SITE_URL,
    type: "website",
    locale: "es_AR",
    siteName: "AB Automotores",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
};

const faqSchema = faqPageSchema(homeFaqs, "");

const Loading = ({ section }: { section: string }) => (
  <div className="h-[400px] w-full flex items-center justify-center">
    <p>Cargando {section}...</p>
  </div>
);

const Section0 = dynamic(() => import("@/Components/Section0/Section0"), {
  loading: () => <Loading section="Section0" />,
});
const Section1 = dynamic(() => import("@/Components/Section1/Section1"), {
  loading: () => <Loading section="Section1" />,
});
const SectionAnim = dynamic(() => import("@/Components/SectionAnim/SectionAnim"), {
  loading: () => <Loading section="SectionAnim" />,
});
const Section4 = dynamic(() => import("@/Components/Section4/Section4"), {
  loading: () => <Loading section="Section4" />,
});
const SobreNosotros = dynamic(() => import("@/Components/SobreNosotros/SobreNosotros"), {
  loading: () => <Loading section="SobreNosotros" />,
});
const VehDestacados = dynamic(() => import("@/Components/VehDestacados/VehDestacados"), {
  loading: () => <Loading section="VehDestacados" />,
});

const Page = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Section0 />
      <SectionAnim />
      <Section1 />
      <SobreNosotros />
      <Section3 />
      <VehDestacados />
      <Section4 />
      <Faq items={homeFaqs} />
      <div className="mt-12 md:mt-16">
        <CtaBanner
          eyebrow="Consultá sin compromiso"
          title="¿Listo para tu próximo vehículo?"
          description="Contactanos y te asesoramos para que encuentres"
          boldText="el auto ideal para vos."
        />
      </div>
    </>
  );
};

export default Page;
