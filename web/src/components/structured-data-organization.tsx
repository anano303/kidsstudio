export default function StructuredDataOrganization() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GalaKids",
    url: "https://galakids.ge",
    logo: {
      "@type": "ImageObject",
      url: "https://galakids.ge/logo.svg",
      width: 1200,
      height: 630,
      contentUrl: "https://galakids.ge/logo.svg",
    },
    image: "https://galakids.ge/logo.svg",
    description:
      "თანამედროვე პიპინიკა ტანსაცმლის, ფეხსაცმლისა და აქსესუარების ონლაინ მაღაზია საქართველოში. Modern online store for pipinika clothing, shoes and accessories in Georgia.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "GE",
      addressRegion: "Tbilisi",
      addressLocality: "Tbilisi",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Georgian", "English"],
      url: "https://galakids.ge/contact",
    },
    sameAs: [
      // აქ დაამატეთ ღია სოციალური მედიის ლინკები
    ],
    foundingDate: "2024",
    slogan: "GalaKids - ტანსაცმლისა და აქსესუარების ონლაინ მაღაზია",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationData, null, 2),
      }}
    />
  );
}
