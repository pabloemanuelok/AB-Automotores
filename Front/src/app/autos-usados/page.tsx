import React from 'react';
import type { Metadata } from 'next';
import CardsList from '@/Components/CardList/CardList';
import FondoNav from '@/Components/FondoNav/FondoNav';
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb';
import CtaBanner from '@/Components/CtaBanner/CtaBanner';
import ComoTrabajamos from '@/Components/Catalogo/ComoTrabajamos';
import AntesDeComprar from '@/Components/Catalogo/AntesDeComprar';
import Faq from '@/Components/Faq/Faq';
import fetchCars from '@/utils/FetchCars/FetchCars';
import { autosUsadosFaqs, faqPageSchema } from '@/lib/faq';
import { SITE_URL } from '@/lib/seo';

const PATH = '/autos-usados';

const title = 'Autos usados en Córdoba Capital';
const description =
  'Mirá los autos usados y 0km disponibles en Córdoba Capital, con precio, año y kilometraje. Entrega inmediata, financiación hasta el 100% y permutas. Av. Amadeo Sabattini 4260, Empalme.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: {
    title: `${title} | AB Automotores`,
    description:
      'Autos usados y 0km seleccionados, disponibles para entrega inmediata en Córdoba.',
    url: PATH,
    type: 'website',
    locale: 'es_AR',
    siteName: 'AB Automotores',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
};

// CollectionPage y no ItemList: marcar cada auto pediria tener kilometraje,
// combustible, transmision, color y precio cargados de forma consistente en la
// base, y hoy varios de esos campos son opcionales. Queda fuera de alcance.
// El negocio no se redeclara, se referencia por el @id del AutoDealer del layout.
const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}${PATH}#webpage`,
  url: `${SITE_URL}${PATH}`,
  name: `${title} | AB Automotores`,
  description:
    'Listado de autos usados y 0km disponibles en el salón de AB Automotores, en Av. Amadeo Sabattini 4260, barrio Empalme, Córdoba Capital.',
  inLanguage: 'es-AR',
  isPartOf: {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'AB Automotores',
  },
  about: { '@id': `${SITE_URL}/#autodealer` },
  breadcrumb: { '@id': `${SITE_URL}${PATH}#breadcrumb` },
};

const faqSchema = faqPageSchema(autosUsadosFaqs, PATH);

// Server Component: los productos se traen en el servidor y la grilla los
// recibe ya resueltos, asi que el listado viaja en el HTML.
export default async function AutosUsadosPage() {
  const products = await fetchCars();

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <FondoNav
        solid
        eyebrow="Nuestro stock"
        title={title}
        description="Vehículos seleccionados, con entrega inmediata y financiación."
      />
      <Breadcrumb path={PATH} items={[{ nombre: 'Autos usados' }]} />

      <CardsList products={products} />

      {/* Todo el contenido va debajo de la grilla, para no meterse entre el
          usuario y los autos. */}
      <ComoTrabajamos />
      <AntesDeComprar />
      <Faq items={autosUsadosFaqs} kicker="Antes de comprar" />

      <CtaBanner
        eyebrow="¿Te gustó algunos de nuestros autos?"
        title="Consultanos y te asesoramos a la brevedad."
        description="Todos nuestros vehículos disponibles para entrega inmediata y sin vueltas"
      />
    </div>
  );
}
