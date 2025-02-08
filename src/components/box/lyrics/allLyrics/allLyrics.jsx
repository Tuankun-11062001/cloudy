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
    const res = await lyricsApi.getFillterLyrics(
      `${stringQuery ? stringQuery + "&" : "?"}page=${pageNumber}`
    );
    const newProducts = res.data.data;
    console.log("ré", res.data);
    setTotalPages(res.data?.pagination?.totalPages);
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
      {/* <div className="lyrics_pagination">{renderListButton()}</div> */}
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        changePage={changePage}
      />
    </div>
  );
};

const Pagination = ({ totalPages, currentPage, changePage }) => {
  const [page, setPage] = useState(currentPage);

  // Hàm để tạo các nút phân trang
  const createPageButtons = () => {
    const buttons = [];

    // Thêm nút "First"
    buttons.push(
      <li
        key="first"
        className={`item ${page === 1 ? "disabled" : ""}`}
        onClick={() => handleChangePage(1)}
      >
        &laquo;
      </li>
    );

    // Tính toán phạm vi của các trang gần nhau (5 trang)
    const startPage = Math.max(1, page - 2); // Giới hạn trang bắt đầu (không nhỏ hơn 1)
    const endPage = Math.min(totalPages, page + 2); // Giới hạn trang kết thúc (không lớn hơn tổng số trang)

    // Thêm các nút trang ở giữa
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <li
          key={`page-${i}`}
          className={`item ${i === page ? "active" : ""}`}
          onClick={() => handleChangePage(i)}
        >
          {i}
        </li>
      );
    }

    // Thêm nút "Last"
    buttons.push(
      <li
        key="last"
        className={`item ${page === totalPages ? "disabled" : ""}`}
        onClick={() => handleChangePage(totalPages)}
      >
        &raquo;
      </li>
    );

    return buttons;
  };

  // Hàm để thay đổi trang
  const handleChangePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) {
      return;
    }

    setPage(newPage);
    changePage(newPage); // gọi lại hàm changePage từ prop
  };

  return <ul className="lyrics_pagination">{createPageButtons()}</ul>;
};

export default AllLyrics;
