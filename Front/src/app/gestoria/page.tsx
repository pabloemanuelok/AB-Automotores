import React from 'react'
import type { Metadata } from 'next'
import Tramites from '@/Components/Gestoria/Tramites'
import ComoTrabajamos from '@/Components/Gestoria/ComoTrabajamos'
import Faq from '@/Components/Faq/Faq'
import CtaBanner from '@/Components/CtaBanner/CtaBanner'
import FondoNav from '@/Components/FondoNav/FondoNav'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'
import { gestoriaFaqs, faqPageSchema } from '@/lib/faq'
import { TELEFONOS } from '@/lib/negocio'
import { SITE_URL } from '@/lib/seo'

const PATH = '/gestoria'

const title = 'Gestoría del automotor en Córdoba'
const description =
  'Transferencias, informes de dominio, patentes y verificación policial en Córdoba. Oficina en Av. Sabattini 4260, barrio Empalme. Más de 20 años en el rubro automotor.'

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

// El hasOfferCatalog separa los tres grupos de tramites, que es lo que deja
// entender que la pagina responde varias consultas distintas y no una sola.
// El negocio no se redeclara, se referencia por el @id del AutoDealer del layout.
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}${PATH}#service`,
  name: 'Gestoría del automotor',
  serviceType: 'Gestoría del automotor y trámites registrales',
  url: `${SITE_URL}${PATH}`,
  description:
    'Gestoría del automotor en Córdoba. Transferencias con formulario 08, informes de dominio, verificación policial, patentes y trámites en Rentas Córdoba, cambios de radicación y denuncias de venta. Atención presencial en Av. Amadeo Sabattini 4260, barrio Empalme.',
  provider: { '@id': `${SITE_URL}/#autodealer` },
  areaServed,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Trámites del automotor',
    itemListElement: [
      {
        name: 'Transferencias y formulario 08',
        description:
          'Transferencia de titularidad ante el Registro Seccional, con formulario 08, firmas certificadas y presentación completa. También denuncias de venta, altas y bajas y duplicados de título o cédula.',
      },
      {
        name: 'Informes de dominio y verificación policial',
        description:
          'Informe de dominio para confirmar titular, prendas y embargos, y verificación policial de la numeración de motor y chasis. Se tramitan dentro de una transferencia o por separado.',
      },
      {
        name: 'Patentes y trámites en Rentas Córdoba',
        description:
          'Libre deuda de patentes, cambio de titular del impuesto a la propiedad automotor y cambios de radicación ante Rentas Córdoba.',
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

const faqSchema = faqPageSchema(gestoriaFaqs, PATH)

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
        eyebrow="Trámites del automotor"
        title={title}
        description="Hacemos los trámites de tu vehículo sin vueltas, con oficina física y atención presencial."
      />
      <Breadcrumb path={PATH} items={[{ nombre: 'Gestoría' }]} />

      <Tramites />
      <ComoTrabajamos />
      <Faq items={gestoriaFaqs} kicker="Dudas sobre trámites" />

      <CtaBanner
        eyebrow="Consultá sin compromiso"
        title="¿Necesitás hacer un trámite?"
        description="Contanos cuál es tu caso y te armamos el presupuesto completo sin cargo, con los aranceles y el honorario detallados por separado."
        whatsapp={{
          label: 'Consultar por un trámite',
          mensaje: 'Hola, quería consultar por un trámite de gestoría.',
          origen: 'gestoria',
        }}
      />
    </div>
  )
}

export default page
