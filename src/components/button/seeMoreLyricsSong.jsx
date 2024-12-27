"use client";
import React, { useState } from "react";

const SeeMoreLyricsSong = () => {
  const [seeMore, setSeeMore] = useState(false);
  const handleSemore = (e) => {
    const detail = e.target.parentElement.querySelector("p");
    console.log(detail);
    detail.classList.toggle("active");
    setSeeMore(!seeMore);
  };
  return <span onClick={handleSemore}>{seeMore ? "Thu gọn" : "Xem tiếp"}</span>;
};

export default SeeMoreLyricsSong;
