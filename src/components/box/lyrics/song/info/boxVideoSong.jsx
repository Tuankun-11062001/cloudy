import LargeVideoSong from "@/components/button/largeVideoSong";
import { appSvg } from "@/data/svg";
import React, { Suspense } from "react";

const BoxVideoSong = ({ data }) => {
  return (
    <div className="box_video_song">
      <div className="box_video_song_content">
        <Suspense fallback={<p>loadding...</p>}>
          <LargeVideoSong />
        </Suspense>
        <div className="box_video_song_content_video">
          <iframe
            width="560"
            height="315"
            src={data.linkYoutube.replace(
              "https://youtu.be",
              "https://youtube.com/embed"
            )}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        <div className="box_video_song_content_info">
          <p>Follow me: </p>
          <div className="box_video_song_content_info_list">
            <a href="https://www.youtube.com/@cloudymelody1106" target="_blank">
              {appSvg.youtube}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxVideoSong;
