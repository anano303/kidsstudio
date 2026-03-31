import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "კონფიდენციალურობის პოლიტიკა | Privacy Policy",
  description:
    "RussanaForDire-ს კონფიდენციალურობის პოლიტიკა. გაიგეთ როგორ ვიცავთ და ვმუშავებთ თქვენს პირად ინფორმაციასთან. | RussanaForDire privacy policy. Learn how we protect and handle your personal information.",
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
      "კონფიდენციალურობის პოლიტიკა - RussanaForDire | Privacy Policy - RussanaForDire",
    description:
      "გაიგეთ როგორ ვიცავთ თქვენს პირად ინფორმაციას | Learn how we protect your personal information",
    url: "https://russanaForDire.com/privacy-policy",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "RussanaForDire კონფიდენციალურობის პოლიტიკა | Privacy Policy",
      },
    ],
  },
  alternates: {
    canonical: "https://russanaForDire.com/privacy-policy",
    languages: {
      ka: "https://russanaForDire.com/privacy-policy",
      en: "https://russanaForDire.com/en/privacy-policy",
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
