import type { MetadataRoute } from "next";
import { SITE_DATA } from "@/lib/constants";

const lastModified = new Date("2026-10-29");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_DATA.url}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_DATA.url}/politica-de-privacidad`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_DATA.url}/politica-de-cookies`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
