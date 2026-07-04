import dynamic from "next/dynamic";
import React from "react";
import CtaBanner from "@/Components/CtaBanner/CtaBanner";
import Section3 from "@/Components/Section3/Section3";

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
      <Section0 />
      <Section1 />
      <SobreNosotros />
      <Section3 />
      <SectionAnim />
      <VehDestacados />
      <Section4 />
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
