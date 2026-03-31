import { Metadata } from "next";
import HomePagesHead from "@/components/homePagesHead/homePagesHead";
import HomePageShop from "@/components/homePageShop/homePageShop";
import TopItems from "@/components/TopItems/TopItems";
import PinkCharacter from "@/components/PinkCharacter/PinkCharacter";

export const metadata: Metadata = {
  title: "მთავარი გვერდი - GalaKids | პიპინიკების ონლაინ მაღაზია",
  description:
    "GalaKids - თანამედროვე პიპინიკა ტანსაცმლის, ფეხსაცმლისა და აქსესუარების ონლაინ მაღაზია საქართველოში. მოიძიეთ ახალი კოლექციები და ტრენდული პროდუქტები.",
  openGraph: {
    title: "მთავარი გვერდი - GalaKids | პიპინიკების ონლაინ მაღაზია",
    description:
      "GalaKids - თანამედროვე პიპინიკა ტანსაცმლის, ფეხსაცმლისა და აქსესუარების ონლაინ მაღაზია საქართველოში. მოიძიეთ ახალი კოლექციები და ტრენდული პროდუქტები.",
    url: "https://galakids.ge/home",
    images: [
      {
        url: "https://galakids.ge/logo.svg",
        width: 1200,
        height: 630,
        alt: "GalaKids Logo",
        type: "image/png",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <div className="main-content">
      <HomePagesHead />
      <TopItems />
      <PinkCharacter />
      {/* <HomePageAds /> */}
      <div
        className="site-timer-container"
        style={{ position: "relative", zIndex: 20 }}
      >
        {/* ...existing site-timer code... */}
      </div>
      <HomePageShop />
    </div>
  );
}
