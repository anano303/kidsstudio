export default function StructuredDataOrganization() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RussanaForDire",
    url: "https://russanafordire.com",
    logo: {
      "@type": "ImageObject",
      url: "https://russanafordire.com/logo.png",
      width: 1200,
      height: 630,
      contentUrl: "https://russanafordire.com/logo.png",
    },
    image: "https://russanafordire.com/logo.png",
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
      url: "https://russanafordire.com/contact",
    },
    sameAs: [
      // აქ დაამატეთ ღია სოციალური მედიის ლინკები
    ],
    foundingDate: "2024",
    slogan: "RussanaForDire - ტანსაცმლისა და აქსესუარების ონლაინ მაღაზია",
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
