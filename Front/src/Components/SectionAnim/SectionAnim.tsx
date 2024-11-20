// components/HomeCounter/HomeCounter.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const HomeCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = () => {
    const componentPosition = document.getElementById("home-counter")?.getBoundingClientRect().top || 0;
    const windowHeight = window.innerHeight;
    if (componentPosition <= windowHeight * (isMobile ? 0.9 : 0.8)) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const end = 22;
      const duration = 2000;
      const increment = end / (duration / 16);
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
      id="home-counter"
      className="relative flex flex-col items-center justify-center py-8 md:py-10 bg-gradient-to-r from-red-900 to-rose-950 shadow-2xl md:mx-4 my-4 overflow-hidden sm:px-4" // Agregado sm:px-4 para márgenes en móvil
    >
      {/* Contador */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5 }}
        className="text-4xl md:text-8xl font-extrabold text-white tracking-wide drop-shadow-xl"
      >
        +<span className="font-bold text-yellow-400">{count}</span>
      </motion.div>

      {/* Texto de trayectoria */}
      <motion.p
        initial={{ opacity: 0, x: -100 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-2 text-2xl lg:text-2xl xl:text-3xl text-center text-white font-semibold tracking-wide"
      >
        años de trayectoria
      </motion.p>

      {/* Texto de clientes */}
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1 }}
        className="mt-4 text-base xl:text-lg text-center text-white opacity-80"
      >
        Ya hay más de 5,000 clientes que confiaron en nosotros
      </motion.p>

      {/* Logo de Google centrado */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
        className="mt-6"
      >
        <Link
          href="https://www.google.com/maps/place/AB+Automotores/@-31.4346103,-64.1320892,15z/data=!4m8!3m7!1s0x9432bd24e9ecd915:0xa32ee5da0ccf6d8f!8m2!3d-31.4346103!4d-64.1320892!9m1!1b1!16s%2Fg%2F11bw4rvkx6?entry=ttu&g_ep=EgoyMDI0MTExMi4wIKXMDSoJLDEwMjExMjMzSAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/source/GoogleReview.webp"
            alt="Logo de Google Reviews"
            width={120}
            height={40}
            className="cursor-pointer"
            priority
          />
        </Link>
      </motion.div>
    </section>
  );
};

export default HomeCounter;
