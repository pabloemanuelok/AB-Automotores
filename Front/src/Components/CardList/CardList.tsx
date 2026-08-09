"use client";
import React, { useState, useRef } from "react";
import Card from "../Card/Card";
import { IProduct } from "@/Interfaces/Interface";
import { motion } from "framer-motion";
import { fetchDeleteId } from "@/utils/FetchCars/FetchCars";

const byName = (a: IProduct, b: IProduct) =>
  `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`);

const CardsList: React.FC<{ products: IProduct[] }> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsList, setProductsList] = useState<IProduct[]>(
    [...products].sort((a, b) => b.year - a.year || byName(a, b))
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const productsPerPage = 8;

  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsList.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(productsList.length / productsPerPage);

  const handleDelete = async (id: string) => {
    try {
      const success = await fetchDeleteId(id);
      if (success) {
        const updatedProducts = productsList.filter((product) => product.id !== id);
        setProductsList(updatedProducts);
        const newTotal = Math.ceil((productsList.length - 1) / productsPerPage);
        if (currentPage > newTotal) setCurrentPage(Math.max(1, newTotal));
      } else {
        alert("Hubo un error al eliminar el producto. Por favor, intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al intentar eliminar el producto:", error);
      alert("Hubo un error inesperado. Por favor, intenta nuevamente.");
    }
  };

  const handleViewClick = (product: IProduct) => {
    product.images.forEach(({ url }) => {
      const img: HTMLImageElement = new Image();
      img.src = url;
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleSortOrder = () => {
    const nextOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(nextOrder);
    setProductsList([...productsList].sort((a, b) =>
      nextOrder === "asc"
        ? a.year - b.year || byName(a, b)
        : b.year - a.year || byName(a, b)
    ));
    setCurrentPage(1);
  };

  if (productsList.length === 0) {
    return (
      <section className="bg-white min-h-screen pb-10">
        <div className="page-container flex flex-col items-center justify-center text-center py-24">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-gray-300 mb-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Todavía no hay vehículos publicados
          </h2>
          <p className="text-gray-500 max-w-md mb-6">
            Estamos actualizando el catálogo. Escribinos y te avisamos apenas
            entren unidades nuevas.
          </p>
          <a
            href="/views/contacto"
            className="px-6 py-3 bg-[#B62E30] hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors duration-200"
          >
            Contactanos
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white min-h-screen pb-10">
      <div className="page-container">

        {/* Barra de controles */}
        <div className="flex items-center justify-end mt-8 mb-6">
          <button
            onClick={toggleSortOrder}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1E1E1E] border border-[#505050] hover:border-[#B62E30] text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
          >
            <span>Ordenar por Año</span>

            <svg
              className={`w-4 h-4 transition-transform duration-300 ${sortOrder === "desc" ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l5 5a1 1 0 11-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L5.707 9.707a1 1 0 11-1.414-1.414l5-5A1 1 0 0110 3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Grid de tarjetas */}
        <motion.div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {currentProducts.map((product: IProduct, index: number) => (
            <Card
              key={product.id}
              product={product}
              index={index}
              onDelete={() => handleDelete(product.id)}
              onViewClick={() => handleViewClick(product)}
            />
          ))}
        </motion.div>

        {/* Paginación */}
        <div className="flex items-center justify-center gap-2 mt-10 pb-4 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 ${
              currentPage === 1
                ? "border-[#505050] text-[#505050] cursor-not-allowed"
                : "border-[#505050] text-gray-700 hover:border-[#B62E30] hover:text-[#B62E30] hover:scale-[1.05] active:scale-[0.97]"
            }`}
          >
            ← Anterior
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`w-9 h-9 rounded-lg text-sm font-semibold border transition-all duration-200 hover:scale-[1.1] active:scale-[0.95] ${
                currentPage === index + 1
                  ? "bg-[#B62E30] border-[#B62E30] text-white"
                  : "bg-transparent border-[#505050] text-gray-600 hover:border-[#B62E30] hover:text-[#B62E30]"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 ${
              currentPage === totalPages
                ? "border-[#505050] text-[#505050] cursor-not-allowed"
                : "border-[#505050] text-gray-700 hover:border-[#B62E30] hover:text-[#B62E30] hover:scale-[1.05] active:scale-[0.97]"
            }`}
          >
            Siguiente →
          </button>
        </div>

      </div>
    </section>
  );
};

export default CardsList;
