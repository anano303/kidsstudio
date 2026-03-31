import type { Metadata } from "next";
import "./globals.css";
import { satoshi } from "./(pages)/fonts";
import { Providers } from "./providers";
import { AuthProvider } from "@/components/auth-provider";
import { CartProvider } from "@/modules/cart/context/cart-context";
import { CheckoutProvider } from "@/modules/checkout/context/checkout-context";
import { LanguageProvider } from "@/hooks/LanguageContext";
// import SiteTimer from "@/components/SiteTimer/SiteTimer";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import ChatButton from "@/components/chat-button/chat-button";
import { Toaster } from "@/components/toaster";
import StructuredDataOrganization from "@/components/structured-data-organization";

// ⚠️ ყურადღება: აქ აღარ გვაქვს Header/Footer რადგან ისინი გადადის EntryGate-ში
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_CLIENT_URL || "https://russanafordire.com"
  ),
  title: {
    default:
      "RussanaForDire - პიპინიკა ტანსაცმლის, ფეხსაცმლისა და აქსესუარების ონლაინ მაღაზია | Clothing, Shoes & Accessories Online Store",
    template: "%s | RussanaForDire",
  },
  description:
    "RussanaForDire - თანამედროვე პიპინიკა ტანსაცმლის, ფეხსაცმლისა და აქსესუარების ონლაინ მაღაზია საქართველოში. მაღალი ხარისხის პროდუქტები და სწრაფი მიწოდება მთელ ქვეყანაში. | Modern online store for clothing, shoes and accessories in Georgia. High-quality products and fast delivery nationwide.",
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
    "ტანსაცმელი",
    "ფეხსაცმელი",
    "აქსესუარები",
    "ონლაინ მაღაზია",
    "საქართველო",
    "თბილისი",
    "მოდა",
    "სტილი",
    "ხარისხი",
    "clothing",
    "shoes",
    "accessories",
    "online shop",
    "Georgia",
    "fashion",
    "style",
    "quality",
  ],
  authors: [{ name: "RussanaForDire Team" }],
  creator: "RussanaForDire",
  publisher: "RussanaForDire",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code
  },
  openGraph: {
    type: "website",
    locale: "ka_GE",
    url: "https://russanafordire.com/",
    siteName: "RussanaForDire",
    title:
      "RussanaForDire - პიპინიკაა ტანსაცმლის, ფეხსაცმლისა და აქსესუარების ონლაინ მაღაზია | Clothing, Shoes & Accessories Online Store",
    description:
      "შეიძინეთ მაღალი ხარისხის პიპინიკა ტანსაცმელი, ფეხსაცმელი და აქსესუარები RussanaForDire-დან. სწრაფი მიწოდება მთელ საქართველოში. | Purchase high-quality clothing, shoes and accessories from RussanaForDire. Fast delivery throughout Georgia.",
    images: [
      {
        url: "https://russanafordire.com/logo.png",
        width: 1200,
        height: 630,
        alt: "RussanaForDire - ონლაინ მაღაზია | Online Store",
        type: "image/png",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-icon.png",
      },
    ],
  },
  manifest: "/manifest.json",
  twitter: {
    card: "summary_large_image",
    site: "@RussanaForDire",
    title:
      "RussanaForDire - პიპინიკა ტანსაცმლის, ფეხსაცმლისა და აქსესუარების ონლაინ მაღაზია | Pipinika Clothing, Shoes & Accessories Online Store",
    description:
      "შეიძინეთ მაღალი ხარისხის პიპინიკა ტანსაცმელი, ფეხსაცმელი და აქსესუარები RussanaForDire-დან. | Purchase high-quality pipinika clothing, shoes and accessories from RussanaForDire.",
    images: [
      {
        url: "https://russanafordire.com/logo.png",
        alt: "RussanaForDire Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://russanafordire.com",
    languages: {
      ka: "https://russanafordire.com",
      en: "https://russanafordire.com/en",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RussanaForDire",
    url: "https://russanafordire.com",
    logo: "https://russanafordire.com/logo.png",
    description:
      "პიპინიკა ტანსაცმლის, ფეხსაცმლისა და აქსესუარების ონლაინ მაღაზია საქართველოში",
    address: {
      "@type": "PostalAddress",
      addressCountry: "Georgia",
      addressLocality: "Tbilisi",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@russanaForDire.com",
    },
    sameAs: [
      "https://www.facebook.com/russanaForDire",
      "https://www.instagram.com/russanaForDire",
    ],
  };

  return (
    <html lang="ka">
      <head>
        {/* Additional meta tags for better Google recognition */}
        <meta name="application-name" content="RussanaForDire" />
        <meta name="msapplication-TileColor" content="#F9F9F9" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#F9F9F9" />

        {/* Business Schema */}
        <meta itemScope itemType="https://schema.org/Organization" />
        <meta itemProp="name" content="RussanaForDire" />
        <meta itemProp="url" content="https://russanafordire.com" />
        <meta itemProp="logo" content="https://russanafordire.com/logo.png" />
        <meta itemProp="image" content="https://russanafordire.com/logo.png" />
        <meta
          itemProp="description"
          content="პიპინიკა ტანსაცმლის, ფეხსაცმლისა და აქსესუარების ონლაინ მაღაზია საქართველოში"
        />

        {/* Favicon and icons for better brand recognition */}
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Open Graph specific logo */}
        <meta
          property="og:logo"
          content="https://russanafordire.com/logo.png"
        />
        <meta property="business:contact_data:country_name" content="Georgia" />
        <meta property="business:contact_data:locality" content="Tbilisi" />

        {/* Existing structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          async
          defer
          crossOrigin="anonymous"
          src={`https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v13.0&appid=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}&autoLogAppEvents=1`}
        />
      </head>
      <body
        className={`${satoshi.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* <LandingPage /> */}
        <Providers>
          <AuthProvider>
            <CartProvider>
              <CheckoutProvider>
                <LanguageProvider>
                  {/* <SiteTimer /> */}
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                  <ChatButton />
                  <StructuredDataOrganization />
                </LanguageProvider>
              </CheckoutProvider>
            </CartProvider>
          </AuthProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
