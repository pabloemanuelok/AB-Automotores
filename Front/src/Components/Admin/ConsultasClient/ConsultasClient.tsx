"use client";

import React, { useState, useEffect } from "react";
import { fetchGetConsultas, fetchDeleteConsulta } from '@/utils/FetchCon/FetchCon'; // Asegúrate de que esta importación sea correcta
import { getAuthToken } from '@/utils/Auth/Auth'; // Asegúrate de que esta importación sea correcta
import { IConsulta } from '@/Interfaces/Interface';

const ConsultasClient: React.FC = () => {
  const [inquiries, setInquiries] = useState<IConsulta[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const token = getAuthToken(); // Obtén el token aquí
      if (!token) {
        throw new Error("Token no encontrado");
      }
      const data = await fetchGetConsultas(token); // Petición con token
      setInquiries(data); // Asigna los datos obtenidos
    } catch (err) {
      setError("Error al obtener las consultas.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInquiry = async (_id: string) => {
    const token = getAuthToken();
    if (!token) {
      setError("Token no encontrado");
      return;
    }
    try {
      await fetchDeleteConsulta(_id, token); // Elimina la consulta en la base de datos
      // Filtra la consulta que se ha eliminado
      setInquiries(inquiries.filter((inquiry) => inquiry._id !== _id));
    } catch (err) {
      setError("Error al eliminar la consulta.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center w-full mt-6 bg-black">
      <h2 className="text-2xl md:text-4xl text-center font-semibold bg-white p-5 text-black w-full mb-6">
        Consulta de clientes
      </h2>

      {/* Contenedor de lista con scroll vertical */}
      <div className="w-full max-w-3xl overflow-y-auto" style={{ maxHeight: '500px' }}>
        {inquiries.map((inquiry) => (
          <div
            key={inquiry._id}
            className="bg-[#222222] p-4 rounded-lg shadow-md flex flex-col gap-2 border border-gray-800 mb-4"
          >
            <div className="text-white">
              <p>
                <strong>Nombre:</strong> {inquiry.nombre}
              </p>
              <p>
                <strong>Email:</strong> {inquiry.email}
              </p>
              <p>
                <strong>Teléfono:</strong> {inquiry.telefono}
              </p>
            </div>
            <div className="bg-[#D9D9D9] p-3 rounded-lg relative text-gray-800" style={{ paddingBottom: '2.5rem' }}>
              {/* Asegúrate de que el mensaje se muestre incluso si es opcional */}
              <p className="text-black">{inquiry.mensaje || "No hay mensaje"}</p>
              {/* Botón de eliminar */}
              <button
                onClick={() => handleDeleteInquiry(inquiry._id)}
                className="absolute bottom-2 right-2 p-2 bg-red-600 rounded-full text-white hover:opacity-80 transition-opacity"
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultasClient;
