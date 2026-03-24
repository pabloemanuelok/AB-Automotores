import Financiacion from '@/Components/Financiacion/Financiacion'
import React from 'react'
import FondoNav from '@/Components/FondoNav/FondoNav'

const page = () => {
  return (
    <div className="bg-[#0a0a0a]">
      <FondoNav
        eyebrow="Opciones de pago"
        title="Financiación"
        description="Financiá hasta el 100% de tu próximo vehículo con entrega inmediata."
      />
      <Financiacion />
    </div>
  )
}

export default page
