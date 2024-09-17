import { IProduct } from "@/Interfaces/Interface";

// Función para obtener todos los productos
export default async function fetchCars(): Promise<IProduct[]> {
    try {
        const res = await fetch("http://localhost:3000/products", {
            next: { revalidate: 0 },
        });
        if (!res.ok) {
            throw new Error("Failed to fetch");
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching cars:", error);
        return [];
    }
}

// Función para obtener un producto por su ID
export async function fetchProductById(_id: string): Promise<IProduct> {
    const res = await fetch(`http://localhost:3000/products/${_id}`);
    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }
    const product = await res.json();
    return product;
}

// Función para eliminar un producto por su ID
export async function fetchDeleteId(_id: string): Promise<boolean> {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3000/products/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Añade el token de autorización aquí
            },
        });

        if (!res.ok) {
            console.error('Error al borrar el vehículo');
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error de red:', error);
        return false;
    }
}

// Función para crear un nuevo producto
export async function fetchPostProduct(newProduct: Omit<IProduct, "_id">): Promise<boolean> {
  try {
      const res = await fetch("http://localhost:3000/products", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
          throw new Error("Failed to post product");
      }

      return true;
  } catch (error) {
      console.error("Error posting product:", error);
      return false;
  }
}
