"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const images = [
  { src: "/source/DetailMondeo3.webp", alt: "Detalle interior de vehículo" },
  { src: "/source/ManijaYaris.webp", alt: "Manija Yaris", isMiddle: true },
  { src: "/source/Central208.webp", alt: "Central multimedia 208" },
];

const Section4: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="page-container py-6 md:py-10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative h-[200px] md:h-[300px] rounded-xl overflow-hidden group">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                image.isMiddle ? "brightness-50" : ""
              }`}
            />
            {image.isMiddle && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Link href="/views/catalogo">
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-3 bg-[#B62E30] hover:bg-red-700 text-white font-bold text-lg rounded-lg shadow-xl transition-colors duration-200 ring-2 ring-white/20 hover:ring-white/40"
                  >
                    Ver Catálogo
                  </motion.button>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Section4;
