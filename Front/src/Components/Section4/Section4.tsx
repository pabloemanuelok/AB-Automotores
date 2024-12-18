"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ImageWithPlaceholderProps {
  src: string;
  alt: string;
  isMiddleImage?: boolean;
}

const ImageWithPlaceholder: React.FC<ImageWithPlaceholderProps> = ({ src, alt, isMiddleImage = false }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem(src)) {
      setIsLoading(false);
    }
  }, [src]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    localStorage.setItem(src, 'loaded'); // Cambié sessionStorage por localStorage
  };

  return (
    <div className="relative w-full mb-1 md:mb-0 h-[200px] md:h-[300px]">
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        onLoadingComplete={handleLoadingComplete}
        className={`transition-opacity duration-500 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'} ${isMiddleImage ? 'filter brightness-50' : ''}`}
        priority={isMiddleImage} // Priorizar la carga de imágenes importantes
      />
      {isMiddleImage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Link href="/views/catalogo">
            <button className="relative px-4 py-1 bg-[#B62E30] text-white font-bold text-lg transition-all duration-300 ease-in-out transform hover:bg-red-900 shadow-lg hover:scale-105">
              Catálogo
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

const ImageGallery: React.FC = () => {
  const images = [
    { src: '/source/DetailMondeo3.webp', alt: 'Image 1' },
    { src: '/source/ManijaYaris.webp', alt: 'Image 2', isMiddleImage: true }, // Imagen con el botón
    { src: '/source/Central208.webp', alt: 'Image 3' }
  ];

  return (
    <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 md:m-4">
      {images.map((image, index) => (
        <div key={index} className={`flex justify-center ${image.isMiddleImage ? 'sm:block' : 'hidden sm:flex'}`}>
          <ImageWithPlaceholder 
            src={image.src} 
            alt={image.alt} 
            isMiddleImage={image.isMiddleImage} 
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
