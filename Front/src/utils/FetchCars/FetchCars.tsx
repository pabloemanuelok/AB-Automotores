import { IProduct } from "@/Interfaces/Interface";

// Función para obtener todos los productos
export default async function fetchCars(): Promise<IProduct[]> {
    try {
        const res = await fetch("https://ab-backend-iznbqeqe7a-uc.a.run.app/products", {
            cache: 'no-store', // Deshabilita el cache del lado del cliente y servidor
        });

        if (!res.ok) {
            throw new Error("No se pudieron obtener los vehículos");
        }

        return await res.json();
    } catch (error) {
        console.error("Error al obtener los vehículos:", error);
        return [];
    }
}

// Función para obtener un producto por su ID
export async function fetchProductById(_id: string): Promise<IProduct> {
    try {
        const res = await fetch(`https://ab-backend-iznbqeqe7a-uc.a.run.app/products/${_id}`);
        if (!res.ok) {
            throw new Error("No se pudo obtener el producto");
        }
        return await res.json();
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        throw error;  // Propaga el error
    }
}

// Función para eliminar un producto por su ID
export async function fetchDeleteId(_id: string): Promise<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No se encontró el token');
        return false;
    }

    try {
        const res = await fetch(`https://ab-backend-iznbqeqe7a-uc.a.run.app/products/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            console.error('Error al eliminar el vehículo');
            return false;
        }

        // Llamar a fetchCars después de eliminar para obtener los productos actualizados
        await fetchCars(); // Llamada para asegurarte de obtener la lista actualizada
        return true;
    } catch (error) {
        console.error('Error de red:', error);
        return false;
    }
}

// Función para crear un nuevo producto
export async function fetchPostProduct(newProduct: FormData, token: string | null): Promise<boolean> {
    if (!token) {
        console.error('No se encontró el token');
        return false;
    }

    try {
        const res = await fetch("https://ab-backend-iznbqeqe7a-uc.a.run.app/products", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: newProduct,
        });

        if (!res.ok) {
            throw new Error("No se pudo crear el producto");
        }

        // Llamar a fetchCars para obtener la lista actualizada
        await fetchCars(); // Llamada para asegurarte de obtener la lista actualizada
        return true;
    } catch (error) {
        console.error("Error al crear el producto:", error);
        return false;
    }
}
