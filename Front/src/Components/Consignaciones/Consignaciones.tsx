"use client";

import React, { useRef, Suspense } from "react";
import { motion, useInView } from "framer-motion";

const Consignacion = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Animación activada solo una vez
  const animationSettings = {
    type: "spring",
    stiffness: 22,
    duration: 2,
  };

  return (
    <div className="m-4 my-4 flex items-center justify-center">
      <div className="w-full flex justify-center sm:w-[100%] p-6 rounded-lg shadow-2xl bg-white">
        <div className=" w-[88%] relative lg:flex items-center lg:gap-8" ref={ref}>
          {/* Imágenes a la izquierda */}
          {isInView && (
            <motion.div
              className="relative w-full sm:w-[30%] md:w-[20%] flex-shrink-0 hidden md:block"
              initial={{ x: "-100vw" }}
              animate={{ x: "0%" }}
              transition={{
                ...animationSettings,
                delay: 0.1, // Ligeramente después del texto
              }}
            >
              <div className="space-y-[-105px]">
                <Suspense fallback={<div>Loading images...</div>}>
                  <motion.img
                    src="/source/VentoCostado.webp"
                    alt="Volkswagen Vento"
                    className="w-full h-auto object-contain transform scale-x-[1] motion-blur"
                    animate={{
                      filter: ["blur(5px)", "blur(0px)"],
                    }}
                    transition={{
                      duration: 1,
                    }}
                    loading="lazy"
                  />
                  <motion.img
                    src="/source/MustangCostado.webp"
                    alt="Ford Mustang"
                    className="w-full h-auto object-contain transform scale-x-[-1] motion-blur"
                    animate={{
                      filter: ["blur(5px)", "blur(0px)"],
                    }}
                    transition={{
                      duration: 1,
                    }}
                    loading="lazy"
                  />
                  <motion.img
                    src="/source/ToroCostado.webp"
                    alt="Fiat Toro"
                    className="w-full h-auto object-contain transform scale-x-[-1] motion-blur"
                    animate={{
                      filter: ["blur(5px)", "blur(0px)"],
                    }}
                    transition={{
                      duration: 1,
                    }}
                    loading="lazy"
                  />
                </Suspense>
              </div>
            </motion.div>
          )}

          {/* Texto a la derecha */}
          {isInView && (
            <motion.div
              className="flex-1 pl-8"
              initial={{ x: "-100vw" }}
              animate={{ x: "0%" }}
              transition={{
                ...animationSettings,
                delay: 0.1, // Apenas antes de las imágenes
              }}
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
        </div>
      </div>
    </div>
  );
};

export default Consignacion;
