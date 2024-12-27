import ButtonBack from "@/components/box/blog/button/buttonBack";
import { BlogCategoryCard } from "@/components/box/blog/card/blogCategoryCard";
import React, { Suspense } from "react";

export const metadata = {
  title: "Category",
  description:
    "Explore a wide range of categories including Health, Programming, Languages, Games, and Valuable Knowledge. Whether you're looking to improve your well-being, enhance your coding skills, learn a new language, enjoy exciting games, or gain useful insights, our diverse collection of topics has something for everyone. Stay informed and engaged with content that enriches your mind and life.",
};

const BlogCategoryPage = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const resCategory = await fetch(`${baseUrl}/category?q=blogs`, {
    next: {
      revalidate: 10,
    },
  });
  const resBannerCategory = await fetch(`${baseUrl}/event`, {
    next: {
      revalidate: 10,
    },
  });
  const category = await resCategory.json();
  const { data } = await resBannerCategory.json();

  return (
    <div className="blog_category_page">
      <div className="blog_category_page_head">
        <img src={data[0]?.bannerCategoryBlog} loading="lazy" alt={`banner`} />
        <div className="border_top"></div>
        <div className="border_bottom"></div>
        <Suspense fallback={<p>Loadding...</p>}>
          <ButtonBack />
        </Suspense>
      </div>

      <div className="blog_category_page_list">
        {category.data.map((blog, index) => (
          <BlogCategoryCard data={blog} index={blog._id || index} />
        ))}
      </div>
    </div>
  );
};

export default BlogCategoryPage;
