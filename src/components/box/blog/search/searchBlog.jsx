"use client";
import { blogsApi } from "@/api/blogs";
import { appSvg } from "@/data/svg";
import React, { useEffect, useState } from "react";
import { BlogCardHorizontal, BlogCardVertical } from "../card/blogCard";

export const SearchBlog = () => {
  const [blogSearch, setBlogSearch] = useState("");
  const [dataBlog, setDataBlog] = useState([]);
  const handleChange = (e) => {
    setBlogSearch(e.target.value);
  };

  useEffect(() => {
    const resultSearchBox = document.querySelector(
      ".search_blog .result_search"
    );
    if (blogSearch) {
      resultSearchBox.classList.add("active");
      const blogs = async () => {
        const res = await blogsApi.searchBlogs(blogSearch);
        setDataBlog(res.data.data);
      };
      blogs();
    } else {
      resultSearchBox.classList.remove("active");
    }
  }, [blogSearch]);

  return (
    <div className="search_blog">
      {appSvg.search}
      <input
        placeholder="Searching Blog..."
        onChange={handleChange}
        value={blogSearch}
      />
      <div className="result_search">
        {dataBlog?.map((blog, index) => (
          <BlogCardHorizontal data={blog} index={blog._id || index} />
        ))}
      </div>
    </div>
  );
};
