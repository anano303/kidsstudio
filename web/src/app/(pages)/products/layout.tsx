import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "პროდუქტები | Products",
  description:
    "დეტალური ინფორმაცია პროდუქტების შესახებ GalaKids ონლაინ მაღაზიაში. მაღალი ხარისხის ტანსაცმელი, ფეხსაცმელი და აქსესუარები. | Detailed information about products at GalaKids online store. High-quality clothing, shoes and accessories.",
  keywords: [
       "პიპინიკები",
    "პიპინიკა",
    "პიპინიკების ტანსაცმელი",
    "პიპინიკების ფეხსაცმელი",
    "პიპინიკების აქსესუარები",
    "პიპინიკების ონლაინ მაღაზია",
    "პიპინიკების მაღაზია",
    "პიპინიკების ტანსაცმლის მაღაზია",
    "პიპინიკების ფეხსაცმლის მაღაზია",
    "პიპინიკების აქსესუარების მაღაზია",
    "პიპინიკების ონლაინ მაღაზია საქართველოში",
    "პიპინიკების მაღაზია საქართველოში",
    "პიპინიკა მაისურები",
    "პიპინიკა შარვლები",
    "პიპინიკა კაბები",
    "პიპინიკა ფეხსაცმელი",
    "პიპინიკა აქსესუარები",
    "clothing for pipinikas",
    "shoes for pipinikas",
    "accessories for pipinikas",
    "online store for pipinikas",
    "pipinika online store",
    "pipinika store",
    "პროდუქტები",
    "ტანსაცმელი",
    "ფეხსაცმელი",
    "აქსესუარები",
    "ონლაინ მაღაზია",
    "ყიდვა",
    "products",
    "clothing",
    "shoes",
    "accessories",
    "online shop",
    "purchase",
  ],
  openGraph: {
    title: "პროდუქტები - GalaKids | Products - GalaKids",
    description:
      "იხილეთ პროდუქტების დეტალური ინფორმაცია და შეიძინეთ | View detailed product information and purchase",
    type: "website",
    url: "https://galakids.ge/products",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "GalaKids პროდუქტები | Products",
      },
    ],
  },
  alternates: {
    canonical: "https://galakids.ge/products",
    languages: {
      ka: "https://galakids.ge/products",
      en: "https://galakids.ge/en/products",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
