import React from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * TODO (Pablo): el doc de SEO dejaba el primer bloque como COMPLETAR, porque
 * describir la revision previa depende de como trabaja AB y afirmar algo que
 * no se hace trae problemas. Se escribio solo con lo que el sitio ya afirma en
 * otras paginas y es verificable: informe de dominio, verificacion policial,
 * libre deuda, seleccion unidad por unidad y la Camara.
 *
 * Falta confirmar con el cliente para poder ampliarlo, que es lo que la
 * competencia si publica:
 *   - que se revisa mecanicamente antes de publicar y quien lo hace
 *   - si se valida el kilometraje real contra el historial de service
 *   - si se pide informe de siniestros o historial del vehiculo
 *   - si hay alguna garantia posterior a la entrega
 * Mientras no esten confirmadas, no agregar ninguna de estas al texto.
 */
const bloques = [
  {
    titulo: "Vehículos revisados antes de publicarse",
    contenido: (
      <>
        Ninguna unidad sale a la venta con los papeles pendientes de resolver. Antes de
        publicarla pedimos el informe de dominio para confirmar que el vehículo no tenga prenda
        ni embargos, hacemos la verificación policial y chequeamos que no arrastre deudas de
        patentes ni infracciones. Los autos los elegimos uno por uno, no compramos por volumen, y
        somos miembros de la Cámara de Comercio Automotor de Córdoba.
      </>
    ),
  },
  {
    titulo: "Entrega inmediata, sin listas de espera",
    contenido: (
      <>
        Todos los vehículos que ves en esta página están físicamente en nuestro salón de Av.
        Amadeo Sabattini 4260, en el barrio Empalme de Córdoba Capital. No trabajamos con pedidos
        a fábrica ni con reservas a plazo: el auto que elegís se puede retirar apenas se cierra la
        operación y se completan los papeles.
      </>
    ),
  },
  {
    titulo: "Financiación, permutas y consignación",
    contenido: (
      <>
        Podés{" "}
        <Link href="/financiacion" className="text-[#B62E30] hover:underline">
          financiar hasta el 100% del vehículo
        </Link>{" "}
        con créditos prendarios o personales, entregar tu auto actual como parte de pago, o{" "}
        <Link href="/consignaciones" className="text-[#B62E30] hover:underline">
          dejarlo en consignación para que lo vendamos por vos
        </Link>
        . Las tres cosas se pueden combinar en la misma operación.
      </>
    ),
  },
];

const ComoTrabajamos: React.FC = () => {
  return (
    <section className="bg-white py-10 md:py-16">
      <div className="page-container flex flex-col md:flex-row items-stretch gap-8 md:gap-12">

        {/* Imagen: en desktop va a la izquierda */}
        <div className="w-full md:w-1/3 shrink-0 relative rounded-xl overflow-hidden h-[280px] md:h-auto md:min-h-[440px]">
          <Image
            src="https://ik.imagekit.io/automotoresab/public-source/NivusFrente.webp"
            alt="Vehículo usado disponible en el salón de AB Automotores"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Texto */}
        <div className="w-full md:flex-1 flex flex-col text-center md:text-left">
          <p className="text-[#B62E30] font-semibold text-sm md:text-base tracking-widest uppercase">
            Nuestro criterio
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
            Cómo trabajamos los usados que publicamos
          </h2>
          <div className="mt-2 w-12 h-[3px] bg-[#B62E30] rounded-full mx-auto md:mx-0" />

          <div className="mt-6 flex flex-col gap-6">
            {bloques.map(({ titulo, contenido }) => (
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

export default ComoTrabajamos;
