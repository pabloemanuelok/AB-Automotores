import Contact from '@/Components/Contact/Contact'
import React from 'react'
import FondoNav from '@/Components/FondoNav/FondoNav'

const page = () => {
  return (
    <div>
      <FondoNav imageUrl="https://static.wixstatic.com/media/0816f9_a3c45a711ee34c6f81f78db3160997d4~mv2.png" />
        <Contact/>
    </div>
  )
}

export default page