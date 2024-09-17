import React from "react";
import Image from "next/image";
import image1 from "@/Assets/CronosFrente.png";
import image2 from "@/Assets/CronosCola.png";

const Section7 = () => {
  return (
    <div className="relative">
      {/* Vista de escritorio */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 px-4">
        {/* Imagen 1 ocupa la primera columna */}
        <div className="col-span-1 h-[300px] relative pt-10">
          <Image
            src={image1}
            alt="Image 1"
            layout="fill"
            className="object-cover"
          />
        </div>

        {/* Imagen 2 ocupa el espacio de las columnas 2 y 3 */}
        <div className="col-span-2 h-[300px] relative">
          <Image
            src={image2}
            alt="Image 2"
            layout="fill"
            className="object-cover object-top"
          />
        </div>
      </div>
      
      {/* Vista móvil */}
      <div className="md:hidden relative">
        <div className="flex overflow-x-auto whitespace-nowrap">
          <div className="flex-none w-screen h-[300px] relative">
            <Image
              src={image1}
              alt="Image 1"
              layout="fill"
              className="object-cover"
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
        </div>
      </div>
    </div>
  );
};

export default Section7;
