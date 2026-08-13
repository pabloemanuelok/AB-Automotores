import { SITE_URL } from "@/lib/seo";

export type Faq = { question: string; answer: string };

/**
 * El acordeon visible y el JSON-LD salen de la misma lista. Si el schema dice
 * algo que no esta en la pagina, Google puede tomarlo como contenido enganoso
 * y dejar de mostrar los datos estructurados del sitio entero.
 *
 * Las respuestas van en texto plano: sin HTML, sin saltos de linea y sin
 * comillas dobles.
 */
export const faqPageSchema = (items: readonly Faq[], path: string) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}${path}#faq`,
  mainEntity: items.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
});

export const homeFaqs = [
  {
    question: "¿Qué es una concesionaria y cómo funciona?",
    answer:
      "Una concesionaria es un salón de venta de vehículos que compra, vende y permuta autos con respaldo comercial y legal. A diferencia de una venta entre particulares, la concesionaria verifica el estado y la documentación de cada unidad antes de publicarla, se hace cargo de la transferencia y responde por la operación. En AB Automotores además financiamos la compra, tomamos tu usado como parte de pago y hacemos todos los trámites de gestoría.",
  },
  {
    question: "¿Cuál es la diferencia entre una concesionaria y una agencia de autos?",
    answer:
      "En la práctica, en Argentina se usan como sinónimos. La diferencia histórica es que una concesionaria oficial tiene contrato con una marca y vende sus 0km, mientras que una agencia multimarca trabaja con vehículos usados y 0km de distintas marcas. AB Automotores es una agencia multimarca: vendemos autos usados y 0km de todas las marcas, seleccionados uno por uno, sin estar atados a una sola terminal.",
  },
  {
    question: "¿Cuánto tarda la entrega de un auto?",
    answer:
      "En AB Automotores la entrega es inmediata. Todos los vehículos que publicamos están físicamente en nuestro salón de Av. Sabattini 4260 y se pueden retirar apenas se cierra la operación y se completan los papeles. No trabajamos con pedidos a fábrica ni con listas de espera. Si la compra es financiada, el plazo depende de la aprobación del crédito, que suele resolverse en pocos días.",
  },
  {
    question: "¿Dónde comprar autos usados confiables en Córdoba?",
    answer:
      "Al elegir dónde comprar conviene verificar tres cosas: que el vendedor esté habilitado y forme parte de la Cámara de Comercio Automotor de Córdoba, que publique el precio y el estado real de cada unidad, y que se haga cargo de la transferencia y los trámites. AB Automotores cumple con las tres: somos miembros de la Cámara, publicamos precio y kilometraje de cada auto, y hacemos la gestoría completa. Estamos en Av. Amadeo Sabattini 4260, barrio Empalme, con más de 20 años en el rubro.",
  },
] as const;

/**
 * Las cuatro primeras salen del bloque "Otras preguntas de los usuarios" de
 * Google, que hoy responden fuentes de Chile, Mexico y retail generico.
 *
 * Ojo con la de la transferencia: sin porcentajes ni montos fijos. El esquema
 * de aranceles y las valuaciones estan en reforma, y un numero hardcodeado
 * obliga a volver a tocar la web cada vez que cambie.
 */
export const consignacionesFaqs = [
  {
    question: "¿Qué significa dejar un auto en consignación?",
    answer:
      "Significa que dejás el vehículo en el salón de la agencia para que sea la agencia la que lo venda por vos, pero el auto sigue siendo tuyo hasta que se concreta la operación: no se transfiere a nombre de la concesionaria ni se te paga por adelantado. La agencia lo exhibe, lo publica, atiende a los interesados y consigue comprador, y recién cuando la venta se cierra vos cobrás. La diferencia con venderlo por tu cuenta es que no tenés que recibir desconocidos en tu casa, ni coordinar visitas, ni ocuparte de los trámites.",
  },
  {
    question: "¿Cómo funciona la consignación de un vehículo?",
    answer:
      "El primer paso es la tasación, que en AB Automotores es sin cargo: revisamos año, kilómetros, estado general y documentación, y definimos junto con vos el precio de publicación. Después dejás el auto en nuestro salón de Av. Amadeo Sabattini 4260 y quedan por escrito el precio acordado, el plazo y las condiciones de la operación. Nosotros lo publicamos, atendemos a los interesados y mostramos el vehículo. Si aparece una oferta por debajo del precio acordado, te consultamos antes de aceptarla. Cerrada la venta cobrás, y nos ocupamos de la transferencia y de todos los trámites.",
  },
  {
    question: "¿Cuánto cuesta la transferencia de un auto en Argentina?",
    answer:
      "No es un monto único: el costo se arma con varios conceptos. Está el arancel del Registro Nacional, que se calcula como un porcentaje sobre el valor del vehículo y cambia según sea de producción nacional o importado; el impuesto de sellos, que fija cada provincia y por lo tanto varía según dónde esté radicado el auto; y conceptos fijos como la verificación policial, el informe de dominio y la emisión de la cédula. Los valores se actualizan periódicamente, así que el número exacto conviene consultarlo en el cotizador oficial de la DNRPA. Cuando la operación se hace por agencia se puede hacer una transferencia simultánea, que funciona distinto que una venta entre particulares. En AB Automotores calculamos el monto exacto de tu caso antes de cerrar la operación, así sabés desde el principio qué vas a pagar.",
  },
  {
    question: "¿Cómo funciona el plan canje de autos?",
    answer:
      "El plan canje es entregar tu auto usado como parte de pago de otro vehículo. Tasamos el tuyo, ese valor se descuenta del precio del auto que te llevás y pagás únicamente la diferencia, que podés abonar de contado o financiar. La ventaja es que resolvés la venta y la compra en una sola operación y en un mismo lugar: no tenés que esperar a vender tu auto para recién después salir a buscar otro. El usado tiene que estar en condiciones y con la documentación al día.",
  },
  {
    question: "¿Toman mi auto usado como parte de pago?",
    answer:
      "Sí. Tomamos autos usados como parte de pago de cualquier vehículo de nuestro stock, sea usado o 0km. La tasación es sin cargo y te la damos en el momento, sin que te comprometa a nada. Si tu auto vale menos que el que querés llevarte, la diferencia se puede financiar con créditos prendarios o personales. Si preferís, también te lo compramos de forma directa aunque no te lleves otro vehículo.",
  },
] as const;
