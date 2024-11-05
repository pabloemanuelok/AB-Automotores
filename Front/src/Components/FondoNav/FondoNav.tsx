"use client";
import FondoImage from "@/Assets/TableroCronos.png";
import React from 'react';
import Image from 'next/image';

const FondoNav = () => {
  return (
    <div className="relative h-[260px] md:h-[450px] overflow-hidden md:mx-4">
      <Image
        src={FondoImage}
        alt="Fondo"
        fill
        className="object-cover transition-all duration-300 ease-in-out md:object-[50%_15%] object-center"
        quality={100}
      />
    </div>
  );
};

export default FondoNav;
