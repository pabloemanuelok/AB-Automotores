"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// href null = todavia no existe la pagina propia del servicio (ver /gestoria).
const services = [
  {
    title: "Compraventa",
    href: "/views/catalogo",
    description: "Compramos y vendemos autos usados y 0km seleccionados en Córdoba, con precios publicados y papeles al día.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "Financiación",
    href: "/views/financiacion",
    description: "Financiamos hasta el 100% del vehículo con créditos prendarios y personales, solo con DNI o con demostración de ingresos.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75" />
      </svg>
    ),
  },
  {
    title: "Permutas",
    href: "/views/consignaciones",
    description: "Tomamos tu auto actual como parte de pago del que te llevás, con una tasación clara y en el momento.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    title: "Consignaciones",
    href: "/views/consignaciones",
    description: "Dejás tu auto en nuestro salón, lo publicamos, buscamos comprador y nos ocupamos de todos los trámites hasta el cobro.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
      </svg>
    ),
  },
  {
    title: "Gestoría",
    href: null,
    description: "Hacemos las transferencias, el formulario 08, las patentes y toda la documentación del vehículo.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    title: "Entrega inmediata",
    href: "/views/catalogo",
    description: "Los vehículos publicados están en stock y disponibles para retirar, sin esperas ni listas.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 4.5A3.5 3.5 0 1 0 7 11.5A3.5 3.5 0 1 0 7 4.5ZM10.5 8H20.5M17 8V11M14.5 8V10" />
      </svg>
    ),
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const Section3: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <p className="text-[#B62E30] text-sm font-semibold tracking-widest uppercase mb-3">
            Nuestros Servicios
          </p>
          <h2 className="text-gray-900 text-2xl md:text-3xl font-bold">
            Todo lo que necesitás para comprar o vender tu auto
          </h2>
          <div className="mt-2 mx-auto w-12 h-[3px] bg-[#B62E30] rounded-full" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {services.map((service) => {
            // El Link envuelve a la card y no al reves: framer propaga las variants
            // por contexto de React, asi que el stagger del padre sigue funcionando.
            const card = (
              <motion.div
                variants={cardVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`h-full flex flex-col gap-3 p-6 md:p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 ${
                  service.href ? "hover:border-[#B62E30]/40 cursor-pointer" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-[52px] h-[52px] flex items-center justify-center rounded-lg bg-red-50 text-[#B62E30] shrink-0">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base md:text-lg leading-tight">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );

            return service.href ? (
              <Link key={service.title} href={service.href} className="h-full">
                {card}
              </Link>
            ) : (
              <React.Fragment key={service.title}>{card}</React.Fragment>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Section3;
