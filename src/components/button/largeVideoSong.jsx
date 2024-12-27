"use client";
import { appSvg } from "@/data/svg";
import React, { useEffect, useState } from "react";

const LargeVideoSong = () => {
  const [resize, setResize] = useState(false);
  const videoResize = (e) => {
    e.target.parentElement.parentElement.classList.toggle("large_resize");
    setResize(!resize);
  };
  return (
    <p className="large_video_song" onClick={videoResize}>
      <abbr title="Video Lyrics Song">
        {resize ? appSvg.close : appSvg.resise}
      </abbr>
    </p>
  );
};

export default LargeVideoSong;
