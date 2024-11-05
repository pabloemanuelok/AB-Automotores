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
      <FondoNav imageUrl="https://static.wixstatic.com/media/0816f9_a3c45a711ee34c6f81f78db3160997d4~mv2.png" />
      <Detail product={product} />
    </div>
  );
}
