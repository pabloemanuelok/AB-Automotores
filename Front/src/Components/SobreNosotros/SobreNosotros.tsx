"use client";

import React from "react";
import { motion } from "framer-motion";

const SobreNosotros: React.FC = () => {
  return (
    <section className="bg-[#0a0a0a] py-6 md:py-12">
      <div className="page-container flex flex-col gap-8 md:gap-12">

        {/* Texto descriptivo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full flex flex-col items-center text-center"
        >
          <p className="text-[#B62E30] font-semibold text-sm md:text-base tracking-wide uppercase">
            Compraventa de vehículos seleccionados
          </p>

          <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white">
            Sobre Nosotros
          </h2>
          <div className="mt-2 w-12 h-[3px] bg-[#B62E30] rounded-full mx-auto" />

          <p className="mt-4 text-white/70 text-sm md:text-base leading-relaxed">
            Nos mueve el compromiso con nuestros clientes: brindamos asesoramiento honesto,
            financiación accesible, gestoría completa y la mejor experiencia de compra.
            Porque para nosotros, cada venta es el inicio de una relación de confianza.
          </p>

          <p className="mt-3 text-white/70 text-sm md:text-base leading-relaxed">
            Ubicados en Córdoba, atendemos a compradores y vendedores de toda la región.
            Permutas, consignaciones y entrega inmediata son parte de nuestro servicio integral.
          </p>
        </motion.div>

        {/* Grid de videos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4"
        >
          <div className="relative h-[420px] md:h-[560px] overflow-hidden rounded-xl sm:rounded-r-none">
            <video
              src="/videoBasaltSN.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="relative h-[420px] md:h-[560px] overflow-hidden rounded-xl sm:rounded-none">
            <video
              src="/videoRenegadeSN.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="relative h-[420px] md:h-[560px] overflow-hidden rounded-xl sm:rounded-l-none">
            <video
              src="/videoVerticalSN.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SobreNosotros;
