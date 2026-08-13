import React from "react";
import Link from "next/link";
import { CAMARA } from "@/lib/negocio";

// href null = la pagina propia del servicio todavia no existe (ver /gestoria).
const servicios = [
  { titulo: "Compraventa de usados y 0km", href: "/views/catalogo" },
  { titulo: "Financiación hasta el 100%", href: "/views/financiacion" },
  { titulo: "Permutas", href: "/views/consignaciones" },
  { titulo: "Consignaciones", href: "/views/consignaciones" },
  { titulo: "Gestoría y trámites", href: null },
];

// Server Component: este bloque absorbe el contenido de Quienes Somos, asi que
// tiene que estar entero en el HTML del servidor.
const QuienesSomos: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="page-container">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-[#B62E30] text-sm font-semibold tracking-widest uppercase mb-3">
            La agencia
          </p>
          <h2 className="text-gray-900 text-2xl md:text-3xl font-bold">Quiénes somos</h2>
          <div className="mt-2 mx-auto w-12 h-[3px] bg-[#B62E30] rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <div>
            <h3 className="text-gray-900 text-lg md:text-xl font-bold">
              Más de 20 años en el rubro
            </h3>
            <p className="mt-2 text-gray-500 text-sm md:text-base leading-relaxed">
              AB Automotores abrió sus puertas en 2003 y desde entonces acompaña a compradores y
              vendedores de toda la provincia de Córdoba. Son más de dos décadas vendiendo autos
              en la misma ciudad, con un equipo que conoce el mercado local y una cartera de
              clientes que vuelve y recomienda.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 text-lg md:text-xl font-bold">
              Miembros de la {CAMARA}
            </h3>
            <p className="mt-2 text-gray-500 text-sm md:text-base leading-relaxed">
              Formamos parte de la entidad que agrupa a las agencias y concesionarias habilitadas
              de la provincia. Es el respaldo de que operamos dentro del marco legal del rubro,
              que cada unidad tiene su documentación en regla y que toda operación queda
              documentada como corresponde.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 text-lg md:text-xl font-bold">Qué hacemos</h3>
            <p className="mt-2 text-gray-500 text-sm md:text-base leading-relaxed">
              Cubrimos todo el circuito de la compra y la venta de un vehículo, sin que tengas
              que resolver nada por afuera:
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {servicios.map(({ titulo, href }) => (
                <li key={titulo} className="flex items-start gap-2 text-sm md:text-base">
                  <span className="text-[#B62E30] mt-0.5" aria-hidden="true">›</span>
                  {href ? (
                    <Link
                      href={href}
                      className="text-gray-600 hover:text-[#B62E30] underline underline-offset-2 decoration-gray-300 hover:decoration-[#B62E30] transition-colors duration-200"
                    >
                      {titulo}
                    </Link>
                  ) : (
                    <span className="text-gray-600">{titulo}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuienesSomos;
