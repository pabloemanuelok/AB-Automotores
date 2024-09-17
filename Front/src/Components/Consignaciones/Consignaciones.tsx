"use client"

import React, { useState } from "react";
import Image from "next/image";
import logo from "@/Assets/LogoRojo.png";
import image1 from "@/Assets/tasacion 1.png";
import image2 from "@/Assets/pago instantaneo 7 1.png";
import image3 from "@/Assets/vende seguro 7 1.png";
import image4 from "@/Assets/gestoria (1) 1.png";
import image5 from "@/Assets/evitá estafas 9 1.png";
import { fetchPostConsulta } from "@/utils/FetchCon/FetchCon"
// Actualiza la interfaz para el formulario de consignaciones
interface IConsulta {
  nombre: string;
  telefono: string;
  email: string;
  mensaje?: string;
  banco?: string
}

const Consignaciones = () => {
  // Estado para los datos del formulario
  const [consulta, setConsulta] = useState<IConsulta>({
    nombre: '',
    telefono: '',
    email: '',
    mensaje: ''
  });

  // Estado para manejar mensajes de error o éxito
  const [message, setMessage] = useState<string>('');

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConsulta(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await fetchPostConsulta(consulta);
      setMessage('Consulta enviada exitosamente.');
      setConsulta({ nombre: '', telefono: '', email: '', mensaje: '' }); // Limpiar formulario
    } catch (error) {
      setMessage('Error al enviar la consulta.');
    }
  };

  return (
    <div className="relative mb-20">
      {/* Título de la sección */}
      <h2 className="text-center text-3xl font-bold p-5">Consignaciones</h2>

      <div className="flex flex-col bg-black md:flex-row p-10 w-full">
        {/* Contenedor de la izquierda */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 mb-4 md:mb-0">
          <h2 className="text-white text-2xl md:text-4xl text-center md:text-left mb-4">
            ¿Querés vender tu auto? <br /> Nosotros te ayudamos
          </h2>
          {/* Contenedor de imágenes en una cuadrícula */}
          <div className="grid grid-cols-2 pt-10 gap-4 md:grid-cols-5 md:gap-6 justify-center">
            {[image1, image2, image3, image4, image5].map((img, index) => (
              <div key={index} className={`flex flex-col items-center ${index === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
                <Image
                  src={img}
                  alt={`Imagen ${index + 1}`}
                  width={index === 4 ? 45 : 40}
                  height={50}
                  className="object-cover"
                />
                <span className="text-white text-center text-xs md:text-sm mt-2">
                  {["Tasación", "Cobro instantáneo", "Vendé de manera segura", "Servicio de gestoria", "Evitá estafas"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contenedor de la derecha */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center px-4 md:px-8 space-y-4">
          <h2 className="text-white text-xl md:text-2xl font-bold text-center md:text-left">Compra directa</h2>
          <p className="text-white text-sm md:text-base text-center md:text-left">
            Si necesitas vender tu auto de manera inmediata, te lo tasamos y te lo pagamos de contado, nos encargamos de todos los trámites de gestoría y te aseguramos la transferencia.
          </p>
          <h2 className="text-white text-xl md:text-2xl font-bold text-center md:text-left">Consignaciones</h2>
          <p className="text-white text-sm md:text-base text-center md:text-left">
            Te gestionamos la venta, dejá tu auto en nuestra agencia, lo publicamos en todos los portales de venta online y buscamos comprador. Una vez concretada la operación nos encargamos de todos los trámites de gestoría y te lo pagamos de contado.
          </p>
        </div>
      </div>
      {/* Sección de contacto */}
      <div className="flex flex-col md:flex-row items-center justify-center pt-20 gap-8 bg-black text-white py-10 px-10">
        {/* Columna Izquierda */}
        <div className="md:w-1/3 flex flex-col justify-start gap-7 mb-8 md:mb-0 md:pr-10">
          <h2 className="text-2xl md:text-4xl font-light text-center text-white mb-2">
            ¿Te interesaría vendernos <br /> tu vehículo?
          </h2>
          <div className="w-full flex p-10 justify-center">
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
          <p className="text-center text-xl mb-6">
            ¡Escríbenos un mensaje con los detalles <br /> de tu vehículo y nos pondremos en contacto!
          </p>
        </div>

        {/* Columna Derecha */}
        <div className="w-full md:w-1/3 bg-[#222222] p-6 rounded-md shadow-md">
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <label className="flex flex-col">
              <span className="mb-1">Nombre Completo:</span>
              <input
                type="text"
                name="nombre"
                value={consulta.nombre}
                onChange={handleChange}
                placeholder="Ingrese su nombre completo"
                className="p-2 rounded-md border placeholder:text-neutral-500 border-white bg-[#2C2C2C] text-white"
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-1">Teléfono:</span>
              <input
                type="text"
                name="telefono"
                value={consulta.telefono}
                onChange={handleChange}
                placeholder="Ingrese su número de teléfono"
                className="p-2 rounded-md border placeholder:text-neutral-500 border-white bg-[#2C2C2C] text-white"
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-1">Email:</span>
              <input
                type="email"
                name="email"
                value={consulta.email}
                onChange={handleChange}
                placeholder="ejemplo@gmail.com"
                className="p-2 rounded-md border placeholder:text-neutral-500 border-white bg-[#2C2C2C] text-white"
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-1">Mensaje:</span>
              <textarea
                name="mensaje"
                value={consulta.mensaje || ''}
                onChange={handleChange}
                placeholder="Descripción"
                className="p-2 rounded-md border placeholder:text-neutral-500 border-white bg-[#2C2C2C] text-white"
              ></textarea>
            </label>

            <button
              type="submit"
              className="bg-[#D9D9D9] hover:bg-RojoAb hover:text-white text-black py-2 px-4 rounded-md"
            >
              Enviar
            </button>

            {/* Mensaje de éxito o error */}
            {message && <p className="text-center text-red-500">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Consignaciones;
