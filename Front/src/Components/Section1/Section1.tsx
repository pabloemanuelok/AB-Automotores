"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import colaDeBmw from "@/Assets/colaDeBmw.jpeg";

const images = [
  { src: "/source/Frente20081.svg", alt: "Frente del vehículo" },
  { src: "/source/InteriorJeep2.svg", alt: "Interior del Jeep" },
  { src: colaDeBmw, alt: "Cola del BMW" },
];

const ImageGallery: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="page-container py-6 md:py-10"
    >
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={16}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        navigation
        breakpoints={{
          0: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[240px] md:h-[360px] rounded-xl overflow-hidden bg-gray-900">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default ImageGallery;
