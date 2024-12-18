import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import LogoUbi from "@/Assets/LogoUbicacion.webp";
import LogoPachas from "@/Assets/LogoPachas.webp";


const Footer = () => {
  return (
    <div className="bg-black w-full flex flex-col items-center overflow-x-hidden">
      {/* <VehDestacados /> */}
      
      {/* Contenedor principal */}
      <div className="flex flex-col md:flex-row w-full md:p-5 py-5 md:py-0 w-screen-2xl">
        {/* Contenedor de la izquierda */}
        <div className="flex-1 flex items-center md:justify-start justify-center px-4 md:px-6 md:py-5 lg:pl-[100px] xl:pl-[100px]">
          <h2 className="text-white text-2xl md:text-2xl xl:text-3xl text-center  md:pb-10 mt-0">
            ¡Vení a ver nuestros autos!
          </h2>
        </div>

        {/* Contenedor de la derecha */}
        <div className="flex-1 flex flex-col w-full p-4 md:ml-8 md:p-6 lg:mr-[100px] xl:mr-[100px]">
          <Link
            target="_blank"
            href={"https://maps.app.goo.gl/SwaGpKmyq8RJGCAHA"}
            className="md:pt-10"
            aria-label="Ver ubicación en Google Maps"
          >
            <div className="bg-[#B62E30] w-full max-w-[90%] p-2 flex items-center justify-center gap-3 md:gap-5 hover:bg-red-900 mx-auto">
              <div className="relative flex-shrink-0">
                <Image
                  src={LogoUbi}
                  alt="Ubicación de la agencia en Córdoba, Argentina"
                  className="object-contain"
                  width={20}
                  height={20}
                  priority
                />
              </div>
              <span className="text-white text-base md:text-lg text-center">
                Av. Sabattini 4260 - Córdoba - Argentina
              </span>
            </div>
          </Link>
          
          <span className="text-white text-base text-center md:text-lg mt-4">
            Lun. a Vie. de 9:00 a 13:00 y 15:30 a 19:00 hs y Sáb. de 9:00 a 13:00 hs
          </span>

          {/* Información de contacto */}
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-center gap-4 text-white text-base md:text-lg mt-4">
            {/* Teléfono 1 */}
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-white" />
              <span>351 6129221 / 351 5088602</span>
            </div>
            {/* Correo electrónico */}
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-white" />
              <Link
                href="mailto:abautomotores@hotmail.com"
                className="underline hover:text-red-300"
                aria-label="Enviar un correo a AB Automotores"
              >
                abautomotores@hotmail.com
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Pie de página */}
      <Link
        href="mailto:pachasdevelopment@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center md:justify-start md:pl-32 text-center mt-5"
        aria-label="Contactar a Pachas Development"
      >
        <div className="flex justify-center items-center">
          <span className="text-white text-sm">Created by Pachas Development</span>
          <div className="relative w-10 h-10 flex-shrink-0 ml-2">
            <Image
              src={LogoPachas}
              alt="Logo de Pacha's Development"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Footer;
