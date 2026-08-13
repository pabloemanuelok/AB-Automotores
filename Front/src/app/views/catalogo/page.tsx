import React from 'react';
import type { Metadata } from 'next';
import CardsList from '@/Components/CardList/CardList';
import FondoNav from '@/Components/FondoNav/FondoNav';
import CtaBanner from '@/Components/CtaBanner/CtaBanner';
import fetchCars from '@/utils/FetchCars/FetchCars';

const title = 'Catálogo de autos usados y 0KM';
const description = 'Explorá nuestra selección de vehículos usados y 0KM disponibles para entrega inmediata en AB Automotores.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/views/catalogo' },
  openGraph: {
    title: `${title} | AB Automotores`,
    description,
    url: '/views/catalogo',
    type: 'website',
    locale: 'es_AR',
    siteName: 'AB Automotores',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
};

// Componente Server Component
export default async function CatalogoPage() {
  // Obtener productos directamente en el servidor
  const products = await fetchCars();

  return (
    <div className="bg-white">
      <FondoNav
        solid
        title="Catalogo de usados y 0KM"
        description={
          <>
            Explorá nuestra seleccion de vehiculos <strong>disponibles para entrega inmediata</strong>.
          </>
        }
      />
      <CardsList products={products} />
      <CtaBanner
        eyebrow="¿Te gustó algunos de nuestros autos?"
        title="Consultanos y te asesoramos a la brevedad."
        description="Todos nuestros vehículos disponibles para entrega inmediata y sin vueltas"
      />
    </div>
  );
}
