"use client";
import { appSvg } from "@/data/svg";
import React, { useEffect, useState } from "react";

export const BookSliderControl = ({ data }) => {
  const [activeSlider, setActiveSlider] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    reloadSlider();
  }, [activeSlider]);

  useEffect(() => {
    const blogSlider = document.querySelector(".book_slider");
    blogSlider.addEventListener("mouseenter", () => {
      setIsPaused(true);
    });
    blogSlider.addEventListener("mouseleave", () => {
      setIsPaused(false);
    });
    const interval = setInterval(() => {
      if (!isPaused) {
        handleNext();
      }
    }, 7000); // Thay đổi slide mỗi 5 giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, [activeSlider, isPaused]);

  const reloadSlider = () => {
    const list = document.querySelector(".book_slider .book_slider_items");
    const items = list.querySelectorAll(".book_slider_card");
    const dots = document.querySelectorAll(
      ".book_slider .book_slider_control .book_slider_control_dots .dot_item"
    );
    items.forEach((element) => {
      element.classList.remove("active");
    });
    items[activeSlider].classList.add("active");
    let checkLeft = items[activeSlider].offsetLeft;
    list.style.left = -checkLeft + "px";

    dots.forEach((element) => {
      element.classList.remove("active");
    });

    dots[activeSlider].classList.add("active");
  };

  const handleNext = () => {
    const list = document.querySelector(".book_slider .book_slider_items");

    const items = list.querySelectorAll(".book_slider_card");
    if (activeSlider + 1 > items.length - 1) {
      setActiveSlider(0);
    } else {
      setActiveSlider((prev) => prev + 1);
    }
    reloadSlider();
  };

  const handlePrev = () => {
    const list = document.querySelector(".book_slider .book_slider_items");

    const items = list.querySelectorAll(".book_slider_card");
    if (activeSlider - 1 < 0) {
      setActiveSlider(items.length - 1);
    } else {
      setActiveSlider(activeSlider - 1);
    }
    reloadSlider();
  };

  const handleDots = (e, indx) => {
    const dots = document.querySelectorAll(
      ".book_slider .book_slider_control .book_slider_control_dots .dot_item"
    );
    console.log("dots", dots);
    dots.forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    setActiveSlider(indx);
    reloadSlider();
  };
  return (
    <>
      <p className="book_slider_control_prev" onClick={handlePrev}>
        {appSvg.arrowDown}
      </p>
      <p className="book_slider_control_next" onClick={handleNext}>
        {appSvg.arrowDown}
      </p>
      <div className="book_slider_control">
        <div className="book_slider_control_dots">
          {data.map((item, indx) => (
            <div
              className="dot_item"
              onClick={(e) => handleDots(e, indx)}
              key={item._id || indx}
            >
              <img src={item.thumbnailBanner} loading="lazy" alt={`banner`} />
              <div className="dot_info">
                <div className="left">
                  <h3>{item.title}</h3>
                  <p>{item.category.categoryName}</p>
                </div>
                <div className="right">
                  <p>
                    {appSvg.view} {item.view}
                  </p>
                  <p>
                    {appSvg.cloud} {item.cloudy.length}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const BookCategorySliderControl = ({ data }) => {
  const [activeSlider, setActiveSlider] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    reloadSlider();
  }, [activeSlider]);

  useEffect(() => {
    const blogSlider = document.querySelector(".book_category_slider");
    blogSlider.addEventListener("mouseenter", () => {
      setIsPaused(true);
    });
    blogSlider.addEventListener("mouseleave", () => {
      setIsPaused(false);
    });
    const interval = setInterval(() => {
      if (!isPaused) {
        handleNext();
      }
    }, 5000); // Thay đổi slide mỗi 5 giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, [activeSlider, isPaused]);

  const reloadSlider = () => {
    const list = document.querySelector(
      ".book_category_slider .book_category_slider_items"
    );
    const items = list.querySelectorAll(".book_category_slider_card");
    const dots = document.querySelectorAll(
      ".book_category_slider .book_category_slider_control .book_category_slider_control_dots span"
    );
    items.forEach((element) => {
      element.classList.remove("active");
    });
    items[activeSlider].classList.add("active");
    let checkLeft = items[activeSlider].offsetLeft;
    list.style.left = -checkLeft + "px";

    dots.forEach((element) => {
      element.classList.remove("active");
    });

    dots[activeSlider].classList.add("active");
  };

  const handleNext = () => {
    const list = document.querySelector(
      ".book_category_slider .book_category_slider_items"
    );

    const items = list.querySelectorAll(".book_category_slider_card");
    if (activeSlider + 1 > items.length - 1) {
      setActiveSlider(0);
    } else {
      setActiveSlider((prev) => prev + 1);
    }
    reloadSlider();
  };

  const handlePrev = () => {
    const list = document.querySelector(
      ".book_category_slider .book_category_slider_items"
    );

    const items = list.querySelectorAll(".book_category_slider_card");
    if (activeSlider - 1 < 0) {
      setActiveSlider(items.length - 1);
    } else {
      setActiveSlider(activeSlider - 1);
    }
    reloadSlider();
  };

  const handleDots = (e, indx) => {
    const dots = document.querySelectorAll(
      ".book_category_slider .book_category_slider_control .book_category_slider_control_dots span"
    );
    dots.forEach((element, index) => {
      element.classList.remove("active");
    });

    setActiveSlider(indx);
    reloadSlider();
    e.target.classList.add("active");
  };

  return (
    <div className="book_category_slider_control">
      <p className="book_category_slider_control_prev" onClick={handlePrev}>
        {appSvg.arrowDown}
      </p>

      <div className="book_category_slider_control_dots">
        {data.map((_, indx) => (
          <span
            className="active"
            onClick={(e) => handleDots(e, indx)}
            key={indx}
          ></span>
        ))}
      </div>
      <p className="book_category_slider_control_next" onClick={handleNext}>
        {appSvg.arrowDown}
      </p>
    </div>
  );
};
