"use client";
import { appSvg } from "@/data/svg";
import React, { useState } from "react";

const Theme = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const handleTheme = (e) => {
    document.body.classList.toggle("darkmode");
    setDarkTheme(!darkTheme);
  };
  return (
    <div className="theme">
      {darkTheme ? (
        <div onClick={handleTheme}>
          {appSvg.sun}
          <p>Mode Sáng</p>
        </div>
      ) : (
        <div onClick={handleTheme}>
          {appSvg.moon}
          <p>Mode Tối</p>
        </div>
      )}
    </div>
  );
};

export default Theme;
