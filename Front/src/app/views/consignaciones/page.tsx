import Consignaciones from '@/Components/Consignaciones/Consignaciones'
import React from 'react'
import FondoNav from '@/Components/FondoNav/FondoNav'

const page = () => {
  return (
    <div className="bg-[#0a0a0a]">
      <FondoNav
        eyebrow="Vendé tu vehículo"
        title="Consignaciones"
        description="Te gestionamos la venta y nos encargamos de todos los trámites para que vos no te preocupes de nada."
      />
      <Consignaciones />
    </div>
  )
}

export default page