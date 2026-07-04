"use client";

import React from "react";
import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  boldText?: string;
}

export default function CtaBanner({ eyebrow, title, description, boldText }: Props) {
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
        </motion.div>
      </div>
    </section>
  );
}
