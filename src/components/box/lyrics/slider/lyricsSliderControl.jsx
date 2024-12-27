"use client";

import { appSvg } from "@/data/svg";
import { useEffect, useState } from "react";

export const LyricsSliderControl = ({ data }) => {
  const [activeSlider, setActiveSlider] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    reloadSlider();
  }, [activeSlider]);

  useEffect(() => {
    const blogSlider = document.querySelector(".lyrics_slider");
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
    const list = document.querySelector(".lyrics_slider .lyrics_slider_items");
    const items = list.querySelectorAll(".lyrics_slider_card");
    const dots = document.querySelectorAll(
      ".lyrics_slider .lyrics_slider_control .lyrics_slider_control_dots span"
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
    const list = document.querySelector(".lyrics_slider .lyrics_slider_items");

    const items = list.querySelectorAll(".lyrics_slider_card");
    if (activeSlider + 1 > items.length - 1) {
      setActiveSlider(0);
    } else {
      setActiveSlider((prev) => prev + 1);
    }
    reloadSlider();
  };

  const handlePrev = () => {
    const list = document.querySelector(".lyrics_slider .lyrics_slider_items");

    const items = list.querySelectorAll(".lyrics_slider_card");
    if (activeSlider - 1 < 0) {
      setActiveSlider(items.length - 1);
    } else {
      setActiveSlider(activeSlider - 1);
    }
    reloadSlider();
  };

  const handleDots = (e, indx) => {
    const dots = document.querySelectorAll(
      ".lyrics_slider .lyrics_slider_control .lyrics_slider_control_dots span"
    );
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    e.target.classList.add("active");
    setActiveSlider(indx);
    reloadSlider();
  };

  return (
    <div className="lyrics_slider_control">
      <p className="lyrics_slider_control_prev" onClick={handlePrev}>
        {appSvg.arrowDown}
      </p>

      <div className="lyrics_slider_control_dots">
        {data.map((_, indx) => (
          <span onClick={(e) => handleDots(e, indx)} key={indx}></span>
        ))}
      </div>
      <p className="lyrics_slider_control_next" onClick={handleNext}>
        {appSvg.arrowDown}
      </p>
    </div>
  );
};

export const LyricsDetailCategorySliderControl = ({ data }) => {
  const [activeSlider, setActiveSlider] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    reloadSlider();
  }, [activeSlider]);

  useEffect(() => {
    const blogSlider = document.querySelector(".lyrics_detail_category_slider");
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
      ".lyrics_detail_category_slider .lyrics_detail_category_slider_items"
    );
    const items = list.querySelectorAll(".lyrics_detail_category_slider_card");
    const dots = document.querySelectorAll(
      ".lyrics_detail_category_slider .lyrics_detail_category_slider_control .lyrics_detail_category_slider_control_dots span"
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
      ".lyrics_detail_category_slider .lyrics_detail_category_slider_items"
    );

    const items = list.querySelectorAll(".lyrics_detail_category_slider_card");
    if (activeSlider + 1 > items.length - 1) {
      setActiveSlider(0);
    } else {
      setActiveSlider((prev) => prev + 1);
    }
    reloadSlider();
  };

  const handlePrev = () => {
    const list = document.querySelector(
      ".lyrics_detail_category_slider .lyrics_detail_category_slider_items"
    );

    const items = list.querySelectorAll(".lyrics_detail_category_slider_card");
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
    <div className="lyrics_detail_category_slider_control">
      <p
        className="lyrics_detail_category_slider_control_prev"
        onClick={handlePrev}
      >
        {appSvg.arrowDown}
      </p>

      <div className="lyrics_detail_category_slider_control_dots">
        {data.map((_, indx) => (
          <span
            className="active"
            onClick={(e) => handleDots(e, indx)}
            key={indx}
          ></span>
        ))}
      </div>
      <p
        className="lyrics_detail_category_slider_control_next"
        onClick={handleNext}
      >
        {appSvg.arrowDown}
      </p>
    </div>
  );
};

export const LyricsDetailCategoryCountrySliderControl = ({ data }) => {
  const [activeSlider, setActiveSlider] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    reloadSlider();
  }, [activeSlider]);

  useEffect(() => {
    const blogSlider = document.querySelector(
      ".lyrics_detail_category_country_slider"
    );
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
      ".lyrics_detail_category_country_slider .lyrics_detail_category_country_slider_items"
    );
    const items = list.querySelectorAll(
      ".lyrics_detail_category_country_slider_card"
    );
    const dots = document.querySelectorAll(
      ".lyrics_detail_category_country_slider .lyrics_detail_category_country_slider_control .lyrics_detail_category_country_slider_control_dots span"
    );
    items.forEach((element) => {
      element.classList.remove("active");
    });
    items[activeSlider]?.classList.add("active");
    let checkLeft = items[activeSlider].offsetLeft;
    list.style.left = -checkLeft + "px";

    dots.forEach((element) => {
      element.classList.remove("active");
    });

    dots[activeSlider]?.classList.add("active");
  };

  const handleNext = () => {
    const list = document.querySelector(
      ".lyrics_detail_category_country_slider .lyrics_detail_category_country_slider_items"
    );

    const items = list.querySelectorAll(
      ".lyrics_detail_category_country_slider_card"
    );
    if (activeSlider + 1 > items.length - 1) {
      setActiveSlider(0);
    } else {
      setActiveSlider((prev) => prev + 1);
    }
    reloadSlider();
  };

  const handlePrev = () => {
    const list = document.querySelector(
      ".lyrics_detail_category_country_slider .lyrics_detail_category_country_slider_items"
    );

    const items = list.querySelectorAll(
      ".lyrics_detail_category_country_slider_card"
    );
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
    dots.forEach((element) => {
      element.classList.remove("active");
    });
    setActiveSlider(indx);
    reloadSlider();
    e.target.classList.add("active");
  };

  return (
    <div className="lyrics_detail_category_country_slider_control">
      <p
        className="lyrics_detail_category_country_slider_control_prev"
        onClick={handlePrev}
      >
        {appSvg.arrowDown}
      </p>

      <div className="lyrics_detail_category_country_slider_control_dots">
        {data.map((_, indx) => (
          <span
            className="active"
            onClick={(e) => handleDots(e, indx)}
            key={indx}
          ></span>
        ))}
      </div>
      <p
        className="lyrics_detail_category_country_slider_control_next"
        onClick={handleNext}
      >
        {appSvg.arrowDown}
      </p>
    </div>
  );
};

export const LyricsSingerSliderControl = ({ data }) => {
  const [activeSlider, setActiveSlider] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    reloadSlider();
  }, [activeSlider]);

  useEffect(() => {
    const blogSlider = document.querySelector(".lyrics_singer_slider");
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
      ".lyrics_singer_slider .lyrics_singer_slider_items"
    );
    const items = list.querySelectorAll(".lyrics_singer_slider_card");
    const dots = document.querySelectorAll(
      ".lyrics_singer_slider .lyrics_singer_slider_control .lyrics_singer_slider_control_dots span"
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
      ".lyrics_singer_slider .lyrics_singer_slider_items"
    );

    const items = list.querySelectorAll(".lyrics_singer_slider_card");
    if (activeSlider + 1 > items.length - 1) {
      setActiveSlider(0);
    } else {
      setActiveSlider((prev) => prev + 1);
    }
    reloadSlider();
  };

  const handlePrev = () => {
    const list = document.querySelector(
      ".lyrics_singer_slider .lyrics_singer_slider_items"
    );

    const items = list.querySelectorAll(".lyrics_singer_slider_card");
    if (activeSlider - 1 < 0) {
      setActiveSlider(items.length - 1);
    } else {
      setActiveSlider(activeSlider - 1);
    }
    reloadSlider();
  };

  const handleDots = (e, index) => {
    const dots = document.querySelectorAll(
      ".lyrics_singer_slider .lyrics_singer_slider_control .lyrics_singer_slider_control_dots span"
    );
    dots.forEach((element, index) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    setActiveSlider(index);
    reloadSlider();
  };

  return (
    <div className="lyrics_singer_slider_control">
      <p className="lyrics_singer_slider_control_prev" onClick={handlePrev}>
        {appSvg.arrowDown}
      </p>

      <div className="lyrics_singer_slider_control_dots">
        {data.map((_, index) => (
          <span
            key={index}
            onClick={(e) => handleDots(e, index)}
            className="active"
          ></span>
        ))}
      </div>
      <p className="lyrics_singer_slider_control_next" onClick={handleNext}>
        {appSvg.arrowDown}
      </p>
    </div>
  );
};
