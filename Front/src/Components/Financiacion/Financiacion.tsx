"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { trackEvent } from "@/utils/analytics";
import { ENTIDADES } from "@/lib/financiacion";

const images = [
  { src: "https://ik.imagekit.io/automotoresab/public-source/Frente20081.svg", alt: "Frente del vehículo" },
  { src: "https://ik.imagekit.io/automotoresab/public-source/InteriorJeep2.svg", alt: "Interior del Jeep" },
  { src: "https://ik.imagekit.io/automotoresab/public-source/colaYaris.jpeg", alt: "Cola del Yaris" },
  { src: "https://ik.imagekit.io/automotoresab/public-source/pomoCompass.jpeg", alt: "Pomo Compass" },
];

// Las cifras de cada entidad salen de lib/financiacion.ts: la tarjeta muestra
// solo los campos que esten cargados, asi la seccion no depende de tener los
// numeros confirmados para publicarse.
const Entidades = () => (
  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
    {ENTIDADES.map((entidad) => {
      const datos = [
        entidad.tipo,
        entidad.requisito,
        entidad.porcentaje,
        entidad.monto,
        entidad.cuotas,
      ].filter(Boolean);

      return (
        <div
          key={entidad.nombre}
          className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-left"
        >
          <p className="text-gray-900 font-semibold text-sm md:text-base">{entidad.nombre}</p>
          {datos.length > 0 && (
            <ul className="mt-1 flex flex-col gap-0.5">
              {datos.map((dato) => (
                <li key={dato} className="text-gray-600 text-xs md:text-sm">
                  {dato}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    })}
  </div>
);

const infoBlocks: { title: string; text: string; extra?: React.ReactNode }[] = [
  {
    title: "Si no llegás con el efectivo, podés financiarlo",
    text: "Todas nuestras líneas arrancan con el DNI: los créditos prendarios se resuelven solo con eso, y los personales van con DNI o recibo de sueldo. Todos nuestros créditos son con entrega inmediata: el auto ya está en el salón y se retira apenas se aprueba la operación y se completan los papeles. También recibimos tarjetas de crédito.",
  },
  {
    title: "Trabajamos con estas entidades",
    text: "Los créditos prendarios los trabajamos con Banco Supervielle y Banco Galicia, y se resuelven solo con el DNI. Los créditos personales, con Banco de Córdoba y Banco Nación, van con DNI o recibo de sueldo. Cada entidad maneja sus propias condiciones de monto, plazo y porcentaje financiable, y todas las operaciones quedan sujetas a evaluación crediticia. Sobre el vehículo que elijas te confirmamos qué línea te sirve y cuánto queda de cuota.",
    extra: <Entidades />,
  },
  {
    title: "Averiguá tu crédito disponible",
    text: "Podés financiar hasta el 100% del vehículo que elijas. Escribinos contándonos qué modelo te interesa y cómo estás de ingresos (si tenés recibo de sueldo, si sos monotributista, si vas a entregar un usado como parte de pago) y te decimos qué línea te conviene y cuánto te queda de cuota. La consulta es sin cargo y no te compromete a nada.",
  },
];

const Financiacion = () => {
  useEffect(() => { trackEvent("financiacion"); }, []);

  return (
    // overflow-x-hidden: la columna de texto entra animada desde x:30 y hasta
    // que dispara el whileInView asoma fuera del viewport en mobile.
    <div className="bg-white overflow-x-hidden">
      <section className="py-10 md:py-20">
        <div className="page-container flex flex-col md:flex-row items-stretch gap-8 md:gap-12">

          {/* Carrusel de fotos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full md:w-1/3 shrink-0 rounded-xl overflow-hidden h-[280px] md:h-auto"
          >
            <Swiper
              modules={[Autoplay, Navigation]}
              loop
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              navigation
              className="h-full"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={index === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full md:flex-1 flex flex-col text-center md:text-left"
          >
            <p className="text-[#B62E30] font-semibold text-sm md:text-base tracking-widest uppercase">
              Opciones flexibles
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
              Financiá tu próximo auto
            </h2>
            <div className="mt-2 w-12 h-[3px] bg-[#B62E30] rounded-full mx-auto md:mx-0" />

            <div className="mt-6 flex flex-col gap-6">
              {infoBlocks.map((block, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                >
                  <h3 className="text-gray-900 font-bold text-lg md:text-xl mb-1">{block.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{block.text}</p>
                  {block.extra}
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default Financiacion;
