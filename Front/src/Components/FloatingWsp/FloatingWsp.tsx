"use client";

import React from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { trackEvent } from "@/utils/analytics";
import { sendGAEvent } from "@next/third-parties/google";

// wa.me y no el catalogo de WhatsApp Business: abre el chat directo con el
// mensaje precargado, que es lo que convierte.
const WSP_CHAT =
  "https://wa.me/5493516129221?text=" +
  encodeURIComponent("¡Hola! Quiero consultar por un vehículo.");

const FloatingWhatsApp: React.FC = () => {
  return (
    <Link
      href={WSP_CHAT}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      onClick={() => {
        trackEvent("wsp");
        sendGAEvent("event", "click_whatsapp", { origen: "flotante" });
      }}
      className="fixed bottom-10 md:bottom-6 right-4 z-50 flex h-[60px] w-[60px] md:h-16 md:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/25 ring-2 ring-white/40 transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      <FaWhatsapp className="text-[32px] md:text-[34px]" aria-hidden="true" />
    </Link>
  );
};

export default FloatingWhatsApp;
