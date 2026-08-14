"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { trackEvent } from "@/utils/analytics";

const images = [
  { src: "https://ik.imagekit.io/automotoresab/public-source/2008Allure0Km.jpeg", alt: "Peugeot 2008 Allure 0km" },
  { src: "https://ik.imagekit.io/automotoresab/public-source/ManijaYaris.webp", alt: "Manija Yaris" },
  { src: "https://ik.imagekit.io/automotoresab/public-source/Central208.webp", alt: "Central multimedia 208" },
  { src: "https://ik.imagekit.io/automotoresab/public-source/NivusFrente.webp", alt: "Frente del Nivus" },
];

// Las tres modalidades del hasOfferCatalog del schema, en el mismo orden.
const infoBlocks: { title: string; text: React.ReactNode }[] = [
  {
    title: "Consignación",
    text: (
      <>
        Dejás tu auto en nuestro salón de Av. Amadeo Sabattini 4260, lo publicamos en los
        principales portales y en nuestras redes, y nos ocupamos de atender a los interesados y
        de mostrar el vehículo. Vos no tenés que recibir desconocidos ni coordinar visitas.
        Cuando aparece el comprador, cerramos la operación y cobrás en el acto.
      </>
    ),
  },
  {
    title: "Compra directa",
    text: (
      <>
        Si necesitás resolver rápido, te lo compramos nosotros. Tasamos el vehículo sin cargo, te
        hacemos una oferta en el momento y, si estás de acuerdo, la operación se cierra sin que
        tengas que esperar a que aparezca un comprador.
      </>
    ),
  },
  {
    title: "Permuta y parte de pago",
    text: (
      <>
        Si lo que querés es cambiar de auto, tomamos el tuyo como parte de pago de cualquier
        vehículo de{" "}
        <Link href="/autos-usados" className="text-[#B62E30] hover:underline">
          nuestro catálogo
        </Link>
        . Tasamos el usado, lo descontamos del precio del que te llevás y, si queda diferencia,
        la podés{" "}
        <Link href="/financiacion" className="text-[#B62E30] hover:underline">
          financiar
        </Link>
        .
      </>
    ),
  },
];

const Consignaciones = () => {
  useEffect(() => { trackEvent("consignaciones"); }, []);

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
              Sin complicaciones
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
              Vendé tu vehículo con nosotros
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
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default Consignaciones;
