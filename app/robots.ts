import type { MetadataRoute } from "next";
import { SITE_DATA } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_DATA.url}/sitemap.xml`,
    host: new URL(SITE_DATA.url).host,
  };
}
