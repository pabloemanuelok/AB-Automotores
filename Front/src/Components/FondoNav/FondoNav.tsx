"use client";
import FondoImage from "@/Assets/PruebaFondo1.svg";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface FondoNavProps {
  eyebrow?: string;
  title?: string;
  description?: string;
}

const FondoNav = ({
  eyebrow = "AB Automotores",
  title = "Nuestro Catálogo",
  description = "Explorá nuestra selección de vehículos disponibles para venta inmediata.",
}: FondoNavProps) => {
  return (
    <div className="relative h-[320px] md:h-[380px] overflow-hidden">
      <Image
        src={FondoImage}
        alt="Imagen de fondo del tablero Cronos con detalles de cronómetros y velocidad"
        fill
        className="object-cover md:object-[50%_15%]"
        quality={80}
        priority
      />
      {/* Overlay degradado */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Título centrado */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center page-container"
        >
          <p className="text-[#B62E30] text-sm font-semibold tracking-widest uppercase mb-2">
            {eyebrow}
          </p>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
            {title}
          </h1>
          <div className="mt-3 mx-auto w-12 h-[3px] bg-[#B62E30] rounded-full" />
          <p className="mt-4 text-white/70 text-sm md:text-base max-w-md mx-auto">
            {description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FondoNav;
