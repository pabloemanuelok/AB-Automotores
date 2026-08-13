"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { trackEvent } from "@/utils/analytics";
import { sendGAEvent } from "@next/third-parties/google";
import { wspChat } from "@/lib/negocio";

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  boldText?: string;
  /** Suma un boton de WhatsApp debajo del texto. Opcional: los demas usos del banner no lo llevan. */
  whatsapp?: { label: string; mensaje?: string; origen: string };
}

export default function CtaBanner({ eyebrow, title, description, boldText, whatsapp }: Props) {
  return (
    <section className="bg-[#1E1E1E] border-t border-[#2a2a2a] py-14">
      <div className="page-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[#B62E30] text-sm font-semibold tracking-widest uppercase mb-2">
            {eyebrow}
          </p>
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-white/60 max-w-md mx-auto text-sm md:text-base">
            {description}
            {boldText && <><br /><strong>{boldText}</strong></>}
          </p>

          {whatsapp && (
            <Link
              href={wspChat(whatsapp.mensaje)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent("wsp");
                sendGAEvent("event", "click_whatsapp", { origen: whatsapp.origen });
              }}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1eb757] text-white font-semibold rounded-lg transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
            >
              <FaWhatsapp className="text-xl" aria-hidden="true" />
              {whatsapp.label}
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
