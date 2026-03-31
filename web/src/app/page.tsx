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
    "GalaKids - ბავშვების ტანსაცმლის ონლაინ მაღაზია საქართველოში. აღმოაჩინეთ მაღალი ხარისხის პროდუქტები და სწრაფი მიწოდება. | GalaKids - Online store for children's clothing in Georgia. Discover high-quality products and fast delivery.",
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
      "GalaKids - ბავშვების ტანსაცმლის ონლაინ მაღაზია | Children's Clothing Online Store",
    description:
      "აღმოაჩინეთ ბავშვების ტანსაცმელი GalaKids-ში | Discover children's clothing at GalaKids",
    url: "https://galakids.ge",
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
  alternates: {
    canonical: "https://galakids.ge",
    languages: {
      ka: "https://galakids.ge",
      en: "https://galakids.ge/en",
    },
  },
};

export default function Home() {
  return <EntryGate />;
}
