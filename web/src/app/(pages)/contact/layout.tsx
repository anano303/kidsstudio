import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "კონტაქტი | Contact",
  description:
    "დაგვიკავშირდით RussanaForDire-ს გუნდს. ჩვენ მზად ვართ გიპასუხოთ თქვენს შეკითხვებს და მოგემსახუროთ საუკეთესო ხარისხით. | Contact RussanaForDire team. We are ready to answer your questions and provide the best service.",
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
    "კონტაქტი",
    "საკონტაქტო ინფორმაცია",
    "მხარდაჭერა",
    "მომსახურება",
    "RussanaForDire",
    "contact",
    "support",
    "customer service",
  ],
  openGraph: {
    title: "კონტაქტი - RussanaForDire | Contact - RussanaForDire",
    description:
      "დაგვიკავშირდით და მიიღეთ პროფესიონალური კონსულტაცია | Contact us and get professional consultation",
    url: "https://russanaForDire.com/contact",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "RussanaForDire კონტაქტი | Contact",
      },
    ],
  },
  alternates: {
    canonical: "https://russanaForDire.com/contact",
    languages: {
      ka: "https://russanaForDire.com/contact",
      en: "https://russanaForDire.com/en/contact",
    },
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
