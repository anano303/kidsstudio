"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "./SearchBox.css";
import Image from "next/image";
import { useLanguage } from "@/hooks/LanguageContext";
// import searchIcon from "../../assets/icons/search.png";

export default function SearchBox() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const { t } = useLanguage();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      // Properly encode the keyword for URL
      const encodedKeyword = encodeURIComponent(keyword.trim());
      router.push(`/search/${encodedKeyword}`);
    }
  };

  return (
    <form onSubmit={onSubmit} className="search-form">
      {/* <Image src={searchIcon} alt="search icon" className="searchIcon" /> */}
      <input
        type="text"
        placeholder={t("shop.searchPlaceholder")}
        value={keyword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setKeyword(e.target.value)
        }
        className="search-input"
      />
      <button type="submit" className="search-button">
        <Image src="/searchIcon.png" alt="search" width={20} height={20}/>
      </button>
    </form>
  );
}
