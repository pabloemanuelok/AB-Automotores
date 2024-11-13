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
    <div className="relative w-full h-[300px] mt-4 md:mt-0 bg-gray-200">
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        onLoadingComplete={handleLoadingComplete}
        className={`transition-opacity duration-500 ease-in-out ${isLoading ? "opacity-0" : "opacity-100"}`}
      />
    </div>
  );
};

const ImageGallery: React.FC = () => {
  return (
    <div className="md:m-4">
      <Swiper
        spaceBetween={10} // Espacio entre las imágenes
        slidesPerView={"auto"} // Muestra tantas imágenes como sea posible en el ancho de la pantalla
        loop={true} // Habilita el loop del carrusel
        autoplay={{ delay: 3000 }} // Autoplay con 3 segundos
        breakpoints={{
          // Asegura que en pantallas pequeñas se vea bien el carrusel
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
        {["/source/NivusFrente.webp", "/source/NivusInterior.webp", "/source/NivusDerecha.webp"].map((src, index) => (
          <SwiperSlide key={index}>
            <ImageWithPlaceholder src={src} alt={`Image ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageGallery;
