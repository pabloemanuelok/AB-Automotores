import React from "react";
import Image from "next/image";
import image1 from "@/Assets/VentoCola.png";
import image3 from "@/Assets/Cactus faro c4 1.png";
import image2 from "@/Assets/ColaToro.png";

const Section9 = () => {
  return (
    <div className="relative mb-4">
      {/* Título de la sección */}
      
      {/* Vista de escritorio */}
      <div className="hidden md:flex justify-between gap-4 px-4">
        <div className="w-1/3 h-[300px] relative">
          <Image
            src={image1}
            alt="Image 1"
            layout="fill"
            className="object-cover "  // Ajuste de posición
          />
        </div>
        <div className="w-1/3 h-[300px] relative">
          <Image
            src={image2}
            alt="Image 2"
            layout="fill"
            className="object-cover"
          />
        </div>
        <div className="w-1/3 h-[300px] relative">
          <Image
            src={image3}
            alt="Image 3"
            layout="fill"
            className="object-cover"
          />
        </div>
      </div>
      
      {/* Vista móvil */}
      <div className="md:hidden relative">
        <div className="flex overflow-x-auto">
          <div className="flex-none w-screen h-[300px] relative">
            <Image
              src={image1}
              alt="Image 1"
              layout="fill"
              className="object-cover object-top"  // Ajuste de posición
            />
          </div>
          <div className="flex-none w-screen h-[300px] relative">
            <Image
              src={image2}
              alt="Image 2"
              layout="fill"
              className="object-cover"
            />
          </div>
          <div className="flex-none w-screen h-[300px] relative">
            <Image
              src={image3}
              alt="Image 3"
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section9;
