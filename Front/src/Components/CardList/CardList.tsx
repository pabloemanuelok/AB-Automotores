"use client";
import React, { useState, useRef, useEffect } from "react";
import Card from "../Card/Card";
import { IProduct } from "@/Interfaces/Interface";
import { motion } from "framer-motion";
import { fetchDeleteId } from "@/utils/FetchCars/FetchCars";

const CardsList: React.FC<{ products: IProduct[] }> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsList, setProductsList] = useState<IProduct[]>(products);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true); // Cargar productos de manera eficiente
  const productsPerPage = 8;

  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsList.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(productsList.length / productsPerPage);

  // Manejar la eliminación de productos
  const handleDelete = async (id: string) => {
    try {
      const success = await fetchDeleteId(id);
      if (success) {
        const updatedProducts = productsList.filter((product) => product._id !== id);
        setProductsList(updatedProducts);
      } else {
        console.error("No se pudo eliminar el producto en el servidor.");
        alert("Hubo un error al eliminar el producto. Por favor, intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al intentar eliminar el producto:", error);
      alert("Hubo un error inesperado. Por favor, intenta nuevamente.");
    }
  };

  // Pre-cargar imágenes
  const preloadImages = (images: string[]) => {
    images.forEach((src) => {
      const img: HTMLImageElement = new Image();
      img.src = src;
    });
  };

  // Cargar imágenes cuando se hace click en "Ver"
  const handleViewClick = (product: IProduct) => {
    preloadImages(product.images);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Alternar orden de productos
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    // Simula el cambio de estado de loading al cargar los productos
    setLoading(false); // Cambia el estado de loading solo cuando los datos están listos
  }, [productsList]);

  return (
    <div>
      <div className="text-center mx-auto mt-8 flex justify-center">
        <motion.button
          onClick={toggleSortOrder}
          className="px-6 py-2 bg-[#B62E30] text-white square-btn hover:bg-red-900 hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="mr-2">Ordenar por Año</span>
          <svg
            className={`w-6 h-6 transform transition-transform duration-300 ${sortOrder === "desc" ? "rotate-180" : ""}`}
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

      {loading ? (
        <div className="flex justify-center items-center my-8">
          <div className="relative w-full h-96">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 to-red-900 rounded-xl opacity-60"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>
      ) : (
        <motion.div
          ref={cardsContainerRef}
          className="grid mt-8 bg-white grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-5 md:m-8 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {currentProducts.map((product: IProduct) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                product={product}
                onDelete={() => handleDelete(product._id)}
                onViewClick={() => handleViewClick(product)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="flex justify-center mb-4">
        <nav>
          <ul className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1}>
                <motion.button
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === index + 1 ? "bg-red-600 text-white" : "bg-white text-black"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {index + 1}
                </motion.button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CardsList;
