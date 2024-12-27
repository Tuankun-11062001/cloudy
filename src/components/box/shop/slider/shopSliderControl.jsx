"use client";
import { appSvg } from "@/data/svg";
import React, { useEffect, useState } from "react";

export const ShopSliderControl = ({ data }) => {
  const [activeSlider, setActiveSlider] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    reloadSlider();
  }, [activeSlider]);

  useEffect(() => {
    const blogSlider = document.querySelector(".shop_slider");
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
    const list = document.querySelector(".shop_slider .shop_slider_items");
    const items = list.querySelectorAll(".shop_slider_card");
    const dots = document.querySelectorAll(
      ".shop_slider .shop_slider_control .shop_slider_control_dots span"
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
    const list = document.querySelector(".shop_slider .shop_slider_items");

    const items = list.querySelectorAll(".shop_slider_card");
    if (activeSlider + 1 > items.length - 1) {
      setActiveSlider(0);
    } else {
      setActiveSlider((prev) => prev + 1);
    }
    reloadSlider();
  };

  const handlePrev = () => {
    const list = document.querySelector(".shop_slider .shop_slider_items");

    const items = list.querySelectorAll(".shop_slider_card");
    if (activeSlider - 1 < 0) {
      setActiveSlider(items.length - 1);
    } else {
      setActiveSlider(activeSlider - 1);
    }
    reloadSlider();
  };

  const handleDots = (e, indx) => {
    const dots = document.querySelectorAll(
      ".shop_slider .shop_slider_control .shop_slider_control_dots span"
    );
    dots.forEach((element) => {
      element.classList.remove("active");
    });
    setActiveSlider(indx);
    reloadSlider();

    e.target.classList.add("active");
  };

  return (
    <div className="shop_slider_control">
      <p className="shop_slider_control_prev" onClick={handlePrev}>
        {appSvg.arrowDown}
      </p>

      <div className="shop_slider_control_dots">
        {data.data.map((_, index) => (
          <span
            className="active"
            key={index}
            onClick={(e) => handleDots(e, index)}
          ></span>
        ))}
      </div>
      <p className="shop_slider_control_next" onClick={handleNext}>
        {appSvg.arrowDown}
      </p>
    </div>
  );
};

export const ShopCategoryDetailSliderControl = ({ data }) => {
  const [activeSlider, setActiveSlider] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    reloadSlider();
  }, [activeSlider]);

  useEffect(() => {
    const blogSlider = document.querySelector(".shop_category_detail_slider");
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
      ".shop_category_detail_slider .shop_category_detail_slider_items"
    );
    const items = list.querySelectorAll(".shop_category_detail_slider_card");
    const dots = document.querySelectorAll(
      ".shop_category_detail_slider .shop_category_detail_slider_control .shop_category_detail_slider_control_dots span"
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
      ".shop_category_detail_slider .shop_category_detail_slider_items"
    );

    const items = list.querySelectorAll(".shop_category_detail_slider_card");
    if (activeSlider + 1 > items.length - 1) {
      setActiveSlider(0);
    } else {
      setActiveSlider((prev) => prev + 1);
    }
    reloadSlider();
  };

  const handlePrev = () => {
    const list = document.querySelector(
      ".shop_category_detail_slider .shop_category_detail_slider_items"
    );

    const items = list.querySelectorAll(".shop_category_detail_slider_card");
    if (activeSlider - 1 < 0) {
      setActiveSlider(items.length - 1);
    } else {
      setActiveSlider(activeSlider - 1);
    }
    reloadSlider();
  };

  const handleDots = (e, index) => {
    const dots = document.querySelectorAll(
      ".shop_category_detail_slider .shop_category_detail_control .shop_category_detail_control_dots span"
    );
    dots.forEach((element, index) => {
      element.classList.remove("active");
    });
    setActiveSlider(index);
    reloadSlider();

    e.target.classList.add("active");
  };

  return (
    <div className="shop_category_detail_slider_control">
      <p
        className="shop_category_detail_slider_control_prev"
        onClick={handlePrev}
      >
        {appSvg.arrowDown}
      </p>

      <div className="shop_category_detail_slider_control_dots">
        {data.map((_, index) => (
          <span
            className="active"
            onClick={(e) => handleDots(e, index)}
            key={index}
          ></span>
        ))}
      </div>
      <p
        className="shop_category_detail_slider_control_next"
        onClick={handleNext}
      >
        {appSvg.arrowDown}
      </p>
    </div>
  );
};

export const ShopDetailSliderControl = ({ data }) => {
  const [activeSlider, setActiveSlider] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    reloadSlider();
  }, [activeSlider]);

  useEffect(() => {
    const blogSlider = document.querySelector(".shop_detail_slider");
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
      ".shop_detail_slider .shop_detail_slider_items"
    );
    const items = list.querySelectorAll(".shop_detail_slider_card");
    const dots = document.querySelectorAll(
      ".shop_detail_slider .shop_detail_slider_control .shop_detail_slider_control_dots span"
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
      ".shop_detail_slider .shop_detail_slider_items"
    );

    const items = list.querySelectorAll(".shop_detail_slider_card");
    if (activeSlider + 1 > items.length - 1) {
      setActiveSlider(0);
    } else {
      setActiveSlider((prev) => prev + 1);
    }
    reloadSlider();
  };

  const handlePrev = () => {
    const list = document.querySelector(
      ".shop_detail_slider .shop_detail_slider_items"
    );

    const items = list.querySelectorAll(".shop_detail_slider_card");
    if (activeSlider - 1 < 0) {
      setActiveSlider(items.length - 1);
    } else {
      setActiveSlider(activeSlider - 1);
    }
    reloadSlider();
  };

  const handleDots = (e, index) => {
    const dots = document.querySelectorAll(
      ".shop_detail_slider .shop_detail_slider_control .shop_detail_slider_control_dots span"
    );
    dots.forEach((element, index) => {
      element.classList.remove("active");
    });
    setActiveSlider(index);
    reloadSlider();
    e.target.classList.add("active");
  };

  return (
    <div className="shop_detail_slider_control">
      <p className="shop_detail_slider_control_prev" onClick={handlePrev}>
        {appSvg.arrowDown}
      </p>

      <div className="shop_detail_slider_control_dots">
        {data.map((_, index) => (
          <span
            className="active"
            onClick={(e) => handleDots(e, index)}
            key={index}
          ></span>
        ))}
      </div>
      <p className="shop_detail_slider_control_next" onClick={handleNext}>
        {appSvg.arrowDown}
      </p>
    </div>
  );
};
