import { appSvg } from "@/data/svg";
import React, { useEffect, useState } from "react";

const BoxShare = () => {
  const [url, setUrl] = useState();

  useEffect(() => {
    const currentURL = window.location.href;
    setUrl(currentURL);
  }, []);
  return (
    <div className="box_share">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}&quote=${encodeURIComponent("cloudy melody")}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {appSvg.facebook}
      </a>

      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent("cloudy melody")}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {appSvg.twitter}
      </a>

      <a
        href={`https://www.youtube.com/share?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {appSvg.youtube}
      </a>

      <a
        href={`https://www.tiktok.com/share?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {appSvg.tiktok}
      </a>
    </div>
  );
};

export default BoxShare;
