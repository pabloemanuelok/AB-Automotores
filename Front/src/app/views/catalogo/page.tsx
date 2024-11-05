import CardsList from '@/Components/CardList/CardList'
import FondoNav from '@/Components/FondoNav/FondoNav'
import fetchCars from '@/utils/FetchCars/FetchCars'
import React from 'react'

export default async function page () {
    const products = await fetchCars()
  return (
    <div>
        <FondoNav/>
       <div>
        <CardsList products={products}/>
       </div>
    </div>
  )
}
