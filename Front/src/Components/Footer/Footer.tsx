"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import LogoUbi from "@/Assets/LogoUbicacion.webp";
import LogoPachas from "@/Assets/LogoPachas.webp";
import Logo from "@/Assets/LogoSinFondo.webp";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/views/catalogo" },
  { label: "Consignaciones", href: "/views/consignaciones" },
  { label: "Financiación", href: "/views/financiacion" },
  { label: "Contacto", href: "/views/contacto" },
];

const socialLinks = [
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/automotoresab/?hl=es",
    label: "Instagram",
  },
  {
    icon: FaFacebook,
    href: "https://www.facebook.com/profile.php?id=100001582968005",
    label: "Facebook",
  },
  {
    icon: FaWhatsapp,
    href: "https://www.whatsapp.com/catalog/5493516129221/?app_absent=0",
    label: "WhatsApp",
  },
];

const colVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
};

const Footer = () => {
  return (
    <footer className="w-full overflow-x-hidden" style={{ backgroundColor: "#1E1E1E" }}>
      {/* Barra roja superior */}
      <div className="h-1 w-full bg-[#B62E30]" />

      {/* Contenido principal */}
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Columna 1 — Marca */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={colVariants}
            className="flex flex-col items-center md:items-start gap-4"
          >
            <Image
              src={Logo}
              alt="AB Automotores"
              width={130}
              height={60}
              className="object-contain"
              priority
            />
            <p className="text-gray-400 text-sm text-center md:text-left leading-relaxed">
              Tu concesionaria de confianza en Córdoba. Vehículos seleccionados, atención personalizada.
            </p>
            {/* Redes sociales */}
            <div className="flex items-center gap-4 mt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gray-400 hover:text-[#B62E30] transition-colors duration-200 text-xl"
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Columna 2 — Navegación */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={colVariants}
            className="flex flex-col items-center md:items-start gap-4"
          >
            <div>
              <h3 className="text-white text-sm font-semibold uppercase tracking-widest">
                Navegación
              </h3>
              <div className="h-0.5 w-8 bg-[#B62E30] mt-2" />
            </div>
            <ul className="flex flex-col items-center md:items-start gap-2">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-[#B62E30] transition-colors duration-200 text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Columna 3 — Contacto */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={colVariants}
            className="flex flex-col items-center md:items-start gap-4"
          >
            <div>
              <h3 className="text-white text-sm font-semibold uppercase tracking-widest">
                Contacto
              </h3>
              <div className="h-0.5 w-8 bg-[#B62E30] mt-2" />
            </div>

            <div className="flex flex-col gap-3">
              {/* Ubicación */}
              <Link
                href="https://maps.app.goo.gl/SwaGpKmyq8RJGCAHA"
                target="_blank"
                aria-label="Ver ubicación en Google Maps"
                className="group flex items-start gap-3"
              >
                <div className="mt-0.5 bg-[#B62E30] rounded-md p-1.5 flex-shrink-0">
                  <Image
                    src={LogoUbi}
                    alt="Ubicación"
                    width={14}
                    height={14}
                    className="object-contain"
                  />
                </div>
                <span className="text-gray-400 group-hover:text-[#B62E30] transition-colors duration-200 text-sm leading-snug">
                  Av. Sabattini 4260<br />Córdoba, Argentina
                </span>
              </Link>

              {/* Teléfono */}
              <div className="flex items-center gap-3">
                <div className="bg-[#B62E30] rounded-md p-1.5 flex-shrink-0">
                  <FaPhoneAlt className="text-white text-xs" />
                </div>
                <span className="text-gray-400 text-sm">351 6129221 / 351 5088602</span>
              </div>

              {/* Email */}
              <Link
                href="mailto:abautomotores@hotmail.com"
                aria-label="Enviar correo a AB Automotores"
                className="group flex items-center gap-3"
              >
                <div className="bg-[#B62E30] rounded-md p-1.5 flex-shrink-0">
                  <FaEnvelope className="text-white text-xs" />
                </div>
                <span className="text-gray-400 group-hover:text-[#B62E30] transition-colors duration-200 text-sm break-all">
                  abautomotores@hotmail.com
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="bg-black border-t border-[#505050]">
        <div className="page-container py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-gray-500 text-xs">
            © 2025 AB Automotores. Todos los derechos reservados.
          </span>
          <Link
            href="mailto:pachasdevelopment@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar a Pachas Development"
            className="flex items-center gap-2 group"
          >
            <span className="text-gray-500 text-xs group-hover:text-gray-300 transition-colors duration-200">
              Created by Pachas Development
            </span>
            <Image
              src={LogoPachas}
              alt="Pachas Development"
              width={28}
              height={28}
              className="object-contain"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
