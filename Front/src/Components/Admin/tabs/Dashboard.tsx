"use client";

import React, { useState, useEffect } from "react";
import fetchCars from "@/utils/FetchCars/FetchCars";
import { fetchGetConsultas } from "@/utils/FetchCon/FetchCon";
import { getAuthToken } from "@/utils/Auth/Auth";
import { getAnalytics, resetAnalytics, AnalyticsData } from "@/utils/analytics";
import { IConsulta, IProduct } from "@/Interfaces/Interface";
import Swal from "sweetalert2";

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}> = ({ icon, label, value, sub, accent }) => (
  <div className={`bg-[#1a1a1a] border rounded-xl p-5 flex items-start gap-4 ${accent ? "border-[#B62E30]/40" : "border-[#505050]/40"}`}>
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${accent ? "bg-[#B62E30]/15 text-[#B62E30]" : "bg-[#2a2a2a] text-gray-400"}`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-400 text-xs uppercase tracking-wider">{label}</p>
      <p className="text-white text-2xl font-bold mt-0.5">{value}</p>
      {sub && <p className="text-gray-500 text-xs mt-0.5">{sub}</p>}
    </div>
  </div>
);

const formatDate = (date: Date | undefined) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [consultas, setConsultas] = useState<IConsulta[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAnalytics(getAnalytics());
    const token = getAuthToken();
    Promise.all([
      fetchCars().catch(() => [] as IProduct[]),
      token
        ? fetchGetConsultas(token).catch(() => [] as IConsulta[])
        : Promise.resolve([] as IConsulta[]),
    ]).then(([cars, cons]) => {
      setProducts(cars);
      setConsultas(cons);
    }).finally(() => setLoading(false));
  }, []);

  const handleResetAnalytics = async () => {
    const result = await Swal.fire({
      title: "¿Resetear estadísticas?",
      text: "Esto limpiará todos los contadores de analytics.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B62E30",
      cancelButtonColor: "#505050",
      confirmButtonText: "Sí, resetear",
      cancelButtonText: "Cancelar",
      background: "#1a1a1a",
      color: "#fff",
    });
    if (result.isConfirmed) {
      resetAnalytics();
      setAnalytics(getAnalytics());
    }
  };

  const recentConsultas = [...consultas]
    .sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return db - da;
    })
    .slice(0, 5);

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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Dashboard</h2>
        <p className="text-gray-400 text-sm">Resumen general del sitio.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
          }
          label="Vehículos"
          value={products.length}
          sub="en catálogo"
          accent
        />
        <StatCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          }
          label="Consultas"
          value={consultas.length}
          sub="recibidas en total"
        />
        <StatCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
          }
          label="WhatsApp"
          value={analytics?.wsp ?? 0}
          sub="clicks registrados"
        />
        <StatCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          }
          label="Formulario Contacto"
          value={analytics?.contacto ?? 0}
          sub="envíos registrados"
        />
      </div>

      {/* Analytics de interacciones */}
      <div className="bg-[#1a1a1a] border border-[#505050]/40 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-sm">Interacciones por sección</h3>
          <button
            onClick={handleResetAnalytics}
            className="text-xs text-gray-500 hover:text-red-400 transition-colors"
          >
            Resetear contadores
          </button>
        </div>
        <div className="space-y-3">
          {[
            { label: "WhatsApp", key: "wsp" as const, color: "#25D366" },
            { label: "Formulario de Contacto", key: "contacto" as const, color: "#B62E30" },
            { label: "Visitas a Consignaciones", key: "consignaciones" as const, color: "#3B82F6" },
            { label: "Visitas a Financiación", key: "financiacion" as const, color: "#F59E0B" },
            { label: "Vistas de página (total)", key: "pageviews" as const, color: "#8B5CF6" },
          ].map(({ label, key, color }) => {
            const total = Math.max(...["wsp", "contacto", "consignaciones", "financiacion", "pageviews"].map(k => analytics?.[k as keyof AnalyticsData] ?? 0), 1);
            const val = analytics?.[key] ?? 0;
            const pct = total > 0 ? Math.round((val / total) * 100) : 0;
            return (
              <div key={key}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">{label}</span>
                  <span className="text-gray-400">{val}</span>
                </div>
                <div className="h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-gray-600 text-xs mt-4">
          Los contadores se guardan en el navegador de este dispositivo.
        </p>
      </div>

      {/* Últimas consultas */}
      <div className="bg-[#1a1a1a] border border-[#505050]/40 rounded-xl p-5">
        <h3 className="text-white font-semibold text-sm mb-4">Últimas consultas recibidas</h3>
        {recentConsultas.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">No hay consultas registradas.</p>
        ) : (
          <div className="space-y-3">
            {recentConsultas.map((c) => (
              <div key={c._id} className="flex items-start justify-between gap-4 py-3 border-b border-[#505050]/30 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{c.nombre}</p>
                  <p className="text-gray-400 text-xs truncate">{c.email}</p>
                  {c.mensaje && (
                    <p className="text-gray-500 text-xs mt-0.5 truncate">{c.mensaje}</p>
                  )}
                </div>
                <span className="text-gray-500 text-xs flex-shrink-0">{formatDate(c.createdAt)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
