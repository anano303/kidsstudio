import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "შესვლა | Login",
  description:
    "შედით თქვენს GalaKids ანგარიშში. მარტივი და უსაფრთხო ავტორიზაცია ონლაინ შოპინგისთვის. | Log in to your GalaKids account. Simple and secure authorization for online shopping.",
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
    "GalaKids",
    "login",
    "authorization",
    "account",
    "sign in",
  ],
  openGraph: {
    title: "შესვლა - GalaKids | Login - GalaKids",
    description:
      "შედით თქვენს ანგარიშში უსაფრთხოდ | Log in to your account securely",
    url: "https://galakids.ge/login",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "GalaKids შესვლა | Login",
      },
    ],
  },
  alternates: {
    canonical: "https://galakids.ge/login",
    languages: {
      ka: "https://galakids.ge/login",
      en: "https://galakids.ge/en/login",
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
