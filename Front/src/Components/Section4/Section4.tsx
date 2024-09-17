import React from "react";

const Section4 = () => {
  return (
    <div className="bg-RojoAb min-h-[300px] flex items-center my-4 p-4 md:m-4">
      <div className="flex flex-col md:flex-row w-full">
        {/* Contenedor de la izquierda */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-8 mb-4 md:mb-0">
          <h2 className="text-white text-2xl md:text-4xl text-center md:text-left">
          ¡Comprá tu auto y <br/> retiralo en el acto!
          </h2>
        </div>

        {/* Contenedor de la derecha */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-8">
          <p className="text-white text-base md:text-lg text-center md:text-left">
          Trabajamos con vehículos en excelentes condiciones, todos están controlados y chequeados antes de que ingresen a nuestra agencia, para que tu experiencia de post compra sea satisfactorio. Además contamos con gestoría propia, por lo que te garantizamos seguridad en los papeles, todos nuestros vehículos cuentan con carpeta completa para ser transferidos, y están listos para ser entregados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section4;
