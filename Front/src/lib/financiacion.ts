// Las cifras de las lineas de credito viven aca y en ningun otro lado. El
// bloque de entidades de /financiacion se arma con este array, asi cuando el
// cliente confirme o actualice los numeros se toca un solo archivo.

export type Entidad = {
  nombre: string;
  /** Tipo de linea que se trabaja con esa entidad. */
  tipo?: string;
  /** Que se pide para acceder. Ej: "Solo con DNI". */
  requisito?: string;
  /** Porcentaje maximo financiable sobre el valor del vehiculo. Ej: "hasta el 100%". */
  porcentaje?: string;
  /** Monto tope del credito. Ej: "hasta $30.000.000". */
  monto?: string;
  /** Plazo maximo. Ej: "hasta 72 cuotas". */
  cuotas?: string;
};

/**
 * El tipo de linea y los requisitos de cada entidad los confirmo el cliente el
 * 2026-08-14: Bancor y Nacion son solo creditos personales y van con DNI o
 * recibo de sueldo; Supervielle y Galicia son prendarios y se resuelven solo
 * con DNI. Las cuatro arrancan con el DNI, que es el gancho de la pagina.
 *
 * TODO (Pablo): faltan las cifras, que es lo que decide si la pagina rankea.
 * Los competidores que estan arriba en la SERP (Maipu, Autocity, SACUR)
 * publican los numeros banco por banco. Falta confirmar, por cada entidad:
 *   - porcentaje maximo financiable
 *   - monto tope del credito
 *   - cantidad maxima de cuotas
 *
 * Y ademas:
 *   - si se sigue recibiendo tarjeta de credito y con que topes
 *
 * Los campos de cifras son opcionales a proposito: la tarjeta renderiza solo
 * lo que este cargado y saltea lo que falte. Nada de numeros inventados, son
 * condiciones crediticias y publicarlas mal compromete al cliente.
 *
 * Si los numeros cambian seguido, cargar rangos y dejar la aclaracion de
 * "sujeto a evaluacion crediticia" que ya esta en el texto de la seccion.
 */
export const ENTIDADES: readonly Entidad[] = [
  { nombre: "Banco Supervielle", tipo: "Crédito prendario", requisito: "Solo con DNI" },
  { nombre: "Banco Galicia", tipo: "Crédito prendario", requisito: "Solo con DNI" },
  { nombre: "Banco de Córdoba", tipo: "Crédito personal", requisito: "Con DNI o recibo de sueldo" },
  { nombre: "Banco Nación", tipo: "Crédito personal", requisito: "Con DNI o recibo de sueldo" },
] as const;
