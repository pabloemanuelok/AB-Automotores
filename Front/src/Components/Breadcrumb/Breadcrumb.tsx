import React from "react";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

export type Miga = {
  nombre: string;
  /** Sin href = es la pagina actual y va como texto, no como link. */
  href?: string;
};

interface Props {
  /** Sin "Inicio": se agrega solo como primer nivel. */
  items: Miga[];
  /** Ruta de la pagina actual, para el @id del BreadcrumbList. Ej: "/contacto". */
  path: string;
  className?: string;
}

// Server Component: el breadcrumb visible y el BreadcrumbList salen de la misma
// lista, asi no puede pasar que Google lea una ruta distinta a la que se ve.
const Breadcrumb: React.FC<Props> = ({ items, path, className = "bg-[#0a0a0a]" }) => {
  const migas: Miga[] = [{ nombre: "Inicio", href: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${path}#breadcrumb`,
    itemListElement: migas.map((miga, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: miga.nombre,
      // Sin la barra final, para que la home coincida con su canonical.
      item: `${SITE_URL}${miga.href ?? path}`.replace(/\/$/, ""),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Migas de pan" className={className}>
        <div className="page-container pb-4">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-white/50">
            {migas.map((miga, i) => (
              <React.Fragment key={miga.nombre}>
                {i > 0 && <li aria-hidden="true">›</li>}
                <li {...(miga.href ? {} : { "aria-current": "page" as const })}>
                  {miga.href ? (
                    <Link
                      href={miga.href}
                      className="hover:text-[#B62E30] transition-colors duration-200"
                    >
                      {miga.nombre}
                    </Link>
                  ) : (
                    <span className="text-white/80">{miga.nombre}</span>
                  )}
                </li>
              </React.Fragment>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default Breadcrumb;
