import React from "react";

const Section6 = () => {
  return (
    <div className="bg-zinc-600 min-h-[300px] flex items-center my-4 p-4 md:m-4">
      <div className="flex flex-col md:flex-row w-full">
        {/* Contenedor de la izquierda */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-8 mb-4 md:mb-0">
          <h2 className="text-white text-2xl md:text-4xl text-center md:text-left">
          Si no llegas con el efectivo <br/>¡Podés financiarlo!
          </h2>
        </div>

        {/* Contenedor de la derecha */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-8">
          <p className="text-white text-base md:text-lg text-center md:text-left">
          Podemos ofrecerte una amplia línea de créditos: Créditos bancarios, personales ó prendarios, a través de Banco de Córdoba, Banco Santander o Banco HSBC. <br/>También financiamos solo con el DNI y recibimos tarjetas de crédito. <br/> Pedinos más información!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section6;
