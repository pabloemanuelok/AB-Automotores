import React from 'react'
import type { Metadata } from 'next'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'
import Contact from '@/Components/Contact/Contact'
import ComoLlegar from '@/Components/ComoLlegar/ComoLlegar'
import QuienesSomos from '@/Components/QuienesSomos/QuienesSomos'
import CtaBanner from '@/Components/CtaBanner/CtaBanner'
import FondoNav from '@/Components/FondoNav/FondoNav'
import { SITE_URL } from '@/lib/seo'

const title = 'Contacto y ubicación en Córdoba'
const description =
  'Estamos en Av. Amadeo Sabattini 4260, barrio Empalme, Córdoba. Lunes a viernes de 9 a 13 y de 15 a 19, sábados de 9 a 13. Escribinos por WhatsApp o completá el formulario.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/contacto' },
  openGraph: {
    title: `${title} | AB Automotores`,
    description,
    url: '/contacto',
    type: 'website',
    locale: 'es_AR',
    siteName: 'AB Automotores',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
}

// Dos tipos en el mismo nodo: la pagina es la de contacto y ademas es donde
// vive el contenido de Quienes Somos. El negocio no se redeclara, se referencia
// por el @id del AutoDealer que sirve el layout en todas las paginas.
const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': ['ContactPage', 'AboutPage'],
  '@id': `${SITE_URL}/contacto#webpage`,
  url: `${SITE_URL}/contacto`,
  name: `${title} | AB Automotores`,
  description:
    'Datos de contacto, horarios de atención y ubicación de AB Automotores en Av. Amadeo Sabattini 4260, barrio Empalme, Córdoba.',
  inLanguage: 'es-AR',
  isPartOf: {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'AB Automotores',
  },
  about: { '@id': `${SITE_URL}/#autodealer` },
  mainEntity: { '@id': `${SITE_URL}/#autodealer` },
  breadcrumb: { '@id': `${SITE_URL}/contacto#breadcrumb` },
}

const page = () => {
  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <FondoNav
        solid
        eyebrow="Estamos para ayudarte"
        title="Contacto"
        description="Completá el formulario y nos comunicamos a la brevedad para brindarte toda la información."
      />

      <Breadcrumb path="/contacto" items={[{ nombre: 'Contacto' }]} />

      <Contact />
      <ComoLlegar />
      <QuienesSomos />

      <CtaBanner
        eyebrow="Atención inmediata"
        title="Respondemos en menos de 24 horas"
        description="Nuestro equipo está listo para asesorarte y resolver todas tus dudas sin demoras."
        whatsapp={{
          label: 'Escribinos por WhatsApp',
          mensaje: '¡Hola! Quiero hacer una consulta.',
          origen: 'contacto',
        }}
      />
    </div>
  )
}

export default page
