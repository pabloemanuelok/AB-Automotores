"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import fetchCars, { fetchDeleteId } from "@/utils/FetchCars/FetchCars";
import { IProduct } from "@/Interfaces/Interface";

const CatalogoAdmin: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchCars();
      setProducts(data);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (product: IProduct) => {
    const result = await Swal.fire({
      title: "¿Eliminar vehículo?",
      text: `"${product.name} ${product.version}" será eliminado permanentemente.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B62E30",
      cancelButtonColor: "#505050",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#1a1a1a",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    setDeleting(product._id);
    try {
      await fetchDeleteId(product._id);
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "El vehículo fue eliminado correctamente.",
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
        text: "No se pudo eliminar el vehículo.",
        confirmButtonColor: "#B62E30",
        background: "#1a1a1a",
        color: "#fff",
      });
    } finally {
      setDeleting(null);
    }
  };

  const filtered = products.filter((p) =>
    `${p.name} ${p.version} ${p.year}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-0.5">Catálogo</h2>
          <p className="text-gray-400 text-sm">
            {products.length} vehículo{products.length !== 1 ? "s" : ""} publicado{products.length !== 1 ? "s" : ""}
          </p>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar vehículo..."
          className="w-full sm:w-64 px-4 py-2 bg-[#2a2a2a] border border-[#505050] text-white placeholder-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#B62E30] transition"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <svg className="animate-spin w-8 h-8 text-[#B62E30]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          {search ? "No hay resultados para tu búsqueda." : "No hay vehículos en el catálogo."}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <div
              key={product._id}
              className="bg-[#1a1a1a] border border-[#505050]/40 rounded-xl overflow-hidden group"
            >
              <div className="relative h-40 bg-[#111]">
                {product.images?.[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                )}
                <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                  {product.year}
                </span>
              </div>
              <div className="p-3">
                <p className="text-white text-sm font-semibold truncate">{product.name}</p>
                <p className="text-gray-400 text-xs truncate">{product.version}</p>
                <button
                  onClick={() => handleDelete(product)}
                  disabled={deleting === product._id}
                  className="mt-3 w-full py-1.5 text-xs font-medium text-red-400 border border-red-900/40 rounded-lg hover:bg-red-900/20 transition-colors disabled:opacity-50"
                >
                  {deleting === product._id ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogoAdmin;
