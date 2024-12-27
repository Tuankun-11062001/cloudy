import React from "react";
import { BlogCategoryGridCard } from "../card/blogCategoryCard";
import Link from "next/link";

export const BlogPageCategory = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const resCategory = await fetch(`${baseUrl}/category?q=blogs`, {
    next: {
      revalidate: 10,
    },
  });

  const category = await resCategory.json();

  return (
    <div className="blog_page_category">
      <div className="blog_page_category_head">
        <div className="left">
          <h2>Thể loại</h2>
        </div>
        <div className="right">
          <Link href="/blog/category">Tất cả thể loại</Link>
        </div>
      </div>
      <div className="blog_page_category_content">
        {category.data.slice(0, 6).map((item, index) => (
          <BlogCategoryGridCard data={item} index={item._id || index} />
        ))}
      </div>
    </div>
  );
};
