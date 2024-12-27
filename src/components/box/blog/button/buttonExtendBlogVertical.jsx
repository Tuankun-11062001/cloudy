"use client";
import { appSvg } from "@/data/svg";
import React from "react";

const ButtonExtendBlogVertical = () => {
  const openDetailBlogVertical = (e) => {
    const parent = e.target.parentElement.parentElement.parentElement;
    const blogVerticalDetail = parent.querySelector(
      ".blog_card_vertical_detail"
    );
    blogVerticalDetail.classList.toggle("active");
    e.target.classList.toggle("active");
  };
  return <p onClick={openDetailBlogVertical}>{appSvg.arrowDown}</p>;
};

export default ButtonExtendBlogVertical;
