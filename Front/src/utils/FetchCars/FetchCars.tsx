import { IProduct } from "@/Interfaces/Interface";

export default async function fetchCars(): Promise<IProduct[]> {
    try {
        const res = await fetch("http://localhost:3000/products", {
            next: {revalidate:0},
        })
        if(!res.ok) {
            throw new Error("Failed to fetch")
        }
        return await res.json()
    } catch (error) {
        console.error("Error fetching cars:", error);
    return [];
    }
}

export async function fetchProductById(_id: string): Promise<IProduct> {
    const res = await fetch(`http://localhost:3000/products/${_id}`);
    console.log(res);
    
    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }
    const product = await res.json();
    
    return product;
  }

  export async function fetchDeleteId(_id: string): Promise<boolean> {
    try {
      const token = localStorage.getItem('token');; // Obtén tu token de autenticación
  
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