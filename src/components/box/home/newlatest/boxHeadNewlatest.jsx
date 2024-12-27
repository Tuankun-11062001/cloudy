"use client";
import { appSvg } from "@/data/svg";
import React from "react";

const BoxHeadNewlatest = ({ title }) => {
  const handlContentActive = (e) => {
    const containerContainer = e.target.parentElement;
    containerContainer.classList.toggle("active");
  };
  return (
    <div className="newlatest_blog_head" onClick={handlContentActive}>
      <h3>{title}</h3>
      <p>{appSvg.arrowDown}</p>
    </div>
  );
};

export default BoxHeadNewlatest;
