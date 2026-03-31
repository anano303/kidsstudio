import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "კონფიდენციალურობის პოლიტიკა | Privacy Policy",
  description:
    "GalaKids-ს კონფიდენციალურობის პოლიტიკა. გაიგეთ როგორ ვიცავთ და ვმუშავებთ თქვენს პირად ინფორმაციასთან. | GalaKids privacy policy. Learn how we protect and handle your personal information.",
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
    "კონფიდენციალურობა",
    "პოლიტიკა",
    "პირადი ინფორმაცია",
    "მონაცემთა დაცვა",
    "GDPR",
    "privacy",
    "policy",
    "personal information",
    "data protection",
  ],
  openGraph: {
    title:
      "კონფიდენციალურობის პოლიტიკა - GalaKids | Privacy Policy - GalaKids",
    description:
      "გაიგეთ როგორ ვიცავთ თქვენს პირად ინფორმაციას | Learn how we protect your personal information",
    url: "https://galakids.ge/privacy-policy",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "GalaKids კონფიდენციალურობის პოლიტიკა | Privacy Policy",
      },
    ],
  },
  alternates: {
    canonical: "https://galakids.ge/privacy-policy",
    languages: {
      ka: "https://galakids.ge/privacy-policy",
      en: "https://galakids.ge/en/privacy-policy",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
