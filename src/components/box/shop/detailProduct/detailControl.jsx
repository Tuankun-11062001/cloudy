"use client";

import { shopApi } from "@/api/shop";
import { getLocalStorage } from "@/components/storage/local";

import { appSvg } from "@/data/svg";
import React, { useEffect, useState } from "react";

const DetailControl = ({ data }) => {
  const [userId, setUserId] = useState();
  const [like, setLike] = useState(false);

  useEffect(() => {
    const increaseView = async () => {
      try {
        const res = await shopApi.updateView(data._id);
        console.log(res.data.message);
      } catch (error) {
        console.error("Error updating view:", error);
      }
    };
    increaseView();

    const localId = getLocalStorage("_CM_id");
    setUserId(localId);
    if (!localId) {
      return;
    }
    const isLiked = data.cloudy.some((item) => item.user == localId);

    setLike(isLiked);
  }, []);

  const cloudy = async (e) => {
    if (!userId) {
      return;
    }

    const cloud = e.target
      .closest(".shop_detail_content_view")
      .querySelector(".cloudy");
    cloud.classList.toggle("active");

    const payload = {
      data: data._id,
      userId,
    };

    const res = await shopApi.cloudyProduct(payload);
    if (res.status === 200) {
      setLike(!like);
    }
  };

  return (
    <div className="shop_detail_content_view">
      <p>
        {appSvg.view} {data.view}
      </p>
      <p className={like ? "cloudy active" : "cloudy"} onClick={cloudy}>
        {appSvg.cloud} {data.cloudy.length}
      </p>
      <p>save</p>
    </div>
  );
};

export default DetailControl;
