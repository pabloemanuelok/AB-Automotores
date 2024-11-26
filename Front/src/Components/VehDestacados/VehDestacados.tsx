"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const autosDestacados = [
  { id: 1, name: "Volkswagen Nivus", image: "/source/NivusFrente.webp", link: "https://automotoresab.netlify.app/views/details/672e7710781c010ab663e397" },
  { id: 2, name: "Peugeot 2008", image: "/source/2008Frente.webp", link: "https://automotoresab.netlify.app/views/details/672d2873bbb61b9150c2c32a" },
  { id: 3, name: "Chevrolet Tracker", image: "/source/TrackerFrente.webp", link: "https://automotoresab.netlify.app/views/details/672be43d9032a5452b332251" },
  { id: 4, name: "Chevrolet S10 Z71", image: "/source/S10Frente.webp", link: "https://automotoresab.netlify.app/views/details/672d119b7ddb5bea93b30916" },
  { id: 5, name: "Toyota Hilux", image: "/source/HiluxFrente.webp", link: "/details/5" },
  { id: 6, name: "Ford Mondeo", image: "/source/MondeoFrente.webp", link: "https://automotoresab.netlify.app/views/details/672d1f9bc80004605ddffb50" },
];

const CarruselDestacados = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= containerRef.current.offsetWidth; // Desplazamiento a la izquierda
    }
  };

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += containerRef.current.offsetWidth; // Desplazamiento a la derecha
    }
  };

  return (
    <section className="bg-black bg-opacity-0 px-4 md:m-4 p-4">
      <div className="relative pb-4">
        {/* Contenedor principal sin barra de desplazamiento visible */}
        <div
          ref={containerRef}
          className="flex gap-4 md:gap-8 overflow-hidden snap-x snap-mandatory"
          style={{
            scrollBehavior: 'smooth',
          }}
        >
          {autosDestacados.map((auto) => (
            <div
              key={auto.id}
              className="relative flex-shrink-0 w-full h-[250px] rounded-2xl sm:w-[350px] sm:h-[280px] md:w-[400px] md:h-[320px] lg:w-[400px] lg:h-[320px]  overflow-hidden bg-gray-800 shadow-lg cursor-pointer snap-start"
            >
              <Link href={auto.link} passHref>
                <div className="relative w-full h-full hover:scale-110 flex justify-center items-center ">
                  <Image
                    src={auto.image}
                    alt={auto.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 rounded-2xl"
                    priority
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-100">
                  <h3 className="text-base font-semibold text-white">Destacados: {auto.name}</h3>
                  <p className="text-sm text-gray-200"> + Informacion</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Flechas para navegación */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 text-white transform -translate-y-1/2 z-10 bg-opacity-40 bg-black p-3 rounded-full shadow-lg over:bg-white hover:text-black hover:opacity-40 transition-all"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4  text-white transform -translate-y-1/2 z-10 bg-opacity-40 bg-black p-3 rounded-full shadow-lg hover:bg-white hover:text-black hover:opacity-40 transition-all"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default CarruselDestacados;
