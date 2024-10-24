import { IConsulta } from '@/Interfaces/Interface';

// Utiliza la variable de entorno para la base URL
const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/consultas`; // Asegúrate de que la variable sea pública

// GET: Obtener todas las consultas
export const fetchGetConsultas = async (token: string): Promise<IConsulta[]> => {
  const response = await fetch(baseUrl, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}` // Incluye el token en los headers
    }
  });

  if (!response.ok) {
    const errorMessage = await response.text(); // Obtiene el texto de error si lo hay
    throw new Error(`Error al obtener las consultas: ${errorMessage}`);
  }

  return await response.json();
};

// POST: Crear una nueva consulta
export const fetchPostConsulta = async (consulta: Omit<IConsulta, '_id' | 'banco'>): Promise<IConsulta> => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // No se agrega 'Authorization' porque no es necesario
    },
    body: JSON.stringify(consulta)
  });

  if (!response.ok) {
    const errorMessage = await response.text(); // Obtiene el texto de error si lo hay
    throw new Error(`Error al crear la consulta: ${errorMessage}`);
  }

  return await response.json();
};

// DELETE: Eliminar una consulta por ID
export const fetchDeleteConsulta = async (id: string, token: string): Promise<void> => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}` // Incluye el token en los headers
    }
  });

  if (!response.ok) {
    const errorMessage = await response.text(); // Obtiene el texto de error si lo hay
    throw new Error(`Error al eliminar la consulta: ${errorMessage}`);
  }
};
