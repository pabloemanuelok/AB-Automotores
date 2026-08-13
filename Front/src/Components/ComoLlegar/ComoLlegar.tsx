import React from "react";
import Link from "next/link";
import { DIRECCION_COMPLETA, HORARIOS, MAPS_URL } from "@/lib/negocio";

// Embed oficial sacado de la ficha de Google (Compartir > Insertar un mapa).
// El 5e0 del final es la vista de calles; el que da Google por defecto venia en
// 5e1 (satelite), que para orientarse sirve menos.
const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194.75847130871932!2d-64.13238734006885!3d-31.43461355438703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432bd24e9ecd915%3A0xa32ee5da0ccf6d8f!2sAB%20Automotores!5e0!3m2!1ses!2sar!4v1786653029020!5m2!1ses!2sar";

// Server Component: el texto de referencia viaja en el HTML del servidor.
const ComoLlegar: React.FC = () => {
  return (
    <section className="bg-[#0a0a0a] py-12 md:py-16">
      <div className="page-container">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-[#B62E30] text-sm font-semibold tracking-widest uppercase mb-3">
            Visitanos
          </p>
          <h2 className="text-white text-2xl md:text-3xl font-bold">Cómo llegar</h2>
          <div className="mt-2 mx-auto w-12 h-[3px] bg-[#B62E30] rounded-full" />
        </div>

        <div className="lg:flex gap-10 items-start">
          <div className="lg:w-[38%] flex-shrink-0 mb-8 lg:mb-0">
            {/* TODO: texto provisorio, solo con datos verificables. Pablo va a
                pasar las referencias reales del local (estacionamiento, que hay
                enfrente, entre que calles) para reemplazar estos dos parrafos. */}
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              Estamos sobre <strong className="text-white">Av. Amadeo Sabattini al 4260</strong>,
              en el barrio Empalme de la ciudad de Córdoba. La avenida es una de las principales
              vías de acceso a la ciudad, así que se llega directo tanto desde el centro como
              desde la Ruta 9.
            </p>
            <p className="mt-4 text-white/70 text-sm md:text-base leading-relaxed">
              Podés venir a ver los vehículos al salón sin turno previo, dentro del horario de
              atención. Si preferís coordinar antes, escribinos y te esperamos.
            </p>

            <div className="mt-6 flex flex-col gap-1 text-sm">
              <span className="text-gray-500 text-xs uppercase tracking-wider">Dirección</span>
              <span className="text-white">{DIRECCION_COMPLETA}</span>
            </div>

            <div className="mt-4 flex flex-col gap-1 text-sm">
              <span className="text-gray-500 text-xs uppercase tracking-wider">Horario</span>
              {HORARIOS.map((h) => (
                <span key={h} className="text-white">{h}</span>
              ))}
            </div>

            <Link
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block px-6 py-3 bg-[#B62E30] hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors duration-200"
            >
              Abrir en Google Maps
            </Link>
          </div>

          <div className="flex-1 overflow-hidden rounded-xl border border-[#505050]">
            <iframe
              src={MAPS_EMBED}
              title="Ubicación de AB Automotores en Av. Amadeo Sabattini 4260, Córdoba"
              className="w-full h-[320px] md:h-[420px] border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComoLlegar;
