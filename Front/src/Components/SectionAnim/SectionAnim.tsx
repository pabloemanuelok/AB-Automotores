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
    avatar: null,
  },
  {
    name: "Lucas Bustos",
    text: "Excelente atención. El vehículo en muy buen estado, siempre fueron sinceros y sin vueltas. En menos de una semana me hicieron todos los trámites y me entregaron el vehículo. Seriedad al 100%. Los recomiendo sin dudas.",
    date: "Hace un año",
    avatar: null,
  },
  {
    name: "Jorge Barra",
    text: "Desde que llegamos hasta que nos llevamos el vehículo, Fabrizio nos atendió de forma impecable. Siempre asesorados y todo tal como lo pactamos. El vehículo muy bien, como se veía. Muy confiable.",
    date: "Hace 9 meses",
    avatar: null,
  },
  {
    name: "Gustavo Cayata",
    text: "Excelente trato, muy buena predisposición. Genera mucha confianza. Muy satisfecho con la compra.",
    date: "Hace un año",
    avatar: null,
  },
  {
    name: "Daniel Quintana",
    text: "Excelente atención y servicio. Mucha calidez humana. Muy recomendable.",
    date: "Hace un año",
    avatar: null,
  },
  {
    name: "Fabian Soria",
    text: "Nunca me animaba a comprar en Córdoba capital, pero en AB Automotores fue todo lo contrario. La atención como si me conocieran de años. Tuve un problema mecánico y ellos se hicieron cargo. Excelente atención personalizada, de confianza y de palabra. ¡Gracias Fabricio!",
    date: "Hace un año",
    avatar: null,
  },
  {
    name: "Diego Posada",
    text: "Mi experiencia fue excelente. Desde el primer momento sentí honestidad y confianza. La atención fue impecable, siempre con buena onda y dispuestos a responder todas mis preguntas. El proceso fue claro y transparente. Recomiendo totalmente AB Automotores.",
    date: "Hace un año",
    avatar: null,
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
    <section
      id="home-counter"
      className="relative bg-[#B62E30] py-12 md:py-16 overflow-hidden"
    >
      <div className="page-container relative z-10 flex flex-col md:flex-row items-stretch gap-8">
        {/* Columna izquierda: stats */}
        <div className="flex flex-col items-center md:justify-between gap-6 md:gap-0 md:h-[280px] shrink-0">
          {/* Contador */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative flex flex-col items-center w-full"
          >
            <span className="relative inline-block pl-8 md:pl-12 text-yellow-400 font-extrabold tracking-tight leading-none">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl md:text-8xl">+</span>
              <span className="text-5xl md:text-9xl">{count}</span>
            </span>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-2 text-lg md:text-3xl font-semibold text-white/90 tracking-wide"
            >
              años de trayectoria
            </motion.p>
          </motion.div>

          {/* Clientes + Google */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center gap-4 w-full"
          >
            <p className="text-white/80 text-lg md:text-xl font-medium whitespace-nowrap">
              + 5,000 clientes satisfechos
            </p>
            <div className="flex items-center gap-4 justify-center">
              <span className="text-yellow-300 text-xl tracking-widest">★★★★★</span>
              <Link
                href="https://www.google.com/maps/place/AB+Automotores/@-31.4346103,-64.1320892,15z/data=!4m8!3m7!1s0x9432bd24e9ecd915:0xa32ee5da0ccf6d8f!8m2!3d-31.4346103!4d-64.1320892!9m1!1b1!16s%2Fg%2F11bw4rvkx6?entry=ttu&g_ep=EgoyMDI0MTExMi4wIKXMDSoJLDEwMjExMjMzSAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/source/GoogleReview.webp"
                  alt="Google Reviews"
                  width={120}
                  height={68}
                  className="hover:scale-110 transition-transform duration-200"
                  priority
                />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Columna derecha: carrusel de reseñas */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex-1 min-w-0 w-full"
        >
          <div className="flex items-center gap-2 h-[240px] md:h-[280px]">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="shrink-0 w-8 h-8 rounded-full border border-white/60 text-white text-xl flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Anterior"
            >
              ‹
            </button>
            <div className="flex-1 min-w-0 overflow-hidden h-full [&_.swiper-wrapper]:!items-stretch">
              <Swiper
                className="h-full"
                onSwiper={(s) => { swiperRef.current = s; }}
                modules={[Autoplay]}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 10 },
                  1024: { slidesPerView: 3, spaceBetween: 12 },
                }}
                spaceBetween={10}
                loop={true}
                centeredSlides={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
              >
                {reviews.map((review, i) => (
                  <SwiperSlide key={i}>
                    <div className="border border-white/60 rounded-xl shadow-md hover:shadow-white/20 hover:shadow-lg hover:brightness-110 transition-all duration-200 p-5 flex flex-col gap-3 h-full">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-white/20 border border-white/40 flex items-center justify-center shrink-0 overflow-hidden">
                          {review.avatar ? (
                            <Image
                              src={review.avatar}
                              alt={review.name}
                              width={36}
                              height={36}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 text-white/70"
                            >
                              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                            </svg>
                          )}
                        </div>
                        <span className="text-white font-semibold text-sm leading-tight line-clamp-1">{review.name}</span>
                      </div>
                      <div className="text-yellow-300 text-sm tracking-widest">★★★★★</div>
                      <div className="review-scroll flex-1 overflow-y-auto pr-1">
                        <p className="text-white/90 text-sm leading-relaxed">{review.text}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="shrink-0 w-8 h-8 rounded-full border border-white/60 text-white text-xl flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Siguiente"
            >
              ›
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

HomeCounter.displayName = "HomeCounter";

export default HomeCounter;
