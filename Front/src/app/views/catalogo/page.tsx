import React from 'react';
import CardsList from '@/Components/CardList/CardList';
import FondoNav from '@/Components/FondoNav/FondoNav';
import fetchCars from '@/utils/FetchCars/FetchCars';

// Componente Server Component
export default async function CatalogoPage() {
  // Obtener productos directamente en el servidor
  const products = await fetchCars();

  return (
    <div>
      <FondoNav />
      <CardsList products={products} />
    </div>
  );
}
