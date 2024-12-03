"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const Consignacion = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Animación activada solo una vez
  const animationSettings = {
    type: "spring",
    stiffness: 22,
    duration: 2,
  };

  return (
    <div className="my-4 flex items-center justify-center md:px-4">
      <div className="w-[84%] p-6 rounded-lg shadow-2xl bg-white">
        <div className="relative lg:flex lg:items-center lg:gap-8" ref={ref}>
          {/* Contenedor de texto a la izquierda */}
          {isInView && (
            <motion.div
              className="flex-1 pl-8"
              initial={{ x: "-100vw" }} // Fuera del borde izquierdo
              animate={{ x: "0%" }} // Llega a su posición final
              transition={{ ...animationSettings, delay: 0.05 }} // Retraso para que entren primero las imágenes
            >
              <div className="border-l-4 border-red-500 pl-4 mb-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  ¿Querés vender tu auto?
                </h2>
                <p className="text-gray-600">
                  Nosotros te ayudamos, nos encargamos de todas las gestiones y trámites para que no tengas que preocuparte de nada. Ahorra tiempo y dinero con nosotros.
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-4 mt-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Compra Directa
                </h2>
                <p className="text-gray-600">
                  Si querés vender tu auto de una forma rápida y segura, te lo compramos y te ofrecemos un precio competitivo, siempre que el vehículo esté en buenas condiciones.
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-4 mt-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Consignaciones
                </h2>
                <p className="text-gray-600">
                  Te gestionamos la venta: dejá tu auto en nuestra agencia, lo publicamos en todos los portales de venta online y buscamos comprador. Una vez encontrado, lo cobrás en el acto.
                </p>
              </div>
            </motion.div>
          )}

          {/* Camionetas a la derecha */}
          {isInView && (
            <motion.div
              className="relative w-[30%] md:w-[20%] flex-shrink-0"
              initial={{ x: "-100vw" }}
              animate={{ x: "0%" }}
              transition={animationSettings}
            >
              <div className="space-y-[-35px]">
                <Image
                  src="/source/VentoCostado.webp"
                  alt="Volkswagen Vento"
                  className="w-full h-auto object-contain transform scale-x-[1]"
                  width={500}
                  height={300}
                  priority
                />
                <Image
                  src="/source/MustangCostado.webp"
                  alt="Ford Mustang"
                  className="w-full h-auto object-contain transform scale-x-[-1]"
                  width={500}
                  height={300}
                  priority
                />
                <Image
                  src="/source/ToroCostado.webp"
                  alt="Fiat Toro"
                  className="w-full h-auto object-contain transform scale-x-[-1]"
                  width={500}
                  height={300}
                  priority
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Consignacion;
