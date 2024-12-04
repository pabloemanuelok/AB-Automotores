import React from "react";

const Section2 = () => {
  return (
    <div className="bg-black  flex items-center mb-4 md:mx-4 p-6">
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row w-full ">
        {/* Contenedor de la izquierda */}
        <div className="flex-1 flex items-center justify-center md:justify-start md:mb-0 lg:pl-[100px]">
          <h2 className="w-full text-white text-2xl lg:text-2xl xl:text-3xl text-center md:text-left">
            ¡Bienvenido a nuestra agencia!
          </h2>
        </div>

        {/* Contenedor de la derecha */}
        <div className="flex-1 flex items-center justify-center px-4 lg:pr-[70px] ">
          <p className="text-white text-base xl:text-lg text-justify md:text-justify w-[88%]">
          Somos una empresa familiar con casi 23 años en el rubro automotriz. El trato personal, la responsabilidad y el compromiso nos caracterizan. Buscamos que cada persona pueda disfrutar su auto al máximo, sin complicaciones en el momento de la compra y sin complicaciones posteriores.
          Las fotos y videos de nuestra página buscan reflejar la pasión y el gusto que tenemos por los autos. Si alguno te gusta o te interesa, no dudes en consultarnos!...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section2;
