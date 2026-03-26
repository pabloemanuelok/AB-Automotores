"use client";

import React, { useState, useEffect } from "react";
import { fetchGetConsultas, fetchDeleteConsulta } from "@/utils/FetchCon/FetchCon";
import { getAuthToken } from "@/utils/Auth/Auth";
import { IConsulta } from "@/Interfaces/Interface";

const formatDate = (date: Date | undefined) => {
  if (!date) return "Fecha no disponible";
  return new Date(date).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ConsultasClient: React.FC = () => {
  const [inquiries, setInquiries] = useState<IConsulta[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<IConsulta | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      if (!token) throw new Error("Token no encontrado");
      const data = await fetchGetConsultas(token);
      setInquiries(data);
    } catch {
      setError("Error al obtener las consultas.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id: string) => {
    const token = getAuthToken();
    if (!token) { setError("Token no encontrado"); return; }
    setDeleting(_id);
    try {
      await fetchDeleteConsulta(_id, token);
      setInquiries((prev) => prev.filter((i) => i._id !== _id));
      if (selectedInquiry?._id === _id) setSelectedInquiry(null);
    } catch {
      setError("Error al eliminar la consulta.");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <svg className="animate-spin w-8 h-8 text-[#B62E30]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 text-sm">{error}</p>
        <button onClick={fetchInquiries} className="mt-3 text-xs text-gray-400 hover:text-white transition-colors underline">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-0.5">Consultas de Clientes</h2>
          <p className="text-gray-400 text-sm">
            {inquiries.length} consulta{inquiries.length !== 1 ? "s" : ""} recibida{inquiries.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button onClick={fetchInquiries} title="Actualizar" className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Lista */}
        <div className="bg-[#1a1a1a] border border-[#505050]/40 rounded-xl overflow-hidden">
          {inquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <p className="text-sm">No hay consultas registradas</p>
            </div>
          ) : (
            <ul className="divide-y divide-[#505050]/30 overflow-y-auto max-h-[480px]">
              {inquiries.map((inquiry) => (
                <li
                  key={inquiry._id}
                  onClick={() => setSelectedInquiry(inquiry)}
                  className={`flex items-center justify-between gap-3 px-4 py-3.5 cursor-pointer transition-colors ${
                    selectedInquiry?._id === inquiry._id
                      ? "bg-[#B62E30]/10 border-l-2 border-[#B62E30]"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-white text-sm font-medium truncate">{inquiry.nombre}</p>
                    <p className="text-gray-400 text-xs truncate">{inquiry.email}</p>
                    {inquiry.createdAt && (
                      <p className="text-gray-600 text-xs mt-0.5">{formatDate(inquiry.createdAt)}</p>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(inquiry._id);
                    }}
                    disabled={deleting === inquiry._id}
                    className="text-red-500/60 hover:text-red-400 transition-colors flex-shrink-0 p-1.5 rounded hover:bg-red-900/20"
                    title="Eliminar"
                  >
                    {deleting === inquiry._id ? (
                      <svg className="animate-spin w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Detalle */}
        <div className="bg-[#1a1a1a] border border-[#505050]/40 rounded-xl p-5">
          {selectedInquiry ? (
            <div>
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-white font-semibold text-base">{selectedInquiry.nombre}</h3>
                  <p className="text-gray-400 text-xs mt-0.5">{formatDate(selectedInquiry.createdAt)}</p>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="text-gray-500 hover:text-white transition-colors p-1 rounded"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Email", value: selectedInquiry.email },
                  { label: "Teléfono", value: selectedInquiry.telefono },
                  { label: "Banco", value: selectedInquiry.banco },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="text-gray-500 text-xs uppercase tracking-wider">{label}</span>
                    <span className="text-white text-sm">{value || "—"}</span>
                  </div>
                ))}

                {selectedInquiry.mensaje && (
                  <div>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">Mensaje</span>
                    <p className="text-white text-sm mt-1 leading-relaxed bg-[#2a2a2a] border border-[#505050]/30 rounded-lg p-3">
                      {selectedInquiry.mensaje}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleDelete(selectedInquiry._id)}
                disabled={deleting === selectedInquiry._id}
                className="mt-5 w-full py-2 text-sm font-medium text-red-400 border border-red-900/40 rounded-lg hover:bg-red-900/20 transition-colors disabled:opacity-50"
              >
                {deleting === selectedInquiry._id ? "Eliminando..." : "Eliminar consulta"}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <p className="text-sm">Seleccioná una consulta para ver los detalles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultasClient;
