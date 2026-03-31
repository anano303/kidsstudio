import { CartPage } from "@/modules/cart/components/cart-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "კალათა | Cart",
  description:
    "თქვენი შეკვეთის კალათა GalaKids ონლაინ მაღაზიაში. განხილეთ შერჩეული პროდუქტები და განაგრძეთ შეკვეთის პროცესი. | Your shopping cart at GalaKids online store. Review selected products and proceed to checkout.",
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
    "კალათა",
    "შეკვეთა",
    "ყიდვა",
    "checkout",
    "ონლაინ შოპინგი",
    "cart",
    "order",
    "purchase",
    "online shopping",
  ],
  openGraph: {
    title: "კალათა - GalaKids | Cart - GalaKids",
    description:
      "თქვენი შერჩეული პროდუქტები შეკვეთისთვის | Your selected products for checkout",
    url: "https://galakids.ge/cart",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "GalaKids კალათა | Cart",
      },
    ],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <div className="Container">
      <CartPage />
    </div>
  );
}
