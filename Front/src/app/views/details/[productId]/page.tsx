// page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Detail from '@/Components/Detail/Detail';
import { fetchProductById } from '@/utils/FetchCars/FetchCars';

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default async function CarsPage({ params }: { params: { productId: string } }) {
  const product = await fetchProductById(params.productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-[#0a0a0a] pt-20">
      <Detail product={product} />
    </div>
  );
}
