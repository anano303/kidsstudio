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
    process.env.NEXT_PUBLIC_CLIENT_URL || "https://galakids.ge",
  ),
  title: {
    default:
      "GalaKids - ბავშვების ტანსაცმლის ონლაინ მაღაზია | Children's Clothing Online Store",
    template: "%s | GalaKids",
  },
  description:
    "GalaKids - ბავშვების ტანსაცმლის ონლაინ მაღაზია საქართველოში. მაღალი ხარისხის ბავშვის ტანსაცმელი და სწრაფი მიწოდება მთელ ქვეყანაში. | Children's clothing online store in Georgia. High-quality kids' clothing and fast delivery nationwide.",
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
  authors: [{ name: "GalaKids Team" }],
  creator: "GalaKids",
  publisher: "GalaKids",
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
    url: "https://galakids.ge/",
    siteName: "GalaKids",
    title:
      "GalaKids - ბავშვების ტანსაცმლის ონლაინ მაღაზია | Children's Clothing Online Store",
    description:
      "შეიძინეთ მაღალი ხარისხის ბავშვის ტანსაცმელი GalaKids-დან. სწრაფი მიწოდება მთელ საქართველოში. | Purchase high-quality children's clothing from GalaKids. Fast delivery throughout Georgia.",
    images: [
      {
        url: "https://galakids.ge/logo.svg",
        width: 1200,
        height: 630,
        alt: "GalaKids - ბავშვების ტანსაცმელი | Children's Clothing",
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
    site: "@GalaKids",
    title:
      "GalaKids - ბავშვების ტანსაცმლის ონლაინ მაღაზია | Children's Clothing Online Store",
    description:
      "შეიძინეთ მაღალი ხარისხის ბავშვის ტანსაცმელი GalaKids-დან. | Purchase high-quality children's clothing from GalaKids.",
    images: [
      {
        url: "https://galakids.ge/logo.svg",
        alt: "GalaKids Logo",
      },
    ],
  },
  alternates: {
    canonical: "https://galakids.ge",
    languages: {
      ka: "https://galakids.ge",
      en: "https://galakids.ge/en",
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
    name: "GalaKids",
    url: "https://galakids.ge",
    logo: "https://galakids.ge/logo.svg",
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
      email: "info@galakids.ge",
    },
    sameAs: [
      "https://www.facebook.com/GalaKids",
      "https://www.instagram.com/GalaKids",
    ],
  };

  return (
    <html lang="ka">
      <head>
        {/* Additional meta tags for better Google recognition */}
        <meta name="application-name" content="GalaKids" />
        <meta name="msapplication-TileColor" content="#F9F9F9" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#F9F9F9" />

        {/* Business Schema */}
        <meta itemScope itemType="https://schema.org/Organization" />
        <meta itemProp="name" content="GalaKids" />
        <meta itemProp="url" content="https://galakids.ge" />
        <meta itemProp="logo" content="https://galakids.ge/logo.svg" />
        <meta itemProp="image" content="https://galakids.ge/logo.svg" />
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
        <meta property="og:logo" content="https://galakids.ge/logo.svg" />
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
