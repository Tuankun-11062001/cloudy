"use client";
import { appSvg } from "@/data/svg";
import React from "react";

const BoxTabControl = ({ tabContentClass }) => {
  const handleTab = (e) => {
    const parent = e.target.parentElement.parentElement.parentElement;
    const parentTabs = e.target.parentElement;
    const tabs = parentTabs.querySelectorAll("h3");
    const tabsContent = parent.querySelectorAll(tabContentClass);
    let dataTab = e.target.dataset.tabs;

    tabs.forEach((element) => {
      element.classList.remove("active");
    });

    tabsContent.forEach((element) => {
      element.classList.remove("active");
      if (dataTab === element.dataset.content) {
        element.classList.add("active");
      }
    });

    e.target.classList.add("active");
  };
  return (
    <div className="box_lyrics_song_tab">
      <h3 className="active" data-tabs="lyrics" onClick={handleTab}>
        Lyrics
      </h3>
      <h3 data-tabs="chords" onClick={handleTab}>
        Dịch
      </h3>
      <h3 data-tabs="explain" onClick={handleTab}>
        Giải thích
      </h3>
    </div>
  );
};

export const BoxTabControlFeedback = () => {
  const handleCloseLyricsUser = () => {
    const lyricsSong = document.querySelector(".lyrics_song");
    const lyricsSongContent = lyricsSong.querySelector(".lyrics_song_content");
    const boxFeedback = lyricsSongContent.querySelector(".box_feedback");
    const feedbackSong = boxFeedback.querySelectorAll(".feedback_song");
    const userFeedback = lyricsSongContent.querySelectorAll(
      ".box_feedback_song_user"
    );

    feedbackSong.forEach((element) => {
      element.classList.remove("active");
    });

    lyricsSongContent.classList.remove("user_lyrics_layout");
    boxFeedback.classList.remove("active");

    userFeedback.forEach((element) => {
      element.classList.remove("active");
    });
  };

  return (
    <div className="box_lyrics_user_song_head">
      <BoxTabControl tabContentClass=".box_list_feedback_song_tab_content" />
      <p
        className="box_lyrics_user_song_head_close"
        onClick={handleCloseLyricsUser}
      >
        {appSvg.close}
      </p>
    </div>
  );
};

export default BoxTabControl;
