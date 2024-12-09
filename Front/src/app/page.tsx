import dynamic from "next/dynamic";
import React from "react";
import Section4y5 from "@/Components/Section3/Section3";

// Componente Loading reutilizable
const Loading = ({ section }: { section: string }) => (
  <p>Cargando {section}...</p>
);

// Importaciones dinámicas con componente Loading reutilizable
const Section0 = dynamic(() => import("@/Components/Section0/Section0"), {
  loading: () => <Loading section="Section0" />,
});
const Section1 = dynamic(() => import("@/Components/Section1/Section1"), {
  loading: () => <Loading section="Section1" />,
});
const Section2 = dynamic(() => import("@/Components/Section2/Section2"), {
  loading: () => <Loading section="Section2" />,
});
const Section7 = dynamic(() => import("@/Components/Section4/Section4"), {
  loading: () => <Loading section="Section7" />,
});
const SectionAnim = dynamic(() => import("@/Components/SectionAnim/SectionAnim"), {
  loading: () => <Loading section="SectionAnim" />,
});

const Page = () => {
  return (
    <div>
      {/* Agrupación de secciones principales */}
      <section>
        <Section0 />
        <Section2 />
        <Section1 />
        <SectionAnim />
      </section>

      {/* Sección secundaria */}
      <section>
        <Section4y5 />
        <Section7 />
      </section>
    </div>
  );
};

export default Page;
