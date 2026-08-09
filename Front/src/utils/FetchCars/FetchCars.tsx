import { IProduct, IProductUpdate } from "@/Interfaces/Interface";
import { API_URL, request } from "@/utils/apiClient";

// El caché se purga al instante cuando el admin toca algo (ver /api/revalidate);
// este plazo es solo la red de seguridad por si esa señal se pierde.
const REVALIDATE = 300;
export const VEHICLES_TAG = "vehicles";

export default async function fetchCars(): Promise<IProduct[]> {
  try {
    const res = await fetch(`${API_URL}/vehicles`, {
      next: { revalidate: REVALIDATE, tags: [VEHICLES_TAG] },
    });

    if (!res.ok) {
      throw new Error(`No se pudieron obtener los vehículos (${res.status})`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error al obtener los vehículos:", error);
    return [];
  }
}

export async function fetchFeaturedCars(): Promise<IProduct[]> {
  try {
    const res = await fetch(`${API_URL}/vehicles?featured=true`, {
      next: { revalidate: REVALIDATE, tags: [VEHICLES_TAG] },
    });

    if (!res.ok) {
      throw new Error(`No se pudieron obtener los destacados (${res.status})`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error al obtener los destacados:", error);
    return [];
  }
}

/** `null` cuando el vehículo no existe, para que la página llame a notFound(). */
export async function fetchProductById(id: string): Promise<IProduct | null> {
  try {
    const res = await fetch(`${API_URL}/vehicles/${id}`, {
      next: { revalidate: REVALIDATE, tags: [VEHICLES_TAG] },
    });

    if (!res.ok) {
      if (res.status !== 404) {
        console.error("No se pudo obtener el vehículo:", res.status);
      }
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error al obtener el vehículo:", error);
    return null;
  }
}

export async function fetchPostProduct(
  newProduct: FormData,
  token: string | null,
): Promise<boolean> {
  if (!token) return false;

  try {
    await request<IProduct>("/vehicles", {
      method: "POST",
      body: newProduct,
      token,
    });
    return true;
  } catch (error) {
    console.error("Error al crear el vehículo:", error);
    return false;
  }
}

export async function fetchPatchProduct(
  id: string,
  fields: IProductUpdate,
  token: string | null,
): Promise<boolean> {
  if (!token) return false;

  try {
    await request<IProduct>(`/vehicles/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
      token,
    });
    return true;
  } catch (error) {
    console.error("Error al editar el vehículo:", error);
    return false;
  }
}

/**
 * Reemplaza la galería en una sola llamada: las imágenes cuyo id no esté en
 * `keepImageIds` se borran (también de Cloudinary) y se agregan `newFiles`.
 */
export async function fetchUpdateProductImages(
  id: string,
  keepImageIds: string[],
  newFiles: File[],
  token: string | null,
): Promise<boolean> {
  if (!token) return false;

  const body = new FormData();
  body.append("keepImageIds", JSON.stringify(keepImageIds));
  newFiles.forEach((file) => body.append("files", file));

  try {
    await request<IProduct>(`/vehicles/${id}/images`, {
      method: "PATCH",
      body,
      token,
    });
    return true;
  } catch (error) {
    console.error("Error al actualizar las imágenes:", error);
    return false;
  }
}

export async function fetchSetFeatured(
  ids: string[],
  token: string | null,
): Promise<boolean> {
  if (!token) return false;

  try {
    await request<IProduct[]>("/vehicles/featured", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
      token,
    });
    return true;
  } catch (error) {
    console.error("Error al actualizar los destacados:", error);
    return false;
  }
}

export async function fetchDeleteId(id: string): Promise<boolean> {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    await request<void>(`/vehicles/${id}`, { method: "DELETE", token });
    return true;
  } catch (error) {
    console.error("Error al eliminar el vehículo:", error);
    return false;
  }
}
