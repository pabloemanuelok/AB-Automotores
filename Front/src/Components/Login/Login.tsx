"use client";

import React, { useState, useContext } from "react";
import Image from "next/image";
import { UserContext } from "@/Context/contextUser";
import logo from "@/Assets/LogoRojo.png";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const { login } = useContext(UserContext);
  const [name, setName] = useState(""); // Cambiado de email a name
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    console.log("Credenciales enviadas:", { name, password }); // Agrega este log
  
    try {
      const success = await login({ name, password });
      console.log("Resultado del login:", success); // Agrega este log
      if (success) {
        router.push("/");
      } else {
        setError("Nombre o contraseña incorrectos.");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err); // Agrega este log
      setError("Error al iniciar sesión. Por favor, intente de nuevo.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black ">
      <h2 className="text-2xl md:text-3xl text-center font-semibold bg-white p-5 text-black w-full mb-6">
        Inicio de Sesión
      </h2>
      
      {/* Contenedor del formulario */}
      <div className="w-full max-w-sm bg-[#222222] p-8 rounded-lg shadow-md">
        {/* Mostrar mensaje de error */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Campo de Nombre */}
          <label htmlFor="name" className="text-white">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />

          {/* Campo de Contraseña */}
          <label htmlFor="password" className="text-white">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-[#B62E30] text-white rounded hover:bg-red-600 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Logo debajo del formulario */}
        <div className="mt-8">
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
