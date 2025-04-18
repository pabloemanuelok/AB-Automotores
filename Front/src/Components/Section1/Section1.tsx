"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Estilos básicos de Swiper

interface ImageWithPlaceholderProps {
  src: string;
  alt: string;
}

const ImageWithPlaceholder: React.FC<ImageWithPlaceholderProps> = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si la imagen ya se ha cargado en el pasado
    if (sessionStorage.getItem(src)) {
      setIsLoading(false);
    }
  }, [src]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem(src, "loaded"); // Guardar en sessionStorage que la imagen ha cargado
  };

  return (
    <div className="relative w-full h-[600px] bg-gray-200">
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        onLoadingComplete={handleLoadingComplete}
        className={`transition-opacity duration-500 ease-in-out ${isLoading ? "opacity-0" : "opacity-100"}`}
        priority={true} // Prioriza la carga de esta imagen (si es una imagen crítica)
      />
    </div>
  );
};

const ImageGallery: React.FC = () => {
  return (
    <div className="mt-1 md:m-4">
      <Swiper
        spaceBetween={16} // Espacio entre las imágenes
        slidesPerView={"auto"} // Muestra tantas imágenes como sea posible en el ancho de la pantalla
        loop={true} // Habilita el loop del carrusel
        autoplay={{ delay: 3000 }} // Autoplay con 3 segundos
        breakpoints={{
          640: {
            slidesPerView: 1, // En pantallas pequeñas una sola imagen a la vez
          },
          1024: {
            slidesPerView: 2, // En pantallas medianas, dos imágenes a la vez
          },
          1280: {
            slidesPerView: 3, // En pantallas grandes, tres imágenes a la vez
          },
        }}
      >
        {["/source/SaveiroCola.webp", "/source/SaveiroCaja.webp", "/source/SaveiroDiag.webp"].map((src, index) => (
          <SwiperSlide key={index}>
            <ImageWithPlaceholder src={src} alt={`Image ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageGallery;
