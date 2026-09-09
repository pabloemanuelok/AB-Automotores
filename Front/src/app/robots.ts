import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Buscadores de IA declarados uno por uno. Con el grupo "*" ya alcanzaria para
// permitirles todo, pero el SEO los quiere explicitos para que se vea la
// intencion al auditar el archivo.
const BOTS_IA = [
  // Busqueda y descubrimiento
  "OAI-SearchBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Applebot",
  // Fetch a pedido del usuario
  "ChatGPT-User",
  "Claude-User",
  "Perplexity-User",
  // Entrenamiento
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

// El panel y el login no se indexan nunca. Va repetido en cada grupo a
// proposito: cuando un bot encuentra un grupo con su propio nombre, el estandar
// dice que ignora por completo el grupo "*". Si estos Disallow vivieran solo en
// el "*", declarar los bots de IA los dejaria entrar al admin.
const PRIVADO = ["/views/admin", "/views/login"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVADO },
      ...BOTS_IA.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: PRIVADO,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
