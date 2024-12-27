"use client";
import React, { useEffect, useState } from "react";
import Navigation from "./navigation";
import Theme from "./theme";
import User from "./user";
import { appSvg } from "@/data/svg";

const HeaderMb = () => {
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const headerMb = document.querySelector(".header_content_mb");
    const login = document.querySelector(".login");

    const handleScroll = () => {
      if (login) {
        headerMb.classList.add("active");
        setLastScrollY((prev) => prev + 1);
      } else {
        if (window.scrollY > lastScrollY) {
          headerMb.classList.remove("active");
        } else {
          headerMb.classList.add("active");
        }

        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const toggleMbSubmenu = (e) => {
    e.target
      .closest(".motify_mb")
      .querySelector(".motify_mb_sub_menu")
      .classList.toggle("active");
  };
  return (
    <div className="header_content_mb active">
      <Navigation />

      <div className="motify_mb">
        <p onClick={toggleMbSubmenu}>{appSvg.elips}</p>
        <div className="motify_mb_sub_menu">
          <Theme />
          <User />
        </div>
      </div>
    </div>
  );
};

export default HeaderMb;
