"use client";

import React, { useState, useContext } from "react";
import Image from "next/image";
import { UserContext } from "@/Context/contextUser";
import logo from "@/Assets/LogoSinFondo.webp";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaLock, FaUser } from "react-icons/fa";

const Login: React.FC = () => {
  const { login } = useContext(UserContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const showAlert = (icon: "success" | "error", title: string, text: string) => {
    Swal.fire({ icon, title, text, confirmButtonColor: "#B62E30" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!name || !password) {
      setError("Por favor, complete todos los campos.");
      setIsLoading(false);
      return;
    }

    try {
      const success = await login({ name, password });
      setIsLoading(false);
      if (success) {
        showAlert("success", "¡Bienvenido!", "Has iniciado sesión correctamente.");
        router.push("/");
      } else {
        setError("Nombre o contraseña incorrectos.");
        showAlert("error", "Error", "Nombre o contraseña incorrectos.");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Error al iniciar sesión. Por favor, intente de nuevo.");
      setIsLoading(false);
      showAlert("error", "Error", "Error al iniciar sesión. Por favor, intente de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-[#1E1E1E] border border-[#505050] rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
          {/* Acento rojo superior */}
          <div className="h-[3px] w-full bg-[#B62E30]" />

          <div className="p-8">
            {/* Logo + título */}
            <div className="flex flex-col items-center mb-8">
              <Image
                src={logo}
                alt="AB Automotores"
                width={80}
                height={80}
                className="mb-4"
              />
              <p className="text-[#B62E30] text-xs font-semibold tracking-widest uppercase mb-1">
                Panel de administración
              </p>
              <h2 className="text-2xl font-bold text-white">Iniciar sesión</h2>
              <div className="mt-3 w-10 h-[3px] bg-[#B62E30] rounded-full" />
            </div>

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center mb-5 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2"
              >
                {error}
              </motion.p>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Usuario */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-gray-400 text-xs font-semibold uppercase tracking-wide">
                  Usuario
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={13} />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ingresá tu usuario"
                    className="w-full pl-10 pr-4 py-3 bg-[#2a2a2a] border border-[#505050] rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#B62E30] focus:ring-1 focus:ring-[#B62E30] transition-colors duration-200"
                    required
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-gray-400 text-xs font-semibold uppercase tracking-wide">
                  Contraseña
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={13} />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresá tu contraseña"
                    className="w-full pl-10 pr-4 py-3 bg-[#2a2a2a] border border-[#505050] rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#B62E30] focus:ring-1 focus:ring-[#B62E30] transition-colors duration-200"
                    required
                  />
                </div>
              </div>

              {/* Botón */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.97 }}
                className={`w-full py-3 mt-2 bg-[#B62E30] hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
                  isLoading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Ingresar"
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
