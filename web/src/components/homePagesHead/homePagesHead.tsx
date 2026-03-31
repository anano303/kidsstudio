"use client";

import { useLanguage } from "@/hooks/LanguageContext";
import "./homePagesHead.css";
import PuzzleLogo from "../puzzle-logo/PuzzleLogo";

const HomePagesHead = () => {
  const { t } = useLanguage();
  return (
    <div className="home-pages-head">
      <h1 className="main-slogan">{t("home.welcomeMessage")}</h1>
      <div className="logo-containerHome">
        <p className="sub-slogan">{t("home.pipSound")}</p>
        <div className="puzzle-logo-wrapper">
          <PuzzleLogo size={350} />
        </div>
        <p className="sub-slogan slogan2">{t("home.pipSound")}</p>
      </div>
    </div>
  );
};

export default HomePagesHead;
