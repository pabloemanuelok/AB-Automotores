"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import car1 from "@/Assets/2008Frente.webp";
import car2 from "@/Assets/2008Frente.webp";
import car3 from "@/Assets/2008Frente.webp";

const Consignaciones = () => {
  return (
    <div className="my-4 flex items-center justify-center md:px-4">
      <div className="w-[83%] p-6 rounded-lg shadow-2xl bg-white">
        {/* Sección de texto con animación */}
        <div className="lg:flex lg:justify-between gap-8 animate-fade-in">
          {/* Sección de logos */}
          <div className="flex-1 mb-6 lg:mb-0">
            <div className="border-l-4 border-red-500 pl-4 mb-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                ¿Querés vender tu auto?
              </h2>
              <p className="text-gray-600">
                Si necesitas vender tu auto de manera inmediata, te lo tasamos y
                te lo pagamos de contado, nos encargamos de todos los trámites de
                gestoría y te aseguramos la transferencia.
              </p>
            </div>

            {/* Sección de información adicional */}
            <div className="border-l-4 border-red-500 pl-4 mt-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Compra directa
              </h2>
              <p className="text-gray-600">
                Te gestionamos la venta, dejá tu auto en nuestra agencia, lo
                publicamos en todos los portales de venta online y buscamos
                comprador.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4 mt-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Consignaciones
              </h2>
              <p className="text-gray-600">
                Una vez concretada la operación nos encargamos de todos los trámites
                de gestoría y te lo pagamos de contado.
              </p>
            </div>
          </div>

          {/* Imagen de consignaciones */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full md:w-[60%] h-64 lg:h-80 rounded-md overflow-hidden shadow-md">
              <Image
                src="/source/Negociacion.webp" // Ruta desde la carpeta public
                alt="Imagen representativa de consignaciones"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Carrusel para Mobile y Desktop */}
      <div className=" md:mx-4 my-4">
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
