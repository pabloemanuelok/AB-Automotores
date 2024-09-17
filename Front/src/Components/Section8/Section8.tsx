import React from "react";
import Image from "next/image";
import image1 from "@/Assets/tasacion 1.png";
import image2 from "@/Assets/pago instantaneo 7 1.png";
import image3 from "@/Assets/vende seguro 7 1.png";
import image4 from "@/Assets/gestoria (1) 1.png";
import image5 from "@/Assets/evitá estafas 9 1.png";

const Section8 = () => {
  return (
    <div className="bg-Negro min-h-[300px] flex items-center my-4 p-4 md:m-4">
      <div className="flex md:flex-row w-full">
        {/* Contenedor de la izquierda */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 mb-4 md:mb-0">
          <h2 className="text-white text-2xl md:text-4xl text-center md:text-left mb-4">
            ¿Querés vender tu auto? <br /> Nosotros te ayudamos
          </h2>
          {/* Contenedor de imágenes en una cuadrícula */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6 justify-center">
            <div className="flex flex-col items-center">
              <Image
                src={image1}
                alt="Tasación en el acto"
                width={40}
                height={50}
                className="object-cover"
              />
              <span className="text-white text-center text-xs md:text-sm mt-2">
                Tasación <br /> en el acto
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src={image2}
                alt="Cobro instantáneo"
                width={40}
                height={50}
                className="object-cover"
              />
              <span className="text-white text-center text-xs md:text-sm mt-2">
                Cobro <br /> instantáneo
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src={image3}
                alt="Vendé de manera segura"
                width={40}
                height={50}
                className="object-cover"
              />
              <span className="text-white text-center text-xs md:text-sm mt-2">
                Vendé de <br /> manera segura
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src={image4}
                alt="Servicio de gestoria"
                width={40}
                height={50}
                className="object-cover"
              />
              <span className="text-white text-center text-xs md:text-sm mt-2">
                Servicio de <br /> gestoria
              </span>
            </div>
            <div className="flex flex-col items-center col-span-2 md:col-span-1">
              <Image
                src={image5}
                alt="Evitá estafas"
                width={45}
                height={50}
                className="object-cover"
              />
              <span className="text-white text-center text-xs md:text-sm mt-2">
                Evitá <br /> estafas
              </span>
            </div>
          </div>
        </div>

        {/* Contenedor de la derecha */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center px-4 md:px-8 space-y-4">
          <h2 className="text-white text-xl md:text-2xl font-bold text-center md:text-left">Compra directa</h2>
          <p className="text-white text-sm md:text-base text-center md:text-left">
            Si necesitas vender tu auto de manera inmediata, te lo tasamos y te lo pagamos de contado, nos encargamos de todos los trámites de gestoría y te aseguramos la transferencia.
          </p>
          <h2 className="text-white text-xl md:text-2xl font-bold text-center md:text-left">Consignaciones</h2>
          <p className="text-white text-sm md:text-base text-center md:text-left">
            Te gestionamos la venta, dejá tu auto en nuestra agencia, lo publicamos en todos los portales de venta online y buscamos comprador. Una vez concretada la operación nos encargamos de todos los trámites de gestoría y te lo pagamos de contado.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section8;
