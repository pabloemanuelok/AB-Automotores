"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import fetchCars from "@/utils/FetchCars/FetchCars";
import { IProduct } from "@/Interfaces/Interface";

const MAX_DESTACADOS = 8;
const DESTACADOS_IDS_KEY = "ab_destacados_ids";
const DESTACADOS_LABEL_KEY = "ab_destacados_label";

const Destacados: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [label, setLabel] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Load existing selection from localStorage
    try {
      const savedIds = localStorage.getItem(DESTACADOS_IDS_KEY);
      if (savedIds) setSelected(JSON.parse(savedIds));
      const savedLabel = localStorage.getItem(DESTACADOS_LABEL_KEY);
      if (savedLabel) setLabel(savedLabel);
    } catch {
      // ignore
    }

    fetchCars()
      .then((data) => setProducts(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_DESTACADOS) return prev;
      return [...prev, id];
    });
  };

  const handleSave = () => {
    setSaving(true);
    try {
      localStorage.setItem(DESTACADOS_IDS_KEY, JSON.stringify(selected));
      localStorage.setItem(DESTACADOS_LABEL_KEY, label);
      Swal.fire({
        icon: "success",
        title: "¡Guardado!",
        text: "Los vehículos destacados se actualizaron correctamente.",
        confirmButtonColor: "#B62E30",
        background: "#1a1a1a",
        color: "#fff",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar la selección.",
        confirmButtonColor: "#B62E30",
        background: "#1a1a1a",
        color: "#fff",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleClear = () => {
    setSelected([]);
    setLabel("");
  };

  const filtered = products.filter((p) =>
    `${p.name} ${p.version} ${p.year}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-0.5">Vehículos Destacados</h2>
          <p className="text-gray-400 text-sm">
            Seleccioná hasta {MAX_DESTACADOS} vehículos para mostrar en la página principal.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className={`text-sm font-semibold px-3 py-1 rounded-full border ${
              selected.length >= MAX_DESTACADOS
                ? "bg-[#B62E30]/20 border-[#B62E30] text-[#B62E30]"
                : "bg-[#1a1a1a] border-[#505050] text-gray-300"
            }`}
          >
            {selected.length} / {MAX_DESTACADOS}
          </span>
        </div>
      </div>

      {/* Label semanal */}
      <div className="mb-5">
        <label className="block text-sm text-gray-300 mb-1.5">
          Etiqueta semanal <span className="text-gray-600">(opcional)</span>
        </label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Ej: Destacados semana 13 · 25 Mar – 31 Mar"
          className="w-full sm:w-96 px-4 py-2.5 bg-[#2a2a2a] border border-[#505050] text-white placeholder-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B62E30] transition"
        />
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar en el catálogo..."
        className="w-full sm:w-72 px-4 py-2 mb-4 bg-[#2a2a2a] border border-[#505050] text-white placeholder-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B62E30] transition"
      />

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <svg className="animate-spin w-8 h-8 text-[#B62E30]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-6">
          {filtered.map((product) => {
            const isSelected = selected.includes(product._id);
            const isDisabled = !isSelected && selected.length >= MAX_DESTACADOS;
            return (
              <button
                key={product._id}
                onClick={() => !isDisabled && toggle(product._id)}
                disabled={isDisabled}
                className={`relative text-left rounded-xl border overflow-hidden transition-all duration-200 ${
                  isSelected
                    ? "border-[#B62E30] ring-1 ring-[#B62E30] bg-[#B62E30]/10"
                    : isDisabled
                    ? "border-[#505050]/20 opacity-40 cursor-not-allowed bg-[#1a1a1a]"
                    : "border-[#505050]/40 bg-[#1a1a1a] hover:border-[#B62E30]/50"
                }`}
              >
                <div className="relative h-36">
                  {product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-[#111] text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
                      </svg>
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[#B62E30] rounded-full flex items-center justify-center shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                    {product.year}
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-white text-sm font-semibold truncate">{product.name}</p>
                  <p className="text-gray-400 text-xs truncate">{product.version}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {selected.length >= MAX_DESTACADOS && (
        <p className="text-[#B62E30] text-xs mb-4">
          Límite de {MAX_DESTACADOS} vehículos alcanzado. Deseleccioná alguno para agregar otro.
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-[#B62E30] hover:bg-red-700 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors duration-200"
        >
          {saving ? "Guardando..." : "Guardar selección"}
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-2.5 border border-[#505050] text-gray-300 hover:border-gray-400 text-sm font-semibold rounded-lg transition-colors duration-200"
        >
          Limpiar
        </button>
      </div>
    </div>
  );
};

export default Destacados;
