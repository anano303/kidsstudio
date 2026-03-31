import { Suspense } from "react";
import ShopContent from "./ShopContent";
import HeartLoading from "@/components/HeartLoading/HeartLoading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "მაღაზია | Shop",
  description:
    "იყიდეთ ტანსაცმელი, ფეხსაცმელი და აქსესუარები GalaKids ონლაინ მაღაზიაში. ფართო ასორტიმენტი, მაღალი ხარისხი და ხელმისაწვდომი ფასები. | Shop clothing, shoes and accessories at GalaKids online store. Wide selection, high quality and affordable prices.",
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
    "ტანსაცმელი",
    "ფეხსაცმელი",
    "აქსესუარები",
    "მაღაზია",
    "ონლაინ შოპინგი",
    "საქართველო",
    "მოდა",
    "clothing",
    "shoes",
    "accessories",
    "shop",
    "online shopping",
    "Georgia",
    "fashion",
  ],
  openGraph: {
    title:
      "GalaKids მაღაზია - ტანსაცმელი და აქსესუარები | Shop - Clothing and Accessories",
    description:
      "ყიდვა-გაყიდვა ტანსაცმელი, ფეხსაცმელი და აქსესუარების ფართო ასორტიმენტით | Shop wide selection of clothing, shoes and accessories",
    url: "https://galakids.ge/shop",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "GalaKids მაღაზია | Shop",
      },
    ],
  },
  alternates: {
    canonical: "https://galakids.ge/shop",
    languages: {
      ka: "https://galakids.ge/shop",
      en: "https://galakids.ge/en/shop",
    },
  },
};

const ShopPage = () => {
  return (
    <div>
      <Suspense fallback={<HeartLoading size="medium" />}>
        <ShopContent />
      </Suspense>
    </div>
  );
};

export default ShopPage;
