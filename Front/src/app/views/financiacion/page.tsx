import Financiacion from '@/Components/Financiacion/Financiacion'
import React from 'react'
import FondoNav from '@/Components/FondoNav/FondoNav'

const page = () => {
  return (
    <div>
        <FondoNav imageUrl="https://static.wixstatic.com/media/0816f9_a3c45a711ee34c6f81f78db3160997d4~mv2.png" />
        <Financiacion/>
    </div>
  )
}

export default page