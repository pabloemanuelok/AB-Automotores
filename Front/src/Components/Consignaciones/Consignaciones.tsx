"use client";
import Image from "next/image";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Para los íconos de flecha
import logo1 from "@/Assets/tasacion .png";
import logo2 from "@/Assets/pagoinstantaneo.png";
import logo3 from "@/Assets/vendeSeguro.png";
import logo4 from "@/Assets/gestoria.png";
import logo5 from "@/Assets/evitaEstafas.png";
import car1 from "@/Assets/C4Interior.png";
import car2 from "@/Assets/C4Interior.png";
import car3 from "@/Assets/C4Interior.png";

const Consignaciones = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handlePrevImage = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -scrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const handleNextImage = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-[100%]">
      <div className="relative flex flex-col items-center px-4 md:px-10 lg:px-20 mb-4">
        {/* Sección de logos */}
        <div className="bg-white w-full flex flex-col md:flex-row items-center justify-center py-4">
          <div className="w-full md:w-[47%] items-start text-center md:text-start">
            <h2 className="text-black text-2xl pb-4 md:text-3xl font-bold">
              Querés vender tu auto?
            </h2>
          </div>
          <div className="flex justify-between gap-2 md:gap-4 w-full md:w-[45%]">
            {[logo1, logo2, logo3, logo4, logo5].map((logo, index) => (
              <div
                key={index}
                className="flex flex-col items-center h-24 max-w-[120px]"
              >
                <div className="flex items-center justify-center h-12 mb-1">
                  <Image
                    src={logo}
                    alt={`Logo ${index + 1}`}
                    width={150}
                    height={150}
                    className="object-contain h-[40px]"
                  />
                </div>
                <span className="text-black text-center font-semibold text-xs md:text-sm leading-tight">
                  {
                    [
                      "Tasación en el acto",
                      "Cobro instantáneo",
                      "Vendé de manera segura",
                      "Servicio de gestoría",
                      "Evitá estafas",
                    ][index]
                  }
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de información adicional */}
        <div className="flex flex-col mb-4 md:mx-6 items-center justify-center gap-4">
          <div className="flex flex-col md:flex-row w-full md:w-[96%] items-center md:gap-10">
            <h3 className="text-black md:w-[50%] text-2xl md:text-3xl font-bold">
              Compra directa
            </h3>
            <p className="text-black md:w-[49%] text-center md:text-start text-lg font-semibold">
              Si necesitas vender tu auto de manera inmediata, te lo tasamos y
              te lo pagamos de contado, nos encargamos de todos los trámites de
              gestoría y te aseguramos la transferencia.
            </p>
          </div>

          <div className="flex flex-col md:flex-row w-full md:w-[96%] items-center justify-center md:gap-10">
            <h3 className="text-black md:w-[50%] text-2xl md:text-3xl font-bold mb-2">
              Consignaciones
            </h3>
            <p className="text-black md:w-[49%] text-center md:text-start text-lg font-semibold">
              Te gestionamos la venta, dejá tu auto en nuestra agencia, lo
              publicamos en todos los portales de venta online y buscamos
              comprador. Una vez concretada la operación nos encargamos de todos
              los trámites de gestoría y te lo pagamos de contado.
            </p>
          </div>
        </div>
      </div>

      {/* Carrusel para Mobile */}
      <div className="relative md:hidden mt-4">
        {/* Botones para navegación */}
        <button
          onClick={handlePrevImage}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-600 z-10"
        >
          <FaChevronLeft size={24} />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-600 z-10"
        >
          <FaChevronRight size={24} />
        </button>

        <div
          className="flex overflow-x-auto gap-0 h-[300px] w-full"
          ref={scrollRef}
        >
          <div className="flex-none w-full h-full relative">
            <Image
              src={car1}
              alt="Imagen 1"
              layout="fill"
              className="object-cover object-top"
            />
          </div>
          <div className="flex-none w-full h-full relative">
            <Image
              src={car2}
              alt="Imagen 2"
              layout="fill"
              className="object-cover"
            />
          </div>
          <div className="flex-none w-full h-full relative">
            <Image
              src={car3}
              alt="Imagen 3"
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Vista Desktop sin cambios */}
      <div className="hidden md:flex justify-between w-[100%] gap-4 my-4 px-4">
        <div className="flex-grow h-[300px] w-[20%] relative">
          <Image
            src={car1}
            alt="Imagen 1"
            layout="fill"
            className="object-cover object-top"
          />
        </div>
        <div className="flex-grow h-[300px] w-[20%] relative">
          <Image
            src={car2}
            alt="Imagen 2"
            layout="fill"
            className="object-cover"
          />
        </div>
        <div className="flex-grow h-[300px] w-[20%] relative">
          <Image
            src={car3}
            alt="Imagen 3"
            layout="fill"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Consignaciones;
