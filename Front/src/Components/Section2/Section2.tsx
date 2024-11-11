import React from "react";

const Section2 = () => {
  return (
    <div className="bg-black min-h-[100px] flex items-center p-6 md:m-4">
      <div className="flex flex-col gap-6 md:gap-0 md:flex-row w-full min-h-[300px]">
        {/* Contenedor de la izquierda */}
        <div className="flex-1 flex items-center justify-around md:justify-start md:mb-0 lg:pl-[100px] min-h-[100px]">
          <h2 className="w-full text-white text-2xl lg:text-2xl xl:text-3xl text-center md:text-left">
            ¡Bienvenido a nuestra agencia!
          </h2>
        </div>

        {/* Contenedor de la derecha */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-9 lg:pr-[100px] min-h-[200px]">
          <p className="text-white text-base xl:text-lg text-center md:text-left w-full">
            Somos una empresa familiar con casi 25 años en el rubro automotriz.
            El trato personal, la responsabilidad y el compromiso nos
            caracterizan. Nos gustan los autos, buscamos el detalle y lo
            reflejamos en nuestras fotos y videos; nos pone contentos que cada
            persona que recorre nuestras redes pueda llevarse una experiencia
            distinta, y más contentos nos pone, cuando se convierten en clientes
            y pueden disfrutar de los autos que pasan por nuestra agencia.
            Agradecemos tu visita. No dudes en consultarnos...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section2;
