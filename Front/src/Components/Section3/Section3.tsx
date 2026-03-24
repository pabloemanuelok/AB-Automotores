"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const services = [
  { src: "/source/VehiculosSeleccionados.webp", label: "Vehículos\nSeleccionados" },
  { src: "/source/Financiacion.webp", label: "Financiación" },
  { src: "/source/Gestoria.webp", label: "Gestoría" },
  { src: "/source/EntregaInmediata.webp", label: "Entrega\nInmediata" },
  { src: "/source/Permutas.webp", label: "Permutas" },
];

const Section3: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="page-container">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Nuestros Servicios
          </h2>
          <div className="mt-2 mx-auto w-12 h-[3px] bg-[#B62E30] rounded-full" />
          <p className="mt-4 text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Vehículos seleccionados, entrega inmediata, líneas de crédito accesibles, compras, permutas y gestoría completa.
          </p>
        </motion.div>

        {/* Íconos de servicios */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
              className="flex flex-col items-center gap-3 group cursor-default"
            >
              <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={service.src}
                  alt={service.label}
                  width={96}
                  height={96}
                  className="object-contain"
                  priority={index === 0}
                  quality={80}
                />
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-700 text-center leading-tight whitespace-pre-line">
                {service.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section3;
