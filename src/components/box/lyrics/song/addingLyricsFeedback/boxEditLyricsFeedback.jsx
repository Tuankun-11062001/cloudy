import { lyricsApi } from "@/api/lyrics";
import BoxEditor from "@/components/box/editor/boxEditor";
import SelectCountry from "@/components/select/selectCountry";
import { appSvg } from "@/data/svg";
import React, { useState } from "react";

const BoxEditLyricsFeedback = ({
  close,
  dataOrigin,
  dataEdit,
  idUser,
  idTranslate,
}) => {
  const [dataFeedback, setDataFeedback] = useState({
    language: dataEdit.language,
    user: idUser,
    userLyrics: dataEdit.userLyrics,
    userChords: dataEdit.userChords,
    userExplain: dataEdit.userExplain,
  });
  const [message, setMessage] = useState("");

  const handleSbmit = async () => {
    const newDataEdit = {
      idLyrics: dataOrigin._id,
      idTranslate,
      idUser,
      data: dataFeedback,
    };

    const res = await lyricsApi.editTranslate(newDataEdit);
    if (res.status !== 201) {
      return setMessage("fail Update");
    }
    setMessage("Update success - reload 3s left");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <div className="box_adding_lyrics_feedback">
      <div className="box_adding_lyrics_feedback_content">
        <div className="box_adding_lyrics_feedback_content_head">
          <h3>{dataOrigin.title} - Your Edit </h3>
          <p onClick={close}>{appSvg.close}</p>
        </div>
        <div className="box_adding_lyrics_feedback_content_body">
          {message && (
            <p className="box_adding_lyrics_feedback_message">{message}</p>
          )}
          <SelectCountry state={dataFeedback} setData={setDataFeedback} />
          <div className="box_adding_lyrics_feedback_content_body_edit">
            <OriginalLyrics data={dataOrigin} />
            <UserEditFeedbackLyrics
              setData={setDataFeedback}
              state={dataFeedback}
            />
          </div>
        </div>
        <p className="box_adding_lyrics_feedback_submit" onClick={handleSbmit}>
          Save
        </p>
      </div>
    </div>
  );
};

const OriginalLyrics = ({ data }) => {
  const handleTab = (e) => {
    const parent = e.target.parentElement.parentElement;
    const control = e.target.parentElement;
    const tabs = control.querySelectorAll("p");
    const tabsContent = parent.querySelectorAll(".tabs_original_content");
    tabs.forEach((element) => {
      element.classList.remove("active");
    });

    let tabsData = e.target.dataset.tabs;

    e.target.classList.add("active");

    tabsContent.forEach((element) => {
      element.classList.remove("active");
      if (tabsData == element.dataset.content) {
        element.classList.add("active");
      }
    });
  };
  return (
    <div className="box_adding_lyrics_feedback_content_body_edit_left">
      <div className="box_adding_lyrics_feedback_content_body_edit_left_control">
        <p data-tabs="lyrics" onClick={handleTab} className="active">
          Lyrics
        </p>
        <p data-tabs="chords" onClick={handleTab}>
          Chords
        </p>
        <p data-tabs="wordSentence" onClick={handleTab}>
          Word - Sentence
        </p>
      </div>
      <div className="box_adding_lyrics_feedback_content_body_edit_left_content">
        <div
          className="tabs_original_content active tiptap"
          data-content="lyrics"
          dangerouslySetInnerHTML={{ __html: data?.lyrics }}
        ></div>
        <div
          className="tabs_original_content tiptap"
          data-content="chords"
          dangerouslySetInnerHTML={{ __html: data?.chords }}
        ></div>
        <div
          className="tabs_original_content tiptap"
          data-content="wordSentence"
          dangerouslySetInnerHTML={{ __html: data?.explain }}
        ></div>
      </div>
    </div>
  );
};

const UserEditFeedbackLyrics = ({ state, setData }) => {
  const handleTab = (e) => {
    const parent = e.target.parentElement.parentElement;
    const control = e.target.parentElement;
    const tabs = control.querySelectorAll("p");
    const tabsContent = parent.querySelectorAll(
      ".box_lyrics_feedback_content_tab"
    );
    tabs.forEach((element) => {
      element.classList.remove("active");
    });

    let tabsData = e.target.dataset.tabs;

    e.target.classList.add("active");

    tabsContent.forEach((element) => {
      element.classList.remove("active");
      if (tabsData == element.dataset.content) {
        element.classList.add("active");
      }
    });
  };

  const setLyrics = (data) => {
    setData((prev) => {
      return {
        ...prev,
        userLyrics: data,
      };
    });
  };

  const setChords = (data) => {
    setData((prev) => {
      return {
        ...prev,
        userChords: data,
      };
    });
  };

  const setExplain = (data) => {
    setData((prev) => {
      return {
        ...prev,
        userExplain: data,
      };
    });
  };

  return (
    <div className="box_adding_lyrics_feedback_content_body_edit_right">
      <div className="box_adding_lyrics_feedback_content_body_edit_right_control">
        <p data-tabs="lyrics" className="active" onClick={handleTab}>
          Lyrics
        </p>
        <p data-tabs="chords" onClick={handleTab}>
          Chords
        </p>
        <p data-tabs="explain" onClick={handleTab}>
          Explain
        </p>
      </div>
      <div className="box_adding_lyrics_feedback_content_body_edit_right_content">
        <div
          className="box_lyrics_feedback_content_tab active"
          data-content="lyrics"
        >
          <BoxEditor change={setLyrics} state={state.userLyrics} />
        </div>
        <div className="box_lyrics_feedback_content_tab" data-content="chords">
          <BoxEditor change={setChords} state={state.userChords} />
        </div>
        <div className="box_lyrics_feedback_content_tab" data-content="explain">
          <BoxEditor change={setExplain} state={state.userExplain} />
        </div>
      </div>
    </div>
  );
};

export default BoxEditLyricsFeedback;
