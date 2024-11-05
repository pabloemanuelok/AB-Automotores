// components/FloatingWhatsApp.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoWsp from "@/Assets/logoWsp.png"
import logoInstagram from "@/Assets/logoInstagram.png"
import logoFacebook from "@/Assets/logoFacebook.png"

const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed md:bottom-2 bottom-10 right-4">
      <Link href="https://www.whatsapp.com/catalog/5493516129221/?app_absent=0" target="_blank">
        <Image
          src={logoWsp} // Cambia esta ruta a la ubicación de tu logo
          alt="WhatsApp"
          width={80}
          height={80}
          className="transition-transform transform md:w-[40px] w-[40px] hover:scale-110 cursor-pointer"
        />
      </Link>
      <Link href="https://www.whatsapp.com/catalog/5493516129221/?app_absent=0" target="_blank">
        <Image
          src={logoInstagram} // Cambia esta ruta a la ubicación de tu logo
          alt="Instagram"
          width={80}
          height={80}
          className="transition-transform transform md:w-[40px] w-[40px] hover:scale-110 cursor-pointer"
        />
      </Link>
      <Link href="https://www.whatsapp.com/catalog/5493516129221/?app_absent=0" target="_blank">
        <Image
          src={logoFacebook} // Cambia esta ruta a la ubicación de tu logo
          alt="Facebook"
          width={80}
          height={80}
          className="transition-transform transform md:w-[40px] w-[40px] hover:scale-110 cursor-pointer"
        />
      </Link>
    </div>
  );
};

export default FloatingWhatsApp;
