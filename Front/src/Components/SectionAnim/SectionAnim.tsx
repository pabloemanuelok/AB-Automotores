"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const reviews = [
  {
    name: "Carlos Molina",
    text: "Muy buena atención, empresa familiar, eficientes, amables y serios. La atención pos venta también es excelente, te solucionan todo. El tema papeles es rápido y eficiente. Muy recomendables. ¡Gracias Fabri y Claudia!",
    date: "Hace 6 meses",
  },
  {
    name: "Lucas Bustos",
    text: "Excelente atención. El vehículo en muy buen estado, siempre fueron sinceros y sin vueltas. En menos de una semana me hicieron todos los trámites y me entregaron el vehículo. Seriedad al 100%. Los recomiendo sin dudas.",
    date: "Hace un año",
  },
  {
    name: "Jorge Barra",
    text: "Desde que llegamos hasta que nos llevamos el vehículo, Fabrizio nos atendió de forma impecable. Siempre asesorados y todo tal como lo pactamos. El vehículo muy bien, como se veía. Muy confiable.",
    date: "Hace 9 meses",
  },
  {
    name: "Gustavo Cayata",
    text: "Excelente trato, muy buena predisposición. Genera mucha confianza. Muy satisfecho con la compra.",
    date: "Hace un año",
  },
  {
    name: "Daniel Quintana",
    text: "Excelente atención y servicio. Mucha calidez humana. Muy recomendable.",
    date: "Hace un año",
  },
  {
    name: "Fabian Soria",
    text: "Nunca me animaba a comprar en Córdoba capital, pero en AB Automotores fue todo lo contrario. La atención como si me conocieran de años. Tuve un problema mecánico y ellos se hicieron cargo. Excelente atención personalizada, de confianza y de palabra. ¡Gracias Fabricio!",
    date: "Hace un año",
  },
  {
    name: "Diego Posada",
    text: "Mi experiencia fue excelente. Desde el primer momento sentí honestidad y confianza. La atención fue impecable, siempre con buena onda y dispuestos a responder todas mis preguntas. El proceso fue claro y transparente. Recomiendo totalmente AB Automotores.",
    date: "Hace un año",
  },
];

const HomeCounter: React.FC = React.memo(() => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

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
    <section id="home-counter" className="bg-[#0a0a0a] py-8 md:py-10">
      <div className="page-container flex flex-col md:flex-row items-stretch gap-6 md:gap-10">

        {/* Columna izquierda: contador + Google */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-4 shrink-0 md:w-44"
        >
          {/* Contador */}
          <div className="flex flex-col items-center text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="relative inline-flex items-start pl-5"
            >
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl md:text-4xl text-[#B62E30] font-extrabold leading-none">+</span>
              <span className="text-5xl md:text-6xl font-extrabold text-[#B62E30] leading-none">{count}</span>
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-1 text-sm md:text-base font-semibold text-white/70 tracking-wide"
            >
              años de trayectoria
            </motion.p>
            <div className="mt-2 w-8 h-[2px] bg-[#B62E30] rounded-full" />
          </div>
        </motion.div>

        {/* Divisor vertical */}
        <div className="hidden md:block w-px self-stretch bg-white/10 shrink-0" />

        {/* Columna derecha: carrusel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 min-w-0 flex items-center gap-2"
        >
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="shrink-0 w-8 h-8 rounded-full border border-[#B62E30] text-white text-lg flex items-center justify-center hover:bg-[#B62E30] transition-colors duration-200"
            aria-label="Anterior"
          >
            ‹
          </button>

          <div className="flex-1 min-w-0 overflow-hidden">
            <Swiper
              onSwiper={(s) => { swiperRef.current = s; }}
              modules={[Autoplay]}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 10 },
                1024: { slidesPerView: 3, spaceBetween: 12 },
              }}
              spaceBetween={10}
              loop={true}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
            >
              {reviews.map((review, i) => (
                <SwiperSlide key={i}>
                  <div className="h-[210px] bg-[#1E1E1E] border border-white/10 rounded-xl p-3 flex flex-col gap-2 hover:border-[#B62E30]/40 hover:shadow-[0_0_16px_rgba(182,46,48,0.10)] transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#B62E30] flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                        </svg>
                      </div>
                      <div className="ml-auto flex flex-col items-end gap-0.5 shrink-0">
                        <Link
                          href="https://www.google.com/maps/place/AB+Automotores/@-31.4346103,-64.1320892,15z/data=!4m8!3m7!1s0x9432bd24e9ecd915:0xa32ee5da0ccf6d8f!8m2!3d-31.4346103!4d-64.1320892!9m1!1b1!16s%2Fg%2F11bw4rvkx6?entry=ttu&g_ep=EgoyMDI0MTExMi4wIKXMDSoJLDEwMjExMjMzSAFQAw%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            src="https://ik.imagekit.io/automotoresab/public-source/GoogleReview.webp"
                            alt="Google Reviews"
                            width={60}
                            height={34}
                            className="hover:scale-105 transition-transform duration-200 opacity-85 hover:opacity-100"
                          />
                        </Link>
                        <span className="text-yellow-400 text-xs tracking-widest">★★★★★</span>
                      </div>
                    </div>

                    {/* Texto */}
                    <p className="text-white/70 text-xs leading-relaxed line-clamp-4 flex-1">
                      {review.text}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="shrink-0 w-8 h-8 rounded-full border border-[#B62E30] text-white text-lg flex items-center justify-center hover:bg-[#B62E30] transition-colors duration-200"
            aria-label="Siguiente"
          >
            ›
          </button>
        </motion.div>

      </div>
    </section>
  );
});

HomeCounter.displayName = "HomeCounter";

export default HomeCounter;
