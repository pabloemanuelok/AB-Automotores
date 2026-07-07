"use client";
import React from "react";
const FondoImage = "https://ik.imagekit.io/automotoresab/src-assets/PruebaFondo1.svg";
import Image from "next/image";
import { motion } from "framer-motion";

interface FondoNavProps {
  eyebrow?: string;
  title?: string;
  description?: React.ReactNode;
  imageSrc?: string;
}

const FondoNav = ({
  title = "Nuestro Catálogo",
  description = "Explorá nuestra selección de vehículos disponibles para venta inmediata.",
  imageSrc,
}: FondoNavProps) => {
  return (
    <div className="relative h-[200px] sm:h-[260px] md:h-[330px] overflow-hidden">
      <Image
        src={imageSrc ?? FondoImage}
        alt="Imagen de fondo del tablero Cronos con detalles de cronómetros y velocidad"
        fill
        className="object-cover md:object-[50%_15%]"
        quality={80}
        priority
      />
      {/* Overlay degradado */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Título centrado */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-24 sm:pt-28 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center page-container"
        >
          <h1 className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            {title}
          </h1>
          <div className="mt-3 mx-auto w-12 h-[3px] bg-[#B62E30] rounded-full" />
          <p className="mt-4 text-white/70 text-xs sm:text-sm md:text-base mx-auto font-normal md:whitespace-nowrap">
            {description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FondoNav;
