"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCar, FaMoneyBillWave, FaClipboardList, FaKey, FaExchangeAlt, FaHandshake } from "react-icons/fa";

const services = [
  { icon: FaCar,            label: "Vehículos\nSeleccionados" },
  { icon: FaMoneyBillWave,  label: "Financiación" },
  { icon: FaClipboardList,  label: "Gestoría" },
  { icon: FaKey,            label: "Entrega\nInmediata" },
  { icon: FaExchangeAlt,    label: "Permutas" },
  { icon: FaHandshake,      label: "Consignaciones" },
];

const Section3: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="page-container">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Nuestros Servicios
          </h2>
          <div className="mt-2 mx-auto w-12 h-[3px] bg-[#B62E30] rounded-full" />
        </motion.div>

        {/* Íconos de servicios */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-14">
          {services.map(({ icon: Icon, label }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
              className="flex flex-col items-center gap-3 group cursor-default"
            >
              <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border border-gray-300 text-gray-900 transition-all duration-300 group-hover:border-[#B62E30] group-hover:text-[#B62E30] group-hover:shadow-md group-hover:scale-110">
                <Icon className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <span className="text-xs md:text-sm font-semibold text-gray-900 text-center leading-tight whitespace-pre-line group-hover:text-[#B62E30] transition-colors duration-300">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section3;
