"use client";

import { blogsApi } from "@/api/blogs";
import { getLocalStorage } from "@/components/storage/local";
import { appSvg } from "@/data/svg";
import React, { useEffect, useState } from "react";

const Other = ({ data }) => {
  const [userId, setUserId] = useState();
  const [like, setLike] = useState(false);

  useEffect(() => {
    const increaseView = async () => {
      try {
        const res = await blogsApi.updateView(data._id);
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

  const toggleBoxShare = (e) => {
    const boxShare = e.target
      .closest(".lyrics_song_content_left_other_g")
      .querySelector(".box_share");
    boxShare.classList.toggle("active");
  };
  const cloudy = async (e) => {
    if (!userId) {
      return;
    }

    const cloud = e.target.closest(".other").querySelector(".cloudy");
    cloud.classList.toggle("active");

    const payload = {
      id: data._id,
      userId,
    };

    const res = await blogsApi.cloudyBlogs(payload);
    if (res.status === 200) {
      setLike(!like);
    }
  };

  return (
    <div className="other">
      <p>
        {appSvg.view} {data.view} Lượt xem
      </p>
      <p className={like ? "cloudy active" : "cloudy"} onClick={cloudy}>
        {appSvg.cloud} {data.cloudy.length} Cloudy
      </p>
      <p>
        {appSvg.share} {data.share} Chia sẻ
      </p>
    </div>
  );
};

export default Other;
