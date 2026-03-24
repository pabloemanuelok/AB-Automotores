"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const HomeCounter: React.FC = React.memo(() => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const top = document.getElementById("home-counter")?.getBoundingClientRect().top ?? 0;
    if (top <= window.innerHeight * 0.85) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const debounced = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 50);
    };
    window.addEventListener("scroll", debounced);
    handleScroll();
    return () => window.removeEventListener("scroll", debounced);
  }, [handleScroll]);

  useEffect(() => {
    if (!isVisible) return;
    const end = 23;
    const duration = 1800;
    const increment = end / (duration / 16);
    let start = 0;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section
      id="home-counter"
      className="relative bg-[#B62E30] py-14 md:py-20 overflow-hidden"
    >
      {/* Decoración de fondo sutil */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center">
        <span className="text-white font-extrabold text-[20rem] leading-none">AB</span>
      </div>

      <div className="page-container relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Contador */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center md:items-start"
        >
          <span className="text-7xl md:text-9xl font-extrabold text-white tracking-tight leading-none">
            +<span className="text-yellow-400">{count}</span>
          </span>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-2 text-xl md:text-2xl font-semibold text-white/90 tracking-wide"
          >
            años de trayectoria
          </motion.p>
        </motion.div>

        {/* Info lateral */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center md:items-end gap-4"
        >
          <p className="text-white/80 text-lg md:text-xl font-medium">
            + 5,000 clientes satisfechos
          </p>
          <div className="flex items-center gap-2">
            <span className="text-yellow-300 text-xl tracking-widest">★★★★★</span>
            <Link
              href="https://www.google.com/maps/place/AB+Automotores/@-31.4346103,-64.1320892,15z/data=!4m8!3m7!1s0x9432bd24e9ecd915:0xa32ee5da0ccf6d8f!8m2!3d-31.4346103!4d-64.1320892!9m1!1b1!16s%2Fg%2F11bw4rvkx6?entry=ttu&g_ep=EgoyMDI0MTExMi4wIKXMDSoJLDEwMjExMjMzSAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/source/GoogleReview.webp"
                alt="Google Reviews"
                width={80}
                height={45}
                className="hover:scale-110 transition-transform duration-200"
                priority
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

HomeCounter.displayName = "HomeCounter";

export default HomeCounter;
