import React from "react";
import { BlogCardVertical } from "../card/blogCard";

export const RecommendBlogDetail = async ({ idCategory, nameCategory }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const resRecommend = await fetch(`${baseUrl}/blogs/recommend/${idCategory}`, {
    next: {
      revalidate: 10,
    },
  });
  const res = await resRecommend.json();

  return (
    <div className="recomment_blog_detail">
      <h3>Những blog liên quan</h3>
      <div className="recomment_blog_detail_list">
        {res.data.map((blog) => (
          <BlogCardVertical
            data={blog}
            key={blog._id}
            nameCategory={nameCategory}
          />
        ))}
      </div>
    </div>
  );
};
