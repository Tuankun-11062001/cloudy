"use client";
import { appSvg } from "@/data/svg";
import React, { Suspense, useEffect, useState } from "react";
import BoxFeeling from "./boxFeeling";
import { getLocalStorage } from "@/components/storage/local";

const Feeling = () => {
  const [messagelogin, setMessageLogin] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [getting, setGetting] = useState({
    svg: null,
    good: "",
  });

  useEffect(() => {
    const localId = getLocalStorage("_CM_id");
    const userInfo = getLocalStorage("_CM_info");

    if (localId) {
      setMessageLogin(false);
      setUserInfo(userInfo);
    } else {
      setMessageLogin(true);
      setUserInfo(null);
    }
  }, []);

  useEffect(() => {
    const time = new Date().getHours();

    if (time >= 0 && time <= 6) {
      setGetting({
        svg: appSvg.sun,
        good: "You wake up so early",
      });
    } else if (time > 6 && time <= 12) {
      setGetting({
        svg: appSvg.sun,
        good: "Morning!",
      });
    } else if (time > 12 && time <= 18) {
      setGetting({
        svg: appSvg.moon,
        good: "Good Afternoon!",
      });
    } else {
      setGetting({
        svg: appSvg.moon,
        good: "Good Evening!",
      });
    }
  }, []);

  const handleBoxFeeling = (e) => {
    const boxFeeling = e.target.parentElement.querySelector(".box_feeling");
    console.log(boxFeeling);
    boxFeeling.classList.add("active");
  };

  return (
    <div>
      {messagelogin ? (
        <div className="feeling_guest">
          <h3>Chào Bạn!</h3>
          <p>
            Bạn đang cảm thấy thế nào? Bạn có muốn chia sẻ cảm xúc của bạn cho
            chúng tôi không?
          </p>
          <p>Hãy đăng nhập để chia sẻ cảm xúc của bạn!</p>
        </div>
      ) : (
        <div className="feeling" onClick={handleBoxFeeling}>
          <img src={userInfo.avatar} loading="lazy" alt={`banner`} />
          <div className="feeling_content">
            <div className="good">
              {getting.svg}
              <p>{getting.good}</p>
              <p>{userInfo.userName}</p>
            </div>
            <p>
              Bạn cảm thấy thế nào? Bạn có muốn chia sẻ cảm xúc của bạn không?
            </p>
          </div>
        </div>
      )}
      <BoxFeeling close={handleBoxFeeling} />
    </div>
  );
};

export default Feeling;
