// components/FondoNav/FondoNav.tsx
"use client"

import React from 'react';
import Image from 'next/image';

interface FondoNavProps {
  imageUrl: string; // URL de la imagen a mostrar
}

const FondoNav: React.FC<FondoNavProps> = ({ imageUrl }) => {
  return (
    <div className="relative  h-[260px] md:h-[450px] overflow-hidden md:mx-4">
      <Image
        src={imageUrl}
        alt="Fondo"
        layout="fill"
        objectFit="cover"
        className="transition-all duration-300 ease-in-out"
        style={{
          objectPosition: '50% 15%', // Ajuste para la versión de escritorio
        }}
        quality={100}
      />
      <style jsx>{`
        @media (max-width: 640px) {
          .next-image {
            object-position: center; // Ajuste para la versión móvil
          }
        }
      `}</style>
    </div>
  );
};

export default FondoNav;
