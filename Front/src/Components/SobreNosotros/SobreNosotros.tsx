"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import frenteHilux from "@/Assets/frenteHilux.jpeg";

const SobreNosotros: React.FC = () => {
  return (
    <section className="bg-[#0a0a0a] py-10 md:py-20">
      <div className="page-container flex flex-col md:flex-row items-start gap-8 md:gap-12">

        {/* Foto grande */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full md:w-2/5 lg:w-1/3 shrink-0 aspect-square rounded-xl overflow-hidden"
        >
          <Image
            src={frenteHilux}
            alt="Frente Hilux"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>

        {/* Texto descriptivo */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full md:flex-1 flex flex-col text-center md:text-left md:pl-4 lg:pl-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Sobre Nosotros
          </h2>
          <div className="mt-2 w-12 h-[3px] bg-[#B62E30] rounded-full mx-auto md:mx-0" />

          <p className="mt-4 text-[#B62E30] font-semibold text-sm md:text-base tracking-wide uppercase">
            Más de 23 años en el mercado automotor
          </p>

          <p className="mt-4 text-white/80 text-sm md:text-base leading-relaxed">
            En AB Automotores nos especializamos en la compraventa de vehículos seleccionados,
            con más de dos décadas de trayectoria en el sector. Cada auto que ofrecemos pasa
            por un riguroso proceso de revisión para garantizarte calidad y tranquilidad.
          </p>

          <p className="mt-3 text-white/70 text-sm md:text-base leading-relaxed">
            Nos mueve el compromiso con nuestros clientes: brindamos asesoramiento honesto,
            financiación accesible, gestoría completa y la mejor experiencia de compra.
            Porque para nosotros, cada venta es el inicio de una relación de confianza.
          </p>

          <p className="mt-3 text-white/70 text-sm md:text-base leading-relaxed">
            Ubicados en Córdoba, atendemos a compradores y vendedores de toda la región.
            Permutas, consignaciones y entrega inmediata son parte de nuestro servicio integral.
          </p>

          <div className="mt-6 flex items-center gap-3 justify-center md:justify-start">
            <div className="w-1 h-10 bg-[#B62E30] rounded-full" />
            <p className="text-white/60 text-xs md:text-sm leading-snug italic">
              &ldquo;Calidad, confianza y transparencia<br />en cada operación.&rdquo;
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SobreNosotros;
