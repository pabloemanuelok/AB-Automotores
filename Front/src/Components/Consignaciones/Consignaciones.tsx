"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import logo1 from "@/Assets/tasacion.png";
import logo2 from "@/Assets/pagoinstantaneo.png";
import logo3 from "@/Assets/vendeSeguro.png";
import logo4 from "@/Assets/gestoria.png";
import logo5 from "@/Assets/evitaEstafas.png";
import car1 from "@/Assets/2008Frente.webp";
import car2 from "@/Assets/2008Frente.webp";
import car3 from "@/Assets/2008Frente.webp";

const Consignaciones = () => {
  return (
    <div className="relative w-full">
      {/* Contenedor con líneas rojas y borde */}
      <div className="flex flex-col items-center px-0 md:px-4 lg:px-4 mb-8 ">
        {/* Sección de logos */}
        <div className="bg-white w-[92%] flex flex-col md:flex-row items-center justify-center mb-6 py-6 shadow-lg border-t-2 border-red-500">
          <div className="w-full md:w-[47%] text-center md:text-start mb-4 md:mb-0">
            <h2 className="text-primary text-3xl md:text-4xl font-extrabold">
              ¿Querés vender tu auto?
            </h2>
          </div>
          <div className="flex justify-around gap-2 md:gap-4 w-[90%] md:w-[45%]">
            {[logo1, logo2, logo3, logo4, logo5].map((logo, index) => (
              <div
                key={index}
                className="flex flex-col items-center h-24 max-w-[120px] transition-transform hover:scale-105"
              >
                <div className="flex items-center justify-center h-12 mb-1">
                  <Image
                    src={logo}
                    alt={`Logo ${index + 1}`}
                    width={150}
                    height={150}
                    className="object-contain h-[40px]"
                    priority={index < 2}
                  />
                </div>
                <span className="text-secondary font-medium text-center text-xs md:text-sm leading-tight">
                  {
                    [
                      "Tasación en el acto",
                      "Cobro instantáneo",
                      "Vendé seguro",
                      "Gestoría propia",
                      "Evitá estafas",
                    ][index]
                  }
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de información adicional */}
        <div className="flex flex-col mb-6 md:mx-6 items-center justify-center gap-6 w-[87%]">
          <div className="flex flex-col md:flex-row w-[90%] md:w-[96%] items-center md:gap-10">
            <h3 className="text-primary md:w-[50%] text-2xl md:text-3xl font-bold border-l-4 border-red-500 pl-3">
              Compra directa
            </h3>
            <p className="text-secondary w-[90%] md:w-[49%] text-center md:text-start text-base md:text-lg font-medium">
              Si necesitas vender tu auto de manera inmediata, te lo tasamos y
              te lo pagamos de contado, nos encargamos de todos los trámites de
              gestoría y te aseguramos la transferencia.
            </p>
          </div>

          <div className="flex flex-col md:flex-row w-full md:w-[96%] items-center justify-center md:gap-10">
            <h3 className="text-primary md:w-[50%] text-2xl md:text-3xl font-bold border-l-4 border-red-500 pl-3">
              Consignaciones
            </h3>
            <p className="text-secondary  w-[90%] md:w-[49%] text-center md:text-start text-base md:text-lg font-medium">
              Te gestionamos la venta, dejá tu auto en nuestra agencia, lo
              publicamos en todos los portales de venta online y buscamos
              comprador. Una vez concretada la operación nos encargamos de todos
              los trámites de gestoría y te lo pagamos de contado.
            </p>
          </div>
        </div>
      </div>

      {/* Carrusel para Mobile y Desktop */}
      <div className=" md:mx-4 my-4 ">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          className="shadow-md"
        >
          {[car1, car2, car3].map((car, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[300px]">
                <Image
                  src={car}
                  alt={`Imagen ${index + 1}`}
                  layout="fill"
                  className="object-cover object-top"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Consignaciones;
