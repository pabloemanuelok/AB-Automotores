"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Consignacion = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Solo se activa la animación una vez

  return (
    <div className="my-4 flex items-center justify-center md:px-4">
      <div className="w-[84%] p-6 rounded-lg shadow-2xl bg-white mr-2">
        <div className="relative lg:flex lg:items-center lg:gap-8" ref={ref}>
          {/* Contenedor de texto a la izquierda */}
          {isInView && (
            <motion.div
              className="flex-1 pl-8"
              initial={{ x: "-100vw" }} // Empieza fuera del borde izquierdo de la pantalla
              animate={{ x: "0%" }} // Llega a su posición final
              transition={{
                type: "spring",
                stiffness: 22,
                duration: 2,
                delay: 0.05, // Retardo para que las camionetas entren primero
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

          {/* Camionetas que acompañan el contenido a la derecha */}
          {isInView && (
            <motion.div
              className="relative w-[30%] md:w-[20%] flex-shrink-0"
              initial={{ x: "-100vw" }} // Empieza fuera del borde izquierdo de la pantalla
              animate={{ x: "0%" }} // Llega a su posición final
              transition={{
                type: "spring",
                stiffness: 22,
                duration: 2,
              }}
            >
              <div className="space-y-[-35px]">
                <img
                  src="/source/VentoCostado.webp"
                  alt="Camioneta"
                  className="w-full h-auto object-contain transform scale-x-[1]" // Volteada horizontalmente
                />
                <img
                  src="/source/MustangCostado.webp"
                  alt="Camioneta"
                  className="w-full h-auto object-contain transform scale-x-[-1]" // Volteada horizontalmente
                />
                <img
                  src="/source/ToroCostado.webp"
                  alt="Camioneta"
                  className="w-full h-auto object-contain transform scale-x-[-1]" // Volteada horizontalmente
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
