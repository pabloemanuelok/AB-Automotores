"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; 
import image3 from "@/Assets/MondeoFrenteDetalle.webp";
import image2 from "@/Assets/MondeoFrenteDetalle.webp";
import image1 from "@/Assets/MondeoFrenteDetalle.webp";

const Section1 = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handlePrevImage = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const handleNextImage = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Vista de escritorio */}
      <div className="hidden md:flex justify-between w-[100%] gap-4 px-4 my-4">
        <div className="w-1/3 h-[300px] relative">
          <Image
            src={image1}
            alt="Image 1"
            width={600}
            height={300}
            className="object-cover w-full h-[300px]"
            priority
          />
        </div>
        <div className="w-1/3 h-[300px] relative">
          <Image
            src={image2}
            alt="Image 2"
            width={600}
            height={300}
            className="object-cover w-full h-[300px]"
            priority
          />
        </div>
        <div className="w-1/3 h-[300px] relative">
          <Image
            src={image3}
            alt="Image 3"
            width={600}
            height={300}
            className="object-cover w-full h-[300px]"
            priority
          />
        </div>
      </div>

      {/* Vista móvil con carrusel */}
      <div className="md:hidden relative mt-4">
        <button
          onClick={handlePrevImage}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-600 z-10"
        >
          <FaChevronLeft size={24} />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-600 z-10"
        >
          <FaChevronRight size={24} />
        </button>

        <div className="flex overflow-x-auto h-[300px]" ref={scrollRef}>
          <div className="flex-none w-screen h-full relative">
            <Image
              src={image1}
              alt="Image 1"
              width={600}
              height={300}
              className="object-cover w-full h-[300px]"
            />
          </div>
          <div className="flex-none w-screen h-full relative">
            <Image
              src={image2}
              alt="Image 2"
              width={600}
              height={300}
              className="object-cover w-full h-[300px]"
            />
          </div>
          <div className="flex-none w-screen h-full relative">
            <Image
              src={image3}
              alt="Image 3"
              width={600}
              height={300}
              className="object-cover w-full h-[300px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
