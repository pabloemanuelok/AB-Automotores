"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { IDetailsProps } from "@/Interfaces/Interface";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Detail: React.FC<IDetailsProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  // Lógica de imágenes anteriores y siguientes
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  // Ajuste automático de tamaño de textarea
  useEffect(() => {
    const adjustTextAreaHeight = () => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto"; // Resetea la altura
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Ajusta la altura según el contenido
      }
    };

    adjustTextAreaHeight(); // Ajusta la altura inicialmente
  }, [product.description]); // Solo se ejecuta cuando cambia la descripción

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <main className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row bg-[#333333] p-4 shadow-lg">
        
        {/* Contenedor de imagen */}
        <div className="relative w-full lg:w-1/2 h-[500px] bg-[#1B1B1B] overflow-hidden flex items-center justify-center mb-4 lg:mb-0">
          {product.images.length > 0 ? (
            <div className="relative w-full h-full">
              {/* Imagen actual con prioridad */}
              <Image
                src={product.images[currentImageIndex]}
                alt={`Imagen de ${product.name}`}
                layout="fill"
                objectFit="cover"
                priority // Carga rápida de la imagen principal
                quality={75} // Ajusta la calidad de la imagen
              />

              {/* Cargar imagen siguiente sin lazy loading */}
              {product.images[currentImageIndex + 1] && (
                <Image
                  src={product.images[currentImageIndex + 1]}
                  alt="Imagen siguiente"
                  layout="fill"
                  objectFit="contain"
                  className="hidden"
                  priority // Esto asegura que se cargue de inmediato
                  quality={75}
                />
              )}
              
              {/* Cargar imagen anterior sin lazy loading */}
              {product.images[currentImageIndex - 1] && (
                <Image
                  src={product.images[currentImageIndex - 1]}
                  alt="Imagen anterior"
                  layout="fill"
                  objectFit="contain"
                  className="hidden"
                  priority // Esto asegura que se cargue de inmediato
                  quality={75}
                />
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-600 text-white">
              <span>No hay imágenes disponibles</span>
            </div>
          )}
          <button
            onClick={handlePrevImage}
            aria-label="Imagen anterior"
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white p-2 hover:bg-gray-600"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={handleNextImage}
            aria-label="Siguiente imagen"
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white p-2 hover:bg-gray-600"
          >
            <FaChevronRight size={24} />
          </button>
        </div>

        {/* Contenedor de detalles */}
        <div className="flex flex-col gap-3 w-full lg:w-1/2 text-white pl-4 bg-[#333333]">
          <h2 className="text-2xl sm:text-3xl font-semibold text-black bg-[#D9D9D9] py-2 px-4 ">
            {product.name}
          </h2>
          <p className="text-lg sm:text-xl font-light">{product.version}</p>
          <p className="bg-[#B62E30] text-white w-fit px-4 py-1 text-xl sm:text-2xl font-semibold">
            {product.year}
          </p>
          <div className="w-full  flex flex-col ">
          <div className="mt-6 w-full">
            <textarea
              ref={textAreaRef}
              value={product.description}
              readOnly
              className="w-full text-white bg-[#333333] placeholder:text-neutral-500 focus:outline-none focus:bg-[#222222] focus:text-white resize-none overflow-auto lg:max-h-none"
            />
          </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Detail;
