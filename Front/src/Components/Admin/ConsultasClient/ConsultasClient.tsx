"use client";

import React, { useState, useEffect } from "react";
import { fetchGetConsultas, fetchDeleteConsulta } from "@/utils/FetchCon/FetchCon";
import { getAuthToken } from "@/utils/Auth/Auth";
import { IConsulta } from "@/Interfaces/Interface";

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
      const token = getAuthToken();
      if (!token) {
        throw new Error("Token no encontrado");
      }
      const data = await fetchGetConsultas(token);
      setInquiries(data);
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
      await fetchDeleteConsulta(_id, token);
      setInquiries(inquiries.filter((inquiry) => inquiry._id !== _id));
    } catch (err) {
      setError("Error al eliminar la consulta.");
    }
  };

  if (loading) return <p className="text-center text-white">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-start w-full bg-[#222222] p-9 rounded-lg shadow-xl border border-gray-800 min-h-full">
      <h2 className="text-3xl text-center font-semibold text-yellow-400 p-5 mb-6 bg-opacity-20 border-b-2 border-yellow-400 w-full">
        Consultas de clientes
      </h2>

      {/* Barra lateral que permite hacer scroll solo en las consultas */}
      <div className="w-full max-w-4xl bg-[#222222] p-8 rounded-lg shadow-lg border border-gray-700">
        <div className="overflow-y-auto max-h-96">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry._id}
              className="flex flex-col gap-6 mb-6 p-6 bg-[#333333] rounded-lg shadow-lg"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-white text-xl font-semibold">{inquiry.nombre}</h3>
                <button
                  onClick={() => handleDeleteInquiry(inquiry._id)}
                  className="bg-red-600 hover:bg-red-500 text-white py-1 px-4 rounded-lg"
                >
                  Eliminar
                </button>
              </div>
              <p className="text-white">{inquiry.email}</p>
              <p className="text-white">{inquiry.mensaje}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultasClient;
