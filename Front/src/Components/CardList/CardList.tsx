"use client";
import React, { useState, useEffect, useRef } from "react";
import Card from "../Card/Card";
import { IProduct } from "@/Interfaces/Interface";

const CardsList: React.FC<{ products: IProduct[] }> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsList, setProductsList] = useState<IProduct[]>(products);
  const [loading, setLoading] = useState(false);
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

  return (
    <div>
      {/* Contenedor de tarjetas */}
      <div
        ref={cardsContainerRef}
        className="grid mt-8 bg-white grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-5 md:m-8 gap-4 "
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
                    currentPage === index + 1 ? "bg-red-600 text-white" : "bg-white text-black"
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
