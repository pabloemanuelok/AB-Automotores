import React from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * TODO (Pablo): reemplazar por una foto propia. Esta es prestada de la home y
 * es un interior de auto, que en una pagina de tramites desentona. Lo que
 * mejor funciona aca es el escritorio de atencion o el mostrador. Subirla a
 * ImageKit en /public-source/ y cambiar solo esta constante.
 */
const IMAGEN = "https://ik.imagekit.io/automotoresab/public-source/InteriorJeep2.svg";

/**
 * TODO (Pablo): los tres bloques describen que es cada tramite, que es
 * informacion general y no compromete a AB. Lo que si hay que confirmar es el
 * alcance, porque la pagina se escribio asumiendo gestoria abierta al publico:
 *   - que se hacen denuncias de venta, altas y bajas, cambios de radicacion,
 *     duplicados de titulo y cedula, e inscripcion y cancelacion de prendas
 *   - que se tramitan informes de dominio y verificaciones sueltas, para
 *     alguien que solo quiere revisar un auto antes de comprarlo
 *   - que se acompania la regularizacion de deuda en Rentas
 * Si alguno de esos no se hace, sacarlo de la lista.
 */
const tramites = [
  {
    titulo: "Transferencias y formulario 08",
    contenido: (
      <>
        La transferencia es el trámite que pone el vehículo a nombre del comprador en el Registro
        Seccional de la Propiedad del Automotor. El instrumento es el formulario 08, donde firman
        las dos partes y las firmas van certificadas. Alrededor de eso hay que resolver la
        verificación policial, el libre deuda de patentes e infracciones y el informe de dominio.
        Nos ocupamos de armar la carpeta completa, sacar el turno y hacer la presentación. Si el
        auto tiene una prenda inscripta, la cancelación se resuelve antes, porque sin eso la
        transferencia no avanza. También hacemos denuncias de venta, altas y bajas, y duplicados
        de título o de cédula.
      </>
    ),
  },
  {
    titulo: "Informes de dominio y verificación policial",
    contenido: (
      <>
        Son dos cosas distintas y las dos hacen falta. El informe de dominio lo emite el Registro
        y dice quién es el titular registral del vehículo y si pesa sobre él alguna prenda,
        embargo o inhibición: es el documento donde aparecen los problemas que no se ven mirando
        el auto. La verificación policial, en cambio, es física, y comprueba que la numeración de
        motor y de chasis coincida con la del título y no esté adulterada. Los tramitamos dentro
        de una transferencia o por separado, si lo único que querés es revisar cómo está un
        vehículo antes de comprarlo. Si además estás buscando auto,{" "}
        <Link href="/autos-usados" className="text-[#B62E30] hover:underline">
          mirá los usados disponibles
        </Link>
        : salen a la venta con todo esto ya hecho.
      </>
    ),
  },
  {
    titulo: "Patentes y trámites en Rentas Córdoba",
    contenido: (
      <>
        El impuesto a la propiedad automotor lo administra la provincia, así que esa parte se
        resuelve en Rentas Córdoba y no en el Registro. Ahí se obtiene el libre deuda que la
        transferencia necesita, se pasa la patente a nombre del nuevo titular y se hacen los
        cambios de radicación cuando el vehículo se muda de jurisdicción. Es la parte que más
        veces frena una operación, porque hasta que la deuda no está regularizada el trámite no
        avanza, y conviene detectarlo al principio y no el día de la firma.{" "}
        <Link href="/consignaciones" className="text-[#B62E30] hover:underline">
          Si estás vendiendo, nos ocupamos también de la venta
        </Link>
        .
      </>
    ),
  },
];

const Tramites: React.FC = () => {
  return (
    <section className="bg-white py-10 md:py-16">
      <div className="page-container flex flex-col md:flex-row items-stretch gap-8 md:gap-12">

        {/* Imagen: en desktop va a la izquierda */}
        <div className="w-full md:w-1/3 shrink-0 relative rounded-xl overflow-hidden h-[280px] md:h-auto md:min-h-[480px]">
          <Image
            src={IMAGEN}
            alt="Documentación de un vehículo en AB Automotores"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Texto */}
        <div className="w-full md:flex-1 flex flex-col text-center md:text-left">
          <p className="text-[#B62E30] font-semibold text-sm md:text-base tracking-widest uppercase">
            Qué resolvemos
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
            Todos los trámites de tu vehículo, en un solo lugar
          </h2>
          <div className="mt-2 w-12 h-[3px] bg-[#B62E30] rounded-full mx-auto md:mx-0" />

          <div className="mt-6 flex flex-col gap-6">
            {tramites.map(({ titulo, contenido }) => (
              <div key={titulo}>
                <h3 className="text-gray-900 font-bold text-lg md:text-xl mb-1">{titulo}</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">{contenido}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Tramites;
