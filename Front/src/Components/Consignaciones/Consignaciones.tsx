"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { trackEvent } from "@/utils/analytics";
import CtaBanner from "@/Components/CtaBanner/CtaBanner";

const images = [
  { src: "https://ik.imagekit.io/automotoresab/public-source/2008Allure0Km.jpeg", alt: "Peugeot 2008 Allure 0km" },
  { src: "https://ik.imagekit.io/automotoresab/public-source/ManijaYaris.webp", alt: "Manija Yaris" },
  { src: "https://ik.imagekit.io/automotoresab/public-source/Central208.webp", alt: "Central multimedia 208" },
  { src: "https://ik.imagekit.io/automotoresab/public-source/NivusFrente.webp", alt: "Frente del Nivus" },
];

const infoBlocks = [
  {
    title: "¿Querés vender tu auto?",
    text: "Nos encargamos de todas las gestiones y trámites para que no tengas que preocuparte de nada. Ahorrá tiempo y dinero con nosotros.",
  },
  {
    title: "Compra Directa",
    text: "Si querés vender tu auto de forma rápida y segura, te lo compramos y te ofrecemos un precio competitivo, siempre que el vehículo esté en buenas condiciones.",
  },
  {
    title: "Consignaciones",
    text: "Dejá tu auto en nuestra agencia, lo publicamos en todos los portales de venta online y buscamos comprador. Una vez encontrado, lo cobrás en el acto.",
  },
];

const Consignaciones = () => {
  useEffect(() => { trackEvent("consignaciones"); }, []);

  return (
    <div className="bg-white">
      <section className="py-10 md:py-20">
        <div className="page-container flex flex-col md:flex-row items-stretch gap-8 md:gap-12">

          {/* Recuadro de fotos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full md:w-1/3 shrink-0 rounded-xl overflow-hidden h-[280px] md:h-auto"
          >
            <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full h-full">
              {images.map((img, i) => (
                <div key={i} className="relative w-full h-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 17vw"
                  />
                </div>
              ))}
            </div>
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

      <CtaBanner
        eyebrow="Consultá sin compromiso"
        title="¿Querés saber cuánto vale tu vehículo?"
        description="Contactanos y te damos una tasación gratuita. Te asesoramos para que vendas al mejor precio."
      />
    </div>
  );
};

export default Consignaciones;
