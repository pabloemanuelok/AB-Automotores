import React from "react";

const Section2 = () => {
  return (
    <div className="bg-black min-h-[300px] flex items-center my-4 p-4 md:m-4">
      <div className="flex flex-col md:flex-row  w-full">
        {/* Contenedor de la izquierda */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-8 mb-4 md:mb-0">
          <h2 className="text-white text-2xl md:text-4xl text-center md:text-left">
            ¡Bienvenido a <br /> nuestra agencia!
          </h2>
        </div>

        {/* Contenedor de la derecha */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-8">
          <p className="text-white text-base md:text-lg text-center md:text-left">
            Somos una empresa familiar con casi 25 años en el rubro automotriz. El
            trato personal, la responsabilidad y el compromiso nos caracterizan. Nos
            gustan los autos, los vemos como hermosas piezas de diseño, buscamos el
            detalle y lo reflejamos en nuestras fotos y videos; nos pone contentos
            que cada persona que recorre nuestras redes pueda llevarse una
            experiencia distinta, y más contentos nos pone, cuando se convierten en
            clientes y pueden disfrutar de los autos que pasan por nuestra
            agencia. Agradecemos tu visita. No dudes en consultarnos...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section2;
