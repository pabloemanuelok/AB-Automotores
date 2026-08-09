/**
 * Rewrites a Cloudinary delivery URL to the 1200x630 crop social networks
 * expect. Returns undefined for missing or non-Cloudinary URLs so callers can
 * fall back to the site-wide OG image.
 */
export function ogImageUrl(url?: string): string | undefined {
  if (!url?.includes("/image/upload/")) return undefined;

  return url.replace(
    "/image/upload/",
    "/image/upload/c_fill,g_auto,w_1200,h_630,q_auto,f_jpg/",
  );
}
