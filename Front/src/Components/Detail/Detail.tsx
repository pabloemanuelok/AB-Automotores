"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IDetailsProps } from "@/Interfaces/Interface";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

const Detail: React.FC<IDetailsProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  // Preload imágenes adyacentes
  useEffect(() => {
    const preload = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };
    if (product.images[currentImageIndex + 1])
      preload(product.images[currentImageIndex + 1]);
    if (product.images[currentImageIndex - 1])
      preload(product.images[currentImageIndex - 1]);
  }, [currentImageIndex, product.images]);

  return (
    <div className="bg-[#0a0a0a] py-10 md:py-16">
      <div className="page-container">

        {/* Back button */}
        <Link href="/views/catalogo">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 mb-6 text-sm text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FaChevronLeft size={12} />
            Volver al catálogo
          </motion.button>
        </Link>

        {/* Card principal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#1E1E1E] border border-[#505050] rounded-xl overflow-hidden flex flex-col lg:flex-row shadow-lg"
        >
          {/* Columna izquierda: imagen */}
          <div className="flex flex-col w-full lg:w-1/2">
            {/* Imagen principal */}
            <div className="relative w-full h-[320px] md:h-[420px] lg:h-[480px] bg-[#1B1B1B]">
              {product.images.length > 0 ? (
                <Image
                  src={product.images[currentImageIndex]}
                  alt={`Imagen de ${product.name}`}
                  fill
                  className="object-cover"
                  priority
                  quality={80}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-500 text-sm">
                  No hay imágenes disponibles
                </div>
              )}

              {/* Botones navegación */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    aria-label="Imagen anterior"
                    className="absolute top-1/2 left-3 -translate-y-1/2 w-10 h-10 rounded-full bg-[#B62E30] hover:bg-red-700 text-white flex items-center justify-center transition-colors duration-200 shadow-lg z-10"
                  >
                    <FaChevronLeft size={14} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    aria-label="Siguiente imagen"
                    className="absolute top-1/2 right-3 -translate-y-1/2 w-10 h-10 rounded-full bg-[#B62E30] hover:bg-red-700 text-white flex items-center justify-center transition-colors duration-200 shadow-lg z-10"
                  >
                    <FaChevronRight size={14} />
                  </button>

                  {/* Contador de imagen */}
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                    {currentImageIndex + 1} / {product.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto bg-[#1B1B1B] border-t border-[#505050]">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`relative flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                      i === currentImageIndex
                        ? "border-[#B62E30]"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Miniatura ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Columna derecha: info */}
          <div className="flex flex-col gap-5 w-full lg:w-1/2 p-6 lg:p-8 bg-[#1E1E1E]">

            {/* Título */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-[#B62E30] text-xs font-semibold tracking-widest uppercase mb-1">
                {product.year}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {product.name}
              </h2>
              <div className="mt-3 w-12 h-[3px] bg-[#B62E30] rounded-full" />
            </motion.div>

            {/* Versión */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <p className="text-gray-300 text-base font-light border-l-2 border-[#B62E30] pl-3">
                {product.version}
              </p>
            </motion.div>

            {/* Descripción */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-white text-sm font-semibold uppercase tracking-wide">
                  Descripción
                </span>
                <div className="flex-1 h-[1px] bg-[#505050]" />
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href={`https://wa.me/5493516129221?text=Hola%2C+me+interesa+el+${encodeURIComponent(product.name)}+${product.year}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full px-6 py-3 bg-[#B62E30] hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg"
                >
                  Consultar por este vehículo
                </motion.button>
              </Link>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Detail;
