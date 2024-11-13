import dynamic from 'next/dynamic';
import Section4y5 from '@/Components/Section3/Section3';
import React from 'react';

const Section0 = dynamic(() => import('@/Components/Section0/Section0'), {
  loading: () => <p>Loading Section0...</p>, // Muestra algo mientras carga
});
const Section1 = dynamic(() => import('@/Components/Section1/Section1'), {
  loading: () => <p>Loading Section1...</p>,
});
const Section2 = dynamic(() => import('@/Components/Section2/Section2'), {
  loading: () => <p>Loading Section2...</p>,
});
const Section7 = dynamic(() => import('@/Components/Section4/Section4'), {
  loading: () => <p>Loading Section7...</p>,
});
const Section9 = dynamic(() => import('@/Components/Section5/Section5'), {
  loading: () => <p>Loading Section9...</p>,
});

const page = () => {
  return (
    <div>
      <Section0 />
      <Section1 />
      <Section2 />
      <Section7 />
      <Section4y5 />
      <Section9 />
    </div>
  );
}

export default page;
