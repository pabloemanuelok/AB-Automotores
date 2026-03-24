"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const banks = ["Bco. Córdoba", "Santander", "Supervielle", "HSBC", "Tarjetas de crédito"];

const infoBlocks = [
  {
    title: "Si no llegás con el efectivo, ¡podés financiarlo!",
    text: "Trabajamos con las mejores líneas de créditos, prendarios y personales, con demostración de ingresos o solo con DNI. Todos nuestros créditos son con entrega inmediata.",
  },
  {
    title: "Distintas entidades financieras",
    text: "Financiamos a través de distintas entidades bancarias como Banco de Córdoba, Banco Santander, Banco Supervielle y Banco HSBC. También recibimos tarjetas de crédito.",
    pills: banks,
  },
  {
    title: "¿Querés averiguar tu crédito disponible?",
    text: "Podés financiar hasta un 100% del vehículo que elijas. Contáctanos para brindarte toda la información y ayudarte a financiar tu próximo auto.",
  },
];

const vehicles = [
  { src: "/source/TCrossCostado.webp", alt: "Volkswagen T-Cross", delay: 0 },
  { src: "/source/TiguanCostado.webp", alt: "Volkswagen Tiguan", delay: 0.15 },
  { src: "/source/NivusCostado.webp", alt: "Volkswagen Nivus", delay: 0.3 },
];

const Financiacion = () => {
  return (
    <div className="bg-[#0a0a0a]">
      {/* Sección principal */}
      <section className="py-16">
        <div className="page-container">
          <div className="lg:flex items-center gap-12">

            {/* Columna de vehículos */}
            <div className="hidden md:block lg:w-[22%] flex-shrink-0">
              <div className="space-y-[-30px]">
                {vehicles.map((vehicle) => (
                  <motion.img
                    key={vehicle.src}
                    src={vehicle.src}
                    alt={vehicle.alt}
                    className="w-full h-auto object-contain drop-shadow-[0_4px_20px_rgba(182,46,48,0.3)]"
                    initial={{ x: -220, filter: "blur(8px)", opacity: 0, scaleX: -1 }}
                    whileInView={{ x: 0, filter: "blur(0px)", opacity: 1, scaleX: -1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 40, delay: vehicle.delay }}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            {/* Columna de texto — entra desde la izquierda como si la trajeran los autos */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              >
                <p className="text-[#B62E30] text-sm font-semibold tracking-widest uppercase mb-2">
                  Opciones flexibles
                </p>
                <h2 className="text-white text-3xl md:text-4xl font-bold">
                  Financiá tu próximo auto
                </h2>
                <div className="w-12 h-[3px] bg-[#B62E30] rounded-full mt-3 mb-8" />
              </motion.div>

              <div className="flex flex-col gap-6">
                {infoBlocks.map((block, index) => (
                  <motion.div
                    key={index}
                    className="border-l-2 border-[#B62E30] pl-5"
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 + index * 0.12 }}
                  >
                    <h3 className="text-white font-bold text-xl mb-1">{block.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{block.text}</p>
                    {block.pills && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {block.pills.map((pill) => (
                          <span
                            key={pill}
                            className="px-3 py-1 text-xs border border-[#505050] text-gray-300 rounded-full"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="bg-[#1E1E1E] border-t border-[#505050] py-14">
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
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Contactanos y te asesoramos para encontrar la mejor opción de financiamiento para vos.
            </p>
            <Link href="/views/contacto">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3 bg-[#B62E30] hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Contactanos
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Financiacion;
