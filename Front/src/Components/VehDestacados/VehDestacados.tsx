"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const autosDestacados = [
  { id: 1, name: "Volkswagen Nivus", image: "/source/NivusFrente.webp", link: "/details/1" },
  { id: 2, name: "Peugeot 2008", image: "/source/2008Frente.webp", link: "/details/2" },
  { id: 3, name: "Chevrolet Tracker", image: "/source/TrackerFrente.webp", link: "/details/3" },
  { id: 4, name: "Chevrolet S10 Z71", image: "/source/S10Frente.webp", link: "/details/4" },
  { id: 5, name: "Toyota Hilux", image: "/source/HiluxFrente.webp", link: "/details/5" },
  { id: 6, name: "Tesla Model S", image: "/source/NivusFrente.webp", link: "/details/6" },
];

const CarruselDestacados = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Efecto para mover el carrusel automáticamente

  const handlePrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 320; // Desplazamiento a la izquierda
    }
  };

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 320; // Desplazamiento a la derecha
    }
  };

  return (
    <section className="bg-black m-4 p-4">
      <div className="relative pb-4">
        {/* Contenedor principal sin barra de desplazamiento y sin animación */}
        <div
          ref={containerRef}
          className="flex gap-8 overflow-x-hidden"
          style={{
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory',
            scrollPadding: '0px', // Evitar el desplazamiento vertical
          }}
        >
          {autosDestacados.map((auto) => (
            <div
              key={auto.id}
              className="relative flex-shrink-0 w-[300px] h-[250px] sm:w-[350px] sm:h-[280px] md:w-[400px] md:h-[320px] rounded-xl overflow-hidden bg-gray-800 shadow-lg cursor-pointer"
            >
              <Link href={auto.link} passHref>
                <div className="relative w-full h-full hover:scale-110">
                  <Image
                    src={auto.image}
                    alt={auto.name}
                    layout="fill"
                    objectFit="cover"
                    className=""
                    priority
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-100">
                  <h3 className="text-xl font-semibold text-white">{auto.name}</h3>
                  <p className="text-sm text-gray-200">Descubre más sobre este modelo</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Flechas para navegación */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-300 transition-all"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-300 transition-all"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default CarruselDestacados;
