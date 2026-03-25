"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Section0: React.FC = () => {
  return (
    <section className="relative h-[600px] md:h-[780px] overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://video.wixstatic.com/video/0816f9_e63ef511f08e4e98a63c5234ec756ebb/720p/mp4/file.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="/source/NivusFrente.webp"
        aria-label="Video de fondo"
        preload="metadata"
      >
        <p>Tu navegador no soporta el elemento de video.</p>
      </video>

      {/* Gradiente oscuro de abajo hacia arriba */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      {/* Contenido centrado en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 pb-12 md:pb-16">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            {/* Título y descripción */}
            <div className="flex flex-col gap-3 max-w-xl">
              <p className="text-white text-sm font-semibold tracking-widest uppercase">
                Agencia Automotriz
              </p>
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Bienvenido a<br />
                <span className="text-red-500">Automotores AB</span>
              </h1>
              <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-md hidden md:block">
                Vehículos seleccionados, entrega inmediata, las mejores líneas de créditos, compras y permutas, y servicios de gestoría para hacer todos los trámites sin complicaciones.
              </p>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <Link href="/views/catalogo">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 bg-[#B62E30] hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 text-sm md:text-base shadow-lg"
                >
                  Ver Catálogo
                </motion.button>
              </Link>
              <Link href="/views/contacto">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 border border-white/50 hover:border-white text-white font-semibold rounded-lg transition-colors duration-200 text-sm md:text-base backdrop-blur-sm"
                >
                  Contacto
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Section0;
