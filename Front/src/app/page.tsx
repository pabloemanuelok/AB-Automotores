import Section0 from '@/Components/Section0/Section0'
import Section1 from '@/Components/Section1/Section1'
import Section2 from '@/Components/Section2/Section2'
// import Section3 from '@/Components/Section3/Section3'
import Section4y5 from '@/Components/Section4y5/Section4y5'
// import Section6 from '@/Components/Section6/Section6'
import Section7 from '@/Components/Section7/Section7'
// import Section8 from '@/Components/Section8/Section8'
import Section9 from '@/Components/Section9/Section9'
import React from 'react'

const page = () => {
  return (
    <div>
      <Section0/>
      <Section1/>
      <Section2/>
      {/* <Section3/> */}
      <Section7/>
      <Section4y5/>
      {/* <Section6/> */}
      {/* <Section8/> */}
      <Section9/>
    </div>
  )
}

export default page