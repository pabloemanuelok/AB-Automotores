"use client"; 

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const autosDestacados = [
  { id: 1, name: "Volkswagen Nivus", image: "/source/NivusFrente.webp", link: "https://automotoresab.netlify.app/views/details/672e7710781c010ab663e397" },
  { id: 2, name: "Peugeot 2008", image: "/source/2008Frente.webp", link: "https://automotoresab.netlify.app/views/details/672d2873bbb61b9150c2c32a" },
  { id: 3, name: "Chevrolet Tracker", image: "/source/TrackerFrente.webp", link: "https://automotoresab.netlify.app/views/details/672be43d9032a5452b332251" },
  { id: 4, name: "Chevrolet S10 Z71", image: "/source/S10Frente.webp", link: "https://automotoresab.netlify.app/views/details/672d119b7ddb5bea93b30916" },
  { id: 5, name: "Toyota Hilux", image: "/source/HiluxFrente.webp", link: "/details/5" },
  { id: 6, name: "Ford Mondeo", image: "/source/MondeoFrente.webp", link: "https://automotoresab.netlify.app/views/details/672d1f9bc80004605ddffb50" },
];

const CarruselDestacados = () => {
  return (
    <section className="bg-black w-full mb-4 mx-4 p-4">
      <Swiper
        modules={[Navigation]}
        navigation
        loop
        slidesPerView={3}
        spaceBetween={20}
        breakpoints={{
          0: {
            slidesPerView: 1, // En móviles
            spaceBetween: 10, // Reducir espacio entre tarjetas en móviles
          },
          768: {
            slidesPerView: 2, // En tablets
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3, // En escritorio
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 4, // En pantallas más grandes
            spaceBetween: 30,
          },
        }}
        className="relative"
      >
        {autosDestacados.map((auto) => (
          <SwiperSlide key={auto.id}>
            <div className="relative flex-shrink-0 overflow-hidden bg-gray-800 shadow-lg cursor-pointer ">
              <Link href={auto.link} passHref>
                <div className="relative w-full h-64 md:h-80 hover:scale-110 flex justify-center items-center transition-transform duration-300">
                  <Image
                    src={auto.image}
                    alt={auto.name}
                    layout="responsive"
                    width={1000} // Asegúrate de que las imágenes sean lo suficientemente grandes
                    height={500}
                    objectFit="cover"
                    className="rounded-lg"
                    priority
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-base font-semibold text-white">{auto.name}</h3>
                  <p className="text-sm text-gray-200">+ Información</p>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CarruselDestacados;
