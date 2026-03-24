"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, useState, useEffect, useContext, useCallback } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/Assets/LogoSinFondo.webp";
import { UserContext } from "@/Context/contextUser";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/views/catalogo", label: "Catálogo" },
  { href: "/views/financiacion", label: "Financiación" },
  { href: "/views/consignaciones", label: "Consignaciones" },
  { href: "/views/contacto", label: "Contacto" },
];

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(0.6);
  const { isLogged } = useContext(UserContext);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleScroll = useCallback(() => {
    const newOpacity = Math.min(0.6 + (window.scrollY / 200) * 0.3, 0.95);
    setBgOpacity(newOpacity);
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const debounced = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 50);
    };
    window.addEventListener("scroll", debounced);
    return () => window.removeEventListener("scroll", debounced);
  }, [handleScroll]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest(".menu-container") && !target.closest(".menu-button")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-colors duration-300 text-white"
      style={{ backgroundColor: `rgba(2, 2, 2, ${bgOpacity})` }}
    >
      <div className="page-container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image src={Logo} alt="AB Automotores" width={70} priority />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-base lg:text-lg">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative transition-colors duration-200 hover:text-red-500 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-200 ${
                  pathname === href
                    ? "text-red-500 after:w-full"
                    : "after:w-0 hover:after:w-full"
                }`}
              >
                {label}
              </Link>
            ))}
            {isLogged && (
              <Link
                href="/views/admin"
                className={`relative text-yellow-400 transition-colors duration-200 hover:text-yellow-300 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-yellow-400 after:transition-all after:duration-200 ${
                  pathname === "/views/admin" ? "after:w-full" : "after:w-0 hover:after:w-full"
                }`}
              >
                Admin
              </Link>
            )}
          </div>

          {/* Hamburger button */}
          <button
            className="md:hidden menu-button text-white p-2 rounded-md focus:outline-none"
            onClick={toggleMenu}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <motion.div
              animate={isOpen ? "open" : "closed"}
              className="flex flex-col justify-center items-center w-6 h-5 gap-1.5"
            >
              <motion.span
                variants={{ open: { rotate: 45, y: 7 }, closed: { rotate: 0, y: 0 } }}
                transition={{ duration: 0.2 }}
                className="block w-6 h-0.5 bg-white rounded-full origin-center"
              />
              <motion.span
                variants={{ open: { opacity: 0, scaleX: 0 }, closed: { opacity: 1, scaleX: 1 } }}
                transition={{ duration: 0.2 }}
                className="block w-6 h-0.5 bg-white rounded-full"
              />
              <motion.span
                variants={{ open: { rotate: -45, y: -7 }, closed: { rotate: 0, y: 0 } }}
                transition={{ duration: 0.2 }}
                className="block w-6 h-0.5 bg-white rounded-full origin-center"
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="menu-container md:hidden overflow-hidden bg-black/95 border-t border-white/10"
          >
            <div className="page-container py-6 flex flex-col gap-5">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={toggleMenu}
                  className={`text-lg font-medium transition-colors duration-200 ${
                    pathname === href ? "text-red-500" : "text-white hover:text-red-400"
                  }`}
                >
                  {label}
                </Link>
              ))}
              {isLogged && (
                <Link
                  href="/views/admin"
                  onClick={toggleMenu}
                  className={`text-lg font-medium transition-colors duration-200 ${
                    pathname === "/views/admin" ? "text-yellow-300" : "text-yellow-400 hover:text-yellow-300"
                  }`}
                >
                  Admin
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
