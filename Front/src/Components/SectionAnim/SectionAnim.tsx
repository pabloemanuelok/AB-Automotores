"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import LogoSinFondo from "@/Assets/LogoSinFondo.webp";
import { motion } from "framer-motion";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const reviews = [
  {
    name: "Martín González",
    text: "Excelente atención desde el primer momento. Me asesoraron muy bien para elegir mi auto y el proceso fue rápido y transparente. Muy recomendable.",
    date: "Hace 2 semanas",
    avatar: null,
  },
  {
    name: "Laura Pérez",
    text: "Compré mi primer auto con ellos y quedé muy contenta. El equipo es muy profesional y se nota la experiencia de años en el rubro. ¡Gracias!",
    date: "Hace 1 mes",
    avatar: null,
  },
  {
    name: "Carlos Romero",
    text: "Me ayudaron con la financiación sin problemas. Tienen mucha variedad de vehículos y los precios son acordes al mercado. Volvería a comprar acá.",
    date: "Hace 3 semanas",
    avatar: null,
  },
  {
    name: "Sofía Herrera",
    text: "El trato fue excelente. Sentí confianza desde el inicio, explicaron todo muy bien y el auto estaba en perfectas condiciones. 100% recomendado.",
    date: "Hace 2 meses",
    avatar: null,
  },
  {
    name: "Diego Fernández",
    text: "Muy buena experiencia. Consulté varias concesionarias y esta fue la que mejor atención me brindó. El trámite fue sencillo y sin sorpresas.",
    date: "Hace 1 mes",
    avatar: null,
  },
  {
    name: "Ana Castillo",
    text: "Consigné mi vehículo con ellos y fue todo muy profesional. Rápidos, honestos y con mucha experiencia. Sin dudas los volvería a elegir.",
    date: "Hace 3 meses",
    avatar: null,
  },
  {
    name: "Roberto Sosa",
    text: "Vendí mi camioneta a través de ellos y el proceso fue transparente y rápido. Buenos precios y gente muy honesta. Los recomiendo sin dudar.",
    date: "Hace 2 semanas",
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
      <div className="page-container relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Contador */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative flex flex-col items-center md:items-start shrink-0"
        >
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none select-none flex items-center justify-center">
            <Image src={LogoSinFondo} alt="" aria-hidden width={260} className="object-contain" />
          </div>
          <span className="relative text-7xl md:text-9xl font-extrabold text-white tracking-tight leading-none">
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

        {/* Carrusel de reseñas */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex-1 min-w-0"
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="shrink-0 w-8 h-8 rounded-full border border-white/60 text-white text-xl flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Anterior"
            >
              ‹
            </button>
            <div className="flex-1 min-w-0 overflow-hidden [&_.swiper-wrapper]:!items-stretch">
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
                centeredSlides={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
              >
                {reviews.map((review, i) => (
                  <SwiperSlide key={i} className="!h-auto">
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
                        <span className="text-white font-semibold text-xs leading-tight line-clamp-1">{review.name}</span>
                      </div>
                      <div className="text-yellow-300 text-xs tracking-widest">★★★★★</div>
                      <p className="text-white/90 text-xs leading-relaxed flex-1">{review.text}</p>
                      <p className="text-white/50 text-[10px]">{review.date}</p>
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

        {/* Info lateral */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center md:items-end gap-4 shrink-0"
        >
          <p className="text-white/80 text-lg md:text-xl font-medium whitespace-nowrap">
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
