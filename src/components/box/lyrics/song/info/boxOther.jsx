"use client";
import { lyricsApi } from "@/api/lyrics";
import BoxShare from "@/components/box/home/boxShare";
import { getLocalStorage } from "@/components/storage/local";

import { appSvg } from "@/data/svg";
import React, { useEffect, useState } from "react";

const BoxOther = ({ data }) => {
  const [userId, setUserId] = useState();
  const [like, setLike] = useState(false);

  useEffect(() => {
    const updateView = async () => {
      try {
        const res = await lyricsApi.updateView(data._id);
        console.log(res.data.message);
      } catch (error) {
        console.log("Error updating view:", error);
      }
    };

    if (!data?._id) {
      console.error("Invalid song ID");
      return;
    }

    updateView();

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

    const cloud = e.target
      .closest(".lyrics_song_content_left_other_g")
      .querySelector(".cloudy");
    cloud.classList.toggle("active");

    const payload = {
      idLyrics: data._id,
      userId,
    };

    const res = await lyricsApi.cloudyLyrics(payload);
    if (res.status === 200) {
      setLike(!like);
    }
  };
  return (
    <div className="lyrics_song_content_left_other">
      <div className="lyrics_song_content_left_other_g">
        <h3>Lượt xem</h3>
        <p>{data.view}</p>
      </div>
      <div className="lyrics_song_content_left_other_g">
        <h3>Cloudy</h3>
        <p>
          <span className={like ? "cloudy active" : "cloudy"} onClick={cloudy}>
            {appSvg.cloud}
          </span>
          {data.cloudy.length}
        </p>
      </div>
      <div className="lyrics_song_content_left_other_g">
        <h3>Chia sẻ</h3>
        <p onClick={toggleBoxShare}>
          <span>{appSvg.share}</span>
          {data.share}
        </p>
        <BoxShare data={data} />
      </div>
    </div>
  );
};

export default BoxOther;
