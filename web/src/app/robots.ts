import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://galakids.ge";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/cart/",
        "/checkout/",
        "/login/",
        "/register/",
        "/profile/",
        "/orders/",
        "/_next/",
        "/temp/",
        "/uploads/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
