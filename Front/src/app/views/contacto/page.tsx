import Contact from '@/Components/Contact/Contact'
import React from 'react'
import type { Metadata } from 'next'
import FondoNav from '@/Components/FondoNav/FondoNav'

const title = 'Contacto y ubicación en Córdoba'
const description = 'Visitanos en Avenida Amadeo Sabattini 4260, Empalme, Córdoba, o escribinos y te asesoramos a la brevedad.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/views/contacto' },
  openGraph: {
    title: `${title} | AB Automotores`,
    description,
    url: '/views/contacto',
    type: 'website',
    locale: 'es_AR',
    siteName: 'AB Automotores',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
}

const page = () => {
  return (
    <div className="bg-white">
      <FondoNav
        solid
        eyebrow="Estamos para ayudarte"
        title="Contacto"
        description="Completá el formulario y nos comunicamos a la brevedad para brindarte toda la información."
      />
      <Contact />
    </div>
  )
}

export default page