import Head from "next/head";

export default function SEOMetaTags() {
  return (
    <Head>
      {/* Google Business Logo */}
      <meta property="og:logo" content="https://russanafordire.com/logo.png" />
      <meta name="logo" content="https://russanafordire.com/logo.png" />

      {/* Rich Snippets for Google */}
      <meta itemProp="name" content="RussanaForDire" />
      <meta
        itemProp="description"
        content=" პიპინიკა ტანსაცმლის, ფეხსაცმლისა და აქსესუარების ონლაინ მაღაზია საქართველოში"
      />
      <meta itemProp="image" content="https://russanafordire.com/logo.png" />

      {/* Additional Open Graph tags */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta
        property="og:image:secure_url"
        content="https://russanafordire.com/logo.png"
      />

      {/* Business Information */}
      <meta name="business:contact_data:country_name" content="Georgia" />
      <meta name="business:contact_data:locality" content="Tbilisi" />
      <meta
        name="business:contact_data:website"
        content="https://russanafordire.com"
      />

      {/* Theme Color */}
      <meta name="theme-color" content="#F9F9F9" />
      <meta name="msapplication-navbutton-color" content="#F9F9F9" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    </Head>
  );
}
