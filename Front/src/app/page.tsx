import dynamic from "next/dynamic";
import React from "react";
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
    <>
      {/* Secciones principales */}
      <>
        <Section0 />
        <Section2 />
        <Section1 />
        <SectionAnim />
      </>

      {/* Sección secundaria */}
      <>
        <Section3 />
        <Section7 />
      </>
    </>
  );
};

export default Page;
