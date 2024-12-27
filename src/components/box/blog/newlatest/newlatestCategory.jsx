import { BlogCardVertical } from "@/components/box/blog/card/blogCard";
import React from "react";

const BlogNewlatestCategory = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const resNewLatest = await fetch(`${baseUrl}/blogs/lastestBlog`, {
    next: {
      revalidate: 10,
    },
  });
  const latest = await resNewLatest.json();

  return (
    <div className="blog_newlatest_list">
      {latest.data.map((blog, index) => (
        <div className="blog_newlatest_category" key={blog._id || index}>
          <div className="blog_newlatest_category_head">
            <h2>Mới nhất {blog.categoryInfo.categoryName}</h2>
          </div>
          <div className="blog_newlatest_category_list">
            {blog.blogs.map((item, index) => (
              <BlogCardVertical
                data={item}
                index={item._id || index}
                nameCategory={blog.categoryInfo.categoryName}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogNewlatestCategory;
