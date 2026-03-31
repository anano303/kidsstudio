import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "წესები და პირობები | Terms & Conditions",
  description:
    "GalaKids-ის წესები და პირობები. გაეცანით ჩვენი ვებგვერდის გამოყენების პირობებს. | GalaKids terms and conditions.",
};

export default function TermsConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
