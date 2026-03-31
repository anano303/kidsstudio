// import HomePagesHead from "@/components/homePagesHead/homePagesHead";
// import HomePageShop from "@/components/homePageShop/homePageShop";
// import TopItems from "@/components/TopItems/TopItems";
// import PinkCharacter from "@/components/PinkCharacter/PinkCharacter";
// // import HomePageAds from "@/components/home-page-ads/home-page-ads";

// const Home = () => {
//   return (
//     <div>
//       <HomePagesHead />

//       <TopItems />
//       {/* <HomePageAds /> */}
//       <div
//         className="site-timer-container"
//         style={{ position: "relative", zIndex: 20 }}
//       >
//         {/* ...existing site-timer code... */}
//       </div>
//       <HomePageShop />
//       <PinkCharacter />
//     </div>
//   );
// };

// export default Home;

import EntryGate from "./EntryGate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "მთავარი გვერდი | Home Page",
  description:
    "RussanaForDire - ტანსაცმლის, ფეხსაცმლისა და აქსესუარების ონლაინ მაღაზია საქართველოში. აღმოაჩინეთ მაღალი ხარისხის პროდუქტები და სწრაფი მიწოდება. | RussanaForDire - Online store for clothing, shoes and accessories in Georgia. Discover high-quality products and fast delivery.",
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
    "მოდა",
    "შოპინგი",
    "clothing",
    "shoes",
    "accessories",
    "online shop",
    "Georgia",
    "fashion",
    "shopping",
  ],
  openGraph: {
    title:
      "RussanaForDire - ტანსაცმლისა და აქსესუარების ონლაინ მაღაზია | Clothing & Accessories Online Store",
    description:
      "აღმოაჩინეთ ექსკლუზიური ტანსაცმელი, ფეხსაცმელი და აქსესუარები RussanaForDire-ში | Discover exclusive clothing, shoes and accessories at RussanaForDire",
    url: "https://russanafordire.com",
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
  alternates: {
    canonical: "https://russanafordire.com",
    languages: {
      ka: "https://russanafordire.com",
      en: "https://russanafordire.com/en",
    },
  },
};

export default function Home() {
  return <EntryGate />;
}
