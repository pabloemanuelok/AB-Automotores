import Contact from '@/Components/Contact/Contact'
import React from 'react'
import FondoNav from '@/Components/FondoNav/FondoNav'

const page = () => {
  return (
    <div className="bg-[#0a0a0a]">
      <FondoNav
        eyebrow="Estamos para ayudarte"
        title="Contacto"
        description="Completá el formulario y nos comunicamos a la brevedad para brindarte toda la información."
      />
      <Contact />
    </div>
  )
}

export default page