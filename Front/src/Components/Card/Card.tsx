"use client";
import React, { useState, useEffect } from "react";
import { IProductCardProps } from "@/Interfaces/Interface";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAuthToken } from "@/utils/Auth/Auth";

const Card = ({
  product,
  onDelete,
  onViewClick,
}: IProductCardProps & { onDelete: () => void; onViewClick: () => void }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = getAuthToken();
      setIsAuthenticated(!!token);
    };

    checkAuth();
    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="relative rounded-xl mx-auto bg-[#1E1E1E] border border-[#505050] overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(182,46,48,0.25)] w-full group">
      {/* Imagen */}
      <div className="relative w-full h-[240px] overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#1E1E1E] to-transparent" />
      </div>

      {/* Panel de info siempre visible */}
      <div className="px-4 pt-3 pb-4 flex flex-col gap-1">
        <h2 className="text-white font-bold text-base leading-tight truncate">
          {product.name}
        </h2>
        <p className="text-gray-400 text-sm truncate">{product.version}</p>
        <p className="text-[#B62E30] text-sm font-semibold">{product.year}</p>

        {/* Botones */}
        <div className="flex items-center gap-2 mt-3">
          <Link href={`/views/details/${product._id}`} onClick={onViewClick} className="flex-1">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="w-full px-4 py-2 bg-[#B62E30] hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors duration-200"
            >
              Ver detalles
            </motion.button>
          </Link>

          {isAuthenticated && (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={onDelete}
              className="px-4 py-2 border border-[#505050] hover:border-red-600 text-gray-400 hover:text-red-500 text-sm font-semibold rounded-lg transition-colors duration-200"
            >
              Borrar
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
