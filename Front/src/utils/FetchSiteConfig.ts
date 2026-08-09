import { request } from "@/utils/apiClient";

export const DESTACADOS_LABEL_KEY = "destacados_label";

interface SiteConfigEntry {
  key: string;
  value: string | null;
}

export const fetchSiteConfig = (key: string): Promise<SiteConfigEntry> =>
  request<SiteConfigEntry>(`/site-config/${key}`);

export const saveSiteConfig = (
  key: string,
  value: string,
  token: string | null,
): Promise<SiteConfigEntry> =>
  request<SiteConfigEntry>(`/site-config/${key}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value }),
    token,
  });
