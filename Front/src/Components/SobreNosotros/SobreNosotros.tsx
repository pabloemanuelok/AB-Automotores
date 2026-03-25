"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const photos = [
  { src: "/source/VolanteTaos.webp", alt: "Volante Taos" },
  { src: "/source/EspejoHilux.webp", alt: "Espejo Hilux" },
  { src: "/source/ManijaYaris.webp", alt: "Manija Yaris" },
  { src: "/source/AsientosToro.webp", alt: "Asientos Toro" },
];

const SobreNosotros: React.FC = () => {
  return (
    <section className="bg-[#0a0a0a] py-16 md:py-20">
      <div className="page-container flex flex-col md:flex-row items-center gap-12">

        {/* Izquierda — Grid de fotos */}
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-3">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className="relative aspect-square rounded-xl overflow-hidden group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Derecha — Texto descriptivo */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full md:w-1/2 flex flex-col"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Sobre Nosotros
          </h2>
          <div className="mt-2 w-12 h-[3px] bg-[#B62E30] rounded-full" />

          <p className="mt-4 text-[#B62E30] font-semibold text-sm md:text-base tracking-wide uppercase">
            Más de 23 años en el mercado automotor
          </p>

          <p className="mt-4 text-white/80 text-sm md:text-base leading-relaxed">
            En AB Automotores nos especializamos en la compraventa de vehículos seleccionados,
            con más de dos décadas de trayectoria en el sector. Cada auto que ofrecemos pasa
            por un riguroso proceso de revisión para garantizarte calidad y tranquilidad.
          </p>

          <p className="mt-4 text-white/70 text-sm md:text-base leading-relaxed">
            Nos mueve el compromiso con nuestros clientes: brindamos asesoramiento honesto,
            financiación accesible, gestoría completa y la mejor experiencia de compra.
            Porque para nosotros, cada venta es el inicio de una relación de confianza.
          </p>

          <p className="mt-4 text-white/70 text-sm md:text-base leading-relaxed">
            Ubicados en Córdoba, atendemos a compradores y vendedores de toda la región.
            Permutas, consignaciones y entrega inmediata son parte de nuestro servicio integral.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div className="w-1 h-12 bg-[#B62E30] rounded-full" />
            <p className="text-white/60 text-xs md:text-sm leading-snug italic">
              "Calidad, confianza y transparencia<br />en cada operación."
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SobreNosotros;
