"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import LogoUbi from "@/Assets/LogoUbicacion.webp";
import Logo from "@/Assets/LogoRojo.png";

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
    <footer className="w-full overflow-x-hidden bg-white">
      {/* Contenido principal */}
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">

          {/* Columna 1 — Marca */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={colVariants}
            className="flex flex-col items-center md:items-start gap-4"
          >
            <div className="flex flex-col items-center gap-3">
              <Image
                src={Logo}
                alt="AB Automotores"
                width={130}
                height={60}
                className="object-contain"
                priority
              />
              {/* Redes sociales */}
              <div className="flex items-center gap-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-gray-500 hover:text-[#B62E30] transition-colors duration-200 text-xl"
                  >
                    <Icon />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Columna 2 — Contacto */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={colVariants}
            className="flex flex-col items-center md:items-start gap-4"
          >
            <div>
              <h3 className="text-gray-900 text-sm font-semibold uppercase tracking-widest">
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
                <span className="text-gray-600 group-hover:text-[#B62E30] transition-colors duration-200 text-sm leading-snug">
                  Av. Sabattini 4260<br />Córdoba, Argentina
                </span>
              </Link>

              {/* Teléfono */}
              <div className="flex items-center gap-3">
                <div className="bg-[#B62E30] rounded-md p-1.5 flex-shrink-0">
                  <FaPhoneAlt className="text-white text-xs" />
                </div>
                <span className="text-gray-600 text-sm">351 6129221 / 351 5088602</span>
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
                <span className="text-gray-600 group-hover:text-[#B62E30] transition-colors duration-200 text-sm break-all">
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
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs">
              Created by Vartox
            </span>
            <Image
              src="/source/veltro_simbolo_transparente.png"
              alt="Vartox"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
