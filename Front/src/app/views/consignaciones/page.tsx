import Consignaciones from '@/Components/Consignaciones/Consignaciones'
import React from 'react'
import type { Metadata } from 'next'
import FondoNav from '@/Components/FondoNav/FondoNav'
import Breadcrumb from '@/Components/Breadcrumb/Breadcrumb'

const title = 'Consignación de autos en Córdoba'
const description = 'Dejá tu auto en consignación en AB Automotores. Lo exhibimos en nuestro salón, atendemos a los compradores y gestionamos toda la operación por vos.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/views/consignaciones' },
  openGraph: {
    title: `${title} | AB Automotores`,
    description,
    url: '/views/consignaciones',
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
        eyebrow="Vendé tu vehículo"
        title="Consignaciones"
        description="Te gestionamos la venta y nos encargamos de todos los trámites para que vos no te preocupes de nada."
      />
      <Breadcrumb path="/views/consignaciones" items={[{ nombre: 'Consignaciones' }]} />
      <Consignaciones />
    </div>
  )
}

export default page