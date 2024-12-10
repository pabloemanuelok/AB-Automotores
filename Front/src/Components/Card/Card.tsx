"use client";
import React, { useState, useEffect, useCallback } from "react";
import { IProductCardProps } from "@/Interfaces/Interface";
import Image from "next/image";
import Link from "next/link";
import { fetchDeleteId } from "@/utils/FetchCars/FetchCars";
import { getAuthToken } from "@/utils/Auth/Auth";

const Card = ({
  product,
  onDelete,
  onViewClick,
}: IProductCardProps & { onDelete: () => void; onViewClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar autenticación
  useEffect(() => {
    const checkAuth = () => {
      const token = getAuthToken();
      setIsAuthenticated(!!token); // Actualiza si hay un token válido
    };

    checkAuth();

    // Opcional: Revalidar autenticación en cambios de localStorage
    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Funciones de hover optimizadas
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  // Función para manejar la eliminación
  const handleDeleteClick = async () => {
    try {
      const success = await fetchDeleteId(product._id);
      if (success) {
        console.log(`Producto eliminado: ${product._id}`);
        onDelete();
      } else {
        alert("No se pudo eliminar el producto. Verifica tu conexión o permisos.");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Hubo un problema al eliminar el producto.");
    }
  };

  return (
    <div
      className="relative max-w-xs mx-auto bg-white shadow-2xl overflow-hidden transform transition-transform hover:scale-105 hover:shadow-3xl w-full h-full font-roboto group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Imagen del producto */}
      <div className="relative w-full h-[440px]">
      <Image
  src={product.images[0]}
  alt={product.name}
  width={600}
  height={440}
  className="object-cover w-full h-full"
  priority // Usa priority para la carga inmediata
  sizes="(max-width: 640px) 100vw, 50vw"
/>
      </div>

      {/* Información al pasar el mouse */}
      <div
        className={`absolute inset-x-0 bottom-0 bg-black bg-opacity-65 flex flex-col justify-center items-end text-white transition-opacity h-1/2 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-start p-5 w-full mb-4">
          <h2 className="text-xl font-light mb-2">{product.name}</h2>
          <p className="text-xl font-light mb-2">{product.version}</p>
          <p className="text-xl font-light">{product.year}</p>
        </div>
        <div className="flex w-full justify-between px-4">
          {/* Botón para ver detalles */}
          <Link href={`/views/details/${product._id}`} onClick={onViewClick}>
            <button className="bg-[#B62E30] text-white text-lg px-8 mr-2 hover:bg-red-900">
              Ver
            </button>
          </Link>
          {/* Botón para borrar (solo si está autenticado) */}
          {isAuthenticated && (
            <button
              onClick={handleDeleteClick}
              className="bg-[#B62E30] text-white text-lg px-8 mr-2 hover:bg-red-900"
            >
              Borrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
