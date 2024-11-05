import CardsList from '@/Components/CardList/CardList'
import FondoNav from '@/Components/FondoNav/FondoNav'
import fetchCars from '@/utils/FetchCars/FetchCars'
import React from 'react'

export default async function page () {
    const products = await fetchCars()
  return (
    <div>
        <FondoNav imageUrl="https://static.wixstatic.com/media/0816f9_a3c45a711ee34c6f81f78db3160997d4~mv2.png" />
       <div>
        <CardsList products={products}/>
       </div>
    </div>
  )
}
