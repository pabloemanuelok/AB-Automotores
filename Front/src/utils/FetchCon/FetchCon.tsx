import { IConsulta } from '@/Interfaces/Interface';

const baseUrl = `${process.env.BACKEND_URL}/consultas`; // Usa la variable de entorno

// GET: Obtener todas las consultas
export const fetchGetConsultas = async (token: string): Promise<IConsulta[]> => {
  const response = await fetch(baseUrl, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}` // Incluye el token en los headers
    }
  });
  
  if (!response.ok) {
    throw new Error("Error al obtener las consultas");
  }
  
  return await response.json();
};

// POST: Crear una nueva consulta
export const fetchPostConsulta = async (consulta: Omit<IConsulta, '_id' | 'banco'>): Promise<IConsulta> => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(consulta)
  });
  
  if (!response.ok) {
    throw new Error("Error al crear la consulta");
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
    throw new Error("Error al eliminar la consulta");
  }
};