import CardsList from '@/Components/CardList/CardList'
import fetchCars from '@/utils/FetchCars/FetchCars'
import React from 'react'

export default async function page () {
    const products = await fetchCars()
  return (
    <div>
       <h2 className="text-center text-3xl font-bold p-5">
       Stock de vehiculos disponibles      
       </h2> 
       <div>
        <CardsList products={products}/>
       </div>
    </div>
  )
}
