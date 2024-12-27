"use client";
import React, { useEffect, useState } from "react";
import Product from "../product";
import { useTranslations } from "next-intl";
import { handleGetSeason } from "@/api/products";
import LoadingClient from "../loadingClient";
import Empty from "../empty";
import { SwiperProduct } from "../swiper";

const SeasonTab = () => {
  const t = useTranslations("Season");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.getElementById("defaultOpen").click();
    (async () => {
      try {
        setLoading(true);
        const res = await handleGetSeason("spring");
        if (res) {
          setProducts(res);
          setLoading(false);
        }
      } catch (error) {
        console.log("error cant fetch season");
      }
    })();
  }, []);

  const handleChangeTab = async (e, season) => {
    let i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    const liElements = document.querySelectorAll(".season_tap li");
    liElements.forEach((item) => item.classList.remove("active"));
    e.target.classList.add("active");

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(season).style.display = "flex";

    try {
      setLoading(true);
      const res = await handleGetSeason(season);
      if (res) {
        setProducts(res);
        setLoading(false);
      }
    } catch (error) {
      console.log("error cant fetch season");
    }
    // e.currentTarget.className += " active";
  };

  return (
    <div className="right">
      <ul className="season_tap">
        <li
          className="active"
          id="defaultOpen"
          onClick={(e) => handleChangeTab(e, "spring")}
        >
          {t("right_tab_spring")}
        </li>
        <li onClick={(e) => handleChangeTab(e, "summer")}>
          {t("right_tab_summer")}
        </li>
        <li onClick={(e) => handleChangeTab(e, "autumn")}>
          {t("right_tab_autumn")}
        </li>
        <li onClick={(e) => handleChangeTab(e, "winter")}>
          {t("right_tab_winter")}
        </li>
      </ul>
      <div className="right_season_content">
        {/* spring */}

        <div id="spring" className="tabcontent">
          <div className="time">
            <p>{t("right_time_spring_string_1")}</p>

            <p>{t("right_time_spring_string_2")}</p>
          </div>
          <div className="description">{t("right_description_spring")}</div>
          <div className="title_list">{t("right_list_title_spring")}</div>
          {loading ? (
            <LoadingClient />
          ) : products?.data?.length < 1 ? (
            <Empty />
          ) : (
            <div className="list_product">
              <SwiperProduct data={products} />
            </div>
          )}
        </div>

        {/* summer */}

        <div id="summer" className="tabcontent">
          <div className="time">
            <p>{t("right_time_summer_string_1")}</p>

            <p>{t("right_time_summer_string_2")}</p>
          </div>
          <div className="description">{t("right_description_summer")}</div>
          <div className="title_list">{t("right_list_title_summer")}</div>
          {loading ? (
            <LoadingClient />
          ) : products?.data?.length < 1 ? (
            <Empty />
          ) : (
            <div className="list_product">
              <SwiperProduct data={products} />
            </div>
          )}
        </div>

        {/* autumn */}

        <div id="autumn" className="tabcontent">
          <div className="time">
            <p>{t("right_time_autumn_string_1")}</p>

            <p>{t("right_time_autumn_string_2")}</p>
          </div>
          <div className="description">{t("right_description_autumn")}</div>
          <div className="title_list">{t("right_list_title_autumn")}</div>
          {loading ? (
            <LoadingClient />
          ) : products?.data?.length < 1 ? (
            <Empty />
          ) : (
            <div className="list_product">
              <SwiperProduct data={products} />
            </div>
          )}
        </div>

        {/* winter */}

        <div id="winter" className="tabcontent">
          <div className="time">
            <p>{t("right_time_winter_string_1")}</p>

            <p>{t("right_time_winter_string_2")}</p>
          </div>
          <div className="description">{t("right_description_winter")}</div>
          <div className="title_list">{t("right_list_title_winter")}</div>
          {loading ? (
            <LoadingClient />
          ) : products?.data?.length < 1 ? (
            <Empty />
          ) : (
            <div className="list_product">
              <SwiperProduct data={products} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeasonTab;
