// page.tsx
import Detail from '@/Components/Detail/Detail';
import { fetchProductById } from '@/utils/FetchCars/FetchCars';
import FondoNav from '@/Components/FondoNav/FondoNav';

export default async function CarsPage({ params }: { params: { productId: string } }) {
  // Convertimos el ID de la URL a número
  const product = await fetchProductById(params.productId);

  if (!product) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-lg">Producto no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a]">
      <FondoNav
        eyebrow="AB Automotores"
        title={product.name}
        description={`${product.version} · ${product.year}`}
      />
      <Detail product={product} />
    </div>
  );
}
