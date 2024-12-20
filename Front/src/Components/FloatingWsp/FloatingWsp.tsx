// components/FloatingWhatsApp.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoWsp from "@/Assets/logoWsp.png"
import logoInstagram from "@/Assets/logoInstagram.png"
import logoFacebook from "@/Assets/logoFacebook.png"

const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed md:bottom-2 bottom-10 right-4 z-50 space-y-3"> {/* Añadido z-50 para asegurar que esté encima de otros elementos */}
      <Link href="https://www.whatsapp.com/catalog/5493516129221/?app_absent=0" target="_blank">
        <Image
          src={logoWsp}
          alt="WhatsApp"
          width={80}
          height={80}
          className="transition-transform transform md:w-[40px] w-[40px] hover:scale-110 cursor-pointer"
        />
      </Link>
      <Link href="https://www.instagram.com/automotoresab/?hl=es" target="_blank">
        <Image
          src={logoInstagram}
          alt="Instagram"
          width={80}
          height={80}
          className="transition-transform transform md:w-[40px] w-[40px] hover:scale-110 cursor-pointer"
        />
      </Link>
      <Link href="https://www.facebook.com/profile.php?id=100001582968005" target="_blank">
        <Image
          src={logoFacebook}
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
