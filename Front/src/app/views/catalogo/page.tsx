import CardsList from '@/Components/CardList/CardList'
import FondoNav from '@/Components/FondoNav/FondoNav'
import fetchCars from '@/utils/FetchCars/FetchCars'
import Loader from '@/Components/Loader/Loader'
import React from 'react'


export default async function CatalogoPage() {
  // Cargar productos
  const products = await fetchCars();

  return (
    <div>
      <FondoNav />
      <React.Suspense fallback={<Loader />}>
        <CardsList products={products} />
      </React.Suspense>
    </div>
  );
}
