"use client";
import { bookApi } from "@/api/book";
import { appSvg } from "@/data/svg";
import React, { useEffect, useState } from "react";
import { BookCardHorizal } from "../card/bookCard";

const BookSearch = () => {
  const [dataSearch, setDataSearch] = useState("");
  const [resultSearch, setResultSearch] = useState([]);

  useEffect(() => {
    const parentSearch = document.querySelector(".book_page .book_search");
    const boxResult = parentSearch.querySelector(".book_search_result");

    if (dataSearch !== "") {
      boxResult.classList.add("active");
      const handleSearch = async () => {
        const res = await bookApi.searchBook(dataSearch);
        setResultSearch(res.data.data);
      };
      handleSearch();
    } else {
      boxResult.classList.remove("active");
    }
  }, [dataSearch]);

  const hanldeChangeSearch = (e) => {
    setDataSearch(e.target.value);
  };
  return (
    <div className="book_search">
      <div className="form">
        {appSvg.search}
        <input placeholder="Tra sách..." onChange={hanldeChangeSearch} />
      </div>
      <div className="book_search_result">
        {resultSearch?.map((book, index) => (
          <BookCardHorizal data={book} index={book._id || index} />
        ))}
      </div>
    </div>
  );
};

export default BookSearch;
