import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import { VEHICLES_TAG } from "@/utils/FetchCars/FetchCars";

/**
 * El backend llama acá después de cada alta, edición o baja de vehículos, para
 * que el catálogo público muestre el cambio en el acto en vez de esperar a que
 * venza el caché.
 *
 * Lo llama el backend y no el navegador del admin, así el secreto nunca viaja
 * al cliente.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "REVALIDATE_SECRET no está configurado" },
      { status: 500 },
    );
  }

  if (request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  revalidateTag(VEHICLES_TAG);
  // El sitemap se arma con el listado, así que también queda viejo.
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ revalidated: true, at: Date.now() });
}
