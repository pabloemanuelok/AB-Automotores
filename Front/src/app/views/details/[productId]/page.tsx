// page.tsx
import Detail from '@/Components/Detail/Detail';
import { fetchProductById } from '@/utils/FetchCars/FetchCars';

export default async function CarsPage({ params }: { params: { productId: string } }) {
  const product = await fetchProductById(params.productId);

  if (!product) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-lg">Producto no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] pt-20">
      <Detail product={product} />
    </div>
  );
}
