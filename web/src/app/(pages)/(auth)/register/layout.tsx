import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "რეგისტრაცია | Register",
  description:
    "შექმენით ანგარიში RussanaForDire-ზე და დაიწყეთ ონლაინ შოპინგი. მარტივი რეგისტრაცია და სწრაფი ყიდვა. | Create an account on RussanaForDire and start online shopping. Easy registration and fast shopping.",
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
    "რეგისტრაცია",
    "ანგარიშის შექმნა",
    "საიტზე გამოწერა",
    "RussanaForDire",
    "ახალი მომხმარებელი",
    "register",
    "create account",
    "sign up",
    "new user",
  ],
  openGraph: {
    title: "რეგისტრაცია - RussanaForDire | Register - RussanaForDire",
    description:
      "შექმენით ანგარიში და ისიამოვნეთ შოპინგით | Create account and enjoy shopping",
    url: "https://russanaForDire.com/register",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "RussanaForDire რეგისტრაცია | Register",
      },
    ],
  },
  alternates: {
    canonical: "https://russanaForDire.com/register",
    languages: {
      ka: "https://russanaForDire.com/register",
      en: "https://russanaForDire.com/en/register",
    },
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
