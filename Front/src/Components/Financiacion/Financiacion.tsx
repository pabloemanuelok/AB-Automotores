"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { trackEvent } from "@/utils/analytics";

const infoBlocks: { title: string; text: string }[] = [
  {
    title: "Si no llegás con el efectivo, ¡podés financiarlo!",
    text: "Trabajamos con las mejores líneas de créditos, prendarios y personales, con demostración de ingresos o solo con DNI. Todos nuestros créditos son con entrega inmediata.",
  },
  {
    title: "Distintas entidades financieras",
    text: "Financiamos a través de distintas entidades bancarias como Banco de Córdoba, Banco Nación, Banco Supervielle y Banco Galicia. También recibimos tarjetas de crédito.",
  },
  {
    title: "¿Querés averiguar tu crédito disponible?",
    text: "Podés financiar hasta un 100% del vehículo que elijas. Contáctanos para brindarte toda la información y ayudarte a financiar tu próximo auto.",
  },
];

const Financiacion = () => {
  useEffect(() => { trackEvent("financiacion"); }, []);

  return (
    <div className="bg-[#0a0a0a]">
      <section className="py-10 md:py-20">
        <div className="page-container flex flex-col md:flex-row items-stretch gap-8 md:gap-12">

          {/* Placeholder de video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full md:w-1/3 shrink-0 rounded-xl overflow-hidden border border-[#2a2a2a] bg-[#1a1a1a] min-h-[220px] flex flex-col items-center justify-center gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#505050]"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
            <p className="text-[#505050] text-sm">Video próximamente</p>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full md:flex-1 flex flex-col text-center md:text-left"
          >
            <p className="text-[#B62E30] font-semibold text-sm md:text-base tracking-widest uppercase">
              Opciones flexibles
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white">
              Financiá tu próximo auto
            </h2>
            <div className="mt-2 w-12 h-[3px] bg-[#B62E30] rounded-full mx-auto md:mx-0" />

            <div className="mt-6 flex flex-col gap-6">
              {infoBlocks.map((block, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                >
                  <h3 className="text-white font-bold text-lg md:text-xl mb-1">{block.title}</h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">{block.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Banner CTA */}
      <section className="bg-[#1E1E1E] border-t border-[#2a2a2a] py-14">
        <div className="page-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-[#B62E30] text-sm font-semibold tracking-widest uppercase mb-2">
              Consultá sin compromiso
            </p>
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
              ¿Querés conocer tu crédito disponible?
            </h2>
            <p className="text-white/60 max-w-md mx-auto text-sm md:text-base">
              Contactanos y te asesoramos para encontrar la mejor opción de financiamiento para vos.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Financiacion;
