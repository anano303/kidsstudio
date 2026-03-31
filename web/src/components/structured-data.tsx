"use client";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GalaKids",
    url: "https://galakids.ge",
    logo: "https://galakids.ge/logo.svg",
    description:
      "თანამედროვე პიპინიკატანსაცმლის, ფეხსაცმლისა და აქსესუარების ონლაინ მაღაზია საქართველოში. Modern online store for clothing, shoes and accessories in Georgia.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Georgian", "English"],
    },
    sameAs: [
      // დაამატეთ სოციალური მედიის ლინკები თუ გაქვთ
      // "https://www.facebook.com/galakids",
      // "https://www.instagram.com/galakids"
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "GE",
      addressRegion: "Tbilisi",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
