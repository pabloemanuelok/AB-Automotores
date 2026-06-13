import React from 'react';
import CardsList from '@/Components/CardList/CardList';
import FondoNav from '@/Components/FondoNav/FondoNav';
import CtaBanner from '@/Components/CtaBanner/CtaBanner';
import fetchCars from '@/utils/FetchCars/FetchCars';

// Componente Server Component
export default async function CatalogoPage() {
  // Obtener productos directamente en el servidor
  const products = await fetchCars();

  return (
    <div className="bg-[#0a0a0a]">
      <FondoNav
        imageSrc="/source/fotoBanner.png"
        title="Catalogo de usados y 0KM"
        description="Explorá nuestra seleccion de vehiculos disponibles para entrega inmediata."
      />
      <CardsList products={products} />
      <CtaBanner
        eyebrow="¿No encontrás lo que buscás?"
        title="Consultanos y te ayudamos a encontrar tu auto"
        description="Decinos qué estás buscando y te avisamos cuando tengamos el vehículo ideal para vos."
      />
    </div>
  );
}
