"use client";
import { appSvg } from "@/data/svg";
import React, { useEffect, useState } from "react";

const SearchSinger = () => {
  const [dataSearch, setDataSearch] = useState("");

  const handleSearch = (e) => {
    setDataSearch(e.target.value);
  };

  useEffect(() => {
    const searchList = document.querySelector(".search .search_list");
    if (dataSearch) {
      searchList.classList.add("active");
    } else {
      searchList.classList.remove("active");
    }
  }, [dataSearch]);

  return (
    <div className="search">
      <div className="search_form">
        {appSvg.search}
        <input
          placeholder="Singer you want to search..."
          onChange={handleSearch}
        />
        <button>Search</button>
      </div>
      <div className="search_list">
        <div className="item">
          <img src="https://i.ytimg.com/vi/qOagQWjKpyM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLApq2jaRkjXCk-sbe_eayoHUFw5yg" />
          <div className="item_content">
            <h3>Name Song</h3>
            <p>Singer: Adele</p>
            <p>Lyrics by : Cloudy melody</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSinger;
