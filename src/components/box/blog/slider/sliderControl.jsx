"use client";
import { appSvg } from "@/data/svg";
import React, { useEffect, useState } from "react";

export const SliderControl = ({ data }) => {
  const [activeSlider, setActiveSlider] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    reloadSlider();
  }, [activeSlider]);

  useEffect(() => {
    const blogSlider = document.querySelector(".blog_slider");
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
    const list = document.querySelector(".blog_slider .blog_slider_items");
    const items = list.querySelectorAll(".box_slider_blog");
    const dots = document.querySelectorAll(
      ".blog_slider .slider_control .slider_control_dots span"
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
    const list = document.querySelector(".blog_slider .blog_slider_items");

    const items = list.querySelectorAll(".box_slider_blog");
    if (activeSlider + 1 > items.length - 1) {
      setActiveSlider(0);
    } else {
      setActiveSlider((prev) => prev + 1);
    }
    reloadSlider();
  };

  const handlePrev = () => {
    const list = document.querySelector(".blog_slider .blog_slider_items");

    const items = list.querySelectorAll(".box_slider_blog");
    if (activeSlider - 1 < 0) {
      setActiveSlider(items.length - 1);
    } else {
      setActiveSlider(activeSlider - 1);
    }
    reloadSlider();
  };

  const handleDots = (e, indx) => {
    const dots = document.querySelectorAll(
      ".blog_slider .slider_control .slider_control_dots span"
    );
    dots.forEach((element, index) => {
      element.classList.remove("active");
    });
    setActiveSlider(indx);
    reloadSlider();
    e.target.classList.add("active");
  };

  return (
    <div className="slider_control">
      <p className="slider_control_prev" onClick={handlePrev}>
        {appSvg.arrowDown}
      </p>

      <div className="slider_control_dots">
        {data.map((dot, indx) => (
          <span
            className="active"
            key={dot._id}
            onClick={(e) => handleDots(e, indx)}
          ></span>
        ))}
      </div>
      <p className="slider_control_next" onClick={handleNext}>
        {appSvg.arrowDown}
      </p>
    </div>
  );
};

export const SliderBlogCategoryControl = ({ data }) => {
  const [activeSlider, setActiveSlider] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    reloadSlider();
  }, [activeSlider]);

  useEffect(() => {
    const blogSlider = document.querySelector(".blog_category_slider");
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
      ".blog_category_slider .blog_category_slider_items"
    );
    const items = list.querySelectorAll(".box_blog_category_slider");
    const dots = document.querySelectorAll(
      ".blog_category_slider .blog_category_slider_control .blog_category_slider_control_dots span"
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
      ".blog_category_slider .blog_category_slider_items"
    );

    const items = list.querySelectorAll(".box_blog_category_slider");
    if (activeSlider + 1 > items.length - 1) {
      setActiveSlider(0);
    } else {
      setActiveSlider((prev) => prev + 1);
    }
    reloadSlider();
  };

  const handlePrev = () => {
    const list = document.querySelector(
      ".blog_category_slider .blog_category_slider_items"
    );

    const items = list.querySelectorAll(".box_blog_category_slider");
    if (activeSlider - 1 < 0) {
      setActiveSlider(items.length - 1);
    } else {
      setActiveSlider(activeSlider - 1);
    }
    reloadSlider();
  };

  const handleDots = (e, indx) => {
    const dots = document.querySelectorAll(
      ".blog_category_slider .blog_category_slider_control .blog_category_slider_control_dots span"
    );
    dots.forEach((element, index) => {
      element.classList.remove("active");
    });
    setActiveSlider(indx);
    reloadSlider();
    e.target.classList.add("active");
  };

  return (
    <div className="blog_category_slider_control">
      <p className="blog_category_slider_control_prev" onClick={handlePrev}>
        {appSvg.arrowDown}
      </p>

      <div className="blog_category_slider_control_dots">
        {data.map((_, indx) => (
          <span
            className="active"
            key={indx}
            onClick={(e) => handleDots(e, indx)}
          ></span>
        ))}
      </div>
      <p className="blog_category_slider_control_next" onClick={handleNext}>
        {appSvg.arrowDown}
      </p>
    </div>
  );
};
