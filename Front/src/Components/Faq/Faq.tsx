import React from "react";
import { homeFaqs } from "@/lib/faq";

// Server Component a proposito: el acordeon usa <details> nativo, asi las
// respuestas viajan en el HTML del servidor y no dependen de que corra JS.
const Faq: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="page-container">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-[#B62E30] text-sm font-semibold tracking-widest uppercase mb-3">
            Dudas frecuentes
          </p>
          <h2 className="text-gray-900 text-2xl md:text-3xl font-bold">
            Preguntas frecuentes
          </h2>
          <div className="mt-2 mx-auto w-12 h-[3px] bg-[#B62E30] rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto border-t border-gray-200">
          {homeFaqs.map(({ question, answer }) => (
            <details key={question} className="group border-b border-gray-200">
              <summary className="flex items-center justify-between gap-4 cursor-pointer py-5 list-none [&::-webkit-details-marker]:hidden">
                <h3 className="text-gray-900 text-base md:text-lg font-semibold leading-snug group-hover:text-[#B62E30] transition-colors duration-200">
                  {question}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 shrink-0 text-[#B62E30] transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </summary>
              <p className="pb-5 pr-9 text-gray-500 text-sm md:text-base leading-relaxed">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
