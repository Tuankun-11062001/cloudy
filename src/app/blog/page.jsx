import { BlogPageCategory } from "@/components/box/blog/category/category";
import BlogCta from "@/components/box/blog/cta/cta";
import BlogNewlatestCategory from "@/components/box/blog/newlatest/newlatestCategory";
import {
  BlogCardHorizontal,
  BlogMostViewCard,
} from "@/components/box/blog/card/blogCard";
import { SearchBlog } from "@/components/box/blog/search/searchBlog";
import React, { Suspense } from "react";
import { BlogSlider } from "@/components/box/blog/slider/slider";

export const metadata = {
  title: "Blog",
  description:
    "Love blog - Life blog - Enhance quality of life ❤️️ Blog: In this section, I will write about life, programming lessons, and share valuable knowledge. Each post is an opportunity for us to explore and learn together, helping you better prepare for life's challenges.",
};

const BlogPage = async () => {
  const resBlogSlider = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/blogs?slider=true`,
    {
      next: {
        revalidate: 10,
      },
    }
  );
  const resBlog = await resBlogSlider.json();

  const newLatestBlog = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/blogs/topblog`,
    {
      next: {
        revalidate: 10,
      },
    }
  );

  const resNewLatestBlog = await newLatestBlog.json();

  return (
    <div className="blog_page">
      <h1>Blog</h1>
      <div className="blog_page_head">
        <div className="blog_page_head_round_top"></div>
        <div className="blog_page_head_round_top_right"></div>
        <div className="blog_page_head_round_bottom"></div>
        <div className="blog_page_head_round_bottom_left"></div>
        <Suspense fallback={<p>Loadding....</p>}>
          <SearchBlog />
        </Suspense>
        <BlogSlider dataSlider={resBlog} />
        <BlogMostViewCard data={resNewLatestBlog.data[0]} />
        <div className="blog_page_head_list_most_view_card">
          {resNewLatestBlog.data.map((blog) => (
            <BlogCardHorizontal key={blog._id} data={blog} />
          ))}
        </div>
      </div>
      <BlogPageCategory />
      <BlogCta />

      <BlogNewlatestCategory />
    </div>
  );
};

export default BlogPage;
