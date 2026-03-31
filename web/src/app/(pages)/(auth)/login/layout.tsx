import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "შესვლა | Login",
  description:
    "შედით თქვენს RussanaForDire ანგარიშში. მარტივი და უსაფრთხო ავტორიზაცია ონლაინ შოპინგისთვის. | Log in to your RussanaForDire account. Simple and secure authorization for online shopping.",
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
    "შესვლა",
    "ავტორიზაცია",
    "ანგარიში",
    "ლოგინი",
    "RussanaForDire",
    "login",
    "authorization",
    "account",
    "sign in",
  ],
  openGraph: {
    title: "შესვლა - RussanaForDire | Login - RussanaForDire",
    description:
      "შედით თქვენს ანგარიშში უსაფრთხოდ | Log in to your account securely",
    url: "https://russanaForDire.com/login",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "RussanaForDire შესვლა | Login",
      },
    ],
  },
  alternates: {
    canonical: "https://russanaForDire.com/login",
    languages: {
      ka: "https://russanaForDire.com/login",
      en: "https://russanaForDire.com/en/login",
    },
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
