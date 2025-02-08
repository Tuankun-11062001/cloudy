"use client";
import { lyricsApi } from "@/api/lyrics";
import { appSvg } from "@/data/svg";
import Link from "next/link";

import React, { useEffect, useState } from "react";
const Search = () => {
  const [dataSearch, setDataSearch] = useState("");
  const handleSearch = async (e) => {
    setDataSearch(e.target.value);
  };

  return (
    <div className="search">
      <div className="search_form">
        {appSvg.search}
        <input
          placeholder="Hãy viết bài hát bạn muốn tìm..."
          onChange={handleSearch}
        />
        <Link
          href={{
            pathname: `/lyrics/search`,
            query: { title: dataSearch },
          }}
        >
          Tìm kiếm
        </Link>
      </div>
    </div>
  );
};

export default Search;
