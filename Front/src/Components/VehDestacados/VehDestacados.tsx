"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";

const autosDestacados = [
  { id: 1, name: "Volkswagen Nivus", image: "/source/NivusFrente.webp", link: "https://ab-automotores.vercel.app/views/details/6761b3da7c18494e3a625bc8" },
  { id: 2, name: "Peugeot 2008", image: "/source/2008Frente.webp", link: "https://ab-automotores.vercel.app/views/details/6761b28e7c18494e3a625bbb" },
  { id: 3, name: "Chevrolet Tracker", image: "/source/TrackerFrente.webp", link: "https://ab-automotores.vercel.app/views/details/6761af537c18494e3a625b98" },
  { id: 4, name: "Chevrolet S10 Z71", image: "/source/S10Frente.webp", link: "https://ab-automotores.vercel.app/views/details/6761b0aa7c18494e3a625ba5" },
  { id: 5, name: "Toyota Hilux", image: "/source/HiluxFrente.webp", link: "https://ab-automotores.vercel.app/views/details/6761b3257c18494e3a625bc1" },
  { id: 6, name: "Volkswagen Taos", image: "/source/TaosFrente.webp", link: "https://automotoresab.netlify.app/views/details/672d1f9bc80004605ddffb50" },
];

const VehDestacados = () => {
  return (
    <section className="bg-[#0a0a0a] py-12 md:py-16">
      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="page-container mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Vehículos Destacados
        </h2>
        <div className="mt-2 w-12 h-[3px] bg-[#B62E30] rounded-full" />
        <p className="mt-3 text-gray-400 text-sm md:text-base">
          Una selección de los mejores autos disponibles en nuestra agencia.
        </p>
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="page-container"
      >
        <Swiper
          modules={[Navigation]}
          navigation
          loop
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 12 },
            768: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1440: { slidesPerView: 4, spaceBetween: 24 },
          }}
        >
          {autosDestacados.map((auto, index) => (
            <SwiperSlide key={auto.id}>
              <Link href={auto.link} passHref>
                <div className="relative overflow-hidden rounded-xl bg-gray-900 shadow-lg group cursor-pointer">
                  <div className="relative w-full h-52 md:h-64">
                    <Image
                      src={auto.image}
                      alt={auto.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={index === 0}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                    <h3 className="text-base md:text-lg font-semibold text-white">{auto.name}</h3>
                    <p className="text-sm text-red-400 font-medium mt-0.5">Ver información →</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default VehDestacados;
