"use client";
import { lyricsApi } from "@/api/lyrics";
import React, { useEffect, useState } from "react";
import { LyricsCard } from "../card/lyricsCard";

const AllLyrics = () => {
  const [lyrics, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [stringQuery, setStringQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const loadLyrics = async (pageNumber) => {
    setLoading(true);
    const res = await lyricsApi.getLyrics(
      `${stringQuery ? stringQuery + "&" : "?"}page=${pageNumber}`
    );
    const newProducts = res.data.data;
    setTotalPages(res.data.pagination.totalPages);
    setProducts(newProducts);

    setLoading(false);
  };

  // Lần đầu tiên load dữ liệu khi trang load
  useEffect(() => {
    loadLyrics(page);
  }, [page]);

  const changePage = (i) => {
    setPage(i);
  };

  const renderListButton = () => {
    const listButton = [];
    for (let i = 1; i <= totalPages; i++) {
      listButton.push(
        <li
          key={`nav-btn-blog-${i}`}
          className={i === page ? "item active" : "item"}
          onClick={() => changePage(i)}
        >
          {i}
        </li>
      );
    }
    return listButton;
  };

  return (
    <div className="lyrics_all">
      <h2>Tất cả bài hát</h2>
      <div className="lyrics_all_list">
        {lyrics.map((product, index) => (
          <LyricsCard data={product} index={product._id || index} />
        ))}
        {/* Thêm một loader khi đang tải */}
        {loading && <div>Loading...</div>}
      </div>
      <div className="lyrics_pagination">{renderListButton()}</div>
    </div>
  );
};

export default AllLyrics;
