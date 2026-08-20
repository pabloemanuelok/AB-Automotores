"use client";

import React from "react";
import { motion } from "framer-motion";

const SobreNosotros: React.FC = () => {
  return (
    <section className="bg-white py-6 md:py-12">
      <div className="page-container flex flex-col gap-8 md:gap-12">

        {/* Texto descriptivo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full flex flex-col items-center text-center"
        >
          <p className="text-[#B62E30] font-semibold text-sm md:text-base tracking-wide uppercase">
            Sobre Nosotros
          </p>

          <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
            Más de 20 años vendiendo autos en Córdoba
          </h2>

          <p className="mt-4 text-gray-600 text-sm md:text-base leading-relaxed">
            Somos una agencia de autos usados y 0km ubicada en Av. Amadeo Sabattini 4260,
            en el barrio Empalme de la ciudad de Córdoba. Desde 2003 acompañamos a compradores
            y vendedores de toda la provincia con asesoramiento personalizado, vehículos
            seleccionados y entrega inmediata.
          </p>
        </motion.div>

        {/* Subsecciones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 text-left"
        >
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              Vehículos seleccionados
            </h3>
            <p className="mt-2 text-gray-600 text-sm md:text-base leading-relaxed">
              Cada unidad que entra a nuestro salón pasa por una{" "}
              <strong>
                revisión de estado mecánico y documentación antes de publicarse. Además
                trabajamos con las mejores líneas de crédito del mercado y con los papeles al día
              </strong>
              , para que sepas exactamente qué estás comprando desde el primer momento.
            </p>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              Miembros de la Cámara de Comercio Automotor de Córdoba
            </h3>
            <p className="mt-2 text-gray-600 text-sm md:text-base leading-relaxed">
              Formamos parte de la <strong>Cámara de Comercio Automotor de Córdoba</strong>, la
              entidad que agrupa a las agencias y concesionarias habilitadas de la provincia. Es
              el respaldo de que operamos dentro del marco legal del rubro y que cada operación
              queda documentada como corresponde.
            </p>
          </div>
        </motion.div>

        {/* Grid de videos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4"
        >
          <div className="relative h-[420px] md:h-[560px] overflow-hidden rounded-xl sm:rounded-r-none">
            <video
              src="https://ik.imagekit.io/automotoresab/videos/videoBasaltSN.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="relative h-[420px] md:h-[560px] overflow-hidden rounded-xl sm:rounded-none">
            <video
              src="https://ik.imagekit.io/automotoresab/videos/videoRenegadeSN.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="relative h-[420px] md:h-[560px] overflow-hidden rounded-xl sm:rounded-l-none">
            <video
              src="https://ik.imagekit.io/automotoresab/videos/videoVerticalSN.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SobreNosotros;
