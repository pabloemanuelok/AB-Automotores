"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { fetchPostConsulta } from "@/utils/FetchCon/FetchCon";
import { trackEvent } from "@/utils/analytics";

interface IConsulta {
  nombre: string;
  telefono: string;
  email: string;
  mensaje?: string;
  _honeyPot: string;
}

const contactItems = [
  {
    label: "Teléfono",
    value: "+54 9 351 612-9221",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: "Dirección",
    value: "Av. Sabattini 4260, Cordoba, Argentina",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    label: "Horario",
    value: (
      <>
        <span className="block">Lun a Vie: 9 a 13 hs y 15 a 19 hs</span>
        <span className="block">Sábados: 9 a 13 hs</span>
      </>
    ),
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const Contact = () => {
  const [consulta, setConsulta] = useState<IConsulta>({
    nombre: "",
    telefono: "",
    email: "",
    mensaje: "",
    _honeyPot: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConsulta((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (consulta._honeyPot) {
      setError("¡Vas a tener que hacer algo más para pasar!");
      return;
    }

    setLoading(true);
    try {
      await fetchPostConsulta(consulta);
      trackEvent("contacto");
      setMessage("Consulta enviada exitosamente.");
      setError(null);
      setConsulta({ nombre: "", telefono: "", email: "", mensaje: "", _honeyPot: "" });
    } catch {
      setError("Error al enviar la consulta.");
      setMessage(null);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-[#0a0a0a] border border-[#505050] text-white placeholder-gray-600 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#B62E30] focus:border-transparent transition";

  return (
    <div className="bg-[#0a0a0a] py-16">
      <div className="page-container">
        <div className="lg:flex gap-12 items-start">

          {/* Columna izquierda — info */}
          <motion.div
            className="lg:w-[40%] flex-shrink-0 mb-10 lg:mb-0"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-[#B62E30] text-sm font-semibold tracking-widest uppercase mb-2">
              Estamos para ayudarte
            </p>
            <h2 className="text-white text-3xl md:text-4xl font-bold">
              Ponete en contacto
            </h2>
            <div className="w-12 h-[3px] bg-[#B62E30] rounded-full mt-3 mb-6" />
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Completá el formulario con tus datos y nos comunicamos para brindarte toda la información que necesitás.
            </p>

            <div className="flex flex-col gap-5">
              {contactItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 + i * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#1E1E1E] border border-[#505050] flex items-center justify-center text-[#B62E30] flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">{item.label}</p>
                    <p className="text-white text-sm font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Columna derecha — formulario */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <div className="bg-[#1E1E1E] border border-[#505050] rounded-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {(["nombre", "telefono", "email"] as const).map((field) => (
                  <label key={field} className="flex flex-col gap-1">
                    <span className="text-gray-300 text-sm capitalize">{field}:</span>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={consulta[field]}
                      onChange={handleChange}
                      placeholder={`Ingresá tu ${field}`}
                      className={inputClass}
                      required
                    />
                  </label>
                ))}

                <label className="flex flex-col gap-1">
                  <span className="text-gray-300 text-sm">Mensaje:</span>
                  <textarea
                    name="mensaje"
                    value={consulta.mensaje || ""}
                    onChange={handleChange}
                    placeholder="Escribí tu mensaje aquí"
                    rows={4}
                    className={inputClass}
                  />
                </label>

                {/* Honeypot */}
                <div className="hidden">
                  <input
                    type="text"
                    name="_honeyPot"
                    value={consulta._honeyPot}
                    onChange={handleChange}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 bg-[#B62E30] hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  {loading ? "Enviando..." : "Enviar consulta"}
                </motion.button>
              </form>

              {message && (
                <p className="text-green-400 text-center mt-4 text-sm" aria-live="polite">{message}</p>
              )}
              {error && (
                <p className="text-red-400 text-center mt-4 text-sm" aria-live="assertive">{error}</p>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
