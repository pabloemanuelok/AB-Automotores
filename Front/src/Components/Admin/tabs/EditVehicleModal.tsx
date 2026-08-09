"use client";

import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { IProduct, IProductUpdate } from "@/Interfaces/Interface";
import {
  fetchPatchProduct,
  fetchUpdateProductImages,
} from "@/utils/FetchCars/FetchCars";
import { compressImage } from "@/utils/compressImage";

interface Props {
  product: IProduct;
  token: string | null;
  onClose: () => void;
  onSaved: (updated: Partial<IProduct>) => void;
}

const inputClass =
  "w-full px-4 py-3 bg-[#2a2a2a] border border-[#505050] text-white placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B62E30] focus:border-transparent transition text-sm";

const labelClass = "block text-sm text-gray-300 mb-1.5";

const FUEL_OPTIONS = [
  { value: "NAFTA", label: "Nafta" },
  { value: "DIESEL", label: "Diesel" },
  { value: "GNC", label: "GNC" },
  { value: "ELECTRICO", label: "Eléctrico" },
  { value: "HIBRIDO", label: "Híbrido" },
];

const STATUS_OPTIONS = [
  { value: "DISPONIBLE", label: "Disponible" },
  { value: "RESERVADO", label: "Reservado" },
  { value: "VENDIDO", label: "Vendido" },
];

const TRACCION_OPTIONS = ["Delantera", "Trasera", "Integral"];

/** Campos de ficha técnica que son texto libre con unidad. */
const SPEC_INPUTS: { name: keyof IProductUpdate; label: string; placeholder: string }[] = [
  { name: "motor", label: "Motor", placeholder: "Ej: 1.4 TSI 150 CV" },
  { name: "potencia", label: "Potencia", placeholder: "Ej: 150 CV" },
  { name: "transmission", label: "Transmisión", placeholder: "Ej: Automática 6 vel." },
  { name: "autonomia", label: "Autonomía estimada", placeholder: "Ej: 600 km" },
  { name: "velocidadMax", label: "Velocidad máxima", placeholder: "Ej: 200 km/h" },
  { name: "largo", label: "Largo", placeholder: "Ej: 4.266 mm" },
  { name: "ancho", label: "Ancho", placeholder: "Ej: 1.757 mm" },
  { name: "alto", label: "Alto", placeholder: "Ej: 1.493 mm" },
  { name: "tanque", label: "Tanque", placeholder: "Ej: 52 L" },
  { name: "baul", label: "Baúl", placeholder: "Ej: 415 L" },
];

const EditVehicleModal: React.FC<Props> = ({ product, token, onClose, onSaved }) => {
  const [form, setForm] = useState({
    brand: product.brand,
    model: product.model,
    version: product.version ?? "",
    price: String(product.price),
    year: String(product.year),
    km: product.km != null ? String(product.km) : "",
    fuelType: product.fuelType ?? "",
    color: product.color ?? "",
    status: product.status,
    description: product.description,
    traccion: product.traccion ?? "",
    motor: product.motor ?? "",
    potencia: product.potencia ?? "",
    transmission: product.transmission ?? "",
    autonomia: product.autonomia ?? "",
    velocidadMax: product.velocidadMax ?? "",
    largo: product.largo ?? "",
    ancho: product.ancho ?? "",
    alto: product.alto ?? "",
    tanque: product.tanque ?? "",
    baul: product.baul ?? "",
  });

  const [keepImageIds, setKeepImageIds] = useState<string[]>(
    product.images.map((image) => image.id),
  );
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  const [compressing, setCompressing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleKeepImage = (id: string) => {
    setKeepImageIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleNewImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFiles = e.target.files ? Array.from(e.target.files) : [];
    if (rawFiles.length === 0) return;

    setCompressing(true);
    try {
      const compressed = await Promise.all(rawFiles.map(compressImage));
      setNewFiles((prev) => [...prev, ...compressed]);
      setNewPreviews((prev) => [
        ...prev,
        ...compressed.map((f) => URL.createObjectURL(f)),
      ]);
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

  const removeNewImage = (index: number) => {
    URL.revokeObjectURL(newPreviews[index]);
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const imagesChanged =
    newFiles.length > 0 || keepImageIds.length !== product.images.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const fields = Object.fromEntries(
      Object.entries({
        ...form,
        price: Number(form.price),
        year: Number(form.year),
        km: form.km === "" ? undefined : Number(form.km),
        fuelType: form.fuelType || undefined,
      }).filter(([, value]) => value !== "" && value !== undefined),
    ) as IProductUpdate;

    try {
      const ok = await fetchPatchProduct(product.id, fields, token);
      if (!ok) throw new Error();

      // Las imágenes viajan aparte porque van como multipart.
      if (imagesChanged) {
        const imagesOk = await fetchUpdateProductImages(
          product.id,
          keepImageIds,
          newFiles,
          token,
        );
        if (!imagesOk) throw new Error();
      }

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
      onSaved(fields as Partial<IProduct>);
      onClose();
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#111] border border-[#505050]/50 rounded-2xl shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#111] border-b border-[#505050]/40">
          <div>
            <h2 className="text-lg font-bold text-white">Editar Vehículo</h2>
            <p className="text-gray-400 text-xs mt-0.5 truncate max-w-xs">
              {product.brand} {product.model}
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

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Marca</label>
              <input type="text" name="brand" value={form.brand} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Modelo</label>
              <input type="text" name="model" value={form.model} onChange={handleChange} className={inputClass} required />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className={labelClass}>Precio (ARS)</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} min={0} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Año</label>
              <input type="number" name="year" value={form.year} onChange={handleChange} min={1900} max={2100} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Kilómetros</label>
              <input type="number" name="km" value={form.km} onChange={handleChange} min={0} className={inputClass} />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className={labelClass}>Combustible</label>
              <select name="fuelType" value={form.fuelType} onChange={handleChange} className={inputClass}>
                <option value="">— Sin especificar —</option>
                {FUEL_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Tracción</label>
              <select name="traccion" value={form.traccion} onChange={handleChange} className={inputClass}>
                <option value="">— Sin especificar —</option>
                {TRACCION_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Estado</label>
              <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                {STATUS_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Versión</label>
              <input type="text" name="version" value={form.version} onChange={handleChange} placeholder="Ej: Highline 1.4 TSI DSG" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Color</label>
              <input type="text" name="color" value={form.color} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-white text-sm font-semibold uppercase tracking-wide">
                Especificaciones técnicas
              </span>
              <div className="flex-1 h-[1px] bg-[#505050]" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {SPEC_INPUTS.map(({ name, label, placeholder }) => (
                <div key={name}>
                  <label className={labelClass}>{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={(form[name as keyof typeof form] as string) ?? ""}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>Descripción</label>
            <textarea name="description" value={form.description} onChange={handleChange} className={inputClass} rows={4} required />
          </div>

          {product.images.length > 0 && (
            <div>
              <label className={labelClass}>
                Fotos actuales{" "}
                <span className="text-gray-500 font-normal">
                  (hacé clic en ✕ para marcar para borrar)
                </span>
              </label>
              <div className="flex gap-3 flex-wrap">
                {product.images.map((image, i) => {
                  const willKeep = keepImageIds.includes(image.id);
                  return (
                    <div key={image.id} className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.url}
                        alt={`foto ${i + 1}`}
                        className={`w-16 h-16 object-cover rounded-lg border transition-opacity ${
                          willKeep ? "border-[#505050] opacity-100" : "border-red-800 opacity-30"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => toggleKeepImage(image.id)}
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
              {keepImageIds.length < product.images.length && (
                <p className="text-xs text-red-400 mt-2">
                  {product.images.length - keepImageIds.length} foto(s) se eliminarán al guardar.
                </p>
              )}
            </div>
          )}

          <div>
            <label className={labelClass}>Agregar fotos nuevas</label>
            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-[#505050] rounded-lg cursor-pointer hover:border-[#B62E30] transition-colors bg-[#1a1a1a]">
              <div className="flex flex-col items-center gap-1 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <span className="text-sm">
                  {newFiles.length > 0 ? `${newFiles.length} foto(s) nueva(s)` : "Hacé clic para agregar fotos"}
                </span>
                <span className="text-xs text-gray-600">PNG, JPG, WEBP (múltiples)</span>
              </div>
              <input type="file" accept="image/*" multiple onChange={handleNewImages} className="hidden" />
            </label>

            {compressing && (
              <p className="mt-2 text-sm text-gray-400">Procesando imágenes...</p>
            )}

            {!compressing && newPreviews.length > 0 && (
              <div className="flex gap-3 mt-3 flex-wrap">
                {newPreviews.map((url, i) => (
                  <div key={url} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`nueva ${i + 1}`} className="w-16 h-16 object-cover rounded-lg border border-[#505050]" />
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
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVehicleModal;
