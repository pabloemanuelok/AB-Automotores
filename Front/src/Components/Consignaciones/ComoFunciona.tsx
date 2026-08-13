import React from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * TODO (Pablo): estos tres bloques describen el proceso sin comprometer plazos,
 * comisiones ni montos, a proposito. Pero si afirman cosas sobre como trabaja AB
 * que hay que confirmar antes de darlas por buenas:
 *   - que la tasacion es sin cargo y no compromete
 *   - que se deja por escrito precio, plazo y condiciones antes de recibir el auto
 *   - que se consulta al duenio antes de aceptar una oferta menor a la acordada
 *   - que se hace verificacion policial e informe de dominio antes de publicar
 *   - que se informa el detalle de gastos por escrito al cerrar la tasacion
 *   - que papeles se piden exactamente al consignar
 * Cualquiera de estas que AB no haga, hay que sacarla o reescribirla.
 */
const pasos = [
  {
    titulo: "Cómo tasamos tu auto",
    contenido: (
      <>
        La tasación es sin cargo y no te compromete a nada. Miramos cinco cosas: el año y el
        modelo, los kilómetros reales, el estado mecánico y de carrocería, que la documentación
        esté al día y sin deudas, y a cuánto se está vendiendo hoy ese mismo vehículo en el
        mercado de Córdoba. Con eso te damos dos números y te explicamos de dónde sale cada uno:
        cuánto podés pedir si lo dejás en consignación y cuánto te pagamos si preferís que te lo
        compremos de forma directa.
      </>
    ),
  },
  {
    titulo: "Cuánto tarda una venta en consignación",
    contenido: (
      <>
        No hay un plazo único, y conviene desconfiar de quien te prometa uno. El tiempo depende
        del modelo, del estado del auto, del precio al que se publica y de cómo se está moviendo
        ese vehículo en el mercado. Un auto bien tasado se vende bastante más rápido que uno
        publicado por encima de su valor, y esa es la conversación que tenemos con vos antes de
        arrancar. Cuando tasamos el tuyo te damos una estimación realista para tu caso concreto,
        no un número genérico. Mientras esté en el salón te mantenemos al tanto del movimiento:
        cuántas consultas hubo, cuántas visitas y qué ofertas aparecieron.
      </>
    ),
  },
  {
    titulo: "Qué papeles tenés que traer y qué gastos cubre AB",
    contenido: (
      <>
        Para dejar el auto en consignación necesitás el título del automotor, la cédula verde, tu
        DNI y las patentes al día. Si el vehículo tiene una prenda o alguna deuda se puede
        trabajar igual, pero hay que resolverlo antes de la transferencia, así que conviene
        avisarnos desde el principio. Antes de publicarlo hacemos la verificación policial y
        pedimos el informe de dominio, para que salga a la venta con todo en regla.
        <br />
        <br />
        De los trámites nos ocupamos nosotros: transferencia, formulario 08, turnos en el
        Registro y toda la gestión ante el Seccional. Cuando cerramos la tasación te dejamos por
        escrito qué gastos cubre AB y cuáles quedan a tu cargo, con el monto de cada uno. No hay
        costos que aparezcan después.
      </>
    ),
  },
];

const ComoFunciona: React.FC = () => {
  return (
    <section className="bg-[#0a0a0a] py-10 md:py-16">
      <div className="page-container flex flex-col md:flex-row-reverse items-stretch gap-8 md:gap-12">

        {/* Imagen: en desktop va a la derecha, espejando el bloque de arriba */}
        <div className="w-full md:w-1/3 shrink-0 relative rounded-xl overflow-hidden h-[280px] md:h-auto md:min-h-[520px]">
          <Image
            src="https://ik.imagekit.io/automotoresab/public-source/Frente20081.svg"
            alt="Vehículo en el salón de AB Automotores"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Texto */}
        <div className="w-full md:flex-1 flex flex-col text-center md:text-left">
          <p className="text-[#B62E30] font-semibold text-sm md:text-base tracking-widest uppercase">
            Sin sorpresas
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white">
            Cómo funciona paso a paso
          </h2>
          <div className="mt-2 w-12 h-[3px] bg-[#B62E30] rounded-full mx-auto md:mx-0" />

          <div className="mt-6 flex flex-col gap-6">
            {pasos.map(({ titulo, contenido }) => (
              <div key={titulo}>
                <h3 className="text-white font-bold text-lg md:text-xl mb-1">{titulo}</h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">{contenido}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-white/50 text-sm">
            ¿Preferís comprar en vez de vender? Mirá{" "}
            <Link href="/views/catalogo" className="text-[#B62E30] hover:underline">
              los autos que tenemos en venta
            </Link>
            .
          </p>
        </div>

      </div>
    </section>
  );
};

export default ComoFunciona;
