"use client";
import React, { useState, useRef } from "react";
import Card from "../Card/Card";
import { IProduct } from "@/Interfaces/Interface";
import { motion } from "framer-motion";
import { fetchDeleteId } from "@/utils/FetchCars/FetchCars";

const CardsList: React.FC<{ products: IProduct[] }> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsList, setProductsList] = useState<IProduct[]>(products);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
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
        const updatedProducts = productsList.filter((product) => product._id !== id);
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

  const preloadImages = (images: string[]) => {
    images.forEach((src) => {
      const img: HTMLImageElement = new Image();
      img.src = src;
    });
  };

  const handleViewClick = (product: IProduct) => {
    preloadImages(product.images);
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
      nextOrder === "asc" ? a.year - b.year : b.year - a.year
    ));
    setCurrentPage(1);
  };

  return (
    <section className="bg-[#0a0a0a] min-h-screen py-10">
      <div className="page-container">

        {/* Barra de ordenamiento */}
        <div className="flex justify-end mb-6">
          <motion.button
            onClick={toggleSortOrder}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1E1E1E] border border-[#505050] hover:border-[#B62E30] text-white text-sm font-semibold rounded-lg transition-colors duration-200"
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
          </motion.button>
        </div>

        {/* Grid de tarjetas */}
        <motion.div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {currentProducts.map((product: IProduct, index: number) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <Card
                product={product}
                onDelete={() => handleDelete(product._id)}
                onViewClick={() => handleViewClick(product)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Paginación */}
        <div className="flex items-center justify-center gap-2 mt-10 pb-4 flex-wrap">
          <motion.button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors duration-200 ${
              currentPage === 1
                ? "border-[#505050] text-[#505050] cursor-not-allowed"
                : "border-[#505050] text-white hover:border-[#B62E30] hover:text-[#B62E30]"
            }`}
          >
            ← Anterior
          </motion.button>

          {Array.from({ length: totalPages }, (_, index) => (
            <motion.button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-9 h-9 rounded-lg text-sm font-semibold border transition-colors duration-200 ${
                currentPage === index + 1
                  ? "bg-[#B62E30] border-[#B62E30] text-white"
                  : "bg-transparent border-[#505050] text-gray-400 hover:border-[#B62E30] hover:text-white"
              }`}
            >
              {index + 1}
            </motion.button>
          ))}

          <motion.button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors duration-200 ${
              currentPage === totalPages
                ? "border-[#505050] text-[#505050] cursor-not-allowed"
                : "border-[#505050] text-white hover:border-[#B62E30] hover:text-[#B62E30]"
            }`}
          >
            Siguiente →
          </motion.button>
        </div>

      </div>
    </section>
  );
};

export default CardsList;
