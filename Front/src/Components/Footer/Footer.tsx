import React from "react";
import Link from "next/link";
import Image from "next/image"; 
import LogoUbi from "@/Assets/LogoUbicacion.png";
import LogoPachas from "@/Assets/LogoPachas.png";

const Footer = () => {
  return (
    <div className="bg-black flex flex-col items-center overflow-x-hidden">
      <div className="flex flex-col md:flex-row w-full md:p-5 py-5 md:py-0 w-screen-2xl">
        {/* Contenedor de la izquierda */}
        <div className="flex-1 flex items-end md:justify-start justify-center px-4 md:px-6 md:py-5 lg:pl-[100px] xl:pl-[100px]">
          <h2 className="text-white text-2xl md:text-2xl xl:text-3xl  text-center mt-0">
            ¡Vení a conocer nuestra agencia!
          </h2>
        </div>

        {/* Contenedor de la derecha */}
        <div className="flex-1 flex flex-col w-full p-4 md:ml-8 md:p-6 lg:mr-[100px] xl:mr-[100px]">
          <Link target="_blank" href={"https://maps.app.goo.gl/SwaGpKmyq8RJGCAHA"}>
            <div className="bg-[#B62E30] w-full max-w-[100%] p-2 flex items-center justify-center gap-3 md:gap-5 hover:bg-red-900 mx-auto">
              <div className="relative flex-shrink-0">
                <Image src={LogoUbi} alt="Ubicación" className="object-contain" />
              </div>
              <span className="text-white text-base md:text-lg text-center">
                Av. Sabattini 4260 - Córdoba - Argentina
              </span>
            </div>
          </Link>
          <span className="text-white text-base text-center md:text-start mt-4">
            Lun. a Vie. de 9:00 a 13:00 y 15:30 a 19:00 hs y Sáb. de
            9:00 a 13:00 hs
          </span>
        </div>
      </div>

      {/* Pie de página */}
      <Link href="mailto:pachasdevelopment@gmail.com" target="_blank" className="w-full flex items-center justify-center text-center">
        <div className="flex justify-center items-center pt-9">
          <span className="text-white text-sm">Created by Pachas Development</span>
          <div className="relative w-10 h-10">
            <Image
              src={LogoPachas}
              alt="Pacha's Development"
              layout="fill"
              className="object-contain"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Footer;
