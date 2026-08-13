import React from 'react'
import type { Metadata } from 'next'
import Consignaciones from '@/Components/Consignaciones/Consignaciones'
import ComoFunciona from '@/Components/Consignaciones/ComoFunciona'
import SectionAnim from '@/Components/SectionAnim/SectionAnim'
import Faq from '@/Components/Faq/Faq'
import CtaBanner from '@/Components/CtaBanner/CtaBanner'
import FondoNav from '@/Components/FondoNav/FondoNav'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'
import { consignacionesFaqs, faqPageSchema } from '@/lib/faq'
import { TELEFONOS } from '@/lib/negocio'
import { SITE_URL } from '@/lib/seo'

const PATH = '/consignaciones'

const title = 'Consignación de autos en Córdoba'
const description =
  'Dejá tu auto en consignación en Córdoba y nos ocupamos de la venta y de todos los trámites. También te lo compramos o lo tomamos como parte de pago. Tasación sin cargo.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: {
    title: `${title} | AB Automotores`,
    description,
    url: PATH,
    type: 'website',
    locale: 'es_AR',
    siteName: 'AB Automotores',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
}

const areaServed = [
  'Córdoba',
  'Villa Allende',
  'Río Ceballos',
  'Alta Gracia',
  'Malagueño',
  'Unquillo',
  'Mendiolaza',
  'Saldán',
].map((name) => ({ '@type': 'City', name }))

// El hasOfferCatalog declara las tres modalidades por separado: es lo que deja
// entender que la pagina responde tres cosas distintas y no una sola.
// El negocio no se redeclara, se referencia por el @id del AutoDealer del layout.
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}${PATH}#service`,
  name: 'Consignación y compra de autos usados',
  serviceType: 'Consignación, compra directa y permuta de automotores',
  url: `${SITE_URL}${PATH}`,
  description:
    'Consignación de autos usados en Córdoba. Dejás tu vehículo en nuestro salón, lo publicamos, buscamos comprador y gestionamos la transferencia y todos los trámites hasta el cobro. También compramos tu auto de forma directa o lo tomamos como parte de pago.',
  provider: { '@id': `${SITE_URL}/#autodealer` },
  areaServed,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Modalidades para vender tu auto',
    itemListElement: [
      {
        name: 'Consignación',
        description:
          'Dejás tu auto en nuestro salón, lo publicamos y buscamos comprador. Cobrás en el acto una vez cerrada la venta.',
      },
      {
        name: 'Compra directa',
        description:
          'Te compramos el vehículo en el momento, con tasación sin cargo y pago inmediato.',
      },
      {
        name: 'Permuta',
        description: 'Tomamos tu auto como parte de pago de otro vehículo de nuestro stock.',
      },
    ].map((servicio) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', ...servicio },
    })),
  },
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: `${SITE_URL}${PATH}`,
    servicePhone: TELEFONOS[0].tel,
    serviceLocation: { '@id': `${SITE_URL}/#autodealer` },
  },
}

const faqSchema = faqPageSchema(consignacionesFaqs, PATH)

const page = () => {
  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <FondoNav
        solid
        eyebrow="Vendé tu vehículo"
        title={title}
        description="Te gestionamos la venta y nos encargamos de todos los trámites para que vos no te preocupes de nada."
      />
      <Breadcrumb path={PATH} items={[{ nombre: 'Consignaciones' }]} />

      <Consignaciones />
      {/* Las resenas se muestran, pero a proposito no se marcan con schema:
          la calificacion la toma Google directo de la ficha. */}
      <SectionAnim />
      <ComoFunciona />
      <Faq items={consignacionesFaqs} kicker="Antes de decidirte" />

      <CtaBanner
        eyebrow="Consultá sin compromiso"
        title="¿Querés saber cuánto vale tu vehículo?"
        description="Contactanos y te damos una tasación sin cargo. Te asesoramos para que vendas al mejor precio."
        whatsapp={{
          label: 'Pedir una tasación',
          mensaje: 'Hola, quería una tasación de mi auto.',
          origen: 'consignaciones',
        }}
      />
    </div>
  )
}

export default page
