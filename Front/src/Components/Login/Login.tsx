"use client";

import React, { useState, useContext } from "react";
import Image from "next/image";
import { UserContext } from "@/Context/contextUser";
import logo from "@/Assets/LogoRojo.png";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"; // Importar SweetAlert2

const Login: React.FC = () => {
  const { login } = useContext(UserContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true); // Activamos la carga
  
    try {
      const success = await login({ name, password });
      setIsLoading(false); // Desactivamos la carga después de la respuesta
      if (success) {
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: 'Has iniciado sesión correctamente.',
          confirmButtonColor: '#B62E30',
        });
        router.push("/");
      } else {
        setError("Nombre o contraseña incorrectos.");
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Nombre o contraseña incorrectos.',
          confirmButtonColor: '#B62E30',
        });
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Error al iniciar sesión. Por favor, intente de nuevo.");
      setIsLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al iniciar sesión. Por favor, intente de nuevo.',
        confirmButtonColor: '#B62E30',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen p-4 mt-4">
      <h2 className="text-3xl md:text-4xl text-center font-semibold text-white mb-8">
        Iniciar Sesión
      </h2>
      
      <div className="w-full max-w-md bg-[#222222] p-8 rounded-lg shadow-lg">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Campo de Nombre */}
          <label htmlFor="name" className="text-white text-sm font-medium">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            className="w-full p-4 bg-transparent border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#B62E30] focus:border-[#B62E30] transition-all"
            required
          />

          {/* Campo de Contraseña */}
          <label htmlFor="password" className="text-white text-sm font-medium">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full p-4 bg-transparent border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#B62E30] focus:border-[#B62E30] transition-all"
            required
          />

          {/* Botón de Submit o Spinner */}
          <button
            type="submit"
            className={`w-full py-3 mt-4 bg-[#B62E30] text-white rounded-lg hover:bg-red-600 transition-all ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading} // Deshabilitar el botón durante la carga
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="w-6 h-6 border-4 border-t-4 border-white rounded-full animate-spin"></div>
              </div>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Image
            src={logo}
            alt="Logo"
            width={120}
            height={120}
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
