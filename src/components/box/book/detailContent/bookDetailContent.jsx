"use client";
import React, { useEffect, useState } from "react";
import { BookDetailControl, BookDetailRead } from "../button/bookButton";
import { bookApi } from "@/api/book";

const BookDetailContent = ({ data }) => {
  const [bookContent, setBookContent] = useState();
  const [chapter, setChapter] = useState(data.chapters[0].chapter._id);

  useEffect(() => {
    const getContent = async () => {
      const res = await bookApi.findChapter(chapter);

      setBookContent(res.data.data);
    };
    getContent();
  }, [chapter]);

  const handleChangeChapter = (e) => {
    setChapter(e.target.value);
  };

  return (
    <div className="book_detail_content">
      <BookDetailControl
        data={data}
        changeChapter={handleChangeChapter}
        chapterState={chapter}
      />
      <BookDetailRead />
      <div
        className="content tiptap"
        dangerouslySetInnerHTML={{ __html: bookContent?.content }}
      ></div>
    </div>
  );
};

export default BookDetailContent;
