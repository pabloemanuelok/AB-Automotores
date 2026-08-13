"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaFacebook, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { sendGAEvent } from "@next/third-parties/google";
const Logo = "https://ik.imagekit.io/automotoresab/src-assets/LogoRojo.png";

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
    onClick: () => sendGAEvent("event", "click_whatsapp", { origen: "footer" }),
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Columna 1 — Logo */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={colVariants}
            className="flex flex-col items-center md:items-start justify-center"
          >
            <Image
              src={Logo}
              alt="AB Automotores"
              width={130}
              height={60}
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Columna 2 — Redes sociales */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={colVariants}
            className="flex flex-col items-center justify-center"
          >
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label, onClick }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onClick={onClick}
                  className="text-gray-500 hover:text-[#B62E30] transition-colors duration-200 text-2xl"
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Columna 3 — Contacto */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={colVariants}
            className="flex flex-col items-center md:items-end"
          >
            <div className="flex flex-col items-center md:items-start gap-4">
            <div>
              <h3 className="text-gray-900 text-sm font-semibold uppercase tracking-widest">
                Contacto
              </h3>
              <div className="h-0.5 w-8 bg-[#B62E30] mt-2 md:mx-0 mx-auto" />
            </div>

            {/* w-fit + mx-auto: el bloque se encoge a su contenido y se centra,
                asi los iconos quedan alineados en columna y no cada uno por su lado */}
            <div className="flex flex-col gap-3 w-fit mx-auto md:mx-0">
              {/* Teléfono */}
              <div className="flex items-center gap-3">
                <div className="bg-[#B62E30] rounded-md p-1.5 flex-shrink-0">
                  <FaPhoneAlt className="text-white text-sm" />
                </div>
                <span className="text-gray-600 text-sm">
                  <a
                    href="tel:+543516129221"
                    onClick={() => sendGAEvent("event", "click_telefono", { origen: "footer" })}
                    className="hover:text-[#B62E30] transition-colors duration-200"
                  >
                    351 6129221
                  </a>
                  {" / "}
                  <a
                    href="tel:+543515088602"
                    onClick={() => sendGAEvent("event", "click_telefono", { origen: "footer" })}
                    className="hover:text-[#B62E30] transition-colors duration-200"
                  >
                    351 5088602
                  </a>
                </span>
              </div>

              {/* Email */}
              <Link
                href="mailto:abautomotores@hotmail.com"
                aria-label="Enviar correo a AB Automotores"
                className="group flex items-center gap-3"
              >
                <div className="bg-[#B62E30] rounded-md p-1.5 flex-shrink-0">
                  <FaEnvelope className="text-white text-sm" />
                </div>
                <span className="text-gray-600 group-hover:text-[#B62E30] transition-colors duration-200 text-sm break-all">
                  abautomotores@hotmail.com
                </span>
              </Link>

              {/* Ubicación */}
              <Link
                href="https://maps.app.goo.gl/SwaGpKmyq8RJGCAHA"
                target="_blank"
                aria-label="Ver ubicación en Google Maps"
                className="group flex items-center md:items-start gap-3"
              >
                <div className="bg-[#B62E30] rounded-md p-1.5 flex-shrink-0">
                  <FaMapMarkerAlt className="text-white text-sm" />
                </div>
                {/* En mobile va la version corta para no estirar la columna; la
                    completa sigue en el DOM, solo oculta, para no perder SEO local */}
                <span className="text-gray-600 group-hover:text-[#B62E30] transition-colors duration-200 text-sm leading-snug md:hidden">
                  Av. Sabattini 4260, Córdoba
                </span>
                <span className="text-gray-600 group-hover:text-[#B62E30] transition-colors duration-200 text-sm leading-snug hidden md:inline">
                  Avenida Amadeo Sabattini 4260, Empalme, X5006KQT Córdoba
                </span>
              </Link>
            </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="bg-black border-t border-[#505050]">
        <div className="page-container py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-gray-500 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} AB Automotores. Todos los derechos reservados.
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs">Desarrollado por</span>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=pablo.emanuelok@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Pablo Fernandez"
              aria-label="Desarrollado por Pablo Fernandez"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#B62E30] text-[11px] font-bold text-white transition-all hover:scale-105 hover:bg-[#d13a3c]"
            >
              PF
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
