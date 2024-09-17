"use client";

import React, { useState, useRef } from 'react';
import Card from '../Card/Card';
import { IProduct } from '@/Interfaces/Interface';

interface CardsListProps {
  products: IProduct[];
}

const CardsList: React.FC<CardsListProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [productsList, setProductsList] = useState(products); // Estado de los productos

  // Referencia para el contenedor de las tarjetas
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Calcular el índice de inicio y fin de los productos a mostrar
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsList.slice(indexOfFirstProduct, indexOfLastProduct); // Usar el estado de la lista de productos

  // Función para cambiar de página
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Desplazar al comienzo de las tarjetas
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Número total de páginas
  const totalPages = Math.ceil(productsList.length / productsPerPage);

  // Función para eliminar un producto
  const handleDelete = (id: string) => {
    setProductsList(productsList.filter(product => product._id !== id)); // Filtrar el producto eliminado
  };

  return (
    <div>
      <div ref={cardsContainerRef} className="grid bg-black grid-cols-1 sm:grid-cols-2 p-10 md:grid-cols-3 gap-10">
        {currentProducts.map((product: IProduct) => (
          <Card 
            product={product} 
            key={product._id} 
            onDelete={() => handleDelete(product._id)} // Pasar la función onDelete a cada Card
          />
        ))}
      </div>
      <div className="flex justify-center my-4">
        <nav>
          <ul className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1}>
                <button
                  onClick={() => paginate(index + 1)}
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
