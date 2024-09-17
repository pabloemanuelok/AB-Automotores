"use client"
// components/Detail/Detail.tsx
import React, { useState } from "react";
import Image from "next/image";
import { IDetailsProps } from "@/Interfaces/Interface";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import logo from "@/Assets/LogoRojo.png";

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
    <div className="flex flex-col gap-20 items-center justify-center bg-black">
      {/* Encabezado de detalles */}
      <div className="bg-white w-[100%]">
        <h2 className="text-center text-3xl font-bold p-5 text-black z-10">
          Detalles
        </h2>
      </div>

      <main className="max-w-4xl w-full flex flex-col lg:flex-row bg-[#1B1B1B] p-6 rounded-lg relative gap-6">
        <div className="relative w-full lg:w-[70%] h-[250px] sm:h-[350px] md:h-[450px] mb-4 rounded-lg overflow-hidden">
          <Image
            src={product.images[currentImageIndex]}
            alt={`Imagen de ${product.name}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
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
        <div className="p-6 bg-[#1B1B1B] bg-opacity-75 w-full lg:w-[40%] flex flex-col gap-2 text-white rounded-lg">
          <h2 className="text-xl sm:text-2xl text-black bg-[#D9D9D9] py-2 pl-2 text-start w-full font-light">
            {product.name}
          </h2>
          <p className="text-white text-lg sm:text-xl">{product.version}</p>
          <p className="text-white bg-RojoAb w-fit px-4 py-1 text-lg sm:text-xl">
            {product.year}
          </p>
          <p className="text-sm sm:text-base mt-4">{product.description}</p>          
        </div>
      </main>
      <div className="w-screen">
        <div className="flex flex-col md:flex-row items-center w-full justify-center bg-black text-white py-10 px-10">
          <div className="md:w-1/3 flex flex-col justify-start w-full gap-10 mb-8 md:mb-0 md:pr-10">
            <h2 className="text-2xl md:text-3xl font-light text-center text-white mb-2">
              ¿Te gustaría venir a verlo?
            </h2>
            <div className="w-full flex justify-center">
              <Image
                src={logo}
                alt="Logo"
                width={150}
                height={150}
                className="rounded-full"
              />
            </div>
            <p className="text-center text-xl mb-6">
              ¡Escríbenos un mensaje con la fecha <br /> y un horario así te esperamos!
            </p>
          </div>
          <div className="w-full md:w-1/3 bg-[#222222] p-6 rounded-md shadow-md">
            <form className="flex flex-col space-y-4">
              <label className="flex flex-col">
                <span className="mb-1">Nombre Completo:</span>
                <input
                  type="text"
                  placeholder="Ingrese su nombre completo"
                  className="p-2 rounded-md border placeholder:text-neutral-500 border-white bg-[#2C2C2C] text-white"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-1">Teléfono:</span>
                <input
                  type="text"
                  placeholder="Ingrese su número de teléfono"
                  className="p-2 rounded-md border placeholder:text-neutral-500 border-white bg-[#2C2C2C] text-white"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-1">Email:</span>
                <input
                  type="email"
                  placeholder="ejemplo@gmail.com"
                  className="p-2 rounded-md border placeholder:text-neutral-500 border-white bg-[#2C2C2C] text-white"
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-1">Mensaje:</span>
                <textarea
                  placeholder="Descripción"
                  className="p-2 rounded-md border placeholder:text-neutral-500 border-white bg-[#2C2C2C] text-white"
                ></textarea>
              </label>
              <button
                type="submit"
                className="bg-[#D9D9D9] hover:bg-RojoAb hover:text-white text-black py-2 px-4 rounded-md"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
