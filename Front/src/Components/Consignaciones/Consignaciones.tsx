"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const infoBlocks = [
  {
    title: "¿Querés vender tu auto?",
    text: "Nos encargamos de todas las gestiones y trámites para que no tengas que preocuparte de nada. Ahorrá tiempo y dinero con nosotros.",
  },
  {
    title: "Compra Directa",
    text: "Si querés vender tu auto de forma rápida y segura, te lo compramos y te ofrecemos un precio competitivo, siempre que el vehículo esté en buenas condiciones.",
  },
  {
    title: "Consignaciones",
    text: "Dejá tu auto en nuestra agencia, lo publicamos en todos los portales de venta online y buscamos comprador. Una vez encontrado, lo cobrás en el acto.",
  },
];

const vehicles = [
  { src: "/source/VentoCostado.webp", alt: "Volkswagen Vento", delay: 0, scaleX: 1 },
  { src: "/source/MustangCostado.webp", alt: "Ford Mustang", delay: 0.15, scaleX: -1 },
  { src: "/source/ToroCostado.webp", alt: "Fiat Toro", delay: 0.3, scaleX: -1 },
];

const Consignaciones = () => {
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
                    initial={{ x: -220, filter: "blur(8px)", opacity: 0, scaleX: vehicle.scaleX }}
                    whileInView={{ x: 0, filter: "blur(0px)", opacity: 1, scaleX: vehicle.scaleX }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 40, delay: vehicle.delay }}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            {/* Columna de texto */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              >
                <p className="text-[#B62E30] text-sm font-semibold tracking-widest uppercase mb-2">
                  Sin complicaciones
                </p>
                <h2 className="text-white text-3xl md:text-4xl font-bold">
                  Vendé tu vehículo con nosotros
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
              Vendé sin complicaciones
            </p>
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
              ¿Listo para vender tu vehículo?
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Contactanos y te explicamos cómo funciona el proceso de consignación paso a paso.
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

export default Consignaciones;
