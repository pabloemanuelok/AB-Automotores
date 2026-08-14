import React from 'react'
import type { Metadata } from 'next'
import Financiacion from '@/Components/Financiacion/Financiacion'
import ComoEsElProceso from '@/Components/Financiacion/ComoEsElProceso'
import Faq from '@/Components/Faq/Faq'
import CtaBanner from '@/Components/CtaBanner/CtaBanner'
import FondoNav from '@/Components/FondoNav/FondoNav'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'
import { financiacionFaqs, faqPageSchema } from '@/lib/faq'
import { TELEFONOS } from '@/lib/negocio'
import { SITE_URL } from '@/lib/seo'

const PATH = '/financiacion'

const title = 'Financiación de autos usados en Córdoba'
const description =
  'Financiá hasta el 100% de tu auto usado o 0km en Córdoba. Créditos prendarios y personales con Bancor, Nación, Supervielle y Galicia. Solo con DNI y entrega inmediata.'

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

// El negocio no se redeclara, se referencia por el @id del AutoDealer del layout.
// El servicePhone sale de negocio.ts y no del doc de SEO: el doc lo escribe sin
// el 9 del movil argentino y la ficha de Google lo tiene con el 9. Si el schema
// y la ficha no coinciden, el buscador ve dos negocios distintos.
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}${PATH}#service`,
  name: 'Financiación de autos usados y 0km',
  serviceType: 'Crédito prendario y personal para automotores',
  url: `${SITE_URL}${PATH}`,
  description:
    'Financiación de vehículos usados y 0km en Córdoba con créditos prendarios y personales. Solo con DNI o con demostración de ingresos, y entrega inmediata.',
  provider: { '@id': `${SITE_URL}/#autodealer` },
  areaServed,
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: `${SITE_URL}${PATH}`,
    servicePhone: TELEFONOS[0].tel,
    serviceLocation: { '@id': `${SITE_URL}/#autodealer` },
  },
}

const faqSchema = faqPageSchema(financiacionFaqs, PATH)

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
        eyebrow="Opciones de pago"
        title={title}
        description="Financiá hasta el 100% de tu próximo vehículo, con entrega inmediata."
      />
      <Breadcrumb path={PATH} items={[{ nombre: 'Financiación' }]} />

      <Financiacion />
      <ComoEsElProceso />
      <Faq
        items={financiacionFaqs}
        kicker="Antes de sacar el crédito"
        titulo="Preguntas Frecuentes para financiar un auto"
      />

      <CtaBanner
        eyebrow="Consultá sin compromiso"
        title="¿Querés conocer tu crédito disponible?"
        description="Contactanos y te asesoramos para encontrar la mejor opción de financiamiento para vos."
        whatsapp={{
          label: 'Consultar por financiación',
          mensaje: 'Hola, quería consultar por financiación.',
          origen: 'financiacion',
        }}
      />
    </div>
  )
}

export default page
