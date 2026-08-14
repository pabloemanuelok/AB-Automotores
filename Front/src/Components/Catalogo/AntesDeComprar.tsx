import React from "react";
import Image from "next/image";
import Link from "next/link";

// Los tres bloques vienen escritos del doc de SEO. Son criterios generales
// para comprar un usado, no promesas sobre como trabaja AB, asi que no hay
// nada que verificar con el cliente salvo la ultima linea del tercero, que ya
// se afirma en las otras paginas del sitio.
const bloques = [
  {
    titulo: "En qué conviene fijarse",
    contenido: (
      <>
        Más allá del precio, hay cuatro cosas que definen si un usado es una buena compra: el
        estado mecánico real, el kilometraje coherente con el año, que los papeles estén al día y
        sin deudas, y que el vendedor se haga cargo de la transferencia. Un auto barato con una
        deuda de patentes atrasada o con el título observado termina saliendo bastante más caro.
      </>
    ),
  },
  {
    titulo: "Cuántos kilómetros son muchos",
    contenido: (
      <>
        No hay un número mágico. Un auto con 15.000 kilómetros por año de antigüedad está dentro
        de lo esperable en Argentina. Lo que más importa es la coherencia: un vehículo de 2018 con
        40.000 kilómetros puede ser tan buena señal como sospechosa, según cómo haya sido usado y
        qué mantenimiento tenga documentado. Un motor con 200.000 kilómetros bien mantenido suele
        dar menos problemas que uno con 80.000 sin service al día.
      </>
    ),
  },
  {
    titulo: "Qué papeles revisar",
    contenido: (
      <>
        Título del automotor, cédula verde vigente, verificación policial, libre deuda de patentes
        e infracciones, y el informe de dominio para confirmar que el vehículo no tiene prenda ni
        embargos. En AB verificamos todo esto antes de publicar cada unidad, y de la transferencia
        nos ocupamos nosotros. Si además tenés un auto para entregar,{" "}
        <Link href="/consignaciones" className="text-[#B62E30] hover:underline">
          lo tasamos sin cargo
        </Link>
        .
      </>
    ),
  },
];

const AntesDeComprar: React.FC = () => {
  return (
    <section className="bg-[#0a0a0a] py-10 md:py-16">
      <div className="page-container flex flex-col md:flex-row-reverse items-stretch gap-8 md:gap-12">

        {/* Imagen: en desktop va a la derecha, espejando el bloque de arriba */}
        <div className="w-full md:w-1/3 shrink-0 relative rounded-xl overflow-hidden h-[280px] md:h-auto md:min-h-[440px]">
          <Image
            src="https://ik.imagekit.io/automotoresab/public-source/Central208.webp"
            alt="Interior de un vehículo usado del catálogo de AB Automotores"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Texto */}
        <div className="w-full md:flex-1 flex flex-col text-center md:text-left">
          <p className="text-[#B62E30] font-semibold text-sm md:text-base tracking-widest uppercase">
            Para tener en cuenta
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white">
            Antes de comprar un auto usado
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

export default AntesDeComprar;
