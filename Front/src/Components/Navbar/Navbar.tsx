"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, useState, useEffect, useContext } from "react";
import { usePathname } from 'next/navigation'; // Importa usePathname
import Logo from "@/Assets/LogoSinFondo.png"; // Ajusta la ruta si es necesario
import { UserContext } from "@/Context/contextUser"; // Importa tu contexto de usuario

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogged } = useContext(UserContext); // Usa el contexto para verificar si el usuario está logueado
  const pathname = usePathname(); // Obtén la ruta actual

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Cierra el menú cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest(".menu-container") && !target.closest(".menu-button")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="bg-black flex md:justify-center bg-opacity-70 text-white fixed top-0 w-full z-50">
      <div className="flex xl:w-[96%] sm:w-[100%] w-[100%] md:w-[95%] justify-between px-4 sm:justify-between md:justify-around items-center lg:px-24 py-5">
        {/* Logo en vista móvil y desktop */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image src={Logo} alt="Logo" width={80} />
          </Link>
        </div>

        {/* Menú Hamburguesa (Solo en mobile) */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none menu-button"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Enlaces de Navegación (Desktop) */}
        <div className="hidden md:flex flex-grow md:justify-end md:space-x-6 lg:space-x-12 text-xl mr-4 border-b-2 mb-7">
          <div className="flex justify-between sm:gap-4 lg:w-[70%] xl:w-[51%]">
            <Link href="/" className={`hover:text-red-500 ${pathname === '/' ? 'text-red-500' : ''}`}>
              Inicio
            </Link>
            <Link href="/views/catalogo" className={`hover:text-red-500 ${pathname === '/views/catalogo' ? 'text-red-500' : ''}`}>
              Catálogo
            </Link>
            <Link href="/views/financiacion" className={`hover:text-red-500 ${pathname === '/views/financiacion' ? 'text-red-500' : ''}`}>
              Financiación
            </Link>
            <Link href="/views/consignaciones" className={`hover:text-red-500 ${pathname === '/views/consignaciones' ? 'text-red-500' : ''}`}>
              Consignaciones
            </Link>
            <Link href="/views/contacto" className={`hover:text-red-500 ${pathname === '/views/contacto' ? 'text-red-500' : ''}`}>
              Contacto
            </Link>

            {/* Botón Admin (Solo visible si el usuario está logueado) */}
            {isLogged && (
              <Link href="/views/admin" className={`text-yellow-500 hover:text-yellow-400 ${pathname === '/views/admin' ? 'text-yellow-400' : ''}`}>
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Menú de Navegación (Mobile) */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 menu-container z-50`}
      >
        <div className="flex flex-col items-center mt-16 space-y-6">
          <button
            className="absolute top-4 right-4 bg-RojoAb text-white px-4 py-2 border border-transparent hover:bg-red-600"
            onClick={toggleMenu}
          >
            Cerrar
          </button>
          <Link href="/" className={`hover:text-red-500 text-xl ${pathname === '/' ? 'text-red-500' : ''}`} onClick={toggleMenu}>
            Inicio
          </Link>
          <Link href="/views/catalogo" className={`hover:text-red-500 text-xl ${pathname === '/views/catalogo' ? 'text-red-500' : ''}`} onClick={toggleMenu}>
            Catálogo
          </Link>
          <Link href="/views/financiacion" className={`hover:text-red-500 text-xl ${pathname === '/views/financiacion' ? 'text-red-500' : ''}`} onClick={toggleMenu}>
            Financiación
          </Link>
          <Link href="/views/consignaciones" className={`hover:text-red-500 text-xl ${pathname === '/views/consignaciones' ? 'text-red-500' : ''}`} onClick={toggleMenu}>
            Consignaciones
          </Link>
          <Link href="/views/contacto" className={`hover:text-red-500 text-xl ${pathname === '/views/contacto' ? 'text-red-500' : ''}`} onClick={toggleMenu}>
            Contacto
          </Link>

          {/* Botón Admin para el menú móvil */}
          {isLogged && (
            <Link href="/views/admin" className={`text-yellow-500 hover:text-yellow-400 text-xl ${pathname === '/views/admin' ? 'text-yellow-400' : ''}`} onClick={toggleMenu}>
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
