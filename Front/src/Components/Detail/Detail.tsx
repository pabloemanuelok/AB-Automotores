"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { IDetailsProps } from "@/Interfaces/Interface";
import { FaChevronLeft, FaChevronRight, FaWhatsapp, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import CtaBanner from "@/Components/CtaBanner/CtaBanner";
import { parseVehicleSpecs, parseNotas } from "@/utils/parseVehicleDescription";

const slideVariants = {
  enter: (dir: "left" | "right") => ({
    x: dir === "right" ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: "left" | "right") => ({
    x: dir === "right" ? -80 : 80,
    opacity: 0,
  }),
};

const SPEC_LABELS: { key: keyof ReturnType<typeof parseVehicleSpecs>; label: string }[] = [
  { key: "combustible", label: "Combustible" },
  { key: "motor", label: "Motor" },
  { key: "potencia", label: "Potencia" },
  { key: "transmision", label: "Transmisión" },
  { key: "traccion", label: "Tracción" },
  { key: "autonomia", label: "Autonomía Estimada" },
  { key: "velocidadMax", label: "Velocidad Máxima" },
  { key: "largo", label: "Largo" },
  { key: "ancho", label: "Ancho" },
  { key: "alto", label: "Alto" },
  { key: "tanque", label: "Capacidad del Tanque" },
  { key: "baul", label: "Capacidad del Baúl" },
];


const Detail: React.FC<IDetailsProps> = ({ product }) => {
  const specs = parseVehicleSpecs(product.description);
  const notas = parseNotas(product.description);
  const hasSpecs = !!specs.version || SPEC_LABELS.some(({ key }) => specs[key]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxZoomed, setLightboxZoomed] = useState(false);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleNextImage = useCallback(() => {
    setDirection("right");
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
    setLightboxZoomed(false);
  }, [product.images.length]);

  const handlePrevImage = useCallback(() => {
    setDirection("left");
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
    setLightboxZoomed(false);
  }, [product.images.length]);

  const handleThumbnailClick = (i: number) => {
    setDirection(i > currentImageIndex ? "right" : "left");
    setCurrentImageIndex(i);
  };

  const openLightbox = () => {
    if (product.images.length === 0) return;
    setLightboxZoomed(false);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxZoomed(false);
  };

  // Scroll thumbnail activo a la vista
  useEffect(() => {
    thumbnailRefs.current[currentImageIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [currentImageIndex]);

  // Escape key
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  // Block body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  // Swipe táctil con react-swipeable (carrusel principal)
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextImage,
    onSwipedRight: handlePrevImage,
    preventScrollOnSwipe: true,
    trackMouse: false,
    delta: 50,
    swipeDuration: 500,
  });

  // Swipe en el lightbox (solo cuando no está zoomeado)
  const lightboxSwipeHandlers = useSwipeable({
    onSwipedLeft: handleNextImage,
    onSwipedRight: handlePrevImage,
    preventScrollOnSwipe: !lightboxZoomed,
    trackMouse: false,
    delta: 60,
    swipeDuration: 500,
  });

  // Preload imágenes adyacentes
  useEffect(() => {
    const preload = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };
    const total = product.images.length;
    const next = product.images[(currentImageIndex + 1) % total];
    const prev = product.images[(currentImageIndex - 1 + total) % total];
    preload(next);
    if (prev !== next) preload(prev);
  }, [currentImageIndex, product.images]);

  return (
    <div className="bg-[#0a0a0a] pt-8 md:pt-12">
      <div className="page-container">

        {/* Botón volver */}
        <Link href="/views/catalogo">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 mb-5 text-sm text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FaChevronLeft size={12} />
            Volver al catálogo
          </motion.button>
        </Link>

        {/* ── Galería ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-xl overflow-hidden border border-[#505050] shadow-2xl flex h-[300px] sm:h-[380px] md:h-[450px] lg:h-[500px]"
        >
          {/* Imagen principal */}
          <div
            {...swipeHandlers}
            onClick={openLightbox}
            className="relative flex-1 bg-[#111111] overflow-hidden cursor-zoom-in select-none"
          >
            {product.images.length > 0 ? (
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentImageIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[currentImageIndex]}
                    alt={`Imagen ${currentImageIndex + 1} de ${product.name}`}
                    fill
                    className="object-contain"
                    priority={currentImageIndex === 0}
                    quality={85}
                    sizes="(max-width: 640px) calc(100vw - 80px), (max-width: 768px) calc(100vw - 96px), (max-width: 1280px) calc(90vw - 108px), 1100px"
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-500 text-sm">
                No hay imágenes disponibles
              </div>
            )}

            {/* Degradado inferior */}
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            {/* Controles de navegación */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                  aria-label="Imagen anterior"
                  className="absolute top-1/2 left-3 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-[#B62E30] border border-white/20 hover:border-[#B62E30] text-white flex items-center justify-center transition-all duration-200 shadow-lg z-10 backdrop-blur-sm"
                >
                  <FaChevronLeft size={12} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                  aria-label="Siguiente imagen"
                  className="absolute top-1/2 right-3 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-[#B62E30] border border-white/20 hover:border-[#B62E30] text-white flex items-center justify-center transition-all duration-200 shadow-lg z-10 backdrop-blur-sm"
                >
                  <FaChevronRight size={12} />
                </button>

                {/* Contador */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm tracking-wide">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail strip vertical - derecha */}
          {product.images.length > 1 && (
            <div className="flex flex-col gap-2 p-2 overflow-y-auto scrollbar-hide bg-[#111111] border-l border-[#505050] w-[72px] sm:w-[84px] md:w-[96px]">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  ref={(el) => { thumbnailRefs.current[i] = el; }}
                  onClick={() => handleThumbnailClick(i)}
                  className={`relative flex-shrink-0 w-full rounded-md overflow-hidden transition-all duration-200
                    ${i === currentImageIndex
                      ? "ring-2 ring-[#B62E30] ring-offset-1 ring-offset-[#111111] opacity-100"
                      : "opacity-40 hover:opacity-75 ring-1 ring-transparent hover:ring-[#505050]"
                    }`}
                  style={{ aspectRatio: "3/4" }}
                >
                  <Image
                    src={img}
                    alt={`Miniatura ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 72px, (max-width: 768px) 84px, 96px"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Info grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-4 mb-4 grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          {/* Card descripción (2/3) */}
          <div className="lg:col-span-2 bg-[#1E1E1E] border border-[#505050] rounded-xl p-6 lg:p-8 flex flex-col gap-5">

            {/* Título */}
            <div>
              <p className="text-[#B62E30] text-xs font-semibold tracking-widest uppercase mb-1">
                {product.year}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {product.name}
              </h2>
              <div className="mt-3 w-12 h-[3px] bg-[#B62E30] rounded-full" />
            </div>

            {/* Versión */}
            <p className="text-gray-300 text-base font-light">
              {product.version}
            </p>

            {/* Especificaciones técnicas */}
            {hasSpecs && (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-white text-sm font-semibold uppercase tracking-wide">
                    Especificaciones técnicas
                  </span>
                  <div className="flex-1 h-[1px] bg-[#505050]" />
                </div>
                {specs.version && (
                  <div className="bg-[#B62E30]/10 border border-[#B62E30]/40 rounded-lg px-4 py-3 mb-3">
                    <p className="text-[#B62E30] text-xs font-semibold uppercase tracking-wider mb-0.5">Versión</p>
                    <p className="text-white text-base font-semibold">{specs.version}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {SPEC_LABELS.filter(({ key }) => specs[key]).map(({ key, label }) => (
                    <div key={key} className="bg-[#141414] border border-[#383838] rounded-lg px-3 py-2.5">
                      <p className="text-gray-500 text-xs mb-0.5">{label}</p>
                      <p className="text-white text-sm font-medium">{specs[key]}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Card CTA (1/3) */}
          <div className="bg-[#1E1E1E] border border-[#505050] rounded-xl p-6 flex flex-col gap-2">
            <div className="flex flex-col gap-1.5">
              <div className="w-10 h-[3px] bg-[#B62E30] rounded-full" />
              <p className="text-white font-semibold text-base leading-snug">
                ¿Te interesa este vehículo?
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Consultanos sin compromiso. Te respondemos a la brevedad con toda la información.
              </p>
            </div>

            <Link
              href={`https://wa.me/5493516129221?text=Hola%2C+me+interesa+el+${encodeURIComponent(product.name)}+${product.year}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full px-6 py-2 bg-[#B62E30] hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg flex items-center justify-center gap-3 text-base"
              >
                <FaWhatsapp size={20} />
                Consultar por WhatsApp
              </motion.button>
            </Link>

            {notas ? (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-white text-sm font-semibold uppercase tracking-wide">
                    Descripción
                  </span>
                  <div className="flex-1 h-[1px] bg-[#505050]" />
                </div>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {notas}
                </p>
              </div>
            ) : null}
          </div>
        </motion.div>

      </div>

      <CtaBanner
        eyebrow="¿Necesitás ayuda con el pago?"
        title="Financiá este vehículo en cuotas"
        description="Trabajamos con las mejores entidades bancarias para que puedas llevarte tu auto con la financiación que más te convenga."
      />

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Botón cerrar */}
            <button
              onClick={closeLightbox}
              aria-label="Cerrar"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-[#B62E30] border border-white/20 hover:border-[#B62E30] text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            >
              <FaTimes size={16} />
            </button>

            {/* Contador */}
            {product.images.length > 1 && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm tracking-wide pointer-events-none">
                {currentImageIndex + 1} / {product.images.length}
              </div>
            )}

            {/* Contenedor de imagen con soporte de zoom */}
            <div
              {...(lightboxZoomed ? {} : lightboxSwipeHandlers)}
              className={`relative w-full h-full overflow-auto flex items-center justify-center ${
                lightboxZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              style={{ touchAction: lightboxZoomed ? "pan-x pan-y pinch-zoom" : "pan-y" }}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxZoomed((z) => !z);
              }}
            >
              <motion.div
                animate={{ scale: lightboxZoomed ? 2.5 : 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{
                  position: "relative",
                  width: "100vw",
                  height: "100vh",
                  transformOrigin: "center center",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={product.images[currentImageIndex]}
                  alt={`Imagen ${currentImageIndex + 1} de ${product.name}`}
                  fill
                  className="object-contain"
                  quality={95}
                  sizes="100vw"
                  priority
                />
              </motion.div>
            </div>

            {/* Flechas en lightbox */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                  aria-label="Imagen anterior"
                  className="absolute top-1/2 left-4 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-[#B62E30] border border-white/20 hover:border-[#B62E30] text-white flex items-center justify-center transition-all duration-200 shadow-lg z-20 backdrop-blur-sm"
                >
                  <FaChevronLeft size={14} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                  aria-label="Siguiente imagen"
                  className="absolute top-1/2 right-4 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-[#B62E30] border border-white/20 hover:border-[#B62E30] text-white flex items-center justify-center transition-all duration-200 shadow-lg z-20 backdrop-blur-sm"
                >
                  <FaChevronRight size={14} />
                </button>
              </>
            )}

            {/* Hint de zoom */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 text-white/40 text-xs pointer-events-none select-none">
              {lightboxZoomed ? "Toca para alejar" : "Toca para hacer zoom"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Detail;
