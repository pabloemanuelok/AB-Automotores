"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Asegúrate de tener instalada la librería react-icons
import image3 from "@/Assets/NivusDerecha.jpeg";
import image2 from "@/Assets/NivusInterior.jpeg";
import image1 from "@/Assets/NivusFrente.jpeg";

const Section1 = () => {
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
      <div className="hidden md:flex justify-between w-[100%] gap-4 px-4 my-4">
        <div className="w-1/3 h-[300px] relative">
          <Image
            src={image1}
            alt="Image 1"
            layout="fill"
            className="object-cover" // Ajuste de posición
          />
        </div>
        <div className="w-1/3 h-[300px] relative">
          <Image
            src={image2}
            alt="Image 2"
            layout="fill"
            className="object-cover object-[50%_55%]"
          />
        </div>
        <div className="w-1/3 h-[300px] relative">
          <Image
            src={image3}
            alt="Image 3"
            layout="fill"
            className="object-cover"
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
        <div className="flex overflow-x-auto h-[300px]" ref={scrollRef}>
          {/* Imagen 1 */}
          <div className="flex-none w-screen h-full relative">
            <Image
              src={image1}
              alt="Image 1"
              layout="fill"
              className="object-cover" // Ajuste de posición
            />
          </div>
          {/* Imagen 2 */}
          <div className="flex-none w-screen h-full relative">
            <Image
              src={image2}
              alt="Image 2"
              layout="fill"
              className="object-cover"
            />
          </div>
          {/* Imagen 3 */}
          <div className="flex-none w-screen h-full relative">
            <Image
              src={image3}
              alt="Image 3"
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
