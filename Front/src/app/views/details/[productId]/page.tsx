import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Detail from "@/Components/Detail/Detail";
import { fetchProductById } from "@/utils/FetchCars/FetchCars";
import { formatPrice } from "@/utils/apiClient";
import { ogImageUrl } from "@/utils/cloudinary";
import { SITE_URL } from "@/lib/seo";

type Props = { params: { productId: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await fetchProductById(params.productId);

  if (!product) {
    return { title: "Vehículo no encontrado", robots: { index: false } };
  }

  const title = `${product.brand} ${product.model} ${product.year}`;
  const description = [
    `${title} en venta.`,
    product.km != null && `${product.km.toLocaleString("es-AR")} km.`,
    `${formatPrice(product.price)}.`,
    product.description,
  ]
    .filter(Boolean)
    .join(" ")
    .slice(0, 155);

  const image = ogImageUrl(product.images[0]?.url);
  const url = `${SITE_URL}/views/details/${product.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    // Un vehículo vendido deja de ser útil en resultados de búsqueda.
    robots: { index: product.status === "DISPONIBLE", follow: true },
    openGraph: {
      type: "website",
      url,
      title: `${title} — ${formatPrice(product.price)}`,
      description,
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${formatPrice(product.price)}`,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function CarsPage({ params }: Props) {
  const product = await fetchProductById(params.productId);

  if (!product) {
    notFound();
  }

  const vehicleSchema = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${product.brand} ${product.model} ${product.year}`,
    brand: { "@type": "Brand", name: product.brand },
    model: product.model,
    vehicleModelDate: String(product.year),
    ...(product.km != null && {
      mileageFromOdometer: { "@type": "QuantitativeValue", value: product.km, unitCode: "KMT" },
    }),
    ...(product.color && { color: product.color }),
    image: product.images.map((i) => i.url),
    description: product.description,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "ARS",
      availability:
        product.status === "DISPONIBLE"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
      url: `${SITE_URL}/views/details/${product.id}`,
    },
  };

  return (
    <div className="bg-[#0a0a0a] pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema) }}
      />
      <Detail product={product} />
    </div>
  );
}
