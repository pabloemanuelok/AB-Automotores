"use client";

import React, { useState, useEffect } from "react";
import { fetchGetConsultas, fetchDeleteConsulta } from "@/utils/FetchCon/FetchCon";
import { getAuthToken } from "@/utils/Auth/Auth";
import { IConsulta } from "@/Interfaces/Interface";

const ConsultasClient: React.FC = () => {
  const [inquiries, setInquiries] = useState<IConsulta[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedInquiry, setSelectedInquiry] = useState<IConsulta | null>(null);

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

  const handleSelectInquiry = (inquiry: IConsulta) => {
    setSelectedInquiry(inquiry);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Fecha no disponible";
    const newDate = new Date(date);
    return `${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}`;
  };

  if (loading) return <p className="text-center">Cargando consultas...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-black">
      <h2 className="text-2xl font-semibold mb-6">Consultas de Clientes</h2>
      <div className="overflow-y-auto max-h-80">
        {loading ? (
          <div className="text-center">Cargando consultas...</div>
        ) : (
          <ul>
            {inquiries.map((inquiry) => (
              <li
                key={inquiry._id}
                className="flex justify-between items-center border-b py-4 px-6 mb-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectInquiry(inquiry)}
              >
                <div>
                  <p className="text-sm font-semibold">{inquiry.nombre}</p>
                  <p className="text-sm text-gray-500">{inquiry.email}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Evitar que el click sobre el botón también seleccione la consulta
                    handleDeleteInquiry(inquiry._id);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg focus:outline-none"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mostrar los detalles de la consulta seleccionada */}
      {selectedInquiry && (
        <div className="mt-12 bg-gray-50 p-6 rounded-lg shadow-lg relative">
          <h3 className="text-xl font-semibold mb-4">Detalles de la consulta</h3>
          <p><strong>Nombre:</strong> {selectedInquiry.nombre}</p>
          <p><strong>Email:</strong> {selectedInquiry.email}</p>
          <p><strong>Teléfono:</strong> {selectedInquiry.telefono}</p>
          <p><strong>Banco:</strong> {selectedInquiry.banco}</p>
          <p><strong>Mensaje:</strong> {selectedInquiry.mensaje || "No hay mensaje"}</p>
          <p><strong>Fecha:</strong> {formatDate(selectedInquiry.createdAt)}</p>

          {/* Botón de cierre */}
          <button
            onClick={() => setSelectedInquiry(null)}
            className="absolute top-4 right-4 text-5xl text-gray-500 hover:text-red-500 focus:outline-none"
          >
            &times; {/* Esto es el símbolo de la "X" */}
          </button>
        </div>
      )}

      {/* Botón de cerrar sesión */}
      <div className="mt-12 text-center">
        <button
          onClick={() => {/* Aquí puedes agregar la función de logout */}}
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default ConsultasClient;
