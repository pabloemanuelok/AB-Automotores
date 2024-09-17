import { IConsulta } from '@/Interfaces/Interface';

const baseUrl = "http://localhost:3000/consultas"; // Asegúrate de que la URL es correcta

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
export const fetchPostConsulta = async (consulta: IConsulta, token: string): Promise<IConsulta> => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // Incluye el token en los headers
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
