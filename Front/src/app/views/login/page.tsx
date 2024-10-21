import Login from '@/Components/Login/Login'
import React from 'react'
import FondoNav from '@/Components/FondoNav/FondoNav'

const login = () => {
  return (
    <div>
      <FondoNav imageUrl="https://static.wixstatic.com/media/0816f9_a3c45a711ee34c6f81f78db3160997d4~mv2.png" />
        <Login/>
    </div>
  )
}

export default login