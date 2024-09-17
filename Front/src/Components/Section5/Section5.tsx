import React from "react";
import Image from "next/image";

// Importa los logos desde tu carpeta de assets
import logo1 from "@/Assets/VehiculosSeleccionados.png";
import logo2 from "@/Assets/EntregaInmediata.png";
import logo3 from "@/Assets/AmpliasLineasDeCredito.png";
import logo4 from "@/Assets/PermutasPorMayorYMenor.png";
import logo5 from "@/Assets/ServiciosDeGestoria.png";

const Section5 = () => {
  return (
    <div className="m-4 py-10 px-4">
      {/* Configuración de la cuadrícula */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 justify-items-center">
        {/* Logo 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center mb-2" style={{ height: '100px' }}>
            <Image src={logo1} alt="Logo 1" width={100} height={100} className="object-contain" />
          </div>
          <p className="font-bold text-sm sm:text-base">Vehículos Seleccionados</p>
        </div>

        {/* Logo 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center mb-2" style={{ height: '100px' }}>
            <Image src={logo2} alt="Logo 2" width={100} height={100} className="object-contain" />
          </div>
          <p className="font-bold text-sm sm:text-base">Entrega inmediata</p>
        </div>

        {/* Logo 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center mb-2" style={{ height: '100px' }}>
            <Image src={logo3} alt="Logo 3" width={100} height={100} className="object-contain" />
          </div>
          <p className="font-bold text-sm sm:text-base">Amplias líneas de créditos</p>
        </div>

        {/* Logo 4 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center mb-2" style={{ height: '100px' }}>
            <Image src={logo4} alt="Logo 4" width={100} height={100} className="object-contain" />
          </div>
          <p className="font-bold text-sm sm:text-base">Permutas por mayor y menor</p>
        </div>

        {/* Logo 5 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center mb-2" style={{ height: '100px' }}>
            <Image src={logo5} alt="Logo 5" width={100} height={100} className="object-contain" />
          </div>
          <p className="font-bold text-sm sm:text-base">Servicios de gestoría</p>
        </div>
      </div>
    </div>
  );
};

export default Section5;
