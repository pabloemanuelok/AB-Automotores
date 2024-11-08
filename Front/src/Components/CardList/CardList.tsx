"use client";
import React, { useState, useEffect, useRef } from "react";
import Card from "../Card/Card";
import { IProduct } from "@/Interfaces/Interface";

const CardsList: React.FC<{ products: IProduct[] }> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsList, setProductsList] = useState<IProduct[]>(products);
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Estado para ordenar
=======
  const [loading] = useState(false);
>>>>>>> 356118a2a2cd95f96918dc16effee8a1a79d71bf
  const productsPerPage = 8;

  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Calcular los índices de los productos en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsList.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(productsList.length / productsPerPage);

  useEffect(() => {
    setProductsList(products);
  }, [products]);

  useEffect(() => {
    sortProductsByYear(); // Llamamos a la función de ordenación cuando cambie el estado de sortOrder
    setCurrentPage(1); // Volver a la página 1 cuando cambie el filtro
  }, [sortOrder]);

  // Función para ordenar los productos por año
  const sortProductsByYear = () => {
    const sortedProducts = [...productsList].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.year - b.year; // Orden ascendente
      } else {
        return b.year - a.year; // Orden descendente
      }
    });
    setProductsList(sortedProducts);
  };

  const handleDelete = (id: string) => {
    // Crea una nueva lista de productos sin el producto eliminado
    const updatedProducts = productsList.filter((product) => product._id !== id);
    setProductsList(updatedProducts);
  };

  // Función para precargar imágenes
  const preloadImages = (images: string[]) => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  };

  // Función para manejar clic en el botón "Ver"
  const handleViewClick = (product: IProduct) => {
    preloadImages(product.images); // Precarga las imágenes del producto
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Alternar entre ascendente y descendente
  };

  return (
    <div>
      {/* Botón para cambiar el orden por año */}
      <div className="text-center mx-auto mt-8 flex justify-center">
        <button
          onClick={toggleSortOrder}
          className="px-6 py-2 bg-[#B62E30] text-white square-btn hover:bg-red-900 hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
        >
          <span className="mr-2">Ordenar por Año</span>
          {/* Flecha con animación */}
          <svg
            className={`w-6 h-6 transform transition-transform duration-300 ${sortOrder === 'desc' ? 'rotate-180' : ''}`}
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

      {/* Contenedor de tarjetas */}
      <div
        ref={cardsContainerRef}
        className="grid mt-8 bg-white grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-5 md:m-8 gap-4"
      >
        {loading ? (
          <div className="col-span-full text-center">Cargando...</div> // Mostrar loader si se está cargando
        ) : (
          currentProducts.map((product: IProduct) => (
            <Card
              product={product}
              key={product._id}
              onDelete={() => handleDelete(product._id)}
              onViewClick={() => handleViewClick(product)} // Pasa la función onViewClick
            />
          ))
        )}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mb-4">
        <nav>
          <ul className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === index + 1 ? 'bg-red-600 text-white' : 'bg-white text-black'
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CardsList;
