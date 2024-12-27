"use client";
import { adsApi } from "@/api/ads";
import { appSvg } from "@/data/svg";
import React, { useEffect, useState } from "react";

export const ListVertical = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const getAds = async () => {
      const ads = await adsApi.getAds(`?vertical=true`);
      setAds(ads.data.data);
    };
    getAds();
  }, []);
  return (
    <div className="list_vertical">
      {ads.map((item, index) => (
        <AdsVertical data={item} index={item._id || index} />
      ))}
    </div>
  );
};

export const AdsPopup = () => {
  const [ads, setAds] = useState([]);
  useEffect(() => {
    const getAds = async () => {
      const ads = await adsApi.getAds(`?popup=true`);
      setAds(ads.data.data);
    };
    getAds();
  }, []);
  useEffect(() => {
    const timer = setTimeout(handleAdsPopup, 5000);
    // Cleanup khi component unmount
    return () => clearTimeout(timer);
  }, []);
  const handleAdsPopup = () => {
    document.querySelector(".ads_popup").classList.toggle("active");
  };
  return (
    <div className="ads_popup">
      <div className="ads_popup_content">
        <p onClick={handleAdsPopup}>{appSvg.close}</p>
        <div className="container">
          <a href={ads[0]?.linkAds} target="_blank">
            <h4>{ads[0]?.title}</h4>

            <img src={ads[0]?.imageAds} loading="lazy" alt={`banner`} />
            <span>{ads[0]?.detail}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export const AdsBottom = () => {
  const [ads, setAds] = useState([]);
  useEffect(() => {
    const getAds = async () => {
      const ads = await adsApi.getAds(`?bottom=true`);
      setAds(ads.data.data);
    };
    getAds();
  }, []);
  useEffect(() => {
    const timer = setTimeout(handleAdsBottom, 1 * 60 * 1000);
    // Cleanup khi component unmount
    return () => clearTimeout(timer);
  }, []);
  const handleAdsBottom = () => {
    document.querySelector(".ads_bottom").classList.toggle("active");
  };
  return (
    <div className="ads_bottom">
      <div className="ads_bottom_content">
        <p onClick={handleAdsBottom}>Close Ads</p>
        <div className="list_content">
          {ads.map((item, index) => (
            <a href={item?.linkAds} target="_blank" key={item._id || index}>
              <img src={item?.imageAds} loading="lazy" alt={`banner`} />
              <span>{item?.detail}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AdsVertical = ({ data, index }) => {
  const toggleContent = (e) => {
    const content = e.target
      .closest(".ads_vertical")
      .querySelector(".ads_vertical_content");
    content.classList.toggle("active");
    e.target.closest(".ads_vertical_head").classList.toggle("active");
  };
  return (
    <div className="ads_vertical" key={index}>
      <div className="ads_vertical_head">
        <p onClick={toggleContent}>{appSvg.arrowDown}</p>
      </div>
      <div className="ads_vertical_content">
        <a href={data?.linkAds} target="_blank">
          <img src={data?.imageVerticalAds} loading="lazy" alt={`banner`} />
          <span>{data?.detail}</span>
        </a>
      </div>
    </div>
  );
};

export const AdsHorizal = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const getAds = async () => {
      const ads = await adsApi.getAds(`?horizal=true`);
      setAds(ads.data.data);
    };
    getAds();
  }, []);

  const toggleContent = (e) => {
    const content = e.target
      .closest(".ads_horizal")
      .querySelector(".ads_horizal_content");
    content.classList.toggle("active");
    e.target.closest(".ads_horizal_head").classList.toggle("active");
  };
  return (
    <div className="ads_horizal">
      <div className="ads_horizal_head">
        <p onClick={toggleContent}>{appSvg.arrowDown}</p>
      </div>
      <div className="ads_horizal_content">
        <a>
          <img src={ads[0]?.imageAds} loading="lazy" alt={`banner`} />
          <span>{ads[0]?.detail}</span>
        </a>
      </div>
    </div>
  );
};
