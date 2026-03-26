"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { IProduct } from "@/Interfaces/Interface";
import "swiper/css";
import "swiper/css/navigation";

const DESTACADOS_IDS_KEY = "ab_destacados_ids";
const DESTACADOS_LABEL_KEY = "ab_destacados_label";

const FALLBACK_DESTACADOS = [
  { id: "6761b3da7c18494e3a625bc8", name: "Volkswagen Nivus" },
  { id: "6761b28e7c18494e3a625bbb", name: "Peugeot 2008" },
  { id: "6761af537c18494e3a625b98", name: "Chevrolet Tracker" },
  { id: "6761b0aa7c18494e3a625ba5", name: "Chevrolet S10 Z71" },
  { id: "6761b3257c18494e3a625bc1", name: "Toyota Hilux" },
  { id: "672d1f9bc80004605ddffb50", name: "Volkswagen Taos" },
];

const VehDestacados = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [label, setLabel] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDestacados = async () => {
      try {
        const savedLabel = localStorage.getItem(DESTACADOS_LABEL_KEY);
        if (savedLabel) setLabel(savedLabel);

        const savedIds: string[] = JSON.parse(
          localStorage.getItem(DESTACADOS_IDS_KEY) ?? "[]"
        );

        const res = await fetch("https://ab-backend-iznbqeqe7a-uc.a.run.app/products");
        const allProducts: IProduct[] = await res.json();

        if (savedIds.length > 0) {
          // Filter by saved IDs, preserving selection order
          const map = new Map(allProducts.map((p) => [p._id, p]));
          const selected = savedIds
            .map((id) => map.get(id))
            .filter((p): p is IProduct => !!p);
          setProducts(selected.length > 0 ? selected : allProducts.slice(0, 6));
        } else {
          // Fallback: try to match legacy hardcoded IDs, else show first 6
          const fallbackIds = FALLBACK_DESTACADOS.map((f) => f.id);
          const matched = allProducts.filter((p) => fallbackIds.includes(p._id));
          setProducts(matched.length > 0 ? matched : allProducts.slice(0, 6));
        }
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadDestacados();
  }, []);

  return (
    <section className="bg-[#0a0a0a] py-12 md:py-16">
      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="page-container mb-8 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Vehículos Destacados
        </h2>
        <div className="mt-2 w-12 h-[3px] bg-[#B62E30] rounded-full mx-auto" />
        {label && (
          <p className="text-gray-400 text-sm mt-3">{label}</p>
        )}
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="page-container"
      >
        {loading ? (
          <div className="flex justify-center py-16">
            <svg className="animate-spin w-8 h-8 text-[#B62E30]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No hay vehículos destacados disponibles.</p>
        ) : (
          <Swiper
            modules={[Navigation]}
            navigation
            loop={products.length > 3}
            spaceBetween={16}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 12 },
              768: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
              1440: { slidesPerView: 4, spaceBetween: 24 },
            }}
          >
            {products.map((product, index) => (
              <SwiperSlide key={product._id}>
                <Link href={`/views/details/${product._id}`} passHref>
                  <div className="relative overflow-hidden rounded-xl bg-gray-900 shadow-lg group cursor-pointer">
                    <div className="absolute top-4 -left-6 z-10 bg-[#B62E30] text-white text-xs font-semibold px-8 py-1 rotate-[-35deg] shadow-md">
                      Destacado
                    </div>
                    <div className="relative w-full h-52 md:h-64">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          priority={index === 0}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-[#111] text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-base md:text-lg font-semibold text-white">{product.name}</h3>
                      <p className="text-sm text-gray-300 mt-0.5">{product.version} · {product.year}</p>
                      <p className="text-sm text-red-500 font-medium mt-1">Ver información →</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </motion.div>
    </section>
  );
};

export default VehDestacados;
