import React from "react";
import Link from "next/link";
import Image from "next/image"; 
import image1 from "@/Assets/facebook.png";
import image2 from "@/Assets/Instagram.png";
import image3 from "@/Assets/Whatsapp.png";
import LogoUbi from "@/Assets/LogoUbicacion.png";
import LogoPachas from "@/Assets/LogoPachas.png";

const Footer = () => {
  return (
    <div className="bg-Negro min-h-[300px] flex flex-col  items-center ">
      <div className="flex flex-col md:flex-row w-full">
        {/* Contenedor de la izquierda */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-8 pt-8 md:pt-0">
          <h2 className="text-white text-2xl md:text-4xl text-center md:text-left">
            ¡Vení a conocer <br /> nuestra agencia!
          </h2>
        </div>

        {/* Contenedor de la derecha */}
        <div className="flex-1 flex flex-col p-9 items-center justify-center px-4 md:px-8">
          <span className="text-white text-base md:text-lg text-center md:text-left mb-4">
            Lunes a viernes 9:00 a 13:00 y 15:30 a 19:00 hs <br /> Sábado de
            9:00 a 13:00 hs
          </span>

          <div className="bg-RojoAb p-2 flex items-center gap-3 md:gap-5">
            {/* LogoUbi alineado a la izquierda */}
            <div className="relative flex-shrink-0">
              <Image src={LogoUbi} alt="Ubicación" className="object-contain" />
            </div>
            <span className="text-white text-base md:text-lg">
              Av. Sabattini 4260 - Córdoba - Argentina
            </span>
          </div>
          <div className="p-4" >
          <p className="text-white ">Tel: 4568523 - Cel: 3516129221 - Cel: 3515088602</p>
          <p className="text-white">Abautomotores@hotmail.com</p>
          </div>
          {/* Contenedor de los íconos */}
          <div className="flex gap-10 justify-center md:px-8 w-full ">
            <Link href={"https://www.facebook.com/abautomotorescordoba"} target="_blank" rel="noopener noreferrer">
              <div className="relative w-10 h-10">
                <Image
                  src={image1}
                  alt="Facebook"
                  layout="fill"
                  className="object-cover"
                />
              </div>
            </Link>
            <Link href={"https://www.instagram.com/automotoresab/?hl=es"} target="_blank" rel="noopener noreferrer">
              <div className="relative w-10 h-10">
                <Image
                  src={image2}
                  alt="Instagram"
                  layout="fill"
                  className="object-cover"
                />
              </div>
            </Link>
            <Link href={"https://www.whatsapp.com/catalog/5493516129221/?app_absent=0"} target="_blank" rel="noopener noreferrer">
              <div className="relative w-10 h-10">
                <Image
                  src={image3}
                  alt="WhatsApp"
                  layout="fill"
                  className="object-cover"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.2563004097797!2d-64.13466948815562!3d-31.434610274146003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432bd24e9ecd915%3A0xa32ee5da0ccf6d8f!2sAB%20Automotores!5e0!3m2!1ses!2sar!4v1725689400009!5m2!1ses!2sar"
          width="100%"
          height="300"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Pie de página */}
      <div className="w-full flex items-center justify-center">
        <span className="text-white text-base ">Created by Pachas Development</span>
        <div className="relative w-9 h-9 right-2">
          <Image
            src={LogoPachas}
            alt="Pacha's Development"
            layout="fill"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
