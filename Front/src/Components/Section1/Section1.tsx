import React from "react";
import Image from "next/image";
import image3 from "@/Assets/208ColaDiag.png";
import image1 from "@/Assets/208Interior.png";
import image2 from "@/Assets/208Optica.png";

const Section1 = () => {
  return (
    <div className="relative">
      {/* Título de la sección */}
      <h2 className="text-center text-3xl font-bold p-5">
        Salón de ventas y consignaciones - Usados y 0km
      </h2>
      
      {/* Vista de escritorio */}
      <div className="hidden md:flex justify-between gap-4 px-4">
        <div className="w-1/3 h-[300px] relative">
          <Image
            src={image1}
            alt="Image 1"
            layout="fill"
            className="object-cover object-top"  // Ajuste de posición
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

export default Section1;
