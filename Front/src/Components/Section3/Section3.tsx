import React from "react";
import Image from "next/image";

const Section3: React.FC = () => {
  return (
    <div
      className="relative md:mx-4 md:px-8 bg-black bg-cover bg-center mt-2" // Imagen de fondo
      style={{ backgroundImage: "url('/source/EspejoHilux.webp')" }} // Ruta de la imagen de fondo
    >
      {/* Fondo oscuro con un filtro */}
      <div className="absolute inset-0 bg-white "></div> {/* Filtro oscuro */}
      
      {/* Contenido de la sección */}
      <div className="relative z-10 flex flex-col px-4 items-center text-white">
        {/* Logos en la parte superior */}
        <div className="flex justify-between w-[92%] pr-2 flex-wrap">
          {[  // Reemplaza con tus imágenes
            "/source/VehiculosSeleccionados.webp", 
            "/source/Financiacion.webp",
            "/source/Gestoria.webp",
            "/source/EntregaInmediata.webp",
            "/source/Permutas.webp"
          ].map((src, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-16 w-12 md:h-20 md:w-20 lg:h-28 lg:w-28 xl:h-32 xl:w-32"
            >
              <Image
                src={src} // Usamos la ruta directamente de la carpeta public
                alt={`Logo ${index + 1}`}
                width={100} // Tamaño ajustado para que los logos se ajusten a la pantalla
                height={110} // Tamaño ajustado para que los logos se ajusten a la pantalla
                className="object-contain"
                priority
                quality={75}
              />
            </div>
          ))}
        </div>

        {/* Texto en la parte inferior */}
        <div className="text-center flex justify-center bg-opacity-70 pb-4 w-[92%] pr-2">
          <h2 className="text-black text-base xl:text-lg text-center md:text-left">
            Vehículos seleccionados, entrega inmediata, lineas de créditos accesibles, compras y permutas, y servicios de gestoría para hacer todos los trámites sin complicaciones.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Section3;
