import { IProduct } from "@/Interfaces/Interface";

// Utiliza la variable de entorno para la base URL
const BASE_URL = process.env.BACKEND_URL; 

// Función para obtener todos los productos
export default async function fetchCars(): Promise<IProduct[]> {
    try {
        const res = await fetch(`${BASE_URL}/products`, { // Cambia la URL aquí
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
    const res = await fetch(`${BASE_URL}/products/${_id}`); // Cambia la URL aquí
    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }
    const product = await res.json();
    return product;
}

// Función para eliminar un producto por su ID
export async function fetchDeleteId(_id: string): Promise<boolean> {
    try {
        const token = localStorage.getItem('token'); // Asegúrate de que el token esté presente
        const res = await fetch(`${BASE_URL}/products/${_id}`, { // Cambia la URL aquí
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
export async function fetchPostProduct(newProduct: FormData, token: string | null): Promise<boolean> {
    try {
        const res = await fetch(`${BASE_URL}/products`, { // Cambia la URL aquí
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`, // Agrega el token aquí
                // No se agrega 'Content-Type' porque se maneja automáticamente con FormData
            },
            body: newProduct, // Envía el FormData directamente
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
