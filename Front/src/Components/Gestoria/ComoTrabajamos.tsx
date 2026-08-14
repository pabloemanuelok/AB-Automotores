import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CAMARA, DIRECCION, HORARIOS } from "@/lib/negocio";

/**
 * TODO (Pablo): reemplazar por una foto propia. Idealmente el frente del local
 * sobre la avenida, que es justo el argumento del tercer bloque. Subirla a
 * ImageKit en /public-source/ y cambiar solo esta constante.
 */
const IMAGEN = "https://ik.imagekit.io/automotoresab/public-source/colaYaris.jpeg";

/**
 * TODO (Pablo): el tercer bloque es 100% verificable, sale entero de
 * lib/negocio.ts. Los dos primeros necesitan confirmacion:
 *   - la lista exacta de papeles cuando el tramite es de un tercero y no de
 *     una operacion de AB (la de hoy sale de lo que ya afirma consignaciones)
 *   - los plazos reales de cada tramite, aunque sea en rangos
 *   - que se avisa el estado del tramite sin que el cliente tenga que llamar
 * Mientras no esten confirmados, no poner ningun numero de dias.
 */
const bloques = [
  {
    titulo: "Qué papeles tenés que traer",
    contenido: (
      <>
        Para una transferencia necesitás el título del automotor, la cédula verde, el DNI de las
        dos partes y el libre deuda de patentes e infracciones. El formulario 08 lo completamos
        nosotros y las firmas se certifican. Si el vehículo tiene una prenda o alguna deuda, se
        puede trabajar igual, pero hay que resolverlo antes de presentar la transferencia, así que
        conviene avisarnos desde el principio. Para el resto de los trámites la documentación
        cambia: contanos cuál necesitás y te decimos exactamente qué traer, así venís una sola
        vez.
      </>
    ),
  },
  {
    titulo: "Cuánto tarda cada trámite",
    contenido: (
      <>
        No hay un plazo único, y conviene desconfiar de quien te dé uno sin haber visto el caso.
        El tiempo lo definen tres cosas: el turno que da el Registro Seccional, si hay algo
        pendiente de resolver antes —una prenda a cancelar, deuda de patentes, un título
        observado— y si el vehículo cambia de radicación, porque ahí intervienen dos
        jurisdicciones. Un trámite que arranca con toda la documentación en regla se resuelve
        bastante más rápido que uno que empieza con algo trabado. Cuando revisamos tu caso te
        damos una estimación concreta para ese trámite puntual, no un número genérico.
      </>
    ),
  },
  {
    titulo: "Atención presencial, no un formulario online",
    contenido: (
      <>
        No somos una web que te contesta cuando puede. Tenemos oficina física en{" "}
        {DIRECCION.calle}, en el barrio {DIRECCION.barrio} de {DIRECCION.ciudad}, sobre una de las
        principales vías de acceso a la ciudad, y el horario de atención es amplio:{" "}
        {HORARIOS.join(" · ")}. Venís, te sentás con alguien, mostrás los papeles y te vas
        sabiendo qué falta, qué sale y cuándo lo tenés. Llevamos más de 20 años en el rubro
        automotor y somos miembros de la {CAMARA}, que es la entidad que agrupa a las agencias
        habilitadas de la provincia.{" "}
        <Link href="/contacto" className="text-[#B62E30] hover:underline">
          Mirá cómo llegar y los horarios
        </Link>
        .
      </>
    ),
  },
];

const ComoTrabajamos: React.FC = () => {
  return (
    <section className="bg-[#0a0a0a] py-10 md:py-16">
      <div className="page-container flex flex-col md:flex-row-reverse items-stretch gap-8 md:gap-12">

        {/* Imagen: en desktop va a la derecha, espejando el bloque de arriba */}
        <div className="w-full md:w-1/3 shrink-0 relative rounded-xl overflow-hidden h-[280px] md:h-auto md:min-h-[480px]">
          <Image
            src={IMAGEN}
            alt="Oficina de atención de AB Automotores en Córdoba"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Texto */}
        <div className="w-full md:flex-1 flex flex-col text-center md:text-left">
          <p className="text-[#B62E30] font-semibold text-sm md:text-base tracking-widest uppercase">
            Sin vueltas
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white">
            Cómo trabajamos
          </h2>
          <div className="mt-2 w-12 h-[3px] bg-[#B62E30] rounded-full mx-auto md:mx-0" />

          <div className="mt-6 flex flex-col gap-6">
            {bloques.map(({ titulo, contenido }) => (
              <div key={titulo}>
                <h3 className="text-white font-bold text-lg md:text-xl mb-1">{titulo}</h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">{contenido}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ComoTrabajamos;
