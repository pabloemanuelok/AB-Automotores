// components/HomeCounter/HomeCounter.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const HomeCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Estado para detectar si es móvil

  // Detectar si el dispositivo es móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Ajusta el valor de acuerdo a tu breakpoint
    };

    handleResize(); // Verificar el tamaño de la pantalla al cargar

    window.addEventListener("resize", handleResize); // Escuchar cambios en el tamaño de la ventana

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Detectar visibilidad al hacer scroll
  const handleScroll = () => {
    const componentPosition = document.getElementById("home-counter")?.getBoundingClientRect().top || 0;
    const windowHeight = window.innerHeight;
    if (componentPosition <= windowHeight * (isMobile ? 0.9 : 0.8)) { // Para móvil, ajustamos el valor a 0.9
      setIsVisible(true);
    }
  };

  // Activar animación cuando el componente sea visible
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Revisamos si el componente es visible cuando se carga por primera vez

    return () => {
      window.removeEventListener("scroll", handleScroll); // Limpiar evento al desmontar
    };
  }, [isMobile]); // Aseguramos que la lógica de scroll esté actualizada si cambiamos de tamaño

  // Animación para el contador
  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const end = 22; // Número final del contador
      const duration = 2000; // Duración de la animación en ms
      const increment = end / (duration / 16); // Incremento por frame
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCount(Math.floor(start));
      }, 16);
    }
  }, [isVisible]);

  return (
    <section
      id="home-counter" // Agregar un ID para referenciar el componente
      className="relative flex flex-col items-center justify-center py-16 md:py-20 bg-gradient-to-r from-red-900 to-rose-950 shadow-2xl md:mx-4 my-4 overflow-hidden"
    >
      {/* Contador con animación moderna */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5 }}
        className="text-8xl md:text-10xl font-extrabold text-white tracking-wide drop-shadow-xl"
      >
        +<span className="font-bold text-yellow-400">{count}</span>
      </motion.div>
      
      {/* Texto de trayectoria */}
      <motion.p
        initial={{ opacity: 0, x: -100 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-4 text-4xl md:text-6xl text-center text-white font-semibold tracking-wide"
      >
        años de trayectoria en el rubro
      </motion.p>

      {/* Texto de clientes */}
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1 }}
        className="mt-8 text-xl md:text-2xl text-center text-white opacity-80"
      >
        Ya hay más de 5,000 clientes que confiaron en nosotros
      </motion.p>

      {/* Logo de Google desplazado a la derecha (en escritorio) y más pequeño en móvil */}
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute transform hover:scale-110 transition-transform md:right-6 md:bottom-4 md:top-auto md:left-auto bottom-4 left-0.5 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:top-auto sm:bottom-0 sm:mt-4"
      >
        <Link
          href="https://www.google.com/maps/place/AB+Automotores/@-31.4346103,-64.1320892,15z/data=!4m8!3m7!1s0x9432bd24e9ecd915:0xa32ee5da0ccf6d8f!8m2!3d-31.4346103!4d-64.1320892!9m1!1b1!16s%2Fg%2F11bw4rvkx6?entry=ttu&g_ep=EgoyMDI0MTExMi4wIKXMDSoJLDEwMjExMjMzSAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/source/GoogleReview.webp"
            alt="Logo de Google Reviews"
            width={150} // Reducción del tamaño del logo para móvil
            height={54} // Reducción del tamaño del logo para móvil
            className="cursor-pointer"
            priority
          />
        </Link>
      </motion.div>
    </section>
  );
};

export default HomeCounter;
