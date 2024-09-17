// components/Card/Card.tsx
import React, { useState, useEffect } from 'react';
import { IProductCardProps } from '@/Interfaces/Interface';
import Image from 'next/image';
import Link from 'next/link';
import { fetchDeleteId } from '@/utils/FetchCars/FetchCars';
import { getAuthToken } from '@/utils/Auth/Auth'; // Importa la función getAuthToken

const Card = ({ product, onDelete }: IProductCardProps & { onDelete: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Usa useEffect para verificar la autenticación
  useEffect(() => {
    const token = getAuthToken();
    setIsAuthenticated(!!token); // Verifica si hay un token
  }, []);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  const handleDeleteClick = async () => {
    const success = await fetchDeleteId(product._id);
    if (success) {
      onDelete();
      window.location.reload(); // Recarga la página después de eliminar
    }
  };

  return (
    <div
      className={`relative max-w-xs mx-auto bg-white shadow-2xl overflow-hidden transform transition-transform hover:scale-105 hover:shadow-3xl w-full h-full font-roboto group ${
        isHovered ? 'scale-105 shadow-3xl' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleHover}
    >
      <div className="relative w-full h-[440px]">
        <Image
          src={product.mainImgUrl}
          alt={product.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
      <div
        className={`absolute inset-x-0 bottom-0 bg-black bg-opacity-65 flex flex-col justify-center items-end text-white transition-opacity h-1/2 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-start p-5 w-full mb-4">
          <h2 className="text-xl font-light mb-2">{product.name}</h2>
          <p className="text-xl font-light mb-2">{product.version}</p>
          <p className="text-xl font-light">{product.year}</p>
        </div>
        <div className="flex w-full justify-between px-4">
          <Link href={`/views/details/${product._id}`}>
            <button className="bg-RojoAb text-white text-lg px-8 mr-6 hover:bg-red-900">
              Ver
            </button>
          </Link>
          {isAuthenticated && (
            <button
              onClick={handleDeleteClick}
              className="bg-RojoAb text-white text-lg px-8 mr-2 hover:bg-red-900"
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
