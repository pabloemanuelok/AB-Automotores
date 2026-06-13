"use client";

import React from "react";
import { motion } from "framer-motion";

const SobreNosotros: React.FC = () => {
  return (
    <section className="bg-[#0a0a0a] py-10 md:py-20">
      <div className="page-container flex flex-col md:flex-row items-stretch gap-8 md:gap-12">

        {/* Grid 3x2 de fotos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full md:w-[50%] shrink-0 rounded-xl overflow-hidden grid grid-cols-2 md:grid-cols-3 gap-2 h-[250px] md:h-auto bg-[#0a0a0a]"
        >
          <div className="relative overflow-hidden">
            <video
              src="/videoBasaltSN.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="relative overflow-hidden">
            <video
              src="/videoRenegadeSN.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="relative overflow-hidden hidden md:block">
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

        {/* Texto descriptivo */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full md:flex-1 flex flex-col text-center md:text-left md:pl-4 lg:pl-8"
        >
          <p className="text-[#B62E30] font-semibold text-sm md:text-base tracking-wide uppercase">
            Compraventa de vehículos seleccionados
          </p>

          <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white">
            Sobre Nosotros
          </h2>
          <div className="mt-2 w-12 h-[3px] bg-[#B62E30] rounded-full mx-auto md:mx-0" />

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

      </div>
    </section>
  );
};

export default SobreNosotros;
