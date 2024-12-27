import React from "react";
import TitleApp from "../title";
import SeasonTab from "./seasonTab";
import { useTranslations } from "next-intl";

const Season = () => {
  const t = useTranslations("Season");

  return (
    <div className="home_season">
      <div className="season_title">
        <TitleApp title={t("title")} />
      </div>
      <div className="season_content">
        <div className="left">
          <p>{t("left_description_1")}</p>
          <p>{t("left_description_2")}</p>
          <p>{t("left_description_3")}</p>
        </div>
        <SeasonTab />
      </div>
    </div>
  );
};

export default Season;
