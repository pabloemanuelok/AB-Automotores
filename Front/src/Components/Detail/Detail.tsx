"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IDetailsProps } from "@/Interfaces/Interface";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Detail: React.FC<IDetailsProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };


  return (
    <div className="flex flex-col items-center justify-center mt-4 bg-white">
      {/* Encabezado de detalles */}
      <main className="max-w-5xl w-full flex flex-col lg:flex-row bg-[#1B1B1B] md:my-10 p-0 relative gap-0">
        <div className="relative w-full lg:w-[70%] h-[500px] mb-0 overflow-hidden">
          {product.images.length > 0 ? (
            <Image
              src={product.images[currentImageIndex]}
              alt={`Imagen de ${product.name}`}
              layout="fill"
              objectFit="contain"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200">
              <span>No hay imágenes disponibles</span>
            </div>
          )}
          <button
            onClick={handlePrevImage}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-600"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={handleNextImage}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-600"
          >
            <FaChevronRight size={24} />
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(index)}
                className={`w-3 h-3 rounded-full ${
                  currentImageIndex === index ? "bg-white" : "bg-gray-500"
                }`}
              ></button>
            ))}
          </div>
        </div>
        <div className="p-6 bg-[#1B1B1B] bg-opacity-75 w-full lg:w-[50%] flex flex-col gap-2 text-white rounded-lg">
          <h2 className="text-xl sm:text-2xl text-black bg-[#D9D9D9] py-2 pl-2 text-start w-full font-light">
            {product.name}
          </h2>
          <p className="text-white text-lg sm:text-xl">{product.version}</p>
          <p className="text-white bg-[#B62E30] w-fit px-4 py-1 text-lg sm:text-xl">
            {product.year}
          </p>
          <p className="text-sm sm:text-base mt-4">{product.description}</p>
        </div>
      </main>
    </div>
  );
};

export default Detail;
