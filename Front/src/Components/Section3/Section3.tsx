"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaCar,
  FaMoneyBillWave,
  FaClipboardList,
  FaKey,
  FaExchangeAlt,
  FaHandshake,
} from "react-icons/fa";

const services = [
  {
    icon: FaCar,
    label: "Vehículos Seleccionados",
    description:
      "Contamos con un stock cuidadosamente seleccionado de vehículos en excelente estado. Cada auto pasa por un control de calidad antes de estar disponible para la venta.",
  },
  {
    icon: FaMoneyBillWave,
    label: "Financiación",
    description:
      "Te ofrecemos las mejores líneas de crédito con entidades bancarias líderes. Financiamos hasta el 100% del vehículo, con o sin demostración de ingresos.",
  },
  {
    icon: FaClipboardList,
    label: "Gestoría",
    description:
      "Nos ocupamos de todos los trámites de transferencia y documentación para que vos solo te preocupes de disfrutar tu nuevo auto.",
  },
  {
    icon: FaKey,
    label: "Entrega Inmediata",
    description:
      "Retirás tu vehículo el mismo día que cerrás el trato. Garantizamos una entrega ágil, sin demoras ni burocracia innecesaria.",
  },
  {
    icon: FaExchangeAlt,
    label: "Permutas",
    description:
      "Permutamos tu vehículo actual por el que más te guste de nuestro stock. Valuamos tu auto de forma justa y transparente.",
  },
  {
    icon: FaHandshake,
    label: "Consignaciones",
    description:
      "Si querés vender tu auto, lo recibimos en consignación y nos encargamos de publicarlo y encontrar comprador. Cobrás en el acto una vez cerrada la operación.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
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
            Lo que ofrecemos
          </p>
          <h2 className="text-gray-900 text-2xl md:text-3xl font-bold">
            Nuestros Servicios
          </h2>
          <div className="mt-2 mx-auto w-12 h-[3px] bg-[#B62E30] rounded-full" />
          <p className="mt-4 text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Más de 23 años acompañando a cada cliente desde la búsqueda del vehículo
            ideal hasta el último trámite, con honestidad y compromiso en cada paso.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {services.map(({ icon: Icon, label, description }, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative rounded-xl bg-white border border-gray-200 hover:border-[#B62E30] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(182,46,48,0.15)] group cursor-default"
            >
              <div className="h-[3px] w-full overflow-hidden">
                <div className="h-full w-full bg-[#B62E30] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#B62E30]/10 text-[#B62E30] group-hover:bg-[#B62E30] group-hover:text-white transition-all duration-300 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-gray-900 group-hover:text-[#B62E30] font-bold text-base md:text-lg leading-snug transition-colors duration-300">
                    {label}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Section3;
