"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import MovingImages from "../components/firstPage/MovingImages";
import "./entry-page.css";

const EntryGate = () => {
  const router = useRouter();

  // Handle entry to the main site
  const handleEnterSite = () => {
    router.push("/home");
  };

  return (
    <div className="entry-page relative w-full h-screen flex flex-col items-center justify-center bg-black text-white">
      <MovingImages />
      <div className="sect2">
        <h1> ჯერ დააპიპინე </h1>
        <Image
          src="/arrow.png"
          width={240}
          height={126}
          alt="Arrow pointing down"
          className="arrowImage"
        />
      </div>
      <div className="sec3">
        <h2>მერე შედი</h2>
        <button className="entry-button" onClick={handleEnterSite}>
          მთავარი გვერდი
        </button>
      </div>
    </div>
  );
};

export default EntryGate;
