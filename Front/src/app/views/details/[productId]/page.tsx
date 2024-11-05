// page.tsx
import Detail from '@/Components/Detail/Detail';
import { fetchProductById } from '@/utils/FetchCars/FetchCars';
import FondoNav from '@/Components/FondoNav/FondoNav';

export default async function CarsPage({ params }: { params: { productId: string } }) {
  // Convertimos el ID de la URL a número
  const product = await fetchProductById(params.productId);

  // Si no se encuentra el producto, se puede manejar el error o mostrar un mensaje
  if (!product) {
    return <div>Producto no encontrado.</div>;
  }

  return (
    <div>
      <FondoNav/>
      <Detail product={product} />
    </div>
  );
}
