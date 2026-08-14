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

/**
 * Las cinco salen del bloque "Otras preguntas de los usuarios" que Google
 * muestra para la busqueda de autos usados en Cordoba, asi que estan escritas
 * como las hace la gente. Las respuestas vienen del doc de SEO.
 *
 * OJO: la primera esta duplicada con homeFaqs, que declara la misma Question
 * en el FAQPage de la home con una respuesta distinta. Hay que sacarla de uno
 * de los dos lados; la decision quedo abierta con el cliente.
 */
export const autosUsadosFaqs = [
  {
    question: "¿Dónde comprar autos usados confiables en Córdoba?",
    answer:
      "Conviene verificar tres cosas antes de elegir: que el vendedor esté habilitado y forme parte de la Cámara de Comercio Automotor de Córdoba, que publique el precio y el estado real de cada unidad, y que se haga cargo de la transferencia y de los trámites. AB Automotores cumple con las tres. Estamos en Av. Amadeo Sabattini 4260, barrio Empalme, con más de 20 años en el rubro automotor de Córdoba.",
  },
  {
    question: "¿Cuántos kilómetros es recomendable para comprar un auto usado?",
    answer:
      "Un promedio de 15.000 kilómetros por año de antigüedad está dentro de lo normal en Argentina. Más que el número absoluto importa el mantenimiento: un auto con 200.000 kilómetros y service documentado suele estar mejor que uno con 80.000 sin historial. Lo que sí conviene revisar es que el kilometraje sea coherente con el desgaste visible del vehículo.",
  },
  {
    question: "¿Qué autos usados no conviene comprar?",
    answer:
      "Más que evitar marcas o modelos puntuales, conviene evitar situaciones: vehículos con el título observado o con prenda sin cancelar, unidades con deudas de patentes o infracciones acumuladas, autos que tuvieron siniestros importantes sin reparación documentada, y modelos cuyos repuestos ya no se consiguen con facilidad en el mercado local. Cualquiera de esas cuatro cosas convierte una buena oferta en un problema caro.",
  },
  {
    question: "¿Conviene comprar en una agencia o a un particular?",
    answer:
      "Comprar a un particular suele salir algo más barato, pero todo el riesgo queda del lado del comprador: verificar el estado real del vehículo, confirmar que no tenga deudas ni prenda, y hacer la transferencia por cuenta propia. En una agencia habilitada el vehículo pasa por una revisión previa, la operación queda documentada y los trámites los hace la concesionaria. La diferencia de precio suele ser menor que el costo de un problema con los papeles.",
  },
  {
    question: "¿Puedo entregar mi auto usado como parte de pago?",
    answer:
      "Sí. Tomamos tu vehículo actual como parte de pago de cualquiera de los autos publicados, con una tasación sin cargo y en el momento. Si preferís, también podemos comprártelo de forma directa o dejarlo en consignación para venderlo por vos.",
  },
] as const;

/**
 * Las cuatro salen del doc de SEO. Las dos primeras responden long tails que
 * aparecen en busquedas relacionadas (sin anticipo, con dni entrega inmediata);
 * las dos ultimas no las contesta ningun competidor de la SERP en formato de
 * pregunta.
 *
 * Ojo con las tres primeras: describen como funcionan las lineas en general y
 * remiten a la consulta para el caso concreto, sin comprometer porcentajes,
 * montos ni plazos. En cuanto se carguen las cifras confirmadas en
 * lib/financiacion.ts, revisar que estas respuestas no las contradigan.
 */
export const financiacionFaqs = [
  {
    question: "¿Se puede financiar un auto usado sin anticipo?",
    answer:
      "Sí, se puede. Existen líneas que financian hasta el 100% del valor del vehículo, así que no necesitás poner un anticipo en efectivo. Lo que conviene tener claro es que cuanto mayor es el porcentaje que financiás, más alta queda la cuota y más exigente es la evaluación que hace la entidad, porque el monto del crédito es mayor. Toda operación sin anticipo está sujeta a la aprobación del banco. En AB Automotores hay otra vuelta posible: si tenés un auto usado, lo tasamos sin cargo y ese valor funciona como anticipo, así financiás solo la diferencia y la cuota te queda más baja.",
  },
  {
    question: "¿Puedo comprar un auto financiado solo con el DNI?",
    answer:
      "Sí, y es una de las opciones más fuertes que tenemos: todas las líneas que trabajamos arrancan con el DNI. Los créditos prendarios de Banco Supervielle y Banco Galicia se resuelven solo con el DNI, sin ninguna demostración de ingresos. El motivo es que en un prendario el propio auto queda como garantía del crédito, así que la entidad no necesita que acredites ingresos por otra vía. Los créditos personales de Banco de Córdoba y Banco Nación van con DNI o con recibo de sueldo, según el caso. En todas las operaciones la aprobación final queda sujeta a la evaluación crediticia del banco. Escribinos con el modelo que te interesa y te decimos en el momento qué línea te sirve y con qué papeles.",
  },
  {
    question: "¿Cuántas cuotas puedo sacar para un auto usado?",
    answer:
      "Depende de la línea y de la entidad. Los créditos prendarios, que trabajamos con Banco Supervielle y Banco Galicia, son los que admiten plazos más largos, porque el propio vehículo queda como garantía del banco. Los créditos personales de Banco de Córdoba y Banco Nación manejan plazos más cortos. En los usados hay además un factor que no aparece cuando se compra un 0km: la antigüedad del vehículo. Cuanto más viejo es el auto, menos plazo acepta financiar la entidad, porque el crédito no puede extenderse más allá de la vida útil que le reconoce. Por eso el plazo máximo real se define sobre el auto concreto que elijas, y te lo decimos junto con el valor de la cuota en cada opción.",
  },
  {
    question: "¿Qué pasa si estoy en el Veraz?",
    answer:
      "Depende de qué figure, y conviene ser honesto con esto. Estar en el Veraz no es una sola cosa: hay una escala de situación crediticia, y no todos los casos bloquean un crédito. Una demora leve, o una deuda que ya cancelaste y todavía aparece en el historial, muchas veces no impide financiar, aunque puede reducir el monto que la entidad aprueba. En cambio, una situación irregular vigente sí complica bastante y en general termina en rechazo. Cuando pasa eso hay caminos alternativos que sirven: sumar un garante o poner el crédito a nombre de un familiar, aumentar el anticipo para bajar el monto a financiar, o entregar un auto usado como parte de pago. Escribinos con confianza y revisamos tu caso sin cargo: te decimos de frente si hay línea disponible o no, antes de que pierdas tiempo.",
  },
] as const;
