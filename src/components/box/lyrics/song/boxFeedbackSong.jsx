"use client";
import SelectCountry from "@/components/select/selectCountry";
import { appSvg } from "@/data/svg";
import React, { useEffect, useState } from "react";
import BoxEditLyricsFeedback from "./addingLyricsFeedback/boxEditLyricsFeedback";
import { lyricsApi } from "@/api/lyrics";
import { getLocalStorage } from "@/components/storage/local";

const BoxFeedbackSong = ({ data }) => {
  const [userInfo, setUserInfo] = useState();
  const [editBox, setEditBox] = useState(false);
  const [chooseLanguage, setChooseLanguage] = useState("");
  const [queryLanguage, setQueryLanguage] = useState([]);

  useEffect(() => {
    const localID = getLocalStorage("_CM_id");
    if (!localID) {
      return;
    }
    setUserInfo(localID);
  }, []);
  const handleLayoutFeedbackUser = (e) => {
    const lyricsSong = document.querySelector(".lyrics_song");
    const lyricsSongContent = lyricsSong.querySelector(".lyrics_song_content");
    const boxFeedback = lyricsSongContent.querySelector(".box_feedback");
    const feedbackSong = boxFeedback.querySelectorAll(".feedback_song");
    const userFeedback = lyricsSongContent.querySelectorAll(
      ".box_feedback_song_user"
    );
    let dataFeedbackUser = e.target.closest(".box_feedback_song_user").dataset
      .feedbackuser;

    feedbackSong.forEach((element) => {
      element.classList.remove("active");

      if (dataFeedbackUser === element.dataset.feedbackcontent) {
        element.classList.add("active");
      }
    });

    lyricsSongContent.classList.add("user_lyrics_layout");
    boxFeedback.classList.add("active");

    userFeedback.forEach((element) => {
      element.classList.remove("active");
    });

    e.target.closest(".box_feedback_song_user").classList.add("active");
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setEditBox(!editBox);
  };

  const handleDeleteTranslsate = (e) => {
    e.stopPropagation();
    const boxAsk = e.target
      .closest(".info_other_delete")
      .querySelector(".box_ask");
    boxAsk.classList.toggle("active");
  };

  const handleYes = async (e, id) => {
    e.stopPropagation();
    const newData = {
      idLyrics: data._id,
      idTranslate: id,
    };
    const res = await lyricsApi.deleteTranslsate(newData);
    if (res.status !== 200) {
      return;
    }
    window.location.reload();
  };

  const handleChange = (e) => {
    setChooseLanguage(e.target.value);
  };

  useEffect(() => {
    if (chooseLanguage === "") {
      setQueryLanguage([]);
    } else {
      const filteredTranslate = data.translate.filter(
        (item) => item.language === chooseLanguage
      );
      setQueryLanguage(filteredTranslate);
    }
  }, [chooseLanguage]);

  const renderFeedbackList = (translateList) => {
    return translateList.length > 0 ? (
      translateList.map((item) => (
        <div
          className="box_feedback_song_user"
          data-feedbackuser={item._id}
          onClick={handleLayoutFeedbackUser}
          key={item._id}
        >
          <img src={item.user.avatar} alt={item.user.userName} loading="lazy" />
          <div className="info">
            <h3>{item.user.userName}</h3>
            <div className="info_other">
              <p>Ngôn ngữ: {item.language}</p>

              {userInfo === item.user._id && (
                <>
                  <span onClick={handleEdit}>{appSvg.edit}</span>
                  <div className="info_other_delete">
                    <span onClick={handleDeleteTranslsate}>{appSvg.trash}</span>
                    <div className="box_ask">
                      <h5>Bạn chắc chắn xoá nó?</h5>
                      <div>
                        <p onClick={handleDeleteTranslsate}>Không!</p>
                        <p onClick={(e) => handleYes(e, item._id)}>Đúng!</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {editBox && (
            <BoxEditLyricsFeedback
              dataOrigin={data}
              dataEdit={item}
              idUser={item.user._id}
              idTranslate={item._id}
              close={handleEdit}
            />
          )}
        </div>
      ))
    ) : (
      <p>Hiện chưa cho bản dịch nào</p> // Thông báo khi không có bản dịch
    );
  };

  return (
    <div className="box_feedback_song">
      <h4>Bản dịch</h4>
      <div className="search_language">
        <label>{appSvg.translate}</label>
        <select onChange={handleChange} value={chooseLanguage}>
          <option value="">Chọn</option>
          {Array.from(
            new Map(
              data.translate.map((item) => [item.language, item])
            ).values()
          ).map((translate) => (
            <option value={translate.language} key={translate._id}>
              {translate.language}
            </option>
          ))}
        </select>
      </div>
      <h5>Thành viên dịch</h5>
      <div className="box_feedback_song_list">
        {queryLanguage.length > 0
          ? renderFeedbackList(queryLanguage)
          : renderFeedbackList(data.translate)}
      </div>
    </div>
  );
};

export default BoxFeedbackSong;
