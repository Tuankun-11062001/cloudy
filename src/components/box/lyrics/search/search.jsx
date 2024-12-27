"use client";
import { lyricsApi } from "@/api/lyrics";
import { appSvg } from "@/data/svg";
import Link from "next/link";

import React, { useEffect, useState } from "react";
const Search = () => {
  const [dataSearch, setDataSearch] = useState("");
  const [lyrics, setLyrics] = useState([]);
  const handleSearch = async (e) => {
    setDataSearch(e.target.value);
    const res = await lyricsApi.searchLyrics(e.target.value);
    if (res.status === 200) {
      setLyrics(res.data.data);
    } else {
      setLyrics([]);
    }
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
          placeholder="Hãy viết bài hát bạn muốn tìm..."
          onChange={handleSearch}
        />
      </div>
      <div className="search_list">
        {lyrics?.map((item, index) => (
          <div className="item" key={item._id || index}>
            <Link
              href={{
                pathname: `/lyrics/${item?._id}`,
                query: { name: item?.title },
              }}
            >
              <img src={item.thumbnail} loading="lazy" alt={`banner`} />
              <div className="item_content">
                <h3>{item.title}</h3>
                <p>Ca sĩ: {item.singer.singerName}</p>
                <p>Lời bài hát by : Cloudy melody</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
