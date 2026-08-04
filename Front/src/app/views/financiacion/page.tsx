import Financiacion from '@/Components/Financiacion/Financiacion'
import React from 'react'
import type { Metadata } from 'next'
import FondoNav from '@/Components/FondoNav/FondoNav'

const title = 'Financiación de autos usados y 0KM'
const description = 'Financiá hasta el 100% de tu próximo vehículo en AB Automotores. Planes a tu medida y entrega inmediata.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/views/financiacion' },
  openGraph: {
    title: `${title} | AB Automotores`,
    description,
    url: '/views/financiacion',
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
        eyebrow="Opciones de pago"
        title="Financiación"
        description="Financiá hasta el 100% de tu próximo vehículo."
      />
      <Financiacion />
    </div>
  )
}

export default page
