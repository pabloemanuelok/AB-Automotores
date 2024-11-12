"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Asegúrate de tener instalada la librería react-icons
import image1 from "@/Assets/MondeoFrenteDetalle.webp";
import image2 from "@/Assets/MondeoFrenteDetalle.webp";
import image3 from "@/Assets/MondeoFrenteDetalle.webp";

const Section7 = () => {
  const scrollRef = useRef<HTMLDivElement>(null); // Crea una referencia para el contenedor de imágenes

  // Función para desplazarse a la imagen anterior
  const handlePrevImage = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  // Función para desplazarse a la imagen siguiente
  const handleNextImage = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Vista de escritorio */}
      <div className="hidden md:flex justify-between gap-4 px-4 my-4">
        <div className="w-1/3 h-[300px] relative">
          <Image
            src={image1}
            alt="Interior del vehículo 1"
            width={600}
            height={300}
            className="object-cover w-full h-[300px]"
            priority
          />
        </div>
        <div className="w-1/3 h-[300px] relative">
          <Image
            src={image2}
            alt="Interior del vehículo 2"
            width={600}
            height={300}
            className="object-cover w-full h-[300px]"
            priority
          />
        </div>
        <div className="w-1/3 h-[300px] relative">
          <Image
            src={image3}
            alt="Interior del vehículo 3"
            width={600}
            height={300}
            className="object-cover w-full h-[300px]"
            priority
          />
        </div>
      </div>

      {/* Vista móvil con carrusel */}
      <div className="md:hidden relative mt-4">
        {/* Botones de navegación */}
        <button
          onClick={handlePrevImage} // Usa la función para desplazarse a la izquierda
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-600 z-10"
        >
          <FaChevronLeft size={24} />
        </button>
        <button
          onClick={handleNextImage} // Usa la función para desplazarse a la derecha
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-600 z-10"
        >
          <FaChevronRight size={24} />
        </button>

        {/* Contenedor de imágenes deslizables */}
        <div className="flex overflow-x-auto h-[300px] transition-transform ease-in-out" ref={scrollRef}>
          {/* Imagen 1 */}
          <div className="flex-none w-screen h-full relative">
            <Image
              src={image1}
              alt="Interior del vehículo 1"
              width={600}
              height={300}
              className="object-cover w-full h-[300px]"
            />
          </div>
          {/* Imagen 2 */}
          <div className="flex-none w-screen h-full relative">
            <Image
              src={image2}
              alt="Interior del vehículo 2"
              width={600}
              height={300}
              className="object-cover w-full h-[300px]"
            />
          </div>
          {/* Imagen 3 */}
          <div className="flex-none w-screen h-full relative">
            <Image
              src={image3}
              alt="Interior del vehículo 3"
              width={600}
              height={300}
              className="object-cover w-full h-[300px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section7;
