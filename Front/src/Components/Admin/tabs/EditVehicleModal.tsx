"use client";

import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { IProduct } from "@/Interfaces/Interface";
import { fetchPatchProduct, IProductUpdate } from "@/utils/FetchCars/FetchCars";
import { compressImage } from "@/utils/compressImage";
import { parseCombustible, stripCombustible, buildDescription } from "@/utils/parseVehicleDescription";

interface Props {
  product: IProduct;
  token: string | null;
  onClose: () => void;
  onSaved: (updated: Partial<IProduct>) => void;
}

const inputClass =
  "w-full px-4 py-3 bg-[#2a2a2a] border border-[#505050] text-white placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B62E30] focus:border-transparent transition text-sm";

const labelClass = "block text-sm text-gray-300 mb-1.5";

const EditVehicleModal: React.FC<Props> = ({ product, token, onClose, onSaved }) => {
  const [name, setName] = useState(product.name);
  const [precio, setPrecio] = useState(product.version);
  const [year, setYear] = useState(String(product.year));
  const [combustible, setCombustible] = useState(parseCombustible(product.description) ?? "");
  const [notas, setNotas] = useState(stripCombustible(product.description));

  // Imágenes existentes a conservar (las que NO se tachan)
  const [keepImages, setKeepImages] = useState<string[]>([...(product.images ?? [])]);

  // Fotos nuevas a agregar
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  const [compressing, setCompressing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Cerrar con ESC
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Marcar/desmarcar imagen existente para conservar
  const toggleKeepImage = (url: string) => {
    setKeepImages((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  // Agregar nuevas imágenes
  const handleNewImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFiles = e.target.files ? Array.from(e.target.files) : [];
    if (rawFiles.length === 0) return;

    setCompressing(true);
    try {
      const compressed = await Promise.all(rawFiles.map(compressImage));
      const urls = compressed.map((f) => URL.createObjectURL(f));
      setNewFiles((prev) => [...prev, ...compressed]);
      setNewPreviews((prev) => [...prev, ...urls]);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error al procesar imágenes",
        text: "No se pudieron comprimir algunas imágenes.",
        confirmButtonText: "Aceptar",
        background: "#1a1a1a",
        color: "#fff",
        confirmButtonColor: "#B62E30",
      });
    } finally {
      setCompressing(false);
    }
  };

  // Borrar una foto nueva (antes de guardar)
  const removeNewImage = (index: number) => {
    URL.revokeObjectURL(newPreviews[index]);
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const fields: IProductUpdate = {
      name,
      version: precio,
      year,
      description: buildDescription(combustible, notas),
      images: keepImages,
    };

    try {
      const ok = await fetchPatchProduct(product._id, fields, token);
      if (ok) {
        Swal.fire({
          icon: "success",
          title: "Vehículo actualizado",
          text: "Los cambios se guardaron correctamente.",
          confirmButtonText: "Aceptar",
          background: "#1a1a1a",
          color: "#fff",
          confirmButtonColor: "#B62E30",
          timer: 2000,
          showConfirmButton: false,
        });
        onSaved({ name, version: precio, year: Number(year), description: buildDescription(combustible, notas) });
        onClose();
      } else {
        throw new Error();
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: "No se pudieron guardar los cambios. Intentá nuevamente.",
        confirmButtonText: "Aceptar",
        background: "#1a1a1a",
        color: "#fff",
        confirmButtonColor: "#B62E30",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Panel */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#111] border border-[#505050]/50 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#111] border-b border-[#505050]/40">
          <div>
            <h2 className="text-lg font-bold text-white">Editar Vehículo</h2>
            <p className="text-gray-400 text-xs mt-0.5 truncate max-w-xs">
              {product.name}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors p-1"
            aria-label="Cerrar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Nombre + Precio */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Volkswagen Nivus"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Precio</label>
              <input
                type="text"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="Ej: $15.000.000"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Año */}
          <div>
            <label className={labelClass}>Año</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Ej: 2023"
              className={inputClass}
              required
            />
          </div>

          {/* Combustible */}
          <div>
            <label className={labelClass}>Combustible</label>
            <select
              value={combustible}
              onChange={(e) => setCombustible(e.target.value)}
              className={inputClass}
              required
            >
              <option value="" disabled>Seleccioná el tipo de combustible</option>
              <option value="Nafta">Nafta</option>
              <option value="Diesel">Diesel</option>
              <option value="GNC">GNC</option>
              <option value="Eléctrico">Eléctrico</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </div>

          {/* Descripción / Notas */}
          <div>
            <label className={labelClass}>Descripción / Notas</label>
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Kilometraje, estado, extras, equipamiento..."
              className={inputClass}
              rows={4}
            />
          </div>

          {/* Fotos actuales */}
          {product.images && product.images.length > 0 && (
            <div>
              <label className={labelClass}>
                Fotos actuales{" "}
                <span className="text-gray-500 font-normal">
                  (hacé clic en ✕ para marcar para borrar)
                </span>
              </label>
              <div className="flex gap-3 flex-wrap">
                {product.images.map((url, i) => {
                  const willKeep = keepImages.includes(url);
                  return (
                    <div key={i} className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt={`foto ${i + 1}`}
                        className={`w-16 h-16 object-cover rounded-lg border transition-opacity ${
                          willKeep
                            ? "border-[#505050] opacity-100"
                            : "border-red-800 opacity-30"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => toggleKeepImage(url)}
                        className={`absolute -top-1.5 -right-1.5 rounded-full w-5 h-5 flex items-center justify-center text-xs leading-none shadow transition-colors ${
                          willKeep
                            ? "bg-[#B62E30] hover:bg-red-700 text-white"
                            : "bg-green-600 hover:bg-green-500 text-white"
                        }`}
                        aria-label={willKeep ? "Marcar para borrar" : "Restaurar imagen"}
                      >
                        {willKeep ? "✕" : "↩"}
                      </button>
                    </div>
                  );
                })}
              </div>
              {keepImages.length < product.images.length && (
                <p className="text-xs text-red-400 mt-2">
                  {product.images.length - keepImages.length} foto(s) se eliminarán al guardar.
                </p>
              )}
            </div>
          )}

          {/* Agregar fotos nuevas */}
          <div>
            <label className={labelClass}>Agregar fotos nuevas</label>
            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-[#505050] rounded-lg cursor-pointer hover:border-[#B62E30] transition-colors bg-[#1a1a1a]">
              <div className="flex flex-col items-center gap-1 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <span className="text-sm">
                  {newFiles.length > 0
                    ? `${newFiles.length} foto(s) nueva(s)`
                    : "Hacé clic para agregar fotos"}
                </span>
                <span className="text-xs text-gray-600">PNG, JPG, WEBP (múltiples)</span>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleNewImages}
                className="hidden"
              />
            </label>

            {compressing && (
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Comprimiendo...
              </div>
            )}

            {!compressing && newPreviews.length > 0 && (
              <div className="flex gap-3 mt-3 flex-wrap">
                {newPreviews.map((url, i) => (
                  <div key={i} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`nueva ${i + 1}`}
                      className="w-16 h-16 object-cover rounded-lg border border-[#505050]"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(i)}
                      className="absolute -top-1.5 -right-1.5 bg-[#B62E30] hover:bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs leading-none shadow"
                      aria-label="Quitar foto"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-sm font-medium text-gray-300 border border-[#505050] rounded-lg hover:bg-[#2a2a2a] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving || compressing}
              className="flex-1 py-3 bg-[#B62E30] hover:bg-red-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              {saving ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Guardando...
                </span>
              ) : (
                "Guardar cambios"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVehicleModal;
