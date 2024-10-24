import { IProduct } from "@/Interfaces/Interface";

// Asegúrate de que la variable de entorno esté definida en Vercel
const BACKEND_URL = process.env.BACKEND_URL; 

// Función para obtener todos los productos
export default async function fetchCars(): Promise<IProduct[]> {
    try {
        const res = await fetch(`${BACKEND_URL}/products`, {
            next: { revalidate: 0 },
        });
        
        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching cars:", error);
        return [];
    }
}

// Función para obtener un producto por su ID
export async function fetchProductById(_id: string): Promise<IProduct> {
    const res = await fetch(`${BACKEND_URL}/products/${_id}`); 
    if (!res.ok) {
        throw new Error(`Failed to fetch product: ${res.statusText}`);
    }

    const product = await res.json();
    return product;
}

// Función para eliminar un producto por su ID
export async function fetchDeleteId(_id: string): Promise<boolean> {
    try {
        const token = localStorage.getItem('token') || ""; 
        const res = await fetch(`${BACKEND_URL}/products/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        });

        if (!res.ok) {
            console.error(`Error al borrar el vehículo: ${res.statusText}`);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error de red:', error);
        return false;
    }
}

// Función para crear un nuevo producto
export async function fetchPostProduct(newProduct: FormData, token: string | null): Promise<boolean> {
    try {
        const res = await fetch(`${BACKEND_URL}/products`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token || ""}`, 
            },
            body: newProduct, 
        });

        if (!res.ok) {
            throw new Error(`Failed to post product: ${res.statusText}`);
        }

        return true;
    } catch (error) {
        console.error("Error posting product:", error);
        return false;
    }
}
