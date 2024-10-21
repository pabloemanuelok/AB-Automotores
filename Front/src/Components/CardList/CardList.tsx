"use client";
import React, { useState, useRef } from 'react';
import Card from '../Card/Card';
import { IProduct } from '@/Interfaces/Interface';

const CardsList: React.FC<{ products: IProduct[] }> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [productsList, setProductsList] = useState(products);

  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsList.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(productsList.length / productsPerPage);

  const handleDelete = (id: string) => {
    setProductsList(productsList.filter(product => product._id !== id));
  };

  // Función para precargar imágenes
  const preloadImages = (images: string[]) => {
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  };

  // Función para manejar clic en el botón "Ver"
  const handleViewClick = (product: IProduct) => {
    preloadImages(product.images); // Precarga las imágenes del producto
  };

  return (
    <div>
      <div ref={cardsContainerRef} className="grid mt-8 bg-white grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-5 md:m-8 gap-4 ">
        {currentProducts.map((product: IProduct) => (
          <Card 
            product={product} 
            key={product._id} 
            onDelete={() => handleDelete(product._id)} 
            onViewClick={() => handleViewClick(product)} // Pasa la función onViewClick
          />
        ))}
      </div>
      <div className="flex justify-center mb-4">
        <nav>
          <ul className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1}>
                <button
                  onClick={() => setCurrentPage(index + 1)}
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
