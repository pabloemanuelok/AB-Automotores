import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import fetchCars from "@/utils/FetchCars/FetchCars";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const vehicles = await fetchCars();

  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/autos-usados`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/financiacion`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/consignaciones`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/gestoria`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...vehicles
      .filter((vehicle) => vehicle.status === "DISPONIBLE")
      .map((vehicle) => ({
        url: `${SITE_URL}/views/details/${vehicle.id}`,
        lastModified: new Date(vehicle.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
  ];
}
