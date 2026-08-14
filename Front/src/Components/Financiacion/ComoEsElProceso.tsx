import React from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * TODO (Pablo): los tres bloques explican el circuito sin comprometer tasas ni
 * montos, pero afirman cosas sobre como trabaja AB que hay que confirmar antes
 * de darlas por buenas:
 *   - que con el DNI alcanza para consultar la situacion crediticia en el momento
 *   - que la preaprobacion sale el mismo dia y la definitiva en pocos dias habiles
 *   - que la documentacion del prendario la prepara AB
 *   - que se muestran las dos cuentas, prendario y personal, antes de decidir
 * Cualquiera de estas que AB no haga, hay que sacarla o reescribirla.
 */
const pasos = [
  {
    titulo: "Qué necesitás para arrancar",
    contenido: (
      <>
        Para empezar alcanza con el DNI, y en la mayoría de los casos es lo único que vas a
        necesitar. Con eso consultamos tu situación crediticia y te decimos en el momento hasta
        cuánto podés financiar, sin que traigas ningún otro papel y sin que te comprometa a nada.
        Los créditos prendarios, con Banco Supervielle o Banco Galicia, se resuelven solo con el
        DNI: no hace falta que presentes recibo de sueldo ni ninguna otra demostración de
        ingresos. Los personales, con Banco de Córdoba o Banco Nación, van con DNI o con recibo de
        sueldo según el caso. La documentación del vehículo la preparamos nosotros.
      </>
    ),
  },
  {
    titulo: "Cuánto tarda la aprobación",
    contenido: (
      <>
        La preaprobación es la parte rápida: con tus datos y el modelo que te interesa te decimos
        el mismo día si la operación es viable y con qué línea. La aprobación definitiva la
        resuelve la entidad y depende de cuánta documentación haga falta, así que los casos de
        solo con DNI salen antes que los que necesitan demostración de ingresos. Lo que no suma
        demora es el auto: todos los vehículos que publicamos están físicamente en nuestro salón
        de Av. Amadeo Sabattini 4260, no trabajamos con pedidos a fábrica ni con listas de espera.
        Apenas se acredita el crédito y se firman los papeles, te lo llevás.
      </>
    ),
  },
  {
    titulo: "Prendario o personal, cuál te conviene",
    contenido: (
      <>
        El crédito prendario usa el propio auto como garantía. Por eso es el que admite montos más
        altos, plazos más largos y tasas más bajas, y es también el motivo por el que la entidad
        no necesita que demuestres ingresos: le alcanza con el DNI. Lo trabajamos con Banco
        Supervielle y Banco Galicia. La contrapartida es que el vehículo queda con una prenda
        inscripta a favor del banco hasta que terminás de pagarlo, y ese trámite de inscripción
        forma parte de la operación.
        <br />
        <br />
        El crédito personal no toca el auto: la garantía sos vos, y el vehículo queda a tu nombre
        sin ninguna restricción desde el primer día. Lo trabajamos con Banco de Córdoba y Banco
        Nación, con DNI o recibo de sueldo. Como regla general, un personal maneja tasa
        más alta, plazo más corto y un tope de monto menor que un prendario, justamente porque el
        banco no tiene el auto como respaldo. Así que si estás financiando una parte grande del
        auto y a muchos meses, el prendario casi siempre conviene; si es una diferencia chica que
        pensás cancelar rápido, el personal puede salirte mejor. Cuando venís te mostramos las dos
        cuentas con números concretos sobre el auto que elegiste, y decidís con los dos escenarios
        a la vista.
      </>
    ),
  },
];

const ComoEsElProceso: React.FC = () => {
  return (
    <section className="bg-[#0a0a0a] py-10 md:py-16">
      <div className="page-container flex flex-col md:flex-row-reverse items-stretch gap-8 md:gap-12">

        {/* Imagen: en desktop va a la derecha, espejando el bloque de arriba */}
        <div className="w-full md:w-1/3 shrink-0 relative rounded-xl overflow-hidden h-[280px] md:h-auto md:min-h-[520px]">
          <Image
            src="https://ik.imagekit.io/automotoresab/public-source/2008Allure0Km.jpeg"
            alt="Vehículo financiado listo para entrega en AB Automotores"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Texto */}
        <div className="w-full md:flex-1 flex flex-col text-center md:text-left">
          <p className="text-[#B62E30] font-semibold text-sm md:text-base tracking-widest uppercase">
            Paso a paso
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white">
            Cómo es el proceso
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
            Mirá{" "}
            <Link href="/autos-usados" className="text-[#B62E30] hover:underline">
              los usados disponibles para financiar
            </Link>
            , y{" "}
            <Link href="/consignaciones" className="text-[#B62E30] hover:underline">
              si además tenés un auto para entregar como parte de pago
            </Link>{" "}
            lo tasamos sin cargo y lo descontamos del monto a financiar.
          </p>
        </div>

      </div>
    </section>
  );
};

export default ComoEsElProceso;
