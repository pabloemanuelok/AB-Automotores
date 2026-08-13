// NAP (nombre, direccion, telefono) en un solo lugar: el texto visible y el
// JSON-LD tienen que decir exactamente lo mismo que la ficha de Google. Si se
// declaran por separado, tarde o temprano cambia uno solo y el sitio empieza a
// darle dos direcciones distintas al buscador.

export const NOMBRE = "AB Automotores";

export const DIRECCION = {
  calle: "Avenida Amadeo Sabattini 4260",
  barrio: "Empalme",
  ciudad: "Córdoba",
  provincia: "Córdoba",
  codigoPostal: "X5006KQT",
  pais: "AR",
} as const;

/** "Avenida Amadeo Sabattini 4260, Empalme, X5006KQT Córdoba" */
export const DIRECCION_COMPLETA = `${DIRECCION.calle}, ${DIRECCION.barrio}, ${DIRECCION.codigoPostal} ${DIRECCION.ciudad}`;

// Con el 9 despues del 54 (E.164 de movil argentino), que es como figuran en la
// ficha de Google. El schema y los tel: del sitio tienen que decir lo mismo que
// la ficha, si no el buscador ve dos negocios distintos.
export const TELEFONOS = [
  { display: "+54 9 351 612-9221", tel: "+5493516129221" },
  { display: "+54 9 351 508-8602", tel: "+5493515088602" },
] as const;

/** WhatsApp usa el internacional sin el +. */
export const WSP_NUMERO = TELEFONOS[0].tel.replace("+", "");

export const EMAIL = "abautomotores@hotmail.com";

export const HORARIOS = [
  "Lun a Vie: 9 a 13 hs y 15 a 19 hs",
  "Sábados: 9 a 13 hs",
] as const;

export const MAPS_URL = "https://maps.app.goo.gl/SwaGpKmyq8RJGCAHA";

export const CAMARA = "Cámara de Comercio Automotor de Córdoba";

export const ANIO_FUNDACION = 2003;

// wa.me y no el catalogo de WhatsApp Business: abre el chat directo.
export const wspChat = (mensaje = "¡Hola! Quiero consultar por un vehículo.") =>
  `https://wa.me/${WSP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
